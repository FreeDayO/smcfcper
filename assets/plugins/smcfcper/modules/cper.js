const smcfcode = findEle("[smcfcode]");
globalThis.result = findEle("[result]");

export const smcfcper = {
	info: {
		appName: "SMCFCompiler",
		appNameShort: "smcfcper",
		verName: "v2.0.0",
		verCode: 20240630,
		verType: "Beta",
		license: '',
		author: "XiaozhiSans",
		url: "https://github.com/FreeDayO/smcfcper"
	},
	cp() {
		let code = smcfcode.innerText.replace(/((\d\n)+⌄?)|(\\n)|(\s)/g, '');
		eval(code);
		msg.crt("fa-solid fa-message", "编译完毕 ♪(´▽｀)", 3);
	}
}