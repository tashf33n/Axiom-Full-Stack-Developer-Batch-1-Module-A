//Getting DOM Elements
const selectCountry = document.getElementById('country-selector');
const allCurrency = document.getElementById('all-currency');
const currencyRate = document.getElementById('currencyprimeone');

//Fetching data from API
function getAllCurrency(){
    const currencySelectedRate = selectCountry.value
    fetch(`https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${currencySelectedRate}`)
    .then(res => res.json())
    .then( data => {
        console.log(data);
        
    })
}