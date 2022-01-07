let bars;
let bars2;
let numberOfBars = 10;
let maxValue = 20;
let animation = document.getElementById('Animation')
const randomArray = [];
const randomArray2 = [];
let barCounter = 0;
let barCounter2 = 0;
let lastIndex = 10;
let lastIndex2 = 10;
let thisBar, nextBar = 0;
let tlAnimation = gsap.timeline()
let tlPractice = gsap.timeline();
let tlStart = gsap.timeline();
let thisDiv, nextDiv = null;
let BubblePractice = document.getElementById("BubblePractice");
let choice = 0;

window.addEventListener('DOMContentLoaded', () => {
  init();
})

let btnNext = document.getElementById("nextStep");
btnNext.addEventListener("click", function(){
  if (!tlAnimation.isActive() && !tlStart.isActive() &&!tlPractice.isActive()){
    decide(animation);
  }
});

let btnPlay = document.getElementById("autoplay");
btnPlay.addEventListener("click", function (){
  if (!tlAnimation.isActive() && !tlStart.isActive() && !tlPractice.isActive()){
    tlAnimation
        .call(decide (animation))
        .eventCallback("onComplete", decide, [animation])
        .timeScale(4);
  }
})

let btnSwap = document.getElementById("btnSwap");
btnSwap.addEventListener("click", function () {
  if (!tlAnimation.isActive() && !tlStart.isActive() && !tlPractice.isActive()){
    choice = 1;
    if (check(BubblePractice)){
      if (barCounter2 === 0){
        tlPractice.call(highlightBars,[bars2[barCounter2], bars2[barCounter2+1]]);
      }else{
        tlPractice.call(highlightBars,[bars2[barCounter2-1], bars2[barCounter2+1]]);
      }
    }
  }
})

let btnDontSwap = document.getElementById("btnDontSwap");
btnDontSwap.addEventListener("click", function () {
  if (!tlAnimation.isActive() && !tlStart.isActive() && !tlPractice.isActive()) {
    choice = 2;
    if(check(BubblePractice)){
      tlPractice.call(highlightBars,[bars2[barCounter2], bars2[barCounter2+1]]);
    }
  }
})

/*
let btnReload1 = document.getElementById("btnReload1");
btnReload1.addEventListener("click",function(){
  window.location.reload();
})
let btnReload2 = document.getElementById("btnReload2");
btnReload2.addEventListener("click",function(){
  window.location.reload();
})

 */

function init(){
  drawRandomBars(animation);
  tlStart.from(".bar", {stagger: 0.2, y:-50,ease: "bounce.out" });
  drawRandomBars2(BubblePractice);
}

function drawRandomBars(area){
  if (window.innerWidth < 960) {
    numberOfBars = 8;
    lastIndex = numberOfBars-2;
  } else{
    lastIndex = numberOfBars-2;
  }
  for (let i = 0; i < numberOfBars; i++) {
    let random = Math.floor(( Math.random() * maxValue) +1 )
    randomArray.push (random);
    let node = document.createElement("div");
    let height = random * 100 /maxValue;
    node.innerText = random;
    node.setAttribute("class", "bar");
    node.setAttribute("data-value", random);
    node.setAttribute ("style", "height: "+height+"%;");
    area.appendChild(node);
  }
}
function drawRandomBars2(area){
  if (window.innerWidth < 960) {
    numberOfBars = 8;
    lastIndex2 = numberOfBars-2;
  } else{
    lastIndex2 = numberOfBars-2;
  }
  for (let i = 0; i < numberOfBars; i++) {
    let random = Math.floor(( Math.random() * maxValue) +1 )
    randomArray2.push (random);
    let node = document.createElement("div");
    let height = random * 100 /maxValue;
    node.innerText = random;
    node.setAttribute("class", "bar");
    node.setAttribute("data-value", random);
    node.setAttribute ("style", "height: "+height+"%;");
    if (i < 2){
      node.style.backgroundColor = "#FEA82F";
    }
    area.appendChild(node);
  }
}

function swapBars(node1, node2){
  const parent = node1.parentNode;
  const oldNode = parent.removeChild(node1);
  node2.after(oldNode);
}

