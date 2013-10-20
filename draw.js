var player = 3;
var line = 30;	//the line of the map
var column = 25;	//the column of the map
var fps = 20;
var refresh = 1000/fps;	//the refresh time(ms)
var bg_text = "　";	//the background
var map = new Array();
var logic = new Array();
for(var i = 0; i < line; i++){
	map[i] = new Array();
	logic[i] = new Array();
}
function mapClear(draw_text) {
	for(var i = 0; i < line; i++){
		for(var j = 0; j < column; j++){
			map[i][j] = draw_text;
			logic[i][j] = 0;	//0 is safe
		}
	}
}
mapClear(bg_text);
var drawHere = document.getElementById("draw-here");
function drawMap () {
	drawPlayer(wing_text_left, player_text, wing_text_right, 1);
	var drawContent = new String;
	for(var i = 0; i < line; i++){
		drawContent+="<li>";
		for(var j = 0; j < column; j++){
			drawContent+=map[i][j];
		}
		drawContent+="</li>";
	}
	drawHere.innerHTML = drawContent;
}
drawMap();

var player_line = line-1;
var player_column = (column-1)/2;
var wing_text_left = "◢";
var player_text = "★";
var wing_text_right = "◣";
function drawPoint(y, x, message_text, logic_num) {
	if (x >= 0 && x <column) {	//edge detection
		map[y][x] = message_text;
		logic[y][x] = logic_num;
	}
}
function drawPlayer(left, center, right, logic_num) {
	drawPoint(player_line,player_column-1, left, logic_num);
	drawPoint(player_line, player_column, center, logic_num);	//draw the player
	drawPoint(player_line,player_column+1, right, logic_num);
}
function drawBg(y, x) {
	drawPoint(y,x,bg_text, 0);
}
function drawFire(y, x, word) {
	var fire_line = y-1;
	var fire_column = x;
	if (fire_line >= 0) {
		drawPoint(fire_line, fire_column, word, 2);
		setTimeout(function(){drawBg(fire_line,fire_column);drawFire(fire_line,fire_column, word)},refresh);
	}
}