/**
 * Created by Daniel Reguero on 10/23/2016.
 */
function randomBanner(){
    var images = new Array("1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif");
    var imageNum = Math.floor(Math.random() * images.length);
    var baseUrl = document.location.origin;
    document.getElementById('banner-img').setAttribute('src', baseUrl+"/assets/img/board-titles/"+images[imageNum]);
}

window.onload = randomBanner();