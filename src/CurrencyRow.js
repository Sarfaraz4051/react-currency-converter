import React from "react"

const CurrencyRow=(props)=>{
const {
    currencyOptions, selectedCurrency, onChangeCurrency,
    ammount, changedAmmount
}=props;
    
return(
    <div>
        <input type="number" className="input" value={ammount} onChange={changedAmmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option=>(
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    </div>
)
}
export default CurrencyRow;