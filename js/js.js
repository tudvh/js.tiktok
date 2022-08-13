//959 la bat dau thang 9
var listIdVideo = new Array()

//get data from txt file and assign it to listIdVideo
xml = new XMLHttpRequest();
xml.onreadystatechange = function () {
    if (xml.readyState == 4) {
        if (xml.status === 200 || xml.status == 0) {
            listIdVideo = xml.responseText.split("\r\n")
        }
    }
}
url = 'file.txt';
xml.open("GET", url, "false");
xml.send();


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

    setTimeout(function () {
        //load video
        for (let i = 0; i < videoWaiting; i++) {
            loadVideo(i)
        }

        scrollFinished()

        //set size video box
        setSizeVideo()

        //ads
        ads = document.getElementsByTagName('div')
        ads[ads.length - 2].removeAttribute('style')
        ads[ads.length - 2].classList.add('hidden')
    }, 1000)
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

function setSizeVideo() {
    vid = document.getElementsByClassName('videoBox')
    vidHeight = vid[0].offsetHeight
    vidWidth = vidHeight * 1080 / 1918

    for (let j = 0; j < vid.length; j++) {
        vid[j].style.width = vidWidth + 'px'
    }
}

function loadVideo(num) {
    if (listIdVideo.length > num) {
        mainDiv.innerHTML += '<div class="flex"> '
            + '<div class="videoBox"> '
            + '<video tabindex="-1" class="myVideo" id="myVideo' + num + '" '
            + 'data-no-fullscreen="true" '
            + 'controlslist="nodownload" loop controls '
            + 'src="https://drive.google.com/uc?export=adownlod&id=' + listIdVideo[num] + '"> '
            + '</video> '
            + '</div> '
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