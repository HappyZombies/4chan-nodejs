/**
 * Created by Daniel on 10/22/2016.
 */
'use strict';

//set some variables
var closeButton = document.getElementById("close-button");
var acceptDisclaimer = document.getElementById("accept-disclaimer");
var closeButton_disclaimer = document.getElementById("close-button-disclaimer");

//user clicks the close button on the welcome to 4chan
closeButton.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("announcement").style.display = "none";
}, false);

//user clicked on a board, show disclaimer before entering site.
function showDisclaimer(e){
    e.preventDefault();
    acceptDisclaimer.setAttribute("data-url", e.srcElement.href);
    document.getElementById("back-drop").style.display = "block";
    document.getElementById("disclaimer-dialog").style.display = "block";
}

//the close button for the disclaimer.
closeButton_disclaimer.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("back-drop").style.display = "none";
    document.getElementById("disclaimer-dialog").style.display = "none";
}, false);

//the cancel button for the disclaimer.
function exitDisclaimer(){
    document.getElementById("back-drop").style.display = "none";
    document.getElementById("disclaimer-dialog").style.display = "none";
}

//the accept button for the disclaimer.
acceptDisclaimer.addEventListener('click', function (e) {
    window.location = (acceptDisclaimer.getAttribute("data-url"));
});