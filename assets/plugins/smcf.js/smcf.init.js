const smcfModulesDir = smcfPluginDir + "modules/", smcfModulesCfg = smcfPluginDir + "smcf.modules.ini";

let loadSmcfModules = () => $.get(smcfModulesCfg, data => {
	console.info("[smcfcper] 开始载入 smcf 模块");
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

		let enabled = parts[0];
		enabled? scripts.push(smcfModulesDir + parts[0]): undefined;
	}

	loadScripts(scripts);
});

loadSmcfModules();
