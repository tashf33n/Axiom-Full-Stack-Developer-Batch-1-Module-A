//Get DOM Element
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

//Temporary array of transactions - to be replaced with local storage
const Transactions = [
    // { id: 1, reason: 'Salary', amount: 5000 },
    // { id: 2, reason: 'Breakfast', amount: -20 },
    // { id: 3, reason: 'Lunch', amount: -30 },
    // { id: 4, reason: 'Dinner', amount: -60 },
];

//Get transaction data from storage
let transactions = Transactions;



//Function to display tranasctio in DOM - History section
function displayTransaction(transaction){
    //Calculate if transaction is Credit of Debit
    const type = transaction.amount > 0 ? '+' : '-' ;
    //Create a list item for the transaction
    const transactionLI = document.createElement('li');
    //Determine class based on transaction type. If positive then cerdit otherwise, debit.
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    //Assign the inner HTML form th transaction li
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${type}${transaction.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
        `;
    //Add the li in the DOM under the transaction history list
    list.appendChild(transactionLI);

};

//Function to update all balance 
function updateBalance(){
     //Create a new array with just the amount from the transactions
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    
    //Calculate balance values
    const totalBalance = transactionAmounts.reduce( (acc, amount) => (acc += amount), 0 );
    const creditAmount = transactionAmounts
    .filter(amount => amount > 0)
    .reduce( (acc, amount) => (acc += amount), 0 );
    
    
    //Calculate total Debit Balance
    const debitAmount = transactionAmounts
                    .filter(amount => amount < 0)
                    .reduce( (acc, amount) => (acc += amount), 0 );
    
    //Update Balance in the DOM for overall balance credit and debit balance
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditAmount}`;
    moneyDebit.innerText = `$${debitAmount}`;
          
};


//Function to create a random ID
function createID(){
    return Math.floor(Math.random()*10000000000000000);
}

//Function to add a transaction from the form
function addTransaction(e){
        

    //Stop the page reload
        e.preventDefault();
        if(reason.value.trim() === '' || amount.value.trim() === '')  {
            //Display eror message if form is not completed
            alert('Please provide a valid reason and trasaction amount.');
        } else {
            //Create an object for the transaction containing id, 
            //text for the reason and transaction amount
            
            const transaction = {
                
                id: createID(),
                reason: reason.value,
                amount: +amount.value
            }
            //Push the new transaciton into the transaction array
            transactions.push(transaction);
            //Display the new transaciton in the DOM
            displayTransaction(transaction);
            //Update all balance 
            updateBalance(transaction);
            //Clear form fields
            reason.value = '';
            amount.value = '';
        }        
};

//Function to delete the transaction from the history
function deleteTransaction(id){
    //Filter out the transaction with the provided id
    transactions  = transactions.filter( transaction => transaction.id !== id);
    //Initialize the DOM 
    init()
}


// Function to Initialize the Application
function init(){
    //  Clear All Transaction history
    list.innerHTML = '';
    //Display all transaction in db in the DOM
    transactions.forEach(displayTransaction);     
    //Update all balance values
    updateBalance();
};

//Event listener 
//1. Add Transaction
    form.addEventListener('submit', addTransaction);
//2. Remove Transaction
    form.addEventListener('submit', addTransaction);


// Initialize the Application
init();

