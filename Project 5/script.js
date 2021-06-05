// Get DOM Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

//Initialize user data array
let data = [];


//Fetch random user from randomuser.me API

async function getRandomUser(){
    //Wait for the results form API
    const res = await fetch('https://randomuser.me/api/');
    // Wait for response to convert into json
    const data = await res.json();
    // console.log(data);

    //Get user data
    const user = data.results[0];
    //console.log(user);

    // Create a new user
    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*100000)
    }
    //console.log(newUser);
    
    //Add new user into the data array
    addData(newUser);
   
};

//Function to add suer data into into user data array

    
function addData(newUser){
    //Add the new user into the data array
    data.push(newUser);
    //console.log(data);
    
    //Update the DOM to display users in the data array
    updateDOM()
}

//Function to double money of all users
function doubleMoney(){
    
    //Loop through all users in the user data array 
    //For each user return the user data
    //Overwrite the data array with the new data array created by map
    data = data.map(user => {
        return {...user, balance: user.balance * 2}
    });
    
    
    //Update the dom using the existing data
    updateDOM();
}

//Function to Filter only Millionare Users 
function filterUsers(){
    //Filter out all users whose balance is less then million
    data = data.filter(user => user.balance >= 1000000);
    
    
    //Update the DOM with new user data
    updateDOM(); 
}

function sortByBalance(){
    //Sort data by compare function
    data = data.sort((a,b) => a.balance - b.balance); 

    //Update the DOM with new user data
    updateDOM();
}

//Function to sum all user to total balance
function totalBalance(){
    //Add up all balance from all users 
    //Accumulator starts at 0 and add the balance of user from each iteration
    const balance = data.reduce((acc, user) => (acc += user.balance), 0);
    //Create a div for the balance 
    const balanceElement = document.createElement('div');
    //Set the innerHTML for new div
    balanceElement.innerHTML = `<h3>Total Balance:${formatNumberToDollar(balance)}</h3>`;
    //Append balance in main element
    main.appendChild(balanceElement);
    
}


//Function to format number as money
function formatNumberToDollar(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Update the UI with data from the user data array
function updateDOM(userData = data){
    //Clear previous UI
    main.innerHTML = '<h2><strong>User</strong> Wealth</h2>'
    //Loop though user data and render in the UI
    userData.forEach(user => {
        //Create a new div element for the user
        const userDiv = document.createElement('div');
        //Apply the user class to the new div
        userDiv.classList.add('user');
        //Add innter html to the user div
        userDiv.innerHTML = `<strong>${user.name}</strong> 
                            ${formatNumberToDollar(user.balance)}`
        //Add the new element into the DOM
        main.appendChild(userDiv);
        
    })
}

//Event listener
//1. Listen for click on Add user button
addUserBtn.addEventListener('click', getRandomUser);
//2. Listen for click on Double money button
doubleBtn.addEventListener('click', doubleMoney);
//3. Listen for click on Double money button
filterBtn.addEventListener('click', filterUsers);
// 4. Listen for click on Sort button
sortBtn.addEventListener('click', sortByBalance);
// 4. Listen for click on Sum button
sumBtn.addEventListener('click', totalBalance);

//Create Random user
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();



