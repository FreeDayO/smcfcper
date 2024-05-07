console.log("[smcfcperLoader] 开始加载 smcf/cper 模块.");
const pluginsDir = "assets/plugins/", modulesDir = "assets/modules/";
const smcfModuDir = modulesDir + "smcf/", smcfPlugDir = pluginsDir + "smcf/";
const cperModuDir = modulesDir + "smcfcper/", cperPlugDir = pluginsDir + "smcfcper/";
const configFileName = cperPlugDir + "smcfcper.config.cfg";
const smcfcperModulesCfg = cperPlugDir + "smcfcper.modules.cfg";

let loadSmcfcperModules = function() {
	$.ajax({
		url: smcfcperModulesCfg,
		dataType: "text",
		success: function(data) {
			let lines = data.split('\n');
			console.info("[smcfcperLoader] 模块配置文件加载完毕");
			for(let line of lines) {
				if(line != '') {
					if(line.startsWith("#")) {
						// console.info(line);
						continue;
					}
					else {
						let modu = line.replace(/\s|#.*/g, '').split('|');
						
						if(modu[2] == "cper") {
							$.getScript(cperModuDir + modu[0]);
						}
						if(modu[2] == "smcf") {
							$.getScript(smcfModuDir + modu[0]);
						}
						if(modu[2] == "plug") {
							$.getScript(pluginsDir + modu[1] + '/' + modu[0]);
							modu[2] = "cper-plug";
						}
						setTimeout(function() {
							eval(modu[3])? 
								console.info("[smcfcperLoader] " + modu[2] + "模块<" + modu[1] + ">(" + modu[0] + ") 加载完毕"):
								console.warn("[smcfcperLoader] " + modu[2] + "模块<" + modu[1] + ">(" + modu[0] + ") 加载失败");
						}, 5000);
					}
	
				}
			}
			console.info("[smcfcperLoader] smcfcper 模块加载完毕,重新加载模块请执行 smcfcper.reload();");
		}
	});
}

loadSmcfcperModules();
