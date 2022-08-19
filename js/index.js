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
url = 'file.txt'
xml.open("GET", url, "false");
xml.send();


var mainDiv = document.getElementById('main')
mainDiv.innerHTML = ""
var runningVideo = 0
var scrollTimer = -1
var scrooling = true
var vid
var videoWaiting = 10
const scrHeight = document.documentElement.clientHeight

window.onload = function () {
    shuffle(listIdVideo)

    //load video
    for (let i = 0; i < videoWaiting; i++) {
        loadVideo(i)
    }

    scrollFinished()

    //scroll to 0
    window.scrollTo(0, 1)

    //ads
    ads = document.getElementsByTagName('div')
    ads[ads.length - 2].removeAttribute('style')
    ads[ads.length - 2].classList.add('hidden')
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

function setSizeVideo(num) {
    vid = document.getElementsByClassName('videoBox')

    vidHeight = vid[0].offsetHeight
    vidWidth = vidHeight * 1080 / 1918

    vid[num].style.width = vidWidth + 'px'
}

function loadVideo(num) {
    if (listIdVideo.length > num) {
        //create video tag
        let newVid = document.createElement('video')
        newVid.setAttribute('tabindex', '-1')
        newVid.setAttribute('class', 'myVideo')
        newVid.setAttribute('id', 'myVideo' + num)
        newVid.setAttribute('controlslist', 'nodownload')
        newVid.setAttribute('loop', 'true')
        newVid.setAttribute('controls', 'true')
        newVid.setAttribute('src', 'https://drive.google.com/uc?export=adownlod&id=' + listIdVideo[num])

        //create div.videoBox tag
        let vidBox = document.createElement('div')
        vidBox.setAttribute('class', 'videoBox')
        vidBox.appendChild(newVid)

        //create div outermost
        let myDiv = document.createElement('div')
        myDiv.setAttribute('class', 'flex')
        myDiv.appendChild(vidBox)

        //append to #main
        mainDiv.appendChild(myDiv)

        setSizeVideo(num)
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