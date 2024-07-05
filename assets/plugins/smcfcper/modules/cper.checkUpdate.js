export default() => {
	$.get("https://api.github.com/repos/FreeDayO/smcfcper/releases",
		data => {
			let latestTag = data[0].tag_name;
			let latestVer = latestTag;
			let version = smcfcper.version + '-' + smcfcper.buildType.toLowerCase();
			latestTag.startsWith('v')? latestTag = latestTag.replace('v', ''): undefined;
			latestTag = latestTag.replace(/\-[a-z]+/g, '');
			let tag = smcfcper.version.replace('v', '').replace('-', '.');
			tag > latestTag? console.info("[smcfcper] 内测版还检查什么更新 (￣﹃￣) \n\t当前版本: " + version + "\n\t最新发行版: " + latestVer):
			tag < latestTag? console.info("[smcfcper] smcfcper有新版可用! \n\t当前版本: " + version + "\n\t最新版本: " + latestVer):
			tag == latestTag? console.info("[smcfcper] 恭喜,smcfcper是最新版 \n\t当前版本: " + version + "\n\t最新版本: " + latestVer): undefined;
		}
	);
}