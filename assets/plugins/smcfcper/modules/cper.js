const smcfcode = findEle("[smcfcode]"),
	  mcfcode = findEle("[mcfcode]");

const info = {
	appName: "SMCFcper",
	appNameShort: "cper",
	verName: "v2.0.0",
	verCode: 20240731,
	verType: "Dev",
	license: '',
	author: "XiaozhiSans",
	url: "https://github.com/FreeDayO/smcfcper"
}, dl = (name, url) => {
	let eleStr = `<a download="${name}" href="${url}" style="display: none;" dl></a>`;
	document.body.appendChild(document.createRange().createContextualFragment(eleStr));
	findEle("a[dl]").click();
	document.body.removeChild(findEle("a[dl]"));
};

export const smcfcper = {
	cp() {
		mcfcode.innerText = "# Compile by SMCFcper ~(￣▽￣)~\n";
		let code = smcfcode.innerText.replace(/\/\/.*|\/\*(.|\n)*\*\//g, '').replace(/(\d+\n)+⌄|\n|\ {2,}|\t/g, '').replace(/^⌄/, '');
		try {eval(code)} catch (e) {mcfcode.innerText = `# ${e}`}
		mcfcode.innerHTML = mcfHighLight(mcfcode.innerText);
		msg.crt("fa-solid fa-message", "编译完毕 ♪(´▽｀)", 3);
		findEle("popup").style.opacity = 1;
		findEle("popup").style.pointerEvents = "auto";
	},
	closeRs() {
		findEle("popup").style.opacity = 0;
		findEle("popup").style.pointerEvents = "none";
	},
	log(...x) {console.log(`[smcfcper] ${x}`);},
	save() {
		let name = prompt("请输入文件名(不含后缀,如:example):");
		let url = `data:text/plain;charset=utf-8,${encodeURIComponent(mcfcode.innerText)}`;
		dl(`${name || "smcfcper_output"}.mcfunction`, url);
	},
	verCode: info.verCode,
	verName: info.verName,
	verType: info.verType
}
