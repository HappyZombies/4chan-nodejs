/**
 * Created by Daniel Reguero on 10/23/2016.
 */
var toggle_form_button = document.getElementById("post-form-toggle");
var post_thread_form = document.getElementById("post-thread-form")
function randomBanner(){
    //lol lazy
    var images = new Array("1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif");
    var imageNum = Math.floor(Math.random() * images.length);
    var baseUrl = document.location.origin;
    document.getElementById('banner-img').setAttribute('src', baseUrl+"/assets/img/board-titles/"+images[imageNum]);
}

window.onload = randomBanner();

toggle_form_button.addEventListener('click', function(e){
    e.preventDefault();
    post_thread_form.style.display = "block";
    toggle_form_button.style.display = "none"; //why does 4chan hide their toggle ?
}, false);