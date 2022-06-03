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
var runningVideo = -1
var scrollTimer = -1
var scrooling = true
var vid
var videoWaiting = 5

window.onload = function () {
    listIdVideo = shuffle(listIdVideo)

    //load video
    for (let i = 0; i <= videoWaiting; i++) {
        loadVideo(i)
    }

    //set position at the top of the page
    document.body.scrollTop = 1
    document.documentElement.scrollTop = 1
    // window.scrollTo(0, 1);

    //hehe
    document.getElementsByClassName('disclaimer')[0].style.display = 'none'
}

document.onscroll = function () {
    if (!scrooling) {

        scrooling = true
        scrTop = document.documentElement.scrollTop
        scrHeight = document.documentElement.clientHeight
        vid = document.getElementsByClassName('myVideo')

        if (runningVideo >= 0) {
            vid[runningVideo].pause()
            vidTop = vid[runningVideo].offsetTop

            if (scrTop > (vidTop - 100 - scrHeight * 0.05)) {
                if (runningVideo < vid.length - 1) {
                    runningVideo += 1
                }

                //load new video
                if (vid.length - runningVideo <= videoWaiting) {
                    loadVideo(vid.length)
                }

            } else if (scrTop < (vidTop - 100 - scrHeight * 0.05)) {
                runningVideo -= 1
            }
            vidTopNext = vid[runningVideo].offsetTop

            window.scrollTo(0, vidTopNext - 100 - scrHeight * 0.05);
            // document.documentElement.scrollTop = vidTop - 100 - scrHeight * 0.05
            // document.body.scrollTop = vidTop - 100 - scrHeight * 0.05
        }

        console.clear()
        console.log(runningVideo)
    }

    if (scrollTimer != -1) {
        clearTimeout(scrollTimer)
    }

    scrollTimer = setTimeout(scrollFinished, 40);
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

function scrollFinished() {
    vid = document.getElementsByClassName('myVideo')
    scrooling = false
    if (runningVideo == -1) {
        runningVideo += 1
    }
    //play video
    if (runningVideo < vid.length - 1) {
        vid[runningVideo].currentTime = 0;
    }
    vid[runningVideo].play()
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