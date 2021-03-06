const diag = document.getElementById("dialogbox");
var borderId = document.getElementById("baseBorder");
var whichType = 0;

//Gamestyle
var gs = "smb"

//Sounds
function warningSound() {
	var warning = new Audio("./sounds/warning.wav");
	warning.play()
}
function okSound() {
	var ok = new Audio("./sounds/ok.wav");
	ok.play()
}

function errorSound() {
	var error = new Audio("./sounds/error.wav");
	error.play();
}

//Music
var music = new Audio("./sounds/gs/" + gs + "/theme.mp3")
music.loop = true

//Blue square
const bsBg = document.getElementById("bsBg")
const bluesquare = document.getElementById("bluesquare")

//Grid base element
const gridBase = document.getElementById("base");
var dark = false;

//If the grid was submited or not
var gridSubmited = false

//Block variables, in case you want to change them to a GIF or another format
var brick = "./images/blocks/" + gs +"/brick.png"
var stone = "./images/blocks/" + gs +"/stone.png"
var coin = "./images/blocks/" + gs +"/coin.png"
var dirt = "./images/blocks/" + gs +"/dirt.png"
var ground = "./images/blocks/" + gs +"/ground.png"
var question = "./images/blocks/" + gs +"/question.png"
var mario = "./images/blocks/" + gs +"/mario.png"
var goomba = "./images/blocks/" + gs +"/goomba.png"

//Control dialogs
function showDiag(type,html,acceptaction) {
	//Checks if a dialog is currently openned or not
	if(diag.style.display == "none") {
		//SFX		
		warningSound();
		//Fade
		$("#dialogbox").fadeIn();
		$("#darken").fadeIn();
		//Checks what type of button will be used, valid values: ok, choice, y/n, cancel
		var button = "";
		if(type == "ok") button = "<button onclick='showDiag()' style='width: 100%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Ok</button>";
		else if(type == "choice") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Accept</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>Cancel</button>";
		else if(type == "y/n") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Yes</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>No</button>";
		else if(type == "customB") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Custom block</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>Cancel</button>";
		else if(type == "customS") button = "<button onclick=" + acceptaction + " style='width: 50%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Custom sprite</button><button onclick='showDiag()' style='width: 50%;height: 32px;position: absolute;bottom: 0px;left: 50%'>Cancel</button>";
		else if(type == "cancel") button = "<button onclick='showDiag()' style='width: 100%;height: 32px;position: absolute;bottom: 0px; left: 0px'>Cancel</button>";
		//HTML
		diag.innerHTML = "<div id='limit'>" +html + "</div>" + button;
	} else {
		//SFX
		okSound();
		//Fade
		$("#dialogbox").fadeOut();
		$("#darken").fadeOut();
}
}

//Submit grid code
function submitGrid() {
	const err = document.getElementById("err");
	//Sounds
	var grid = new Audio("./sounds/grid.wav");
	var error = new Audio("./sounds/error.wav");
	//Get width and height input elements
	var width = document.getElementById("gridWidth");
	var height = document.getElementById("gridHeight");
	//If the width or height is equal to 0, play error SFX and return
	if(width.value == 0 || height.value == 0) {
		//If width or height is equal to 0, show error and return
		errorSound();
		err.style.display = "block";
		return;
	};
	//Width
	var gridWidth = `<td><div class='clickElm' onclick='if(this.innerHTML === "") {if(bluesquare.className === "sprite") bluesquare.setAttribute("onclick","removeSound(1)");else if(bluesquare.className === "block") bluesquare.setAttribute("onclick","removeSound(0)");this.innerHTML = bsBg.innerHTML;var placeSFX = new Audio("./sounds/gs/" + gs + "/"+ bluesquare.className +".wav"); placeSFX.play(); bluesquare.removeAttribute("onclick");} else {this.innerHTML = "";}'></div></td>`
	//Repeat the TD elements by the amount of width and add it inside of a TR tag
	var gridHeight = `<tr>${gridWidth.repeat(width.value)}</tr>`
	//Repeat the TR and TD elements by the amount of height and save it to the grid base
	base.innerHTML = `<tbody>${gridHeight.repeat(height.value)}</tbody>`

	//SFX
    grid.currentTime = 0;
	grid.play();
	//Close dialog
	showDiag();
	gridSubmited = true
	gridBase.style.display = "block";
}

//Saving
function download() {
	var levelname = document.getElementById("name");
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gridBase.innerHTML));
	element.setAttribute('download', levelname.value + '.snetlvl');


	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
	showDiag();
}

//Loading
function loadData() {
	var file = document.getElementById("level").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			gridBase.style.display = "block";
			gridBase.innerHTML = evt.target.result;
			gridSubmited = true;
		}
		reader.onerror = function (evt) {
			gridBase.innerHTML = "Error reading save file. It's maybe corrupted or invalid. Look at the console for more log.";
		gridSubmited = false;
		}
	}
}
//Changing themes
function changeTheme(id) {
	var styleId = document.getElementById("pageTheme");
	if(id == 0) {styleId.innerHTML = "button {background: radial-gradient(circle, rgba(255,239,107,1) 50%, rgba(255,167,0,1) 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #ffffbf 0%, #ffdc73 100%);}input {background: #ffffbf;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, rgba(255,250,124,1) 0%, rgba(255,179,64,1) 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 1) {styleId.innerHTML = "button {background: radial-gradient(circle, #e495ff 50%, #bf00ff 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #fbecff 0%, #e28aff 100%);}input {background: #fbecff;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg,#f5ceff 0%, #d942ff 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 2) {styleId.innerHTML = "button {background: radial-gradient(circle, #ffffff 50%, #dddddd 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid blue;color: blue;}#bg {background: linear-gradient(45deg, #ffffff 0%, #bbbbbb 100%);}input {background: #ffffff;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #ffffff 0%, #bbbbbb 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 3) {styleId.innerHTML = "button {background: radial-gradient(circle, #1f0028 50%, #000000 100%);border: 1px solid white;border-radius: 5px;color: white;}button:hover {border: 2px solid yellow;color: yellow;}#bg {background: linear-gradient(45deg, #15001c 0%, #000000 100%);}input {background: #000000;border: 1px solid white;border-radius: 3px;color: white}#dialogbox {background: linear-gradient(180deg, #23002f 0%, #000000 100%);border: 2px solid white;border-radius: 5px;}#toolbar td {border: 1px solid white;}#bsBg {border: 1px solid white;}#base {border: 2px solid white;}* {color: white;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid white}"};dark = true}
	else if(id == 4) {styleId.innerHTML = "button {background: radial-gradient(circle, #b3ff99 50%, #79ff4c 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #bfffbf 0%, #00ff40 100%);}input {background: #99ff99;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #b3ff99 0%, #79ff4c 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 5) {styleId.innerHTML = "button {background: linear-gradient( #FFFFFF 40%, #6787BA 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid blue;color: blue;}#bg {background: linear-gradient(45deg, #8BC7E1 0%, #023F5C 100%);}input {background: #dbecf4;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #8BC7E1 0%, #398DB2 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 6) {styleId.innerHTML = "button {background: radial-gradient(circle, #d29420 50%, #8f5214 100%);border: 1px solid black;border-radius: 5px;color: black;}button:hover {border: 2px solid white;color: blue;}#bg {background: linear-gradient(45deg, #D19A48 0%, #592E0E 100%);}input {background: #f7d56c;border: 1px solid black;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #a87c22 0%, #704010 100%);border: 2px solid black;border-radius: 5px;}#toolbar td {border: 1px solid black;}#bsBg {border: 1px solid black;}* {color: black;}#base {border: 2px solid black;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid black}"};dark = false}
	else if(id == 7) {styleId.innerHTML = "button {background: radial-gradient(circle, #9b0000 50%, #200000 100%);border: 1px solid white;border-radius: 5px;color: white;}button:hover {border: 2px solid #ffff4c;color: #ffff4c;}#bg {background: linear-gradient(45deg, #b30000 0%, #000000 100%);}input {background: #2d0000;border: 1px solid white;border-radius: 3px;}#dialogbox {background: linear-gradient(180deg, #8c0000 0%, #400000 100%);border: 2px solid white;border-radius: 5px;}#toolbar td {border: 1px solid white;}#bsBg {border: 1px solid white;}* {color: white;}#base {border: 2px solid white;}";if(borderId.innerHTML != "") {borderId.innerHTML = "#base div {border: 1px solid white}"};dark = true}
	if(getCookie("stc")) document.cookie = "theme=" + id + "; expires=Thu, 18 Dec 9999 12:00:00 UTC";
}

if(getCookie("stc")) changeTheme(getCookie("theme"))
//For saving the current theme to cookies
function saveThemeToCookies() {
	if($('#stc:checked').length) document.cookie = "stc=true; expires=Thu, 18 Dec 9999 12:00:00 UTC";
	else  {
		document.cookie = "stc=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}
}

//Get cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getBase64(type) {
	var file = document.getElementById("files").files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
    reader.onload = function () {
	bluesquare.src = reader.result;
	if(type == 0)bluesquare.className = "block"
	else if(type == 1)bluesquare.className = "sprite"
   };
}

function setBlockName(id) {
	const bName = document.getElementById("blockName")
	if(id === 0) bName.innerText = "Brick";
	else if(id === 1) bName.innerText = "Hard block";
	else if(id === 2) bName.innerText = "Coin";
	else if(id === 3) bName.innerText = "Dirt";
	else if(id === 4) bName.innerText = "Ground";
	else if(id === 5) bName.innerText = "Question block";
}

function setSpriteName(id) {
	const sName = document.getElementById("spriteName")
	if(id === 0) sName.innerText = "Mario";
	else if(id === 1) sName.innerText = "Goomba";
}

function setGsName(id) {
	const gsName = document.getElementById("gamestyleName")
	if(id === 0) gsName.innerText = "Super Mario Bros.";
	else if(id === 1) gsName.innerText = "Super Mario Bros. Special";
}

function toggleGrid() {
	if(borderId.innerHTML == "") {
		if(dark === false) borderId.innerHTML = "#base div {border: 1px solid black}"
		else borderId.innerHTML = "#base div {border: 1px solid white}"
	}
	else borderId.innerHTML = "";
}

document.onkeyup = function(e){
	if(diag.style.display == "none") {
		if(e.key == ' '){
			toggleGrid();
		}
	}
}

$("img").attr("draggable","false");

function updateGS() {
	warning = new Audio("./sounds/warning.wav");
	ok = new Audio("./sounds/ok.wav");
	brick = "./images/blocks/" + gs +"/brick.png"
	stone = "./images/blocks/" + gs +"/stone.png"
	coin = "./images/blocks/" + gs +"/coin.png"
	dirt = "./images/blocks/" + gs +"/dirt.png"
	ground = "./images/blocks/" + gs +"/ground.png"
	question = "./images/blocks/" + gs +"/question.png"
	mario = "./images/blocks/" + gs +"/mario.png"
	goomba = "./images/blocks/" + gs +"/goomba.png"
	music.pause();
	music = new Audio("./sounds/gs/" + gs + "/theme.mp3");
	music.play();
	var bgGrid = document.getElementById("gridBg");
	if(gs == "smb") bgGrid.innerText = "#base div {background-color: #5C94FC;}"
	else if(gs == "smbs") bgGrid.innerText = "#base div {background-color: #0000FF;}"
}

function removeSound(type) {
	if(type == 0) var removeSFX = new Audio("./sounds/gs/" + gs + "/blockremove.wav");
	else if(type == 1) var removeSFX = new Audio("./sounds/gs/" + gs + "/spriteremove.wav");
	removeSFX.play()
}
