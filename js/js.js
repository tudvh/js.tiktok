var listIdVideo = []
xml = new XMLHttpRequest();
xml.onreadystatechange = function () {
    if (xml.readyState == 4) {
        if (xml.status === 200 || xml.status == 0) {
            listIdVideo = xml.responseText.split("\r\n")
        }
    }
}
url = '../file.txt';
xml.open("GET", url, "false");
xml.send();


var mainDiv = document.getElementById('main')
mainDiv.innerHTML = ""
var runningVideo = -1
var scrollTimer = -1
var scrooling = true
var vid

window.onload = function () {
    listIdVideo = shuffle(listIdVideo)

    loadVideo(listIdVideo, 0)
    loadVideo(listIdVideo, 1)
    loadVideo(listIdVideo, 2)
    loadVideo(listIdVideo, 3)
    loadVideo(listIdVideo, 4)
    loadVideo(listIdVideo, 5)
    loadVideo(listIdVideo, 6)
    loadVideo(listIdVideo, 7)
    loadVideo(listIdVideo, 8)
    loadVideo(listIdVideo, 9)
    loadVideo(listIdVideo, 10)

    //set position at the top of the page
    document.body.scrollTop = 1
    document.documentElement.scrollTop = 1
    // window.scrollTo(0, 1);
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
}, false);

document.onscroll = function () {
    console.clear()

    if (!scrooling) {

        scrooling = true
        scrTop = document.documentElement.scrollTop
        scrHeight = document.documentElement.clientHeight
        vid = document.getElementsByClassName('myVideo')

        if (runningVideo >= 0) {
            vid[runningVideo].pause()
            vidTop = vid[runningVideo].offsetTop

            if (scrTop > (vidTop - 100 - scrHeight * 0.05)) {
                runningVideo += 1
            } else if (scrTop < (vidTop - 100 - scrHeight * 0.05)) {
                runningVideo -= 1
            }
            vidTopNext = vid[runningVideo].offsetTop

            window.scrollTo(0, vidTopNext - 100 - scrHeight * 0.05);
            // document.documentElement.scrollTop = vidTop - 100 - scrHeight * 0.05
            // document.body.scrollTop = vidTop - 100 - scrHeight * 0.05
        }
    }

    if (scrollTimer != -1) {
        clearTimeout(scrollTimer)
    }

    scrollTimer = setTimeout(scrollFinished, 50);
}

function scrollFinished() {
    scrooling = false
    if (runningVideo == -1) {
        runningVideo += 1
    }

    vid[runningVideo].play()
}

function loadVideo(list, num) {
    if (list.length > num) {
        mainDiv.innerHTML += '<div class="videoBox"> '
            + '<video tabindex="-1" class="myVideo" id="myVideo' + num + '" '
            + 'onclick="playPauseVideo(' + num + ')" data-no-fullscreen="true" '
            + 'controlslist="nodownload" loop '
            + 'src="https://drive.google.com/uc?export=adownlod&id=' + list[num] + '" '
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