
/*
 * ---
	file: smcf.sm.js
	name: smcf.js sound/music 扩展模块
	comment: 这事雪罢(指代码 + 难视
			目前只有 music.volume(); 加了数值范围判断,我可真是太棒了(骄傲
	author: XiaozhiSans
	create date: 2024/04/27
	update date: 2024/04/27
 * ---
 */


/*	指令语法笔记
 *	playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]
 *	stopsound <player: target> [<sound: string>]
 *
 *	music play <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode: MusicRepeatMode]
 *	music queue <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode: MusicRepeatMode]
 *	music stop [fadeSeconds: float]
 *	music volume <volume: float>
 *
 */

const sound = {
	play: function(name, target, position, volume, pitch, minVolume) {
		if(!name) {return "syntax error: name is undefined!!";}
		if(!target) {target = ''; targetInfo = "自己";}
		if(!position) {position = ''; positionInfo = "undefined";}
		if(!volume) {volume = ''; volumeInfo = 1.0;}
		if(!pitch) {pitch = ''; pitchInfo = 1.0;}
		if(!minVolume) {minVolume = ''; minVolumeInfo = 0.0;}
		put("# 向 " + targetInfo + " 播放声音 " + name + " 在 " + positionInfo + "音量/最小音量/音调: " + volumeInfo + '/' + minVolumeInfo + '/' + pitchInfo);
		put("playsound " + name + ' ' + target + ' ' + position + ' ' + volume + ' ' + pitch + ' ' + minVolume);
	},
	stop: function(target, sound) {
		if(!target) {return "syntax error: target is undefined!!";}
		if(!sound) {sound = ''; soundInfo = "全部声音";}
		put("# 停止 " + target + " 的 " + soundInfo);
		put("stopsound " + target + sound);
	}
}, music = {
	play: function(name, volume, fade, repeatMode) {
		if(!name) {return "syntax error: name is undefined!!";}
		if(!volume) {volume = ''; volumeInfo = 1.0;} else {volumeInfo = volume;}
		if(!fade) {fade = ''; fadeInfo = 0.0;} else {fadeInfo = fade;}
		repeatInfo = "仅一次";
		if(!repeatMode) {repeatMode = '';}
		else {
			if(repeatMode == "repeat") {repeatMode = "loop";}
			if(repeatMode == "loop") {repeatInfo = "单曲循环";}
			if(repeatMode == "once") {repeatMode = "play_once";}
		}
		// if(repeatMode != '' || "loop" || "repeat" || "once" || "play_once") {return "syntax error: invalid repeatMode!!";}
		put("# 播放音乐 " + name + " 音量/淡出入时间/循环模式: " + volumeInfo + '/' + fadeInfo + '/' + repeatInfo);
		put("music play " + name + ' ' + volume + ' ' + fade + ' ' + repeatMode);
	},
	queue: function(name, volume, fade, repeatMode) {
		if(!name) {return "syntax error: name is undefined!!";}
		if(!volume) {volume = ''; volumeInfo = 1.0;} else {volumeInfo = volume;}
		if(!fade) {fade = ''; fadeInfo = 0.0;} else {fadeInfo = fade;}
		repeatInfo = "仅一次";
		if(!repeatMode) {repeatMode = '';}
		else {
			if(repeatMode == "repeat") {repeatMode = "loop";}
			if(repeatMode == "loop") {repeatInfo = "单曲循环";}
			if(repeatMode == "once") {repeatMode = "play_once";}
		}
		// if(repeatMode != '' || "loop" || "repeat" || "once" || "play_once") {return "syntax error: invalid repeatMode!!";}
		put("# 将 " + name + " 加入播放列表 音量/淡出入时间/循环模式: " + volumeInfo + '/' + fadeInfo + '/' + repeatInfo);
		put("music queue " + name + ' ' + volume + ' ' + fade + ' ' + repeatMode);
	},
	stop: function(fade) {
		if(!fade) {fade = ''; fadeInfo = 0.0;}
		else {fadeInfo = fade;}
		put("# 停止音乐 淡出时间: " + fade);
		put("music stop" + fade);
	},
	volume: function(float) {
		if(!float) {return "syntax error: float is undefined!!"} else {if((float > 1.0) || (float < 0.0)) {console.error("error: invalid float!!"); return -1;}}
		put("# 调整音乐音量为 " + float);
		put("music volume " + float);
	}
}

const sm = {sound, music};
