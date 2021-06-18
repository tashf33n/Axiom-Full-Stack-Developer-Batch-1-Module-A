//Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message')
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

//Get DOM Elements for Hangment
const figureParts = document.querySelectorAll('.figure-part');


//This is the pool of word which will be used to select a random words
const words = ["blind","differ","quickly","name","breakfast","tried",
"fuel","light","luck","beneath","parallel","troops",
"least","past","man","boat","couple","hundred",
"than","sang","sail","couple","willing","military",
"ball","what","lamp","spring","recently","night",
"reach","interest","student","cook","skill","beneath",
"fight","plain","off","topic","recently","horn" ];
// const words = ["bad", "no"]

// Select a word at random from words array

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);


//Tracking arrays for correct and incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

//Function to display the selected Word in the DOM
function displayWord(){
    //Display the selected word
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter : ''}
                </span>
                `

            )
            .join('')
        }
    `;

    //Replace new line character and form inner word
    const innerWord = word.innerText.replace(/\n/g, '');

    //Compare inner word to selected word, if it's the same then game over and user won 
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex';
    }
    
    
};

//Function to show the notification
function showNotification(){
    //Add class to show the notification container
    notification.classList.add('show');
    //After 2 seconds, hide the notification
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Funcion to update incorrect leters
function updateIncorrectLetters() {
    //Display the incorrect letters
    incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect letters</p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    //Display the hangman  part
    figureParts.forEach((part, index) => {
        //How many incorrect letters has the user guessed
        const errors = incorrectLettersArray.length;
        if(index < errors) {
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    })  
    
    //Check if user lost 
    if(incorrectLettersArray.length === figureParts.length){
        finalMessage.innerText = 'You Lost!'
        popup.style.display = 'flex';
    }
}

//Event Handlers
//1. Listen for keyboard key press
window.addEventListener('keydown', e => {
    
    //Check if key press is a letter a = 65 and z=90
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        //Check if letter is in the selected word
        if (selectedWord.includes(letter)){
            //Check if letter is already in correctLetters
        if(!correctLettersArray.includes(letter)){
                //Add letter into the correctLettersAray
                correctLettersArray.push(letter);
                //Run the displayWord funciton again to display new letter
                displayWord();
            }else{
             showNotification();   

            }   
        }else {
            //Check if letter is aready in incorrectLetter 
            if(!incorrectLettersArray.includes(letter)) {
            //Add letter into the incorrectLettersArray    
                incorrectLettersArray.push(letter);
                //Update the incorrect letters UI
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }   

    }

});

//2. Listen for click on play again button
playBtn.addEventListener('click', () => {
    //Empty correctLettersArray & incorrectLettersArray 
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    //Select the new random word
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    //Clear incorrect letter display
    updateIncorrectLetters();
    
    //Hide the popup
    popup.style.display = 'none';
    // Refresh displayed word
    displayWord();

})

//Execute displayWord on page load
displayWord();




