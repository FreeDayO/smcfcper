const smcfcode = findEle("[smcfcode]");
globalThis.result = findEle("[result]");

const info = {
	appName: "SMCFcper",
	appNameShort: "cper",
	verName: "v2.0.0",
	verCode: 20240730,
	verType: "Beta",
	license: '',
	author: "XiaozhiSans",
	url: "https://github.com/FreeDayO/smcfcper"
}, dl = (name, url) => {
	let eleStr = `<a download="${name}" href="${url}" style="display: none;" dl></a>`;
	document.body.appendChild(document.createRange().createContextualFragment(ele));
	findEle("a[dl]").click();
	document.body.removeChild(findEle("a[dl]"));
};

export const smcfcper = {
	info,
	cp() {
		let code = smcfcode.innerText.replace(/\/\/.*/g, '').replace(/(\d\n)+⌄?|\n|\ {2,}|\t/g, '');
		try {eval(code);} catch {e => {result.innerText = e;}};
		msg.crt("fa-solid fa-message", "编译完毕 ♪(´▽｀)", 3);
	},
	log(...x) {console.log(`[smcfcper] ${x}`);}
}
