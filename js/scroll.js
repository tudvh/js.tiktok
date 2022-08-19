function scrollFinished() {
    vid = document.getElementsByClassName('myVideo')

    //play video
    if (runningVideo < vid.length && runningVideo >= 0) {
        vidTop = vid[runningVideo].offsetTop

        window.scrollTo(0, vidTop - 80 - scrHeight * 0.05)

        vid[runningVideo].currentTime = 0
        vid[runningVideo].play()
    }

    setTimeout(function () {
        scrooling = false

        //load new video
        if (runningVideo > vid.length - 5) {
            console.log('aa: ' + (vid.length - 5))
            for (let i = vid.length; i <= runningVideo + videoWaiting; i++) {
                loadVideo(i)
            }
        }

        //show the currently playing video and the total video to the console
        // console.clear()
        console.log('running: ' + (runningVideo))
        console.log('total: ' + vid.length)
    }, 500)
}

function scrollDown() {
    vid = document.getElementsByClassName('myVideo')

    //get current video playing
    runningVideo = runningVideo > 0 ? runningVideo : 0

    //stop current video
    if (runningVideo < vid.length - 1) {
        vid[runningVideo].pause()
    }

    runningVideo += 1

    if (scrollTimer != -1) {
        clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(scrollFinished, 50);
}

function scrollUp() {
    vid = document.getElementsByClassName('myVideo')

    //get current video playing
    runningVideo = runningVideo < vid.length - 1 ? runningVideo : vid.length - 1

    //stop current video
    if (runningVideo > 0) {
        vid[runningVideo].pause()
    }

    runningVideo -= 1

    if (scrollTimer != -1) {
        clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(scrollFinished, 50);
}

function preventDefault(e) {
    if (!scrooling) {
        if (e.deltaY > 0 || e.keyCode == 40) {
            scrooling = true
            e.preventDefault();
            scrollDown()
        } else if (e.deltaY < 0 || e.keyCode == 38) {
            scrooling = true
            e.preventDefault();
            scrollUp()
        }
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

//catch events scroll
window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
// window.addEventListener('touchmove', scrollMobile, wheelOpt); // mobile
window.addEventListener('keydown', preventDefault, false);

var touchStartY = 0
var touchEndY = 0
window.ontouchstart = function (e) {
    touchStartY = e.touches[0].pageY
}
window.ontouchend = function (e) {
    touchEndY = e.changedTouches[0].pageY

    if (touchStartY > touchEndY) {
        scrollDown()
    } else if (touchStartY < touchEndY) {
        scrollUp()
    }

    touchStartY = 0
    touchEndY = 0
}