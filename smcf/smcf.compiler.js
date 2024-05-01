const code = document.querySelector("#code");
const result = document.querySelector("#result");

const smcfCper = {
	appName: "smcfCompiler",
	appNameShort: "smcfcper",
	version: "v1.0.0",
	versionCode: 10020240425,
	buildVer: "(20240427)",
	buildType: "Alpha",
	license: "",
	author: "XiaozhiSans",
	url: "",
	main: function() {
		result.innerHTML = '# 由smcfcper编译';
		let codes = code.innerText;
		eval(codes);
		document.querySelector("#result").removeAttribute("data-highlighted");
	}
}


var logDebug = false;
console.log = (function (oriLogFunc) {
  return function () {
    if (logDebug) {
      oriLogFunc.apply(this, arguments);
    }
  }
})(console.log);

setInterval(function() {
	// 心跳数据
	console.info("smcfcper running...");
}, 60000);

setInterval(function() {
	document.querySelector("#codeHl").innerHTML = code.innerText;
	$(document).ready(function() {
		$("#code").css({
			'width': ($("#codeHl").width() + 'px')
		});
	});
	document.querySelector("#codeHl").removeAttribute("data-highlighted");
	hljs.highlightAll();
}, 250);
