import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
console.log("API key is " + EXCHANGE_RATE_API_KEY);
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Pair Conversion Requests
app.post("/api/convert", async (req, res) => {
  try {
    let baseCurrency = req.body.baseCurrency;
    let targetCurrency = req.body.targetCurrency;
    let amount = req.body.amount;

    // const conversionRequest = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${baseCurrency}/${targetCurrency}/AMOUNT`;

    // const response = await axios.get(CURRENCYCODE_URL);
    // const currencyCodes = response.data.supported_codes.map(code => code[0]);

    // res.json(currencyCodes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching currency codes" });
  }
});

// This endpoint lists the currencies that exchangerate-api support
app.get("/api/supportedCurrencyCodes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/codes`
    );
    // const object = response.data.supported_codes;
    // console.log(object);
    const currencyCodes = await response.data.supported_codes.map(
      (code) => code[0]
    );
    // console.log(currencyCodes);
    res.json(currencyCodes);
  } catch (error) {
    console.log();
    res.status(500).json({ error: "Error fetching currency codes" });
  }
});

// app.get('/api/currencycode', async (req, res) => {
//   try {
//     const response = await axios.get(CURRENCYCODE_URL);
//     const currencyCodes = response.data.supported_codes.map(code => code[0]);
//     res.json(currencyCodes);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching currency codes' });
//   }
// });

// const getCurrencyCodes = async () => {
//   try {
//     const response = await axios.get(CURRENCYCODE_URL);
//     const currencyCodes = response.data; // matches success response
//     // const currencyCodes = response.data.supported_codes.map(code => code[0]);
//     console.log(currencyCodes);
//   } catch (error) {
//     console.error('Error getting currency codes:', error.message);
//   }
// };

// getCurrencyCodes();
