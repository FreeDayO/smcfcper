smcfcper.reloadHotkey = () => {
	console.info("[cperHotkey] 正在注册热键");
	document.addEventListener("keydown", event => {
		(event.ctrlKey && event.key == "Enter")? smcfcper.main(): undefined;
		(event.key == "Escape")? smcfcper.exit(): undefined;
		(event.ctrlKey && (event.key == "c" || event.key == "C"))? smcfcper.copy(): undefined;
		(event.ctrlKey && event.key == "Delete")? smcfcper.clear(): undefined;
		(event.ctrlKey && (event.key == "o" || event.key == "O"))? $('#fileInput').click(): undefined;
		(event.ctrlKey && event.altKey && (event.key == "s" || event.key == "S"))? smcfcper.save(): undefined;
	});
	console.info("[cperHotkey] 热键注册完毕,重新注册请执行 smcfcper.reloadHotkey(); ");
	return "热键注册完毕";
}

smcfcper.reloadHotkey();
