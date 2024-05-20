import { useEffect, useState } from "react";

export const useExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErro, setIsErro] = useState(false);
  const [exchangeResult, setExchangeResult] = useState("0");
  const [fetchOnSwap, setFetchOnSwap] = useState(false);

  const [exchangeInputs, setExchangeInputs] = useState({
    amount: "0",
    fromCurrency: "USD",
    toCurrency: "NGN",
  });

  const swapCurrency = async () => {
    setExchangeInputs((preInputs) => ({
      ...preInputs,
      fromCurrency: preInputs.toCurrency,
      toCurrency: preInputs.fromCurrency,
    }));
    setFetchOnSwap(!fetchOnSwap);
  };

  useEffect(() => {
    fetchExchangeResult();
  }, [fetchOnSwap]);

  const fetchExchangeResult = async () => {
    const startTime = Date.now();
    if (exchangeInputs.amount === "0") return;
    try {
      setIsLoading(false);
      setIsLoading(true);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/d8fc1eafde902455f10e13ca/pair/${exchangeInputs.fromCurrency}/${exchangeInputs.toCurrency}/${exchangeInputs.amount}`,
      );
      const { conversion_result } = await response.json();
      setExchangeResult(conversion_result);
    } catch (error) {
      setIsLoading(false);
      setIsErro(true);
    } finally {
      // this part is copied from old code with no changes by me
      // ( I recommend removing this and const startTime = Date.now(); because it is not necessary and only use setIsLoading(false) here )
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;

      if (elapsedTime < 3000) {
        setTimeout(() => setIsLoading(false), 3000 - elapsedTime);
      } else {
        setIsLoading(false);
      }
    }
  };
  return {
    isErro,
    isLoading,
    swapCurrency,
    exchangeResult,
    exchangeInputs,
    setExchangeInputs,
    fetchExchangeResult,
  };
};
