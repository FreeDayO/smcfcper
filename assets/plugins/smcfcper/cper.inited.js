import {crt as msg} from "./modules/cper.msg.js";
import css from "./modules/cper.done.css" with {type: "css"};
document.adoptedStyleSheets.push(css);


export default () => {
	msg("fa-solid fa-message", "欢迎使用 smcfcper! ~(￣▽￣~)", 3);
	findEles("version").forEach(e => e.innerText = smcfcper.info.verName);
}
