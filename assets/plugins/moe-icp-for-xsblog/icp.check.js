function icpCheck(f) {
	let icpInfo = `<a href="https://icp.gov.moe/?keyword=20241144" target="_blank">萌ICP备20241144号</a>`;
	if (f > 0 || f) {
		currentUrl = window.location.href;

		if (currentUrl.startsWith("http://xiaozhisans.blogu.tc/" || "https://xiaozhisans.blogu.tc/")) {
			document.querySelector("icp").innerHTML = icpInfo;
		}
		return "检测url";
	}
	else {
		document.querySelector("icp").innerHTML = icpInfo;
		return "不检测url";
	}
}