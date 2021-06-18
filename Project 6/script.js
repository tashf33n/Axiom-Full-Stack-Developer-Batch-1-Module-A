//Get DOM Element
const menuToggole = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//Event Listeners
// 1. Listen to click on toggle button
menuToggole.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
})

//2. Listen on click of open button
open.addEventListener('click', () => modal.classList.add('show-modal'));

//3. Listen on click of close button
close.addEventListener('click', () => modal.classList.remove('show-modal'));

//4. Listen on click outside of mdoal
window.addEventListener('click', e => {
    e.target === modal ? modal.classList.remove('show-modal') : false
});