import {crt as msg} from "./modules/cper.msg.js";
import css from "./modules/cper.done.css" with {type: "css"};


export default () => {
	msg("fa-solid fa-message", "欢迎使用 smcfcper! ~(￣▽￣~)", 3);
	findEles("version").forEach(e => e.innerText = smcfcper.info.verName);

	smcfcper.log("执行最后的操作");
	setTimeout(() => {
		smcfcper.reloadHotkey();
		smcfcper.getIdList(false);
		findEle("style").innerText = findEle("style").innerText.replace(/caret\-color\:.+\;/g, "caret-color: #fff;");
		document.adoptedStyleSheets.push(css);
	}, 1200);
	(() => {
		"use strict";
		const {basicSetup, EditorView} = CM["codemirror"];
		const {javascript, javascriptLanguage, scopeCompletionSource} = CM["@codemirror/lang-javascript"];
		window.view = new EditorView({
			doc: ``,
			extensions: [basicSetup, javascript(), javascriptLanguage.data.of({
				autocomplete: scopeCompletionSource(globalThis)
			})],
			parent: findEle("[smcfcode]")
		});
	})();
	
}
