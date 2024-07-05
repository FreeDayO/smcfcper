import {smcfcper} from "./modules/cper.js";
import df from "./data/default.json" with {type: "json"};
import modules from "./data/cper.modules.json" with {type: "json"};
import plugins from "./data/cper.plugins.json" with {type: "json"};
import * as msg from "./modules/cper.msg.js";
const modulesDir = "./modules/", pluginsDir = "./assets/plugins/";

const bootsound = new Audio("assets/sounds/Valve- Alyx.m4a");
globalThis.playBootSound = () => {bootsound.play().then(document.removeEventListener("mouseover", playBootSound));};
document.addEventListener("mouseover", playBootSound);

globalThis.smcfcper = smcfcper;
smcfcper.log = (...x) => {console.log(`[smcfcper] ${x}`)},
smcfcper.initSettings = (s = df) => {smcfcper.settings = s; log("默认设置载入完毕");},
smcfcper.getSettings = (s = window.localStorage.smcfcperSettings) => {
	if(!s) {log("获取失败, 将载入默认设置"); smcfcper.initSettings();}
	else {smcfcper.settings = s; log("获取保存的设置完毕")}
},
smcfcper.checkPermission = () => {
	if(smcfcper.settings.acceptStorage === 0) {log("未授权, 将进行询问(这部分还没写哈哈哈)");}
}
const log = smcfcper.log;
log("初始化完毕");

log("已连接到控制台, 尝试获取保存的设置");
smcfcper.getSettings();

log("提前加载 msg 模块");
globalThis.msg = msg;

log("检查权限");
smcfcper.checkPermission();

log("加载模块");
modules.forEach(i => i[0].startsWith('*')?0:import(`${modulesDir}${i[0]}`).then(j => 
	smcfcper[i[1]] = j[i[1]],log(`${i[2]} 加载成功\n${modulesDir}${i[0]}`))
	.catch(e => log(`${i[2]}加载失败, 原因:\n\n${e}\n${modulesDir}${i[0]}`))
);

/** 此处依赖 jq 3.x */
log("加载插件");
plugins.forEach(i => i[0].startsWith('*')?0:(()=>{
	$.getScript(`${pluginsDir}${i[1]}/${i[0]}`)
	.then(log(`${i[2]} 加载完毕\n${pluginsDir.replace("./", '')}${i[1]}/${i[0]}`))
	.catch(e => log(`${i[2]} 加载失败, 原因:\n\n${e}\n ${pluginsDir.replace("./", '')}${i[1]}/${i[0]}`));
})());

import final from "./cper.inited.js";
final();