function decide(area) {
  bars = area.querySelectorAll('.bar');
  thisBar = randomArray[barCounter];
  nextBar = randomArray[barCounter + 1];
  thisDiv = bars[barCounter];
  nextDiv = bars[barCounter + 1];
  if (lastIndex === 0) {
    tlAnimation.pause();
  }
  if (thisBar > nextBar) {
    const temp = randomArray[barCounter]
    randomArray[barCounter] = randomArray[barCounter + 1]
    randomArray[barCounter + 1] = temp
    tlAnimation
        .to(nextDiv, {backgroundColor: '#FEA82F'})
        .to(thisDiv, {backgroundColor: '#FEA82F'}, "<")
        .to(nextDiv, {scale: 0, transformOrigin: "bottom center", duration: 0.5, ease: "circ.out"}, ">1")
        .to(thisDiv, {scale: 0, transformOrigin: "bottom center", duration: 0.8, ease: "circ.out"}, '<')
        .call(swapBars, [thisDiv, nextDiv], ">0.5")
        .to(nextDiv, {duration: 0.5,scale: 1,transformOrigin: "bottom center",backgroundColor: "",ease: "circ.out"}, ">")
        .to(thisDiv, { duration: 0.5,scale: 1,transformOrigin: "bottom center",backgroundColor: "",ease: "circ.out"}, "<")
  } else {
    tlAnimation
        .to(thisDiv, {backgroundColor: '#FEA82F'})
        .to(nextDiv, {backgroundColor: '#FEA82F'}, "<")
        .set(thisDiv, {backgroundColor: ''}, ">1")
        .set(nextDiv, {backgroundColor: ''}, "<")
  }
  if (barCounter < lastIndex) {
    barCounter++;
  } else if (lastIndex >= 0) {
    barCounter = 0;
    lastIndex--;
  }
}

function check(area) {
  bars2 = area.querySelectorAll('.bar');
  thisBar = randomArray2[barCounter2];
  nextBar = randomArray2[barCounter2 + 1];
  thisDiv = bars2[barCounter2];
  nextDiv = bars2[barCounter2 + 1];

  if (lastIndex2 === 0) {
    tlPractice.pause();
    return false;
  }
  if (thisBar > nextBar && choice === 1) {
    const temp = randomArray2[barCounter2]
    randomArray2[barCounter2] = randomArray2[barCounter2 + 1]
    randomArray2[barCounter2 + 1] = temp
    tlPractice
        .to(nextDiv, {scale: 0, transformOrigin: "bottom center", duration: 0.5, ease: "circ.out"}, ">1")
        .to(thisDiv, {scale: 0, transformOrigin: "bottom center", duration: 0.8, ease: "circ.out"}, '<')
        .call(swapBars, [thisDiv, nextDiv], ">0.5")
        .to(nextDiv, {duration: 0.5,scale: 1,transformOrigin: "bottom center",backgroundColor: "",ease: "circ.out"}, ">")
        .to(thisDiv, { duration: 0.5,scale: 1,transformOrigin: "bottom center",backgroundColor: "",ease: "circ.out"}, "<")
    if (barCounter2 < lastIndex2) {
      barCounter2++;
    } else if (lastIndex2 >= 0) {
      barCounter2 = 0;
      lastIndex2--;
    }
    return true;
  } else if (thisBar <= nextBar && choice === 2){
    tlPractice
        .to(thisDiv, {backgroundColor: ''}, ">1")
        .to(nextDiv, {backgroundColor: ''}, "<")
    if (barCounter2 < lastIndex2) {
      barCounter2++;
    } else if (lastIndex2 >= 0) {
      barCounter2 = 0;
      lastIndex2--;
    }
    return true;
  }else if (thisBar > nextBar && choice === 2){
    displayMistake();
    return false;
  }else if (thisBar <= nextBar && choice === 1){
    displayMistake();
    return false;
  }
}

function displayMistake() {
  let x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function highlightBars(node1, node2){
  if (lastIndex2 > 0){
    tlPractice
        .to(node1, {backgroundColor: "#FEA82F"}, ">0.5" )
        .to(node2, {backgroundColor:"#FEA82F"},"<")
  }
}
function showDropdown() {
  document.getElementById("popup").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".burger") || event.target.parentNode.matches(".burger")) {
    let dropdowns = document.getElementById("popup");

    dropdowns.classList.remove("show");
  }
}

const titles = ["Sorting those Bubbles!", "if zahl[k] >  zahl[k+1]", "Bubbles!!!!", "O(n^2)", "I like Bubbles :)", "Du musst runter scrollen!", ":)", "Hello World!"]
 let  cursor = gsap.to(".cursor",{opacity:0, ease: "power2.inOut", repeat: -1})

let masterTl = gsap.timeline({repeat: -1})

titles.forEach(word => {
  let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
  tl.to('.text', {duration: 1, text: word})
  masterTl.add(tl)
})
