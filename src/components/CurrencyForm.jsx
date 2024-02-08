/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import currencyCodes from "../data";

const CurrencyForm = () => {
  const [amount, setAmount] = useState();
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('NGN');
  const [Result,setResult] = useState('00.00')
  const [isLoading,setIsLoading] = useState(true)

  const url = `https://v6.exchangerate-api.com/v6/d8fc1eafde902455f10e13ca/pair/${fromCode}/${toCode}/${amount}`

  const swapCurrency = () => {
    setFromCode(toCode)
    setToCode(fromCode)
    fetchCurrencyData()
  }

  const fetchCurrencyData = async () => {
    const resp = await fetch(url)
    const data = await resp.json()
    console.log(data);
    setResult(data.conversion_result)
  }

  const convertCurrency = () => {
    fetchCurrencyData()
  }

  useEffect(() => {
    fetchCurrencyData()
  },[convertCurrency])

  return (
    <section className="flex h-screen items-center justify-center bg-blue-200">
      <div className="w-[90%] max-w-[400px] border-t-8 border-blue-500 bg-white p-4">
        {/* Text */}
        <div className="text-center">
          <span className="font-sourceCodePro text-xl  text-gray-600">
            Exchange Rate
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-wider">
            {amount === undefined ? '00.00' : Math.floor(Result).toLocaleString()}
          </h1>
        </div>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Input */}
          <div className="mx-5">
            <div className="mt-7 flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="rounded-sm border border-gray-400 p-1 px-2 text-3xl font-bold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Exchange Rate */}
            <div className="flex w-full items-center justify-between">
              <div className="mt-3 flex flex-col">
                <label htmlFor="from">From</label>
                <select
                  name=""
                  id=""
                  value={fromCode}
                  className="rounded-sm border border-gray-400 p-1 text-xl"
                  onChange={(e) => setFromCode(e.target.value)}
                >
                  {currencyCodes.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button className="mt-6">
                <FaIcons.FaArrowRightArrowLeft size={30} onClick={swapCurrency}/>
              </button>

              <div className="mt-3 flex flex-col">
                <label htmlFor="to">To</label>
                <select
                  name=""
                  id=""
                  value={toCode}
                  className="flex-3 rounded-sm border border-gray-400 p-1 text-xl"
                  onChange={(e) => setToCode(e.target.value)}
                >
                  {currencyCodes.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button className="mx-auto mt-5 w-full bg-blue-800 p-2 text-xl font-bold text-white" onClick={isLoading ? <h1>LOading....</h1> : convertCurrency}>
            CONVERT
          </button>
        </form>
      </div>
    </section>
  );
};

export default CurrencyForm;
