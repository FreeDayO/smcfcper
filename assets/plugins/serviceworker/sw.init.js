const reRegSW = () => {
	let isLocalEnv = location.hostname === "127.0.0.1" || location.hostname === "localhost";
	(navigator.serviceWorker && !isLocalEnv)? (() => {
		navigator.serviceWorker.register('sw.js')
		.then(function(registration) {
			console.log(`[cper-sw] 已在该范围注册 serviceWorker: ${registration.scope}\n\t重新注册请执行 reRegSW();`);
		});
	})():console.log("[cper-sw] 当前处于本地环境或浏览器不支持 serviceWorker, 注册将会取消\n\t\t  重新注册请执行 reRegSW();");
}

reRegSW();
