//smcf.js By freeDayO 李君子
//itemsList -- Xi⃰aozhi⃰Sans

const smcf = new class {
    _A = "@a"; _P = "@p"; _R = "@r"; _S = "@s"; _E = "@e"; _C = "@c"; _V = "@v"; _I = "@initiator";
    EOL = "<br>";
    __SUFFIX__ = ".mcfunction";
    __PATH__ = "main" + this.__SUFFIX__;
    main = {
        version: "v1.0.0",
        authors: ["Love-Kogasa", "XiaozhiSans", "Mys"],
	    getVer: () => {
		    console.log(this.main.version);
            return this.main.version;
	    }
    }
    relatNum/*relative number*/ = num => {
        return "~" + num;
    }
    say = str => {
        put("#PlayerName => " + str);
        put("say " + str);
        return str;
    }
    give = (item,number,data,who,json) => {
        (!item || item == '')? function() {put("# on give(); 错误: 物品名不能为空!"); return -1;}(): undefined;
        ( !who || who == '')? who = _S: undefined;
        ( !data || data == '')? data = 0: undefined;
        ( !number || number == '' )? number = 1: undefined;
        (!json || json == '')? json = '': undefined;
        put("#command => 将" + number + "个数据值为" + data + "的" + item + "给与" + who + " json: " + json);
        put("give " + who + " " + item + " " + number + " " + data + ' ' + json);
        return item;
    }
    command = command => {
        put("#执行指令" + command);
        put(command);
        return command;
    }
    cmd = this.command;
    path = () => {
        put("#当前文件名为" + __PATH__);
        put("say MC包内文件位置为 /function/" + __PATH__);
        return __PATH__;
     }
    mcfunction = str => {
        put("#引用" + str);
        put("function " + str );
        return str;
    }
    mcf = this.mcfunction;
    loop = (smcf,number) => {
        for(let h = 1; h <= number; h ++) {
            put(smcf);
        }
        return number;
    }
    kill = (kill,target) => {
        (!target || target == '')? target = "": target = "[type=" + target + "]";
        put("#杀死" + kill + target);
        put("kill "+ kill + target);
        return kill;
    }
    table = (str) => {
        let black = "█";
        let empty = "";
        for(let len2 = 0; len2 <= str.length; len2 += 1) {black += "█";}
        for(let len = 0; len < black.length - str.length - 2; len ++) {empty += " ";}
        put("say " + black);
        put("say " + "█" + str + empty + "█");
        put("say " + black);
        return str;
    }
    tab = this.table;
    tp = (f,t) => {
        (!t || t == '')? function() {
            put("# 传送到" + f);
            put("tp " + f)
            return f;
        }(): undefined;
        put("#将" + f + "传送到" + t );
        put("tp " + f + " " + t );
        return t;
    }
    teleport = this.tp;
    Bn = number => {
        return number.toString(2);
    }
    random = max => {
        return Math.floor(Math.random()*max);
    }
    clear = (str,h) => {
        let th = h || "";
        put("#清除玩家的物品" + str + h + "个<br>");
        put("clear " + str + ' ' + h);
    }
    put = str => {
        // 适配编译器
        // document.write(str + EOL);
        result.innerHTML += ('\n' + str);
        return str;
    }
    setblock = (block,xyz) => {
        put("#设置" + xyz + "的方块为" + block);
        put("setblock " + xyz + " " + block);
        return xyz;
    }
    //基础功能到此完毕
    // 嘿嘿啊哈哈哈
}

let put = smcf.put;
