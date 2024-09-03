import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onChange = (event) => {
    event.preventDefault();
    setMoney(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : 
        <select>
          {coins.map((coin) => <option>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD </option>)}
        </select>
      }
      <form>
        <input onChange={onChange} type="number" placeholder="write your money"/>
        <button>calc</button>
      </form>
    </div>
  );
}

export default App;
