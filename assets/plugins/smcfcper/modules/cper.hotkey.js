export const reloadHotkey = () => {
	smcfcper.log("正在注册热键");
	document.addEventListener("keydown", event => {
		if(event.key == "Tab") {
			findEle("[aria-selected=\"true\"]").click();
			event.preventDefault();
		}
		(event.ctrlKey && event.key == "Enter")? smcfcper.cp(): 0;
		(event.key == "Escape")? smcfcper.exit(): 0;
		(event.ctrlKey && (event.key == "c" || event.key == "C"))? smcfcper.copy(): 0;
		(event.ctrlKey && event.key == "Delete")? smcfcper.clear(): 0;
		(event.ctrlKey && (event.key == "o" || event.key == "O"))? $('#fileInput').click(): 0;
		(event.ctrlKey && event.altKey && (event.key == "s" || event.key == "S"))? smcfcper.save(): 0;
	});
	msg.crt('', "热键注册完毕", 3);
	smcfcper.log("热键注册完毕, 重新注册请执行 smcfcper.reloadHotkey();");
}
