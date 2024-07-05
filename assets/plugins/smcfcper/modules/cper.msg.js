import css from "./cper.msg.css" with {type: "css"};
document.adoptedStyleSheets.push(css);

let msgNum = 0;
const msgNumChanged = () => {
	(msgNum !== 0)? findEle("title").innerText =
	`(${msgNum}) ${findEle("title").innerText.replace(/\(\d\)/, '')}`:
	0;
};

const create = (icon, title, timeout) => {
	msgNum++;
	const msgEle = `<div class="msg" msg-num="${msgNum}" onclick="msg.rm(this);">
		<i class="msg-icon ${icon}"></i>
		<p class="msg-title">${title}</p>
		<!-- <p class="msg-content">{content}</p> -->
	</div>`;
	document.body.appendChild(document.createRange().createContextualFragment(msgEle));
	if(!timeout); else {setTimeout(() => {rm(findEle(`[msg-num="${msgNum}"]`))}, timeout * 1e3)}
	msgNumChanged();
}, crt = create;

const remove = target => {
	msgNum--, document.body.removeChild(target);
	findEles("div.msg").forEach(e => {
		if(target.getAttribute("msg-num") === e.getAttribute("msg-num"));
		else {e.setAttribute("msg-num", ~~(e.getAttribute("msg-num")) - 1)}
	});
	msgNumChanged();
}, rm = remove;

export {create, remove, crt, rm};
