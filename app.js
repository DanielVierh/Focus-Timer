

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
var isMute = false;


// Set Mute
function muteSound() {
    if(isMute == false) {
        isMute = true;
        document.getElementById("btnMute").style.background = "red";
    }else{
        isMute = false;
        document.getElementById("btnMute").style.background = "grey";
    }
}


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
        calcApproxTime();
    }else{
        sound_Stop.play();
        time_is_running = false
        myStopFunction();
        document.getElementById('btn_Start').innerHTML = "Continue";
    }
})


// Reset
document.getElementById('btn_Reset').addEventListener('click',function(){

    const decision = window.confirm("Do you really want to reset?");
    if(decision) {
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
    }

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
    if(isMute == false) {
        sound_TikTak.play();
        sound_TikTak.volume = 0.3;
    }
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
        //calcApproxTime();

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
        document.getElementById('txt_CurrentLernTime').style.color = "red";
        document.getElementById('txt_Countdown').style.color = "red";
    }else{
        sec = 0;
    }
}

//Save Seconds, before the Window is closed
window.addEventListener("beforeunload", function(e){
    save_Seconds();
 }, false);

//=================================================================================================
 // Analoge Uhr
 function setTime() {

    var canvas = document.getElementById('clock');
    var context = canvas.getContext("2d");
    var clockRadius = canvas.width/2;

    // Hintergrund
    context.fillStyle = "black";
    context.beginPath();
    context.arc(clockRadius, clockRadius,clockRadius, 0, 2*Math.PI);
    context.fill();

    // Kleiner Kreis in der Mitte
    context.beginPath();
    context.arc(clockRadius, clockRadius,5, 0, 2*Math.PI);
    context.fill();
    context.fillStyle = "white";

    // Zeitmarke 12 mittig
    context.font = clockRadius / 7 + "px arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Datumsanzeige
    context.fillStyle = "green";
    var datum = new Date().getDate();
    context.fillText(datum, clockRadius + clockRadius * 0.5 * Math.sin(3 * 2*Math.PI/12),
    clockRadius - (clockRadius * 0.5 * Math.cos(3 * 2*Math.PI/12)));

    // 1 - 12 Uhr
    for(var i = 1; i <= 12; i++) {
        context.fillText(i, clockRadius + clockRadius * 0.8 * Math.sin(i * 2*Math.PI/12),
        clockRadius - (clockRadius * 0.8 * Math.cos(i * 2*Math.PI/12)));
    }

    // Minutenpunkte
    for(var i = 1; i <= 60; i++) {
        context.fillText(".", clockRadius + clockRadius * 0.9 * Math.sin(i * 2*Math.PI/60),
        clockRadius - (clockRadius * 0.9 * Math.cos(i * 2*Math.PI/60)));
    }

    // Uhrzeit
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    // Um einen guten Winkel zu erhalten für Stunden
    var fullHours = hours % 12 + minutes / 60 + seconds / 3600;
    var hourAngle = fullHours * 2 * Math.PI/ 12;
    var minuteAngle = minutes * 2 * Math.PI/ 60;
    var secondAngle = seconds * 2 * Math.PI/ 60;

    // Zeichnen  der Stunde
    context.strokeStyle = "white";
    context.moveTo(clockRadius, clockRadius);

    context.lineTo(clockRadius + clockRadius * 0.5 *
    Math.sin(hourAngle), clockRadius - (clockRadius * 0.5 *
    Math.cos(hourAngle)));

    context.lineWidth = 5;
    context.stroke();


    // Minuten Zeiger zeichnen
    context.moveTo(clockRadius, clockRadius);

    context.lineTo(clockRadius + clockRadius * 0.6 *
    Math.sin(minuteAngle), clockRadius - (clockRadius * 0.6 *
    Math.cos(minuteAngle)));

    context.lineWidth = 3;
    context.stroke();


    // Sekundenzeicher zeichnen
    context.strokeStyle = "red";
    context.moveTo(clockRadius, clockRadius);

    context.lineTo(clockRadius + clockRadius * 0.9 *
    Math.sin(secondAngle), clockRadius - (clockRadius * 0.9 *
    Math.cos(secondAngle)));

    context.lineWidth = 1;
    context.stroke();

}

setInterval(() => {
    setTime();
}, 1000);
