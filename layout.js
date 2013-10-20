var div_width = 200;
var div_height_up = 20;
var div_height_down = 10;
function divTriangle(){
	var text_up = "";
	var text_down = "";
	var int_width = Math.floor($(window).width() / div_width);
	var extra_width = Math.floor($(window).width() % div_width);
	var proportion = extra_width/div_width;
	var height_up = Math.floor(proportion * div_height_up);
	var height_down = Math.floor(proportion * div_height_down);
	for(i = 0; i < int_width; i++) {
		if (i % 2) {
			text_up= text_up + "<span class='right-span'></span>";
			text_down = text_down + "<span class='left-span'></span>";
		}else {
			text_up = text_up + "<span class='left-span'></span>";
			text_down = text_down + "<span class='right-span'></span>";
		}
	}
	if (int_width % 2) {
		$(".span-up").html(text_up + "<span class='span-up-trapezoid'></span>");
		$(".span-down").html(text_down + "<span class='span-down-trapezoid'></span>");
		$(".span-up-trapezoid").css({
			"borderLeft": extra_width + "px solid rgba(201,205,213,0.3)",
			"borderTop": height_up + "px solid transparent",
			"borderBottom": "0px solid transparent",
			"height": div_height_up - height_up + "px",
		});
		$(".span-down-trapezoid").css({
			"borderLeft": extra_width + "px solid rgba(201,205,213,0.3)",
			"borderBottom": height_down + "px solid transparent",
			"borderTop": "0px solid transparent",
			"height": div_height_down - height_down + "px",
		});
	} else {
		$(".span-up").html(text_up + "<span class='span-up-triangle'></span>");
		$(".span-down").html(text_down + "<span class='span-down-triangle'></span>");
		$(".span-up-triangle").css({
			"borderBottom": height_up + "px solid rgba(201,205,213,0.3)",
			"borderLeft": extra_width + "px solid transparent",
			"marginTop": div_height_up- height_up,
		});
		$(".span-down-triangle").css({
			"borderTop": height_down + "px solid rgba(201,205,213,0.3)",
			"borderLeft": extra_width + "px solid transparent",
		});
	}
}
$(window).resize(function() {
	divTriangle();
	});
divTriangle();