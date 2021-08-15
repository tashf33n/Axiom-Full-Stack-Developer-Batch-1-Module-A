//Get the DOM Elements
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById('form');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Function to update class for success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Event Listeners
//Create event listener for submit button
form.addEventListener('submit', function(e){
        e.preventDefault();
        if(username.value === ''){
            showError(username ,'Username is required');
        }else{
            showSuccess(username);
        }    
    
        if(email.value === ''){
            showError(email ,'Email is required');
        }else{
            showSuccess(email);
        }    

        if(password.value === ''){
            showError(password ,'Password Required');
        }else if(password.value === password2.value){
            showSuccess(password);

        }else if(password.value !== password2.value){

            showError(password, 'Password Does not match');
        }    

        if(password2.value === ''){
            showError(password2 ,'Confirm Password Required');
        }else if(password.value === password2.value){
            showSuccess(password2);

         }else if(password.value !== password2.value){

            showError(password2, 'Password Does not match');
        }       
    });
