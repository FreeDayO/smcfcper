const code = document.querySelector("#code");
const result = document.querySelector("#result"), auxiliary = document.querySelector("#auxiliary");

const smcfcper = {
	appName: "SMCFCompiler",
	appNameShort: "smcfcper",
	version: "v1.3.1-1",
	buildVer: "(20240522)",
	buildType: "Beta",
	license: "",
	author: "XiaozhiSans",
	url: "",
	checkUpdate: () => {
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
	},
	getVer: () => {
		return `${smcfcper.buildType} ${smcfcper.version}${smcfcper.buildVer}`;
	},
	main: () => {
		result.innerText = "# 由smcfcper编译";
		eval(code.innerText);
		hljs.reHighlightAll(result);
		smcfcper.msg("编译完毕!");
	},
	copy: () => {
		navigator.clipboard?
			(() => {navigator.clipboard.writeText(result.innerText); smcfcper.msg("已复制!");})():
			smcfcper.msg("复制失败! 您的浏览器不支持复制!");
	},
	clear: () => {
		let wordCount = result.innerText.split('').length + auxiliary.innerText.split('').length;
		let text = "# 编译姬: ♪(´▽`) 已经清理完毕!";
		let showWordCount = false;
		showWordCount? text += " 清理了 " + wordCount + " 个字符.": undefined;
		result.innerText = text;
		auxiliary.innerText = '';
		$("#auxiliary").css("display", "none");
		hljs.reHighlightAll(result);
		smcfcper.msg("已清屏!");
	},
	msg: content => {
		document.querySelector("i#message").innerText = ' ' + content;
		document.querySelector("div#messageBox").setAttribute("new", '');
		setTimeout(() => {
			document.querySelector("div#messageBox").removeAttribute("new");
		}, 1000);
		setTimeout(() => {
			document.querySelector("i#message").innerText = '';
		}, 2000);
	}/* ,
	theme: name => {
		let html = document.querySelector("html");
		name == "dark"? 
			html.removeAttribute("light"):
			html.setAttribute("light", '');
		smcfcper.msg("切换完毕");
	} */,
	save: () => {
		/*
		let blob = new Blob([result.innerText], {
			type: "text/plain;charset=utf-8"
		});
		let downloadUrl = URL.createObjectURL(blob);
		document.querySelector("a#mcf").href = downloadUrl;
		setTimeout(() => {
			URL.revokeObjectURL(downloadUrl);
		}, 5000); // 5s后释放内存中存在的url
		document.querySelector("a#mcf").click();
		smcfcper.msg("已发送下载请求");
		*/
		async function fetchBlob(fetchUrl, method = "POST", body = null) {
			const response = await window.fetch(fetchUrl, {
					method,
					body: body? JSON.stringify(body): null,
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest",
					},
			});
			const blob = await response.blob();
			return blob;
		}
		let zip = new JSZip();
		let smcf = zip.folder("smcf"), functions = zip.folder("functions");
		(auxiliary.innerText && auxiliary.innerText !== '')? (() => {
			functions.file("auxiliary.mcfunction", auxiliary.innerText);
			functions.file("loops.mcfunction", document.querySelector("code#loops").innerText);
			// smcf.file("loops.smcf.js", "../");
		})(): undefined;
		functions.file("main.mcfunction", result.innerText);
		smcf.file("main.smcf.js", code.innerText);
		zip.generateAsync({type: "blob"}).then(blob => {
			let url = window.URL.createObjectURL(blob);
			document.querySelector("a#mcf").href = url;
			setTimeout(() => {
				URL.revokeObjectURL(url);
			}, 5000); // 5s后释放内存中存在的url
			smcfcper.msg("已发送下载请求");
			document.querySelector("a#mcf").click();
		});
	}
}

const addFunToCper = (fN, f) => {
	let add = `smcfcper.${fN} = ${f}`;
	eval(add);
	let del = `${f} = undefined`;
	eval(del);
}

addFunToCper("reload", "loadSmcfcperModules");

hljs.reHighlightAll = (e) => {
	e.removeAttribute("data-highlighted");
	hljs.highlightAll();
}

/* var logDebug = false;
console.log = (oriLogFunc => {
	return () => {
		logDebug? oriLogFunc.apply(smcfcper, arguments): undefined;
	}
})(console.log); */

console.info("[smcfcper] 核心模块加载完成, 版本: " + smcfcper.getVer());
smcfcper.checkUpdate();
let versions = document.querySelectorAll("version");
for(let version of versions) {
	version.innerText = smcfcper.getVer();
}

setInterval(() => {
	// 心跳保活
	console.info("[smcfcper] smcfcper running...");
}, 60000);

/* setInterval(() => {
	document.querySelector("#codeHl").innerHTML = code.innerHTML.replace(/<br>/g, ' ').replace(/<div>/g, '\n').replace(/<\/div>/g, ''); // 修复连续空行高度不一致
	document.querySelector("#codeHl").removeAttribute("data-highlighted");
	hljs.highlightAll();
}, 250); */
const onChange = () => {
	(code.innerHTML == '')? document.querySelector("#codeHl").innerHTML = ' ': document.querySelector("#codeHl").innerHTML = code.innerHTML.replace(/<br>/g, ' ').replace(/<div>/g, '\n').replace(/<\/div>/g, ''); // 修复连续空行高度不一致
	hljs.reHighlightAll(document.querySelector("#codeHl"));
	hljs.highlightAll();
}
code.addEventListener("keyup", onChange);
onChange();

document.querySelector("dialog").removeAttribute("open");
