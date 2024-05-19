const pluginsDir = "assets/plugins/", modulesDir = "assets/modules/";
const smcfModuDir = modulesDir + "smcf/", smcfPlugDir = pluginsDir + "smcf/";
const cperModuDir = modulesDir + "smcfcper/", cperPlugDir = pluginsDir + "smcfcper/";
const cperConfig = cperPlugDir + "cper.config.ini";
const cperModulesCfg = cperPlugDir + "cper.modules.ini";
const smcfModulesCfg = cperPlugDir + "smcf.modules.ini";

const loadScripts = (scripts) => {
	let loaded = 0;

	let loadNextScript = () => {
		if(loaded >= scripts.length) {
			console.info("[smcfcper] 模块加载完毕");
			return;
		}

		let script = scripts[loaded];
		loaded++;

		$.getScript(script, () => {
			console.info("[smcfcper] " + script + " 加载完成");
			loadNextScript();
		}).fail((jqxhr, settings, exception) => {
			console.info("[smcfcper] " + script + " 加载失败");
			loadNextScript();
		});
	}

	loadNextScript();
}

let loadSmcfcperModules = () => {
	console.info("[smcfcper] 开始加载 cper 模块/插件");
	$.get(cperModulesCfg, function(data) {
		let lines = data.trim().split('\n');
		let scripts = [];

		for (let line of lines) {
			line = line.trim();

			// 忽略注释和空行
			let isComment = (line.startsWith(';') || line.startsWith('#'));
			if(isComment || line === '') {
				continue;
			}

			line = line.replace(/#.*/g ,'')

			let parts = line.split('|').map(part => {
				return part.trim();
			});

			parts[2] === "cper"? scripts.push(cperModuDir + parts[0]): undefined;
			parts[2] === "smcf"? scripts.push(smcfModuDir + parts[0]): undefined;
			parts[2] === "plug"? scripts.push(pluginsDir + parts[1] + '/' + parts[0]): undefined;
		}

		loadScripts(scripts);
	});
};

loadSmcfcperModules();
