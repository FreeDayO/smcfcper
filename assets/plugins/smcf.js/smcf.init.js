/**
 * smcf.init.js for smcfcper
 * by @XiaozhiSans
 */
(()=>{let path = "./assets/plugins/smcf.js/";
console.log("[smcf] 开始加载 smcf 模块");
import(`${path}smcf.modules.js`).then(i => i.modules.forEach(i => i[0].startsWith('*')?0:(()=>{
	$.getScript(`${path}modules/${i[0]}`)
	.then(() => {console.log(`[smcf] 模块: ${i[0]} 加载完毕`); globalThis[i[1]] = eval(i[1]);})
	.catch(e => {console.warn(`[smcf] 模块: ${i[0]} 加载失败, 原因:\n\n${e}\n`)});
})()));})();
