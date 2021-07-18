 //Get DOM Element
 const container = document.getElementById('container');
 const previousBtn = document.getElementById('previous');
 const playBtn = document.getElementById('play');
 const nextBtn = document.getElementById('next');
 const audio = document.getElementById('audio');
 const progress = document.getElementById('progress');
 const progressBar = document.getElementById('progress-bar');
 const title = document.getElementById('song-title');
 const albumArt = document.getElementById('album-art');
 const volume = document.getElementById('volume');


//Tracks Array
const tracks = ['Ertugul', 'National Anthem'];

//Index of currently playing song

let trackIndex = 1;

//Load the initial track
loadTrack(tracks[trackIndex]);

//Function to load the selected track
function loadTrack(track){
    //Update the text for the title of track
    title.innerText = track;
    //Update the src in the audio elemenet with the audio file of the selected track
    audio.src = `music/${track}.mp3`
    //Upadate the src in the img elemenet with the image file of the selected track
    albumArt.src = `images/${track}.png`
};

//Function for playing the track
function playTrack(){
    //Add the second class 'play' to the container
    container.classList.add('play');
    //Remove the play icon and display the pause icon instead
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
    //Play the track using the audio element
    audio.play();
     
};

//Function to pause the track 
function pauseTrack(){
    //Remove the second class 'play' from the container
    container.classList.remove('play');
    //Remove the pasue icon and display the play icon instead
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    //Pause the track using the audio elemenet
    audio.pause();
}

//Function to switch to previous track
function prevTrack(){
    //Decrement the value of trackIndex by 1 to move to select the previous track
    trackIndex--;
    //Check if selsected track index is less then 0
    if (trackIndex < 0){
        trackIndex = tracks.length - 1;
    };
    // Update in DOM
    loadTrack(tracks[trackIndex]);

    playTrack()
};
//Function to switch to next track
function nextTrack(){
    //Increment the value of trackIndex by 1 to move to select the previous track
    trackIndex++;
    //Check if selsected track index is less then 0
    if (trackIndex > tracks.length - 1){
        trackIndex = 0;
    };
    // Update in DOM
    loadTrack(tracks[trackIndex]);

    playTrack()
};

//Function to update the progress bar
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = currentTime / duration  * 100;
    //Reassign width of progress bar using the progressPercentage
    progressBar.style.width = `${progressPercentage}%`;

}

function setProgress(e){
    //Get the overall width in px for progress bar container
    const width = this.clientWidth;
    //Get the x axis px value for the location of click on the progress bar container    
    const clickLocation = e.offsetX;
      //Get the total duration of the track
    const duration = audio.duration;
    //====================================
    //Get the volume of the audio
    const volumeOfTrack = audio.volume;
    // console.log(volumeOfTrack);
    
    //=====================================
    //Reassign the currentTime of audio track by calculating based on above metrics
    audio.currentTime = clickLocation / width * duration;
}

//Event Listeners 
//1. Listen for click on the play button
playBtn.addEventListener('click', () => {
    //Check if track is playing 
    const isPlaying = container.classList.contains('play');
    //Conditional statnebt based on status of audio player
    if (isPlaying) {
        //If the track is playing, pause the track
        pauseTrack();
    }else{
        //If the track is not playing, play the track
        playTrack();
    }
})

//2. Listen for click on previous button
previousBtn.addEventListener('click', prevTrack);

//2. Listen for click on next button
nextBtn.addEventListener('click', nextTrack);

//3. Listen for click on audio element
audio.addEventListener('timeupdate', updateProgress);

//4. Listen for click on progress container
progress.addEventListener('click', setProgress);

//5. Listen for end of playback for current track
audio.addEventListener('ended', nextTrack);

//6. Listen for managing volume
volume.addEventListener('click', (e)=>{
    console.log('The volume change');
    
})