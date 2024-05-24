smcfcper.cookie = {
	get: () => {return document.cookie;},
	read: () => {
		let codeCookie, cookies = smcfcper.cookie.get();
		if(cookies == '') {return;}
		cookies = cookies.split('; ');
		for(let cookie of cookies) {
			if(cookie.startsWith("code")) {
				codeCookie = cookie;
				break;
			}
		}
		code.innerHTML = codeCookie.split('=')[1];
		return codeCookie;
	},
	setup: () => {
		let date = new Date();
		date.setDate(date.getDate() + 7); // 有效期7天
		document.cookie = `code=${code.innerHTML}; expires=${date}`;
	}
}

// 不管怎样先获取一次cookie并返回页面
smcfcper.cookie.read();
// 每5分钟更新一次cookie
setInterval(() => {
	smcfcper.cookie.setup();
}, 60000 * 5);
