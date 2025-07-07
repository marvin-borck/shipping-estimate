const express = require('express');
const cors = require('cors');
const getShippingRate = require('./utils/rateCalculator');

const app = express();
app.use(cors());

app.get('/shipping-estimate', (req, res) => {
  const country = req.query.country || 'DE';
  const subtotal = parseInt(req.query.subtotal) || 0;

  const rate = getShippingRate(country, subtotal);
  if (!rate) return res.status(404).json({ error: 'No rate found' });

  res.json({
    country,
    price: rate.price,
    label: rate.label,
    formatted: rate.price === 0 ? "Kostenlos" : `${rate.price.toFixed(2).replace('.', ',')} €`
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Shipping app running on port ${port}`));
