import './App.css';
import React,{useEffect,useState} from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL='https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions,setcurrencyOptions]=useState([]);
  const [fromCurrency,setFromCurrency]= useState();
  const [toCurrency,setToCurrency]= useState();

  const [ammount,setammount]= useState(1);
  const [ammountInFromInput,setAmmountInFromInput]=useState(true);
  const [exchangeRate,setExchangeRate]=useState();

  let toAmmount,fromAmmount;
  if(ammountInFromInput){
    fromAmmount=ammount;
    toAmmount=ammount*exchangeRate;
  }else{
    toAmmount=ammount;
    fromAmmount=ammount/exchangeRate;
  }


  const handleFromAmmountChange=(e)=>{
    setammount(e.target.value);
    setAmmountInFromInput(true);
  }
  const handleToAmmountChange=(e)=>{
    setammount(e.target.value);
    setAmmountInFromInput(false);
  }


  useEffect(()=>{
    fetch(BASE_URL)
    .then(response=>response.json())
    .then(data => {
      const firstCurrency= Object.keys(data.rates)[0];
      setcurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
      

    })
  },[]);

  useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){  
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(response=>response.json())
      .then(data=>setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency,toCurrency]);
  
  return (
    <div>
      <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency={e=>setFromCurrency(e.target.value)}
    ammount={fromAmmount}
    changedAmmount={handleFromAmmountChange}
    />
    
    <div className="equals"> = </div>
    
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={e=>setToCurrency(e.target.value)}
    ammount={toAmmount}
    changedAmmount={handleToAmmountChange}
    />
    
    </div>
  );
}

export default App;
