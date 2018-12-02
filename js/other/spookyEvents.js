const spookyEvents = [distortTitle, printSpookyTextToLog, openSpookyWindow, readSpookyText, openSpookyAlert, makeSpookyTitle, spookyBackground, playSpookySound];

function startRandomSpookyEvent(){
    spookyEvents[getRndInteger(0, spookyEvents.length)]();
}

function distortTitle(){
    var title = document.getElementById("title");
    var previousText = title.textContent;

    title.textContent = randomSpooky(true);
    setTimeout(function(){title.textContent = previousText}, 3000);
}

function printSpookyTextToLog(){
    printLog(randomSpooky(false));
}

function openSpookyWindow(){
    var win = window.open("", randomSpooky(false), "width=400,height=300");
    var id = setInterval(function(){win.moveBy(1, 1);}, 10)
    
    setTimeout(function(){clearInterval(id); win.close()}, 5000);

    win.document.write(randomSpooky(true)); 
}

function readSpookyText(){
    var voice = window.speechSynthesis.getVoices().filter(function(voice){return voice.voiceURI.includes("English")})[0];
    var utr = new SpeechSynthesisUtterance(randomSpooky(false));
    utr.voice = voice;
    window.speechSynthesis.speak(utr);
}

function openSpookyAlert() {
    alert(randomSpooky(true));
}

function makeSpookyTitle(){
    var titles = document.getElementsByTagName("h2");
    var indx = getRndInteger(0, titles.length);
    var title = titles[indx];
    var spookyT = randomSpooky(true);
    var currTIndx = 0;
    var startingStr = title.textContent;
    title.textContent = "";
    var id = setInterval(function(){
        title.textContent += spookyT[currTIndx++];
        if(currTIndx > spookyT.length - 1){
            setTimeout(function(){
                title.textContent = startingStr;
            }, 3000);
            clearInterval(id);
        }
    }, 300);
}

function spookyBackground(){
    var defaultBackground = "white";
    var defaultFont = "black";
    document.body.style.color = "white";
    var id = setInterval(flipBackgroundColors, 100);
    setTimeout(function(){clearTimeout(id); document.body.style.backgroundColor = defaultBackground; document.body.style.color = defaultFont;}, 2000);

}

function playSpookySound(){
    var audio = new Audio(randomSpookySound());
    spookyBackground();
    audio.play();
}