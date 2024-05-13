const pluginsDir = "assets/plugins/", modulesDir = "assets/modules/";
const smcfModuDir = modulesDir + "smcf/", smcfPlugDir = pluginsDir + "smcf/";
const cperModuDir = modulesDir + "smcfcper/", cperPlugDir = pluginsDir + "smcfcper/";
const configFileName = cperPlugDir + "smcfcper.config.cfg";
const smcfcperModulesCfg = cperPlugDir + "smcfcper.modules.cfg";

let loadSmcfcperModules = () => {
	$.ajax({
		url: smcfcperModulesCfg,
		dataType: "text",
		success: data => {
			let lines = data.split('\n');
			console.info("[smcfcperLoader] 开始加载 smcf/cper 模块.");
			for(let line of lines) {
				(line === '' || line.startsWith('#'))? '': function(line) {
					let modu = line.replace(/\s*|#.*/g, '').split('|');
					modu[2] === "cper"? $.getScript(cperModuDir + modu[0]):
					modu[2] === "smcf"? $.getScript(smcfModuDir + modu[0]):
					modu[2] === "plug"? function(){$.getScript(pluginsDir + modu[1] + '/' + modu[0]); modu[2] = "cper/plug";}(): undefined;
					/* setTimeout(() => {
						try {//屑XS:
							// 我这代码没问题吧? 神金报语法错误 摆了摆了 ＜（＾－＾）＞
							if(eval(`typeof(${modu[3]})`) === "object" || eval(`typeof(${modu[3]})`)  === "function") {
								console.info("[smcfcperLoader] " + modu[2] + "模块<" + modu[1] + ">(" + modu[0] + ") 加载完毕");
							}
							else {
								throw "函数或对象未定义";
							}
						}
						catch(e) {console.info(e)
							console.warn("[smcfcperLoader] " + modu[2] + "模块<" + modu[1] + ">(" + modu[0] + ") 加载失败,错误信息: " + e);
						}
					}, 3000); */
				}(line);
			}
			console.info("[smcfcperLoader] 模块加载完毕,重新加载模块请执行 smcfcper.reload();");
		},
		error: data => {
			console.error("[smcfcperLoader] 模块配置文件加载失败,错误信息: " + data);
		}
	});
}

loadSmcfcperModules();
