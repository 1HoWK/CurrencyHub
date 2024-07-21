import axios from "axios";
import express from "express";
// import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
console.log("API key is " + EXCHANGE_RATE_API_KEY);

const app = express();
app.use(cors());

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Pair Conversion Requests
app.post("/api/convert", async (req, res) => {

  try {
    const baseCurrency = req.body.baseCurrency;
    const targetCurrency = req.body.targetCurrency;
    const amount = req.body.amount;
    
    const pairConversionRequestEndpoint = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`;
    console.log("Finish declaring variables");
    const response = await axios.get(pairConversionRequestEndpoint);
    if (response.data.result === "success") {
      console.log(response);
      res.json(result);
    } else {
      console.log(response);
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      result: "Error fetching currency codes",
      errorDescription: error,
    });
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
    // const currencyCodes = await response.data.supported_codes.map(
    //   (code) => code[0]
    // );[[[[[[[[[[[[[]]]]]]]]]]]]]
    const currencyCodes = await response.data.supported_codes;
    // console.log(currencyCodes);
    res.json(currencyCodes);
    console.log("API request successful");
  } catch (error) {
    res.status(500).json({ error: "Error fetching currency codes" });
  }
});
