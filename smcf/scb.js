/*
	---
	file: scb.js
	name: smcf.js scoreboard 命令库
	author: XiaozhiSans
	release date: 2024/01/25
	update date: 2024/03/25
	---

	指令语法笔记
	项目类
	scoreboard objectives add <objective: string> dummy [displayName: string]
	scoreboard objectives list
	scoreboard objectives remove <objective: string>
	scoreboard objectives setdisplay <list|sidebar> [objective: string] [ascending|descending]
	scoreboard objectives setdisplay belowname [objective: string]
	玩家类
	scoreboard players <set|add|remove> <player: target> <objective: string> <count: int>
	scoreboard players list [playername: target]
	scoreboard players operation <targetName: target> <targetObjective: string> <operation: operator> <selector: target> <objective: string>
	scoreboard players random <player: target> <objective: string> <min: int> <max: int>
	scoreboard players reset <player: target> [objective: string]
	scoreboard players test <player: target> <objective: string> <min: wildcard int> [max: wildcard int]
*/

const scb= {
	// 项目类
	ls: function() {
		put("# 输出所有记分板");
		put("scoreboard objectives list");
		return 0;
	},
	crt: function(internalName, displayName) {
		if(displayName == "#") {
			put("# 创建一个内部名称为" + internalName + "的记分板项目");
			put("scoreboard objectives add " + internalName + " dummy");
		} else {
			put("# 创建一个内部名称为" + internalName + "显示名称为" + displayName + "的记分板");
			put("scoreboard objectives add " + internalName + " dummy " + displayName);
		}
		return 0;
	},
	del: function(internalName) {
		put("# 删除内部名称为" + internalName + "的记分板");
		put("scoreboard objectives remove " + internalName);
		return 0;
	},
	setDPMD: function(internalName, displayMethod, reverse) {
		// 24/01/25 我觉得小李子也有权被我的屎山震惊到 ┐(￣▽￣)┍
		// 24/03/25 改了改了，我无地自容 →_→
		if((internalName == "#")&&(reverse == "#")) {
				put("# 重置" + displayMethod + "显示区域");
				put("scoreboard objectives setdisplay " + displayMethod);
			} else if(reverse&&(displayMethod != "belowname")) {
				put("# 设置内部名称为" + internalName + "的记分板的显示方法为降序的" + displayMethod);
				put("scoreboard objectives setdisplay " + displayMethod + " " + internalName + " deascending");
			} else if(reverse == "#") {
				put("# 设置" + internalName + "记分板的显示方法为" + displayMethod);
				put("scoreboard objectives setdisplay " + displayMethod + " " + internalName);
		} else {return "error: invalid arguments!";}
		return 0;
	},


	// 玩家类
	output: function(target) {
		put("# 输出 " + target + " 的全部记分板分数");
		put("scoreboard players list " + target);
		return 0;
	},
	setRand: function(target, internalName, min, max) {
		put("# 对 " + target + " 的 " + internalName + " 记分项在 " + min + " ~ " + max + " 范围内随机赋值");
		put("scoreboard players random " + target + " " + internalName);
		return 0;
	},
	test: function(target, internalName, min, max) {
		// min和max可为"*"以代表整型数范围内的任何值（-2147483648 ~ 2147483647）
		if(max == "#") {
			put("# 检测" + target + "的" + internalName + "记分项是否在" + min + " ~ 2147483647内");
			put("scoreboard players test " + target + " " + internalName + " " + min);
		} else {
			put("# 检测" + target + "的" + internalName + "记分项是否在" + min + " ~ " + max + "内");
			put("scoreboard players test " + target + " " + internalName + " " + min + " " + max);
		}
		return 0;
	},
	remove: function(target, internalName) {
		if(internalName == "#") {
			put("# 移除" + target + "的全部记分板项目");
			put("scoreboard players reset " + target);
		} else {
			put("# 移除" + target + "的" + internalName + "记分项");
			put("scoreboard players reset " + target + " " + internalName);
		}
		return 0;
	},
	oper: function(target, internalName, operator, count) {
		if(operator == "+") {operator = "add"}
		if(operator == "-") {operator = "remove"}
		if(operator == "=") {operator = "set"}
		if((operator != "set")&&(operator != "add")) {return "error: invalid operator!";} else {
			put("# 对" + target + "的" + internalName + "记分项进行" + operator + count + "操作");
			put("scoreboard players " + operator + " " + target + " " + internalName + " " + count);
		}
		return 0;
	},
	operPro: function(target, internalName, operator, target2, internalName2) {
		if((target2 == "#")&&(internalName2 == "#")) {target2 = target, internalName2 = internalName;}
		if((operator != "+=")&&(operator != "-=")&&(operator != "*=")&&(operator != "/=")&&(operator != "%=")&&(operator != "=")&&(operator != "<")&&(operator != ">")&&(operator != "><")) {return "error: invalid operator!"}
		// 怎么这么多运算符啊（恼
		put("# 把" + target2 + "在" + internalName2 + "的记分项进行" + operator + "运算后赋给" + target + "在" + internalName + "的记分项");
		// 用的不多废了我好大功夫才李姐
		put("scoreboard players operation " + target + " " + internalName + " " + operator + " " + target2 + " " + internalName2);
		return 0;
	}
}