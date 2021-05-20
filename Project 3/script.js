
// Get dom elements for js code
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Create function to click on video
function toggleVideoStatus(){
    if(video.paused) {
        video.play();
    }
    else{
        video.pause();
    }
}

//Create function for updating play and pause icon
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
    else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
 }

//Create the function to update the progress 
function updateProgress() {
    progress.value = (video.currentTime / video.duration) *100
    //Set the time for timestamp
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    
    timestamp.innerHTML = `${mins}:${secs}`;
 }



//Create the function for stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
 }

//Create the function to update the video progress using slider
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) /100
 }

//Event Listener
// 1. Evernt Linstener for the video player
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress)

// 2. Event Listenr for play button
play.addEventListener('click', toggleVideoStatus);

// 3. Event Listener for stop button
stop.addEventListener('click', stopVideo);

// 4. Event listener for porgress bar
progress.addEventListener('change', setVideoProgress);

