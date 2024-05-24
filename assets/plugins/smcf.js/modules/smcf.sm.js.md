# smcf.sm.js 食用文档
更新时间: 2024年4月27日

### 全部函数
```js
// sound
sound.play(name[, target, position, volume, pitch, minVolume]); // 播放声音
sound.stop(name[, target]); // 停止声音
// music
music.play(name[, volume, fade, repeatMode]); // 播放音乐
music.queue(name[, volume, fade, repeatMode]); // 加入音乐到播放列表
music.stop([fade]); // 停止音乐
music.volume(float); // 调整音乐音量, 这里的float相当于[volume]
```
### 参数说明
<!-- "\"是md转义符,请忽略 -->
name(string) 声音名,不可省略
\[target](string) 目标玩家,可省略 
	- 默认值: 当前玩家
	- 示例值: "XiaozhiSans", "@a", \_A

\[position](string) 坐标
	- 默认值: 当前玩家坐标
	- 示例值: "11 45 14"

\[volume](float) 音量
	- 默认值: 1.0
	- 示例值: "2.5", 2.5
	- 范围: (见wiki)

\[pitch](float) 音调
	- 默认值: 1.0
	- 范围: [0.0, 256.0][^1]

\[minVolume](float) 最小音量
	- 默认值:0.0
	- 范围见 \[volume]

\[fade](float) 淡出入时间
	- 默认值:0.0
	- 范围: [0.0, 10.0]

\[repeatMode](string) 重复模式
	- 默认值: play
	- 可选值: 
		1. "loop"(单曲循环)
		2. "play_onece"(仅一次)
		3. "repeat"(== "loop")
		4. "onece"(== "play_once")

### 注解
[^1]: 因为大于256的值相当于1的效果,所以视范围为0-256
