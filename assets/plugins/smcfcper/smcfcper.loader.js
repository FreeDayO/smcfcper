console.log("[smcfcperLoader] smcfcper.loader.js 已经载入");
const pluginsDir = "assets/plugins/";
const smcfDir = pluginsDir + "smcf/";
const cperDir = pluginsDir + "smcfcper/";
const configFileName = cperDir + "smcfcper.config.cfg";
const smcfcperModulesCfg = cperDir + "smcfcper.modules.cfg";

let loadSmcfcperModules = function() {
	$.ajax({
		url: smcfcperModulesCfg,
		dataType: "text",
		success: function(data) {
			let lines = data.split('\n');
			console.info("配置文件加载完毕:");
			for(let line of lines) {
				if(line != '') {
					if(line.startsWith("#")) {
						console.info(line);
						continue;
					}
					else {
						let modu = line.split(/\s|#/).join('').split('|');
						
						if(modu[2] == "cper") {
							$.getScript(cperDir + modu[0]);
						}
						if(modu[2] == "smcf") {
							$.getScript(smcfDir + modu[0]);
						}
						setTimeout(function() {
							eval(modu[3])? 
								console.info("[smcfcperLoader] smcfcper模块<" + modu[1] + ">(" + modu[0] + ") 加载完毕"):
								console.warn("[smcfcperLoader] smcfcper模块<" + modu[1] + ">(" + modu[0] + ") 加载失败");
						}, 10000);
					}
	
				}
			}
		
			console.info("[smcfcperLoader] smcfcper 模块加载完毕,重新加载模块请执行 smcfcper.reload();");
		}
	});
	setTimeout(function() {
		onLoaded();
	}, 3000);
}
