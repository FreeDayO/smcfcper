/**
 * common lib static by @XiaozhiSans
 */
const print = console.log;

const findEle = e => document.querySelector(e),
	  findEles = e => document.querySelectorAll(e);

const exportToGlobal = etg = (...a) => {a.forEach(a => {globalThis[`${a}`] = a;});};
