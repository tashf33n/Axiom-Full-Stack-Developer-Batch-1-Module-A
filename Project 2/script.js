
// Get DOM Elements

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

function updateSelectedCount(){
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat));
    const selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount; 
    total.innerText = selectedSeatCount * ticketPrice;
    localStorage.setItem('selectedSeat', JSON.stringify(seatsIndex))
    
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}

// Get data from localStorge and populateUI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !==null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    
}

// EventListener
// 1. Event listener for container to check for click on seat
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
    )
    {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

// 2. Event listener for movie selector
movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        
        updateSelectedCount();
})
