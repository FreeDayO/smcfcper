console.info("[cperHotkey] 正在注册热键");

let loadCperHotkey = function() {
	document.addEventListener("keydown", function(event) {
		if(event.ctrlKey && event.key == "Enter") {
			smcfcper.main();
		}
		/* if(event.key == "Escape") {
			smcfcper.exit();
		} */
		if(event.ctrlKey && (event.key == "c" || event.key == "C")) {
			smcfcper.copy();
		}
		if(event.ctrlKey && event.key == "Delete") {
			smcfcper.clear();
		}
		if(event.ctrlKey && (event.key == "o" || event.key == "O")) {
			$('#fileInput').click();
		}
		if(event.ctrlKey && event.altKey && (event.key == "s" || event.key == "S")) {
			smcfcper.save();
		}
	});
	console.info("[cperHotkey] 热键注册完毕,重新注册请执行 smcfcper.reloadHotkey(); ");
	return "热键注册完毕";
}

loadCperHotkey();
addFunToCper("reloadHotkey", "loadCperHotkey");
