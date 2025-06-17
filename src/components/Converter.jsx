import { useEffect, useState } from 'react';

function Converter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(res => res.json())
      .then(data => setCurrencies(Object.keys(data)));
  }, []);

  const handleConvert = () => {
    if (from === to || !amount) {
      setResult(amount);
      setExchangeRate(1);
      return;
    }

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[to];
        setExchangeRate(rate.toFixed(4));
        setResult(data.rates[to].toFixed(2));
        setLastUpdated(data.date);
      });
  };

  const handleSwap = () => {
    const prev = from;
    setFrom(to);
    setTo(prev);
    setResult(null);
    setExchangeRate(null);
  };

  const isReady = currencies.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-2">Currency Converter</h2>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Live exchange rates powered by <a href="https://www.frankfurter.app" target="_blank" className="underline hover:text-blue-500">Frankfurter API</a>.
      </p>

      {!isReady ? (
        <p className="text-center">Loading currencies...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center">
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full sm:w-1/2 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            >
              {currencies.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>

            <button
              onClick={handleSwap}
              className="text-2xl rotate-90 sm:rotate-0 transition-transform"
              title="Swap currencies"
            >
              🔁
            </button>

            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full sm:w-1/2 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            >
              {currencies.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Convert
          </button>

          {result && (
            <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
              <p className="text-lg">
                💸 <strong>{amount} {from}</strong> = <strong>{result} {to}</strong>
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Exchange Rate: 1 {from} = {exchangeRate} {to}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Updated: {lastUpdated}
              </p>
            </div>
          )}
        </>
      )}

      <footer className="mt-8 text-xs text-center text-gray-400">
        © {currentYear} Abduzar Khabib. All rights reserved.
      </footer>
    </div>
  );
}

export default Converter;