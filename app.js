

// Var
var timer; // Variable for Function of upcounting Seconds
var countdownTimer;
var time_is_running = false;
var sec = 0; 
var currentCountdownSec = 900;
var sound_Play = new Audio('Assets/PlaySound.mp3');
var sound_Stop = new Audio('Assets/StopSound.mp3');
var sound_Countdown = new Audio('Assets/CountdownSound.mp3');
var sound_Reset = new Audio('Assets/ResetSound.mp3');
var sound_TikTak = new Audio('Assets/TicTac_Sound.mp3');
var approximate_Time_after_Countdown = "";

// Page load
document.addEventListener('DOMContentLoaded', function(){
    load_Seconds();
    secIntoTime();
});



// Start / Pause the Time
document.getElementById('btn_Start').addEventListener('click', function() {

    if(time_is_running == false) {
        sound_Play.play();
        time_is_running = true
        timer = setInterval(timeRunning,1000);
        countdownTimer = setInterval(countdown,1000);
        document.getElementById('btn_Start').innerHTML = "Pause";
    }else{
        sound_Stop.play();
        time_is_running = false
        myStopFunction();
        document.getElementById('btn_Start').innerHTML = "Continue";
    }
})


// Reset
document.getElementById('btn_Reset').addEventListener('click',function(){
    sound_Reset.play();
    document.getElementById('txt_Countdown').innerHTML = "00:15:00";
    document.getElementById('txt_Countdown').style = "Color:white";
    currentCountdownSec = 900;

    document.getElementById('txt_CurrentLernTime').innerHTML = "00:00:00";
    document.getElementById('txtSec').value = "0";
    document.getElementById('btn_Start').innerHTML = "Start";
    document.getElementById('txt_CurrentLernTime').style = "Color:white";
    sec = 0;
    calcApproxTime();
})


// Countdown Buttons
document.getElementById('btn_15Min').addEventListener('click',function(){
    document.getElementById('txt_Countdown').innerHTML = "00:15:00";
    currentCountdownSec = 900;
    calcApproxTime();
})

document.getElementById('btn_30Min').addEventListener('click',function(){
    document.getElementById('txt_Countdown').innerHTML = "00:30:00";
    currentCountdownSec = 1800;
    calcApproxTime();
})

document.getElementById('btn_45Min').addEventListener('click',function(){
    document.getElementById('txt_Countdown').innerHTML = "00:45:00";
    currentCountdownSec = 2700;
    calcApproxTime();
})

document.getElementById('btn_60Min').addEventListener('click',function(){
    document.getElementById('txt_Countdown').innerHTML = "01:00:00";
    currentCountdownSec = 3600;
    calcApproxTime();
})



function timeRunning() {
    var secFromTextbox = document.getElementById('txtSec').value;
    sec = parseInt(secFromTextbox);
    sec += 1;
    var date = new Date(null);
    date.setSeconds(sec); 
    var result = date.toISOString().substr(11, 8);
    // Tic Tac Sound
    sound_TikTak.play();
    sound_TikTak.volume = 0.3;
    // Display Time
    document.getElementById('txtSec').value = sec;
    document.getElementById('btn_Start').innerHTML = "Pause";
    document.getElementById('txt_CurrentLernTime').innerHTML = result;
    document.getElementById('txt_CurrentLernTime').style = "Color:white";
    document.title = "Focus Timer-RUNNING";
}



function countdown() {
    if(currentCountdownSec > 0) {
        currentCountdownSec -= 1;
        var date = new Date(null);        
        date.setSeconds(currentCountdownSec); 
        var result = date.toISOString().substr(11, 8);

        //  // Calc Time when Countdown expires
        calcApproxTime();

        // Display Countdown and  
        document.getElementById('txt_Countdown').innerHTML = result;
        document.getElementById('txt_Countdown').style = "Color:white";
    }else{
        // Display Countdown
        document.getElementById('txt_Countdown').innerHTML = "Expired";
        document.getElementById('txt_Countdown').style = "Color:yellow";
        document.getElementById('approxTime').innerHTML = "Countdown" ;
    }

    if(currentCountdownSec == 10){
        sound_Countdown.play();
    }

}

function calcApproxTime() {
             // Calc Time after Countdown
             var currentTime = new Date();
             currentTime.setSeconds(currentTime.getSeconds() + currentCountdownSec);
             var hrs = currentTime.getHours();
             var min = currentTime.getMinutes();
             approximate_Time_after_Countdown = hrs + ":" + min;
             // Display approx Time after Countdown expired
             document.getElementById('approxTime').innerHTML = "Countdown (approx Time: " + approximate_Time_after_Countdown + ")" ;
}

function secIntoTime(){
    var date = new Date(null);
    date.setSeconds(sec); 
    var result = date.toISOString().substr(11, 8);
    document.getElementById('txt_CurrentLernTime').innerHTML = result;
}

function myStopFunction() {
    clearInterval(timer);
    clearInterval(countdownTimer);
    document.getElementById('txt_CurrentLernTime').style = "Color:red";
    document.getElementById('txt_Countdown').style = "Color:red";
    sound_Countdown.pause();
    sound_TikTak.pause();
    document.title = "Focus Timer-PAUSED";
    save_Seconds();
  }



// =========================================================================================================================================
// LocalStorage
// =========================================================================================================================================

// Save
function save_Seconds() {
    localStorage.setItem('storedSeconds', sec);

}

// Load
function load_Seconds() {
    if(localStorage.getItem("storedSeconds") > 0) {
        sec = localStorage.getItem("storedSeconds");
        document.getElementById('txtSec').value = sec;
    }else{
        sec = 0;
    }
}

//Save Seconds, before the Window is closed 
window.addEventListener("beforeunload", function(e){
    save_Seconds();
 }, false);