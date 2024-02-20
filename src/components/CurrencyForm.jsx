/* eslint-disable no-unused-vars */
import * as FaIcons from "react-icons/fa6";
import currencyCodes from "../data";
import { useExchange } from "../hooks/useExchange";

const CurrencyForm = () => {
  const {
    // use isErro to render erro alert
    isErro,
    isLoading,
    exchangeResult,
    exchangeInputs,
    swapCurrency,
    setExchangeInputs,
    fetchExchangeResult,
  } = useExchange();

  const changeHandler = (e) => {
    setExchangeInputs({ ...exchangeInputs, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex h-screen items-center justify-center bg-blue-200">
      <div className="w-[90%] max-w-[400px] border-t-8 border-blue-500 bg-white p-4">
        {/* Text */}
        <div className="text-center">
          <span className="font-sourceCodePro text-xl  text-gray-600">
            Exchange Rate
          </span>
          <h1 className="mt-2 h-6 text-3xl font-bold tracking-wider">
            {isLoading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : exchangeResult === undefined ? (
              "0"
            ) : (
              exchangeResult.toLocaleString()
            )}
          </h1>
        </div>
        <form
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
                value={exchangeInputs.amount}
                onChange={changeHandler}
              />
            </div>

            {/* Exchange Rate */}
            <div className="flex w-full items-center justify-between">
              <div className="mt-3 flex flex-col">
                <label htmlFor="from">From</label>
                <select
                  name="fromCurrency"
                  value={exchangeInputs.fromCurrency}
                  className="rounded-sm border border-gray-400 p-1 text-xl"
                  onChange={changeHandler}
                >
                  {currencyCodes.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <button className="mt-6">
                <FaIcons.FaArrowRightArrowLeft
                  size={30}
                  onClick={swapCurrency}
                />
              </button>

              <div className="mt-3 flex flex-col">
                <label htmlFor="to">To</label>
                <select
                  name="toCurrency"
                  id=""
                  value={exchangeInputs.toCurrency}
                  className="flex-3 rounded-sm border border-gray-400 p-1 text-xl"
                  onChange={changeHandler}
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
          <button
            className="btn mt-5 w-full bg-blue-800 p-2 text-xl font-bold text-white hover:bg-blue-950"
            onClick={fetchExchangeResult}
          >
            CONVERT
          </button>
        </form>
      </div>
    </section>
  );
};

export default CurrencyForm;
