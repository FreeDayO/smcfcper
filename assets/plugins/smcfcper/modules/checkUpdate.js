const log = smcfcper.log, isAlpha = (cv, lv) => {
	log(`内测版还检查什么更新 (￣﹃￣)\n\t当前版本: ${cv}\n\t最新发行版: ${lv}`);
}, isOld = (cv, lv) => {
	log("cper 有新版可用!\n\t当前版本: " + cv + "\n\t最新版本: " + lv);
}, isNew = (cv, lv) => {
	log("恭喜, cper是最新版\n\t当前版本: " + cv + "\n\t最新版本: " + lv);
}

export const checkUpdate = () => {
	$.get(smcfcper.info.url.replace("github.com", "api.github.com/repos") + "/releases",
		data => {
			let cv = smcfcper.info.verName + '-' + smcfcper.info.verType.toLowerCase(), lv = data[0].tag_name;
			cv > lv? isAlpha(cv, lv):
			cv < lv? isOld(cv, lv):
			cv == lv? isNew(cv, lv): 0;
		}
	);
}
