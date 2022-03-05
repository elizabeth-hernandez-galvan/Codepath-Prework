//Global Variables
var pattern = [];
var patLen = 6;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.8;
var buttons = 6;

//Start
function startGame(){
  for (let i = 0; i < patLen; i++) pattern[i] = Math.round(Math.random()*buttons);
  let startingFreq = Math.random()*120+120;
  for (let i = 0; i < buttons; i++) freqMap[i+1] = startingFreq+30*i;
  progress = 0;
  clueHoldTime = 1000.0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
}

// Buttons
function lightButton(btn){
    document.getElementById("button"+btn).classList.add("lit")
  }
  function clearButton(btn){
    document.getElementById("button"+btn).classList.remove("lit")
  }
  
// Sound Synthesis Functions
const freqMap = {
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2
  }
  function playTone(btn,len){ 
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function(){
      stopTone()
    },len)
  }
  function startTone(btn){
    if(!tonePlaying){
      context.resume()
      o.frequency.value = freqMap[btn]
      g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
      context.resume()
      tonePlaying = true
    }
  }
  function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
  }
  
  // Page Initialization
  // Init Sound Synthesizer
  var AudioContext = window.AudioContext || window.webkitAudioContext 
  var context = new AudioContext()
  var o = context.createOscillator()
  var g = context.createGain()
  g.connect(context.destination)
  g.gain.setValueAtTime(0,context.currentTime)
  o.connect(g)
  o.start(0)