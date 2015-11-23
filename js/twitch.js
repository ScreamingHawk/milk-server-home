function resizePlayer(){
	var p = $('#twitchPlayer');
	p.height(p.width()*10/16);
}

var playerFlash = true;

function switchPlayer(){
	playerFlash = !playerFlash;
	$('#switchPlayerLink').text(playerFlash ? 'HTML5' : 'Flash');
	$('#twitchPlayer').remove();
	if (playerFlash){
		$('#vidPanel').append('<object id="twitchPlayer" type="application/x-shockwave-flash" style="width: 100%; background-color: #333;" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=milkytaste"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=milkytaste&auto_play=true" /></object>');
	} else {
		$('#vidPanel').append('<iframe id="twitchPlayer" style="width: 100%; background-color: #333;" src="http://player.twitch.tv/?html5&channel=milkytaste" frameborder="0" autoplay></iframe>');
	}
	resizePlayer();
	return false;
}

$(document).ready(function(){
	$('#switchPlayerLink').click(switchPlayer);
	$.getJSON('https://api.twitch.tv/kraken/streams/milkytaste', function(channel){
		if (!channel["stream"] == null && Modernizr.video){
			// Prefer HTML5 when streaming
			switchPlayer();
		} else if (swfobject.hasFlashPlayerVersion("1")){
			// Prefer Flash when offline. Default
			resizePlayer();
		} else if (channel["stream"] == null) {
			$('#offlineImage').removeClass('hidden');
		} else {
			$('#vidPanel').append("<h1>I'm LIVE!</h1><p class='lead'>But your browser does not support HTML5 video or flash :(</p>");
		}
	});
});