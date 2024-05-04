const code = document.querySelector("#code");
const result = document.querySelector("#result");

const smcfcper = {
	appName: "SMCFCompiler",
	appNameShort: "smcfcper",
	version: "v1.1.4",
	buildVer: "(20240504)",
	buildType: "Beta",
	license: "",
	author: "XiaozhiSans",
	url: "",
	main: function() {
		result.innerText = "# 由smcfcper编译";
		// let commentSymbols = \//\;
		// let code_ = code.innerText.replace(commentSymbols, )
		eval(code.innerText);
		result.removeAttribute("data-highlighted");
	},
	copy: function(btn) {
		navigator.clipboard.writeText(result.innerText);
		btn.setAttribute("tooltip", "已复制!");
		setTimeout(function() {
			btn.setAttribute("tooltip", "复制");
		}, 2000);
	},
	clear: function(btn) {
		let wordCount = result.innerText.split('').length;
		let text = "# 编译姬: ♪(´▽`) 已经清理完毕!";
		let showWordCount = false;
		showWordCount? text += " 清理了 " + wordCount + " 个字符.": text += '';
		result.innerText = text;
		result.removeAttribute("data-highlighted");
		btn.setAttribute("tooltip", "已清屏!");
		setTimeout(function() {
			btn.setAttribute("tooltip", "清屏");
		}, 2000);
	}
}

const addFunToCper = function(fN, f) {
	let add = `smcfcper.${fN} = ${f}`;
	eval(add);
	let del = `${f} = undefined`;
	eval(del);
}

addFunToCper("reload", "loadSmcfcperModules");

onLoaded();
onLoaded = undefined;

var logDebug = false;
console.log = (function (oriLogFunc) {
	return function () {
		if(logDebug) {
			oriLogFunc.apply(this, arguments);
		}
	}
})(console.log);

console.info("[smcfcper] 核心模块加载完成, 版本: " + smcfcper.buildType + ' ' + smcfcper.version);

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
