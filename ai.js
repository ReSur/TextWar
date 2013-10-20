/* Logic NUM
background ------- 0;
player         ------- 1;
fire             ------- 2;
enemy        ------- 3;
bonus         ------- 4;
*/
var enemy_text = "▼";
var enemy_text_left = "◥";
var enemy_text_right = "◤";
var info_line = line/2;
var info_column = (column-1)/2;
var speed;
var quantity;
var score;
var level;
var bomb;
var bomb_full = 20;
function gameDefine(){
	speed = refresh*4;
	quantity = 4000;
	score = 0;
	level = 0;
	bomb = 0
	GAMENOTOVER = true;
}
function collisionDetection(y, x) {
	switch (logic[y][x]) {
		case 0:
			return 0;
			break;
		case 1:
			return 1;
			break;
		case 2:
			return 2;
			break;
	}
}
function bombUse() {
	GAMENOTOVER = false;
	mapClear("吐");
	setTimeout("mapClear(bg_text)", refresh * 5);
	setTimeout("mapClear('槽')", refresh * 10);
	setTimeout("mapClear(bg_text)", refresh * 15);
	setTimeout("mapClear('万')", refresh * 20);
	setTimeout("mapClear(bg_text)", refresh * 25);
	setTimeout("mapClear('岁')", refresh * 30);
	setTimeout("mapClear(bg_text)", refresh * 35);
	setTimeout(function(){
		mapClear(bg_text);
		$(".caozi-score").css("width", "0px");
		GAMENOTOVER = true;
		enemy();
		},refresh * 40);	
}
function killEnemy() {
	score++;
	bomb++;
	$(".caozi-score").css("width", bomb * 100 / bomb_full + "px");
	$("#sound-kill")[0].play();
	level++;
	if (level>10) {
		quantity = quantity/2;
		speed = speed/2;
		level = 0;
	}	//lever up
	if (bomb >= bomb_full) {
		bombUse();
		bomb = 0;
	}	//bomb used
}
function drawEnemy(y, x) {
	var enemy_line = y+1;
	var enemy_column = x;
	if (enemy_line < line && GAMENOTOVER) {
		switch (collisionDetection(enemy_line, enemy_column)) {
			case 0:
				drawPoint(enemy_line, enemy_column, enemy_text, 3);	//draw enemy
//				drawPoint(enemy_line, enemy_column - 1, enemy_text_left, 3);	//draw enemy
//				drawPoint(enemy_line, enemy_column + 1, enemy_text_right, 3);	//draw enemy
				setTimeout(function(){
					drawBg(enemy_line,enemy_column - 1);
					drawBg(enemy_line,enemy_column + 1);
					drawBg(enemy_line,enemy_column);
					drawEnemy(enemy_line,enemy_column);
				},speed);
				break;
			case 1:
				gameOver();
				break;
			case 2:
				killEnemy();
				break;
		}
	}
}
function enemy_generate() {
	rand_enemy = Math.floor(Math.random()*column);
	if (GAMENOTOVER) {
		drawEnemy(-1,rand_enemy);
		enemy();
	}
}
function enemy() {
	rand_time = Math.floor(Math.random()*quantity);
	setTimeout("enemy_generate()",rand_time);
}