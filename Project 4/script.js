


// function calculate(){
//     fetch('items.json')
//     .then(res => res.json())
//     .then(data => document.body.innerHTML = data[0].text);
    
// }
// calculate(); 

// Get DOM Element
const currencyOne = document.getElementById('currency-one');
// const currencyDisplay = document.getElementById('currency-display');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch Exchange Rates amd Update the DOM
function calculate(){
    //Get the curerncy code for currency one and two
    const currencyOneCode = currencyOne.value;    
    const currencyTwoCode = currencyTwo.value;    
    //Send requets to ExchangeRate-API for conversion rates for currency one
    fetch(`https://v6.exchangerate-api.com/v6/8789a5988e67403a86c6e093/pair/${currencyOneCode}/${currencyTwoCode}`)

    .then(res =>res.json())
    .then(data =>  {
    
    //Get the conversion rate from currency One to currency two
    const conversionRate = data.conversion_rate;
    //Update the DOM to display the conversion rate
    rate.innerText = `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;
    
    //Update the Currency Two Amount
    amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate)
    .toFixed(2);
    }
    );
    
};
// function calculate(){
//     //Get the curerncy code for currency one and two
//     const currencyDisplayCode = currencyDisplay.value;       
//     //Send requets to ExchangeRate-API for conversion rates for currency one  
//     fetch(`https://v6.exchangerate-api.com/v6/8789a5988e67403a86c6e093/latest/${currencyDisplayCode}`)

//     .then(res =>res.json())
//     .then(data =>  {
    
//     //Get the conversion rate from currency One to currency two
//     const conversionRate = data.conversion_rate;
//     //Update the DOM to display the conversion rate
//     rate.innerText = `1 ${currencyDisplayCode} = ${conversionRate}`;
//     //Update the Currency Two Amount
//     amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate)
//     .toFixed(2);
//     }
//     );
    
// };


//Event Listener
//Recalculate exchange rate when currency 1 change
currencyOne.addEventListener('change', calculate);

//Recalculate exchange rate when currency 1 amount  change
amountCurrencyOne.addEventListener('input', calculate);

//Recalculate exchange rate when currency 2 change
currencyTwo.addEventListener('change', calculate);

//Recalculate exchange rate when currency 2 amount  change
amountCurrencyTwo.addEventListener('input', calculate);

//Swap the currency with each other
swap.addEventListener('click', () => {
    //Save Value of Currency One Code to temp variable
    const temp = currencyOne.value;
    //Copy currency two code to currency one
    currencyOne.value = currencyTwo.value
    //Copy currency one code from temp variable to currency two
    currencyTwo.value = temp;
    //Recalculate exchange rate after swap
    calculate();
    //=================================1.05.06
})

//Execute calculate funciton on page load
calculate();

