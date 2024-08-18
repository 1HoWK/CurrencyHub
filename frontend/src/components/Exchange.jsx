import { useState, useEffect } from "react";

export default function Exchange() {
  const [supportedCurrencyCodes, setSupportedCurrencyCodes] = useState([]);

  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("USD");
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState("MYR");

  const [baseCurrencyValue, setBaseCurrencyValue] = useState("1000");
  const [targetCurrencyValue, setTargetCurrencyValue] = useState("");

  const [conversionRate, setConversionRate] = useState("");

  useEffect(() => {
    const fetchCurrencyCodes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/supportedCurrencyCodes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency codes");
        }
        const data = await response.json();
        console.log(data);
        setSupportedCurrencyCodes(data);
      } catch (error) {
        alert("Something is wrong when communicate with server");
        console.error("Error fetching currency codes:", error);
      }
    };

    fetchCurrencyCodes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/convert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            baseCurrency: selectedBaseCurrency,
            targetCurrency: selectedTargetCurrency,
            amount: 1000,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch currency codes");
        } else {
          const data = await response.json();
          console.log(data);
          setTargetCurrencyValue(data.conversion_result);
          setConversionRate(data.conversion_rate);
        }
      } catch (error) {
        alert("Something is wrong when communicate with server");
        console.error("Error fetching currency codes:", error);
      }
    };

    fetchData();
  }, []);

  const convertHandler = async (event) => {
    try {
      const response = await fetch("http://localhost:8000/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseCurrency: selectedBaseCurrency,
          targetCurrency: selectedTargetCurrency,
          amount: baseCurrencyValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch currency codes");
      } else {
        const data = await response.json();
        console.log(data);
        setTargetCurrencyValue(data.conversion_result);
        setConversionRate(data.conversion_rate);
      }
    } catch (error) {
      alert("Something is wrong when communicate with server");
      console.error("Error fetching currency codes:", error);
    }
  };

  return (
    <div className="mt-28" id="convert">
      <span className="self-center text-6xl font-bold text-white">
        CURRENCY CONVERTER
      </span>
      <div className="mt-16 bg-white shadow-md rounded-3xl p-20 max-w-4xl mx-auto relative text-left flex flex-row shadow-2xl">
        {/* First input */}
        <div className="w-2/3">
          <label
            for="price"
            className="block text-base leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="relative mt-2 rounded-md shadow-sm font-semibold text-lg">
            <input
              type="text"
              name="price"
              id="amountInput"
              className="block w-full rounded-md border-0 py-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:leading-6"
              value={baseCurrencyValue}
              placeholder="0.00"
              onChange={(e) => setBaseCurrencyValue(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={selectedBaseCurrency}
                onChange={(e) => setSelectedBaseCurrency(e.target.value)}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-950"
              >
                {supportedCurrencyCodes.map((option) => (
                  <option
                    key={option[0]}
                    value={option[0]}
                    selected={option[0] === "MYR" ? true : undefined}
                  >
                    {option[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-lg mt-4 font-semibold flex">
            <p>1.000 {selectedBaseCurrency} =&nbsp;</p>
            <p className="text-indigo-400">{conversionRate}&nbsp;</p>
            <p>{selectedTargetCurrency}</p>
          </div>
        </div>

        <div className="flex items-center mx-4 mb-8">
          <svg
            className="w-[28px] h-[28px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
            />
          </svg>
        </div>
        {/* Second input */}
        <div className="w-2/3 flex-col">
          <label
            for="price"
            className="block text-base leading-6 text-gray-900"
          >
            Converted to
          </label>
          <div className="relative mt-2 rounded-md shadow-sm font-semibold text-lg">
            <input
              disabled
              type="text"
              name="price"
              id="convertedInput"
              className="block w-full rounded-md border-0 py-5 pr-20 text-indigo-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:leading-6"
              // placeholder="0.00"
              value={targetCurrencyValue}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={selectedTargetCurrency}
                onChange={(e) => setSelectedTargetCurrency(e.target.value)}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-950"
              >
                {supportedCurrencyCodes.map((option) => (
                  <option
                    key={option[0]}
                    value={option[0]}
                    selected={option[0] === "USD" ? true : undefined}
                  >
                    {option[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Button */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-3xl shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-950"
              onClick={convertHandler}
            >
              Convert
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-screen-md mx-auto" id="supported-codes">
        <p className="text-2xl font-bold text-white mb-4">
          LIST OF SUPPORTED CURRENCY CODES
        </p>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">Currency Code</th>
                <th className="px-4 py-2">Currency Name</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {supportedCurrencyCodes.map((option) => (
                <tr key={option[0]}>
                  <td className="border px-4 py-2">{option[0]}</td>
                  <td className="border px-4 py-2">{option[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
