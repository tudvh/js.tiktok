// var listIdVideo = new Array()
var listIdVideo =
    ['15KzKrG8R859Len0IfAv2Mnw99vJcLFb1', '1QKI7xpEzo4eO-UhuApZQ1cGi6dNFWOK9',
        '1bF4-njza7-UOdUp6mdGS6yp_tT5NcoF4', '10Nooc2YAcDEFyR2CKToBoiOyM3SLMY2J',
        '1wl1kOmZW0m4EH5tHzR2URH5l2iIcZ_T5', '1ygGLk5KZFbfsA__nruFV0ag1oJWu0ALO',
        '1SeDtEBoHgUnHnSrEkKlbWOwDPpOpHCj5', '1ioERH0Tr6Xk_jAUVc3y6wagOD2dMpq2B',
        '1A5ogG7RNyDPbwSYji4TqbyoRdVYXC7ZS', '1PJV_j97wf6Ec1Adstd-h5-ySrTxp_ETq',
        '17G7ruTVCgOg5ukcMYnJWe6KEwG58euTH']

// //get data from txt file and assign it to listIdVideo
// xml = new XMLHttpRequest();
// xml.onreadystatechange = function () {
//     if (xml.readyState == 4) {
//         if (xml.status === 200 || xml.status == 0) {
//             listIdVideo = xml.responseText.split("\r\n")
//         }
//     }
// }
// url = 'file.txt';
// xml.open("GET", url, "false");
// xml.send();


var mainDiv = document.getElementById('main')
mainDiv.innerHTML = ""
var runningVideo = 0
var scrollTimer = -1
var scrooling = true
var vid
var videoWaiting = 5
const scrHeight = document.documentElement.clientHeight

window.onload = function () {
    shuffle(listIdVideo)

    //load video
    for (let i = 0; i < listIdVideo.length; i++) {
        loadVideo(i)
    }

    scrollFinished()
}

//disable right click
document.oncontextmenu = function (e) {
    e.preventDefault()
}

//disable keydown space
document.onkeydown = function (e) {
    if (e.code == "Space") {
        e.preventDefault()
    }
}

document.onkeyup = function (e) {
    if (e.code == "Space") {
        playPauseVideo(runningVideo)
    } else if (e.code == "KeyF") {
        vid = document.getElementsByClassName('myVideo')
        vid[runningVideo].requestFullscreen()
    }
}

function loadVideo(num) {
    if (listIdVideo.length > num) {
        mainDiv.innerHTML += '<div class="videoBox"> '
            + '<video tabindex="-1" class="myVideo" id="myVideo' + num + '" '
            + 'data-no-fullscreen="true" '
            + 'controlslist="nodownload" loop controls '
            + 'src="https://drive.google.com/uc?export=adownlod&id=' + listIdVideo[num] + '" '
            + '</video> '
            + '</div> '
    }
}

function playPauseVideo(stt) {
    vid = document.getElementById('myVideo' + stt)
    if (vid.paused)
        vid.play()
    else
        vid.pause()
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}