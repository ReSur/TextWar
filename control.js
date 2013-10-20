var fire_text = "◎";
var fire_queue = "开始";
var word = -1;
var queue_id = -1;
function get_queue() {
          if (queue_id < 2) {
               queue_id++;
          }else{
               queue_id = 0;
          }
          fire_queue = sns_string.statuses[queue_id].text;
};
$('<audio id="sound-shoot"><source src="sound/shoot.ogg" type="audio/ogg"><source src="sound/shoot.mp3" type="audio/mpeg"></audio><audio id="sound-kill"><source src="sound/kill.ogg" type="audio/ogg"><source src="sound/kill.mp3" type="audio/mpeg"></audio><audio id="sound-gameover"><source src="sound/gameover.ogg" type="audio/ogg"><source src="sound/gameover.mp3" type="audio/mpeg"></audio><audio id="sound-switch-up"><source src="sound/switchup.ogg" type="audio/ogg"><source src="sound/switchup.mp3" type="audio/mpeg"></audio><audio id="sound-switch-down"><source src="sound/switchdown.ogg" type="audio/ogg"><source src="sound/switchdown.mp3" type="audio/mpeg"></audio><audio id="sound-play"><source src="sound/play.ogg" type="audio/ogg"><source src="sound/play.mp3" type="audio/mpeg"></audio><audio id="sound-replay"><source src="sound/replay.ogg" type="audio/ogg"><source src="sound/replay.mp3" type="audio/mpeg"></audio>').appendTo('body');
function toSBC(input_text) {
     if (input_text.charCodeAt(0) == 32) { 
          input_text = ""; 
     }else if (input_text.charCodeAt(0) < 127) { 
          input_text = String.fromCharCode(input_text.charCodeAt(0) + 65248); 
     } 
     return input_text; 
} 
function playerControl(event) {
	drawPlayer(bg_text, bg_text, bg_text, 0);//clear the last time
	if (event == 37) {
          		if (player_column > 0) {
          			player_column+=-1;
          		}
          }	//press left
	if (event == 38) {
		if (player_line > 0) {
          			player_line+=-1;
          		}
          }	//press up
	if (event == 39) { 
          		if (player_column < column-1) {
          			player_column+=1;
          		}
          } 	//press right
	if (event == 40) { 
		if (player_line < line-1) {
          			player_line+=1;
          		}
          } 	//press down
	if (event == 32) {
                         function get_leter() {
                              if (word < fire_queue.length - 1) {
                                        word++;
                              }
                              else{
                                        get_queue();
                                        word = 0;
                              }

                              leter = toSBC(fire_queue.substring(word, word + 1));
                              if (leter == "") {
                                   get_leter();
                              }
                         }
                         get_leter();
                         drawFire(player_line, player_column, leter);
                         $("#sound-shoot")[0].play();
	}
}