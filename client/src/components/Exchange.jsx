import { useState, useEffect } from "react";

export default function Exchange() {
  const [supportedCurrencyCodes, setSupportedCurrencyCodes] = useState([]);

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
        console.error("Error fetching currency codes:", error);
      }
    };

    fetchCurrencyCodes();
  }, []);

  const [amountCurrency, setAmountCurrency] = useState(["MYR"]);
  const [convertCurrency, setConvertCurrency] = useState(["USD"]);

  const [leftCurrency, setLeftCurrency] = useState("");
  const [rightCurrency, setRightCurrency] = useState("");

  const handleInputChange = (event) => {
    setLeftCurrency(event.target.value);
    setRightCurrency(event.target.value * 4.5);
  };

  return (
    <div class="mt-28">
      <span class="self-center text-6xl font-bold text-green-300">
        CURRENCY CONVERTER
      </span>
      <div class="mt-16 bg-white shadow-md rounded-3xl p-20 max-w-4xl mx-auto relative text-left flex flex-row shadow-2xl">
        {/* First input */}
        <div class="w-2/3">
          <label for="price" class="block text-sm leading-6 text-gray-900">
            Amount
          </label>
          <div class="relative mt-2 rounded-md shadow-sm font-semibold text-lg">
            <input
              type="text"
              name="price"
              id="amountInput"
              class="block w-full rounded-md border-0 py-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:leading-6"
              placeholder="0.00"
              onChange={handleInputChange} // Attach event listener
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                {supportedCurrencyCodes.map((option) => (
                  <option key={option[0]} value={option[0]}>
                    {option[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Conversion rate */}
          {/* <p class="text-lg mt-2 font-semibold">
            {leftCurrency} {amountCurrency} = {rightCurrency} {convertCurrency}
          </p> */}
          <div class="text-lg mt-2 font-semibold flex">
            <p>
              {leftCurrency} {amountCurrency} =&nbsp;
            </p>
            <p class="text-green-700">{rightCurrency}&nbsp;</p>
            {convertCurrency}
          </div>
        </div>

        <div class="flex items-center mx-4">
          <svg
            class="w-[28px] h-[28px] text-gray-800 dark:text-white"
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
        <div class="w-2/3">
          <label for="price" class="block text-sm leading-6 text-gray-900">
            Converted to
          </label>
          <div class="relative mt-2 rounded-md shadow-sm font-semibold text-lg">
            <input
              disabled
              type="text"
              name="price"
              id="convertedInput"
              class="block w-full rounded-md border-0 py-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-950 sm:leading-6"
              placeholder="0.00"
              value={rightCurrency}
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                {supportedCurrencyCodes.map((option) => (
                  <option key={option[0]} value={option[0]}>
                    {option[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 max-w-screen-md mx-auto">
        <h3 class="text-2xl font-bold text-green-300 mb-4">
          Currency Information
        </h3>
        <div class="overflow-x-auto">
          <table class="table-auto min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="px-4 py-2">Currency Code</th>
                <th class="px-4 py-2">Currency Name</th>
              </tr>
            </thead>
            <tbody class="text-gray-600">
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
