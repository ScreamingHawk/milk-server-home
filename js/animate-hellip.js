(function($){
	
	var speed = 1000;
	
	$.fn.animateHellip = function(){
		var self = $(this);
		if (self.length > 0){
			setInterval(function($self){
				var inner = $.trim(self[0].innerText);
				if (inner == "."){
					self.each(function (){
						$(this).text("..");
					});
				} else if (inner == ".."){
					self.each(function (){
						$(this).text("\u2026");
					});
				} else {
					self.each(function (){
						$(this).text(".");
					});
				}
			}, speed);
		}
	}
}(jQuery));