smcf.tagMgr = function(cmd, target, str) {
	if(!cmd || cmd == '') {
		put("# error on tag.mgr(): 命令参数不能为空!");
		return;
	}
	if(cmd == "ls" || cmd == "list") {
		if(!target || target == '') {
			put("# error on tag.ls(): 目标不能为空!");
			return;
		}
		else {
			put("# 输出" + target + "的所有标签");
			put("tag " + target + " list");
			return;
		}
	}
	else {
		if((!target || !str)||(target == '' || str == '')) {
			put("# error on tag.mgr(): 目标或标签名不能为空!");
			return;
		}
		let tip;
		if(cmd == "add") {tip = " ==> ";}
		else if(cmd == "remove" || cmd == "rm") {
			cmd = "remove";
			tip = " <== ";
		}
		else {put("# error on tag.mgr(): 未知的命令参数"); return;}
		put("# [tag]" + str + tip + "[player]" + target);
		put("tag " + target + ' ' + cmd + ' ' + str);
	}
}
