console.log("[smcfcperLoader] smcfcper.loader.js 已经载入");
const configFileName = "smcfcper.cfg";
const smcfcperModulesCfg = "smcf/modules.cfg";

const loadSmcfcperModules = function() {
	$.get(smcfcperModulesCfg, function(data) {
		let lines = data.split('\n');
		console.info("配置文件加载完毕:");
		for(let line of lines) {
			if(line != '') {
				if(line.startsWith("#")) {
					console.info(line);
					continue;
				}
				else{
					let modu = line.split("|");
					if(modu[2] == 't'||"true") {
						$("body").append(`<script type="text/javascript" name="${modu[1]}" src="smcf/${modu[0]}"></script>`);
						if(typeof(modu[3]) == "undefined") {
							console.error(modu[1] + '(' + modu[0] + ')' + "加载失败.");
						}
						else {
							console.info(modu[1] + '(' + modu[0] + ')' + "已加载");
						}
					}
					else {
						$("body").append(`<script type="text/javascript" name="${modu[1]}" src="${modu[0]}"></script>`);
						if(typeof(modu[3]) == "undefined") {
							console.error(modu[1] + '(' + modu[0] + ')' + "加载失败.");
						}
						else {
							console.info(modu[1] + '(' + modu[0] + ')' + "已加载");
						}
					}
				}

			}
		}
		
		console.info("smcfcper 模块加载完毕,热加载模块请执行 loadSmcfcperModules();");
	});
		setTimeout(function() {
			onLoaded();
		}, 3000);
}
