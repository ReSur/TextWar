var wing_left = new Array();
var wing_right = new Array();
	wing_left[0] = "◢";
	wing_left[1] = "▁";
	wing_left[2] = "▂";
	wing_left[3] = "▃";
	wing_left[4] = "▅";
	wing_left[5] = "▆";
	wing_left[6] = "▇";
	wing_right[0] = "◣";
	wing_right[1] = "▁";
	wing_right[2] = "▂";
	wing_right[3] = "▃";
	wing_right[4] = "▅";
	wing_right[5] = "▆";
	wing_right[6] = "▇";
var plane_num = 7;
var wing_select03 = 0;

function theSame() {
		gameDefine();
		enemy();
		$("#sound-play")[0].play();
		$("body").unbind();
		$("body").keydown(function(event){
			playerControl(event.which);
		});
}
function turnRed(div_name) {
	$(div_name).addClass("turn-red");
	setTimeout(function(){$(div_name).removeClass("turn-red")}, 200);
}
function gameStart() {
	if ($("#player-text").val() != "") {
		player_text = $("#player-text").val();
		wing_text_left = wing_left[wing_select03];
		wing_text_right = wing_right[wing_select03];
		$(".start").animate({top:'-1000px'},function(){$(".start").hide()});
		$(".panel").slideDown();
		setInterval("drawMap()",refresh);
		turnRed(".play");
		theSame();
	}
}
function gameOver() {
	$(".your-score").html("你的槽值:&nbsp;"+ score);
	shareSNS(score);
	GAMENOTOVER = false;
	player--;
	map[info_line][info_column-4] = "Ｇ";
	map[info_line][info_column-3] = "Ａ";
	map[info_line][info_column-2] = "Ｍ";
	map[info_line][info_column-1] = "Ｅ";
	map[info_line][info_column+1] = "Ｏ";
	map[info_line][info_column+2] = "Ｖ";
	map[info_line][info_column+3] = "Ｅ";
	map[info_line][info_column+4] = "Ｒ";
	$("#sound-gameover")[0].play();
	$(".end").show(500,function(){
		$(".end").animate({top:"0"});
	});
	$(".panel").slideUp();
	$("#sound-replay")[0].play();
	$("body").unbind();
	$("body").keydown(function(event) {
		if (event.which == 13) {
			replay();
		};

	});
}
function replay() {
	$(".end").animate({top:'-1000px'},function(){$(".end").hide()});
	$(".caozi-score").css("width", "0px");
	$(".panel").slideDown();
	map[info_line][info_column-4] = bg_text;
	map[info_line][info_column-3] = bg_text;
	map[info_line][info_column-2] = bg_text;
	map[info_line][info_column-1] = bg_text;
	map[info_line][info_column+1] = bg_text;
	map[info_line][info_column+2] = bg_text;
	map[info_line][info_column+3] = bg_text;
	map[info_line][info_column+4] = bg_text;
	turnRed(".replay");
	theSame();
}
function wingChange(num) {
	wing_select03 = (wing_select03 + num) % plane_num;
	wing_select01 = (wing_select03 - 2 + plane_num) % plane_num;
	wing_select02 = (wing_select03 - 1 + plane_num) % plane_num;
	wing_select04 = (wing_select03 + 1) % plane_num;
	wing_select05 = (wing_select03 + 2) % plane_num;
	$(".wing-left01").text(wing_left[wing_select01]);
	$(".wing-right01").text(wing_right[wing_select01]);
	$(".wing-left02").text(wing_left[wing_select02]);
	$(".wing-right02").text(wing_right[wing_select02]);
	$(".wing-left03").text(wing_left[wing_select03]);
	$(".wing-right03").text(wing_right[wing_select03]);
	$(".wing-left04").text(wing_left[wing_select04]);
	$(".wing-right04").text(wing_right[wing_select04]);
	$(".wing-left05").text(wing_left[wing_select05]);
	$(".wing-right05").text(wing_right[wing_select05]);
	if (num == 1){
		$("#sound-switch-up")[0].play();
		turnRed(".wing-up");
	}
	else if (num = plane_num - 1) {
		$("#sound-switch-down")[0].play();
		turnRed(".wing-down");
	}
}
function playerChange() {
	$("#player-text").val(toSBC($("#player-text").val()));
	if($("#player-text").val() != "") {
		$(".space").text($("#player-text").attr("value"));
	}
}
$(document).ready(function() {
	$("body").keydown(function(event) {
		if (event.which == 38) {
			playerChange();
			wingChange(1);
		}
		if (event.which == 40) {
			playerChange();
			wingChange(plane_num - 1);
		}
	});
});