const code = document.querySelector("#code");
const result = document.querySelector("#result");

const smcfcper = {
	appName: "SMCFCompiler",
	appNameShort: "smcfcper",
	version: "v1.2.1-1",
	buildVer: "(20240508)",
	buildType: "Beta",
	license: "",
	author: "XiaozhiSans",
	url: "",/* 
	checkUpdate() {
		let reslut = $.ajax({
			url: "https://api.github.com/repos/XiaozhiSans/smcfcper/releases/latest",
			dataType: "text/json",
			success: function(data) {
				let obj = JSON.parse(data);
				let latestTag = parseFloat(obj.get("tag_name").replace('v', ''));
				let tag = parseFloat(smcfcper.version.replace('v', ''));
				tag < latestTag? return latestTag:
					tag > latestTag? return 2:
						return 0;
			}
		});
		result == 1? console.info("[smcfcper] smcfcper有新版可用! 新版: " + )
	}, */
	getVer: function() {
		return this.buildType + ' ' + this.version + this.buildVer;
	},
	main: function() {
		result.innerText = "# 由smcfcper编译";
		// let commentSymbols = \//\;
		// let code_ = code.innerText.replace(commentSymbols, )
		eval(code.innerText);
		result.removeAttribute("data-highlighted");
		this.msg("编译完毕!");
	},
	copy: function() {
		navigator.clipboard? 
			navigator.clipboard.writeText(result.innerText)&&
			this.msg("已复制!"):
			this.msg("复制失败! 您的浏览器不支持复制!");
	},
	clear: function() {
		let wordCount = result.innerText.split('').length;
		let text = "# 编译姬: ♪(´▽`) 已经清理完毕!";
		let showWordCount = false;
		showWordCount? text += " 清理了 " + wordCount + " 个字符.": text += '';
		result.innerText = text;
		result.removeAttribute("data-highlighted");
		this.msg("已清屏!");
	},
	msg: function(content) {
		document.querySelector("i#message").innerText = ' ' + content;
		document.querySelector("div#messageBox").setAttribute("new", '');
		setTimeout(function() {
			document.querySelector("div#messageBox").removeAttribute("new");
		}, 1000);
		setTimeout(function() {
			document.querySelector("i#message").innerText = '';
		}, 2000);
	}/* ,
	theme: function(name) {
		let html = document.querySelector("html");
		name == "dark"? 
			html.removeAttribute("light"):
			html.setAttribute("light", '');
		this.msg("切换完毕");
	} */,
	save: function() {
		let blob = new Blob([result.innerText], {
			type: "text/plain;charset=utf-8"
		});
		let downloadUrl = URL.createObjectURL(blob);
		document.querySelector("a#mcf").href = downloadUrl;
		setTimeout(function() {
			URL.revokeObjectURL(downloadUrl);
		}, 5000); // 5s后释放内存中存在的url
		document.querySelector("a#mcf").click();
		this.msg("已发送下载请求");
	}
}

const addFunToCper = function(fN, f) {
	let add = `smcfcper.${fN} = ${f}`;
	eval(add);
	let del = `${f} = undefined`;
	eval(del);
}

addFunToCper("reload", "loadSmcfcperModules");

var logDebug = false;
console.log = (function (oriLogFunc) {
	return function () {
		if(logDebug) {
			oriLogFunc.apply(this, arguments);
		}
	}
})(console.log);

console.info("[smcfcper] 核心模块加载完成, 版本: " + smcfcper.getVer());
let versions = document.querySelectorAll("version");
for(let version of versions) {
	version.innerText = smcfcper.getVer();
}

setInterval(function() {
	// 心跳数据
	console.info("[smcfcper] smcfcper running...");
}, 60000);

setInterval(function() {
	document.querySelector("#codeHl").innerHTML = code.innerText;
	/* $(document).ready(function() {
		$("#code").css({
			'width': ($("#codeHl").width() + 'px')
		});
	}); */
	document.querySelector("#codeHl").removeAttribute("data-highlighted");
	hljs.highlightAll();
}, 250);

document.querySelector("dialog").removeAttribute("open");
