//smcf.js By freeDayO 李君子
//itemsList -- Xi⃰aozhi⃰Sans

let _A = "@a", _P = "@p", _R = "@r", _S = "@s", _E = "@e", _C = "@c", _V = "@v", _I = "@initiator";

const smcf = {
    /* EOL: "<br>",
    __SUFFIX__: ".mcfunction",
    __PATH__: "main" + this.__SUFFIX__, */
    relatNum/*relative number*/(num) {
        return "~" + num;
    },
    say(str) {
        put("#PlayerName => " + str);
        put("say " + str);
        return str;
    },
    give(item, number, data, who, json) {
        (!item || item == '')? (()=>{put("# on give(); 错误: 物品名不能为空!"); return -1;})(): 0;
        ( !who || who == '')? who = _S: 0;
        (!data || data == '')? data = 0: 0;
        (!number || number == '' )? number = 1: 0;
        (!json || json == '')? json = '': 0;
        put("#command 将" + number + "个数据值为" + data + "的" + item + "给与" + who + " json: " + json);
        put("give " + who + " " + item + " " + number + " " + data + ' ' + json);
        return item;
    },
    command(command) {
        put("#执行指令" + command);
        put(command);
        return command;
    },
    /* path() {
        put("#当前文件名为" + __PATH__);
        put("say MC包内文件位置为 /function/" + __PATH__);
        return __PATH__;
     }, */
    mcfunction(str) {
        put("#引用" + str);
        put("function " + str );
        return str;
    },
    loop(smcf,number) {
        for(let h = 1; h <= number; h ++) {
            put(smcf);
        }
        return number;
    },
    kill(kill,target) {
        (!target || target == '')? target = "": target = "[type=" + target + "]";
        put("#杀死" + kill + target);
        put("kill "+ kill + target);
        return kill;
    },
    table(str) {
        let black = "█";
        let empty = "";
        for(let len2 = 0; len2 <= str.length; len2 += 1) {black += "█";}
        for(let len = 0; len < black.length - str.length - 2; len ++) {empty += " ";}
        put("say " + black);
        put("say " + "█" + str + empty + "█");
        put("say " + black);
        return str;
    },
    tp(f,t) {
        (!t || t == '')? function() {
            put("# 传送到" + f);
            put("tp " + f)
            return f;
        }(): undefined;
        put("#将" + f + "传送到" + t );
        put("tp " + f + " " + t );
        return t;
    },
    Bn(number) {
        return number.toString(2);
    },
    random(max) {
        return Math.floor(Math.random()*max);
    },
    clear(str,h) {
        let th = h || "";
        put("#清除玩家的物品" + str + h + "个<br>");
        put("clear " + str + ' ' + h);
    },
    put(str) {
        document.write(str + EOL);
        return str;
    },
    setblock(block,xyz) {
        put("#设置" + xyz + "的方块为" + block);
        put("setblock " + xyz + " " + block);
        return xyz;
    }
    //基础功能到此完毕
}
