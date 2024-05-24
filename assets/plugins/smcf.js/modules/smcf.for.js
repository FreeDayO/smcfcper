smcf.for = (cmd, times, step) => {
	if(!times || times === '' || times === 0) {
		put("# smcf.for()错误: 次数不能为0");
		return;
	}
	if(!cmd || cmd == '') {
		put("# smcf.for()错误: 命令不能为空");
		return;
	}
	(!step || step == '')? step = 1: undefined; // 步长默认为 1
	if(typeof(step) !== "number" || step <= 0) {
		put("# smcf.for()错误: 步长不能为非数字或<=0");
		return;
	} // ˋ( ° ▽、° ) 我是石山建造者(摆烂 -- 摆的xs
	let putAux = str => {
		auxiliary.innerHTML = '';
		auxiliary.innerHTML += (str + '\n');
		// auxiliary.removeAttribute("data-highlighted");
	}, putLoops = str => {
		document.querySelector("code#loops").innerHTML = '';
		document.querySelector("code#loops").innerHTML += (str + '\n');

	}
	if(typeof(cmd) !== "string") {
		eval(cmd);
	}
	let auxCode =
`# auxiliary.mcfunction
# Create by Mys
# Compiled by XiaoZhiSans /* 屑XS: 我不好说( */
#------------------

# execute unless entity @e [tag=system] run structure loadSystem.stru 0 0 0
# 此命令由于缺少结构:loadSystem.stru，无法执行。
# 此命令将被重制 by Mys

#getRoot 操作，准备对实体赋予 Root 权限
execute unless entity @e [tag=system] run summon slime "system.getRoot" 0 16777216 0

# 对该操作创建 RootManager (Root 权限管理器)，简称 RM
execute unless entity @e [tag=system] run tag @e [type=slime,name="system.getRoot"] RootManager

# 通过这个单次创建出来的 RM 创建 slime 作为命令执行主体 (system)
execute if entity @e [tag=RootManager] unless entivity @e [tag=system] at @e [tag=RootManager] run summon slime "system" ~ ~ ~

# 为 system 添加 {tag:system}
execute if entity @e [tag=RootManager] unless entivity @e [tag=system] run tag @e [name=system,c=1] add system

# 这里有个越权漏洞，假如有人在执行这个 function 之前就已经搞好了这么一个满足条件的 slime (name=system)
# 而正好原来的执行主体，不知道因为什么情况没有了，就会出现玩家的这个 slime 直接被当成原装 system
# 安装入内核，可能会引发极其严重的权限漏洞

# 为避免这个情况，请不要删除 line 19：'selector:@e [...>c=1<]'
# 这个 c=1 绝对绝对绝对不能删，删了等于 xz 开源项目被投毒一样的事件

# 检查 system 主体数量
execute if entity @e [tag=system,c=1..2147483647] run execute at @e [tag=RootManager] run tag @e [tag=system,c=1,r=10] add safeInitSys

# 除了 safeInitSys，其他 system 全部进行销毁处理
execute if entity @e [tag=safeInitSys] run tp @e [tag=system,tag=!safeInitSys] 0 -128 0

# 销毁完成后恢复 system
execute as entity @e [tag=safeInitSys] run tag @s remove safeInitSys

# 赋予 system 免虚空伤害权限
effect @e [tag=system] resistance 2147483647 255 true

# 将 system 转移到系统内核 (最低原点)
tp @e [tag=system] 0 -30000000 0

#system 已创建完成，移除之前交接权限的 RootManager
execute if entity @e [tag=RootManager] run kill @e [tag=RootManager]

# 创建计分板 a
execute if entity @e [tag=system] unless entity @e [tag=system,tag=sco.inited] run scoreboard objectives add a dummy

# 创建完后执行 tag add sco.inited, 确保不会重复创建
execute unless entity @e [tag=system,tag=sco.inited] run tag @e [tag=system] add sco.inited

# 给计分板 a 赋值
execute if entity @e [tag=system,tag=sco.inited] unless entity @e [tag=system,tag=sco.hasVaule] run scoreboard players set @e [tag=system] a = 0

# 赋值完之后执行 tag add sco.hasVaule, 确保不会重复执行
tag @e [tag=system,tag=sco.inited,tag=!sco.hasVaule] add sco.hasVaule

# 单次执行语句
# 加上 execute if entity @e [tag=system,tag=sco.inited,tag=sco.hasVaule,scores={a=$0}] run 作为前缀

# 这里是要执行的语句 (循环体)
function loops

# 使用记分板 a 作为循环次数的记录
scoreboard players add @e [tag=system,tag=sco.inited,tag=sco.hasVaule] a ${step}

execute if entity @e [tag=system,scores={a=0..${times}}] run function auxiliary`
	putAux(auxCode);
	putLoops(cmd);
	smcf.mcf("auxiliary");
}
