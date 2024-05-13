//smcf.js By freeDayO 李君子
//itemsList -- Xi⃰aozhi⃰Sans

const _A = "@a", _P = "@p", _R = "@r", _S = "@s", _E = "@e", _C = "@c", _V = "@v", _I = "@initiator";

const EOL = "<br>";
var __SUFFIX__ = ".mcfunction";
var __PATH__ = "main" + __SUFFIX__;

const block = {
    about : "~",
    PI : 3.14,
    default_x : 0,
    default_y : 0,
    default_z : 0,
    add : function(block,x,y,z){
        put("#生成" + block + "在" + x + " " + y + " " + z)
        put("setblock " + x + " " + y + " " + z + " " + block)
        return x + " " + y + " " + z
    },
    kill : function(x,y,z){
        put("#清除" + x + " " + y + " " + z + "的方块")
        put("setblock " + x + " " + y + " " + z + " minecraft:air")
        return "minecraft:air"
    },
    fill : function(from,to,block){
        put("#填充" + from + "到" + to + "的所有方块为" + block)
        put("fill " + from + " " + to + " " + block)
    },
    copy : function(xyz,toxyz,withxyz,other){
        put("#将" + xyz + "的方块复制到" + toxyz)
        let tother = other || ""
        put("clone " + xyz + " " + toxyz + " " + withxyz + " " + other)
    },
    linear : function(fromx,fromy,fromz,tox,toy,toz,block,maxlen){
        put("#画线")
        let Dx = tox - fromx, Dy = toy - fromy, Dz = toz - fromz, lenx = fromx, leny = fromy, lenz = fromz
        let proto = tox + " " + toy + " " + toz
        let valuex = fromx, valuey = fromy, valuez = fromz
        for(let c = 1; c <= maxlen; c++) {
            latter = lenx + " " + leny + " " + lenz
            lenx = lenx + Dx
            leny = leny + Dy
            lenz = lenz + Dz
            this.fill(valuex + " " + valuey + " " + valuez,lenx + " " + leny + " " + lenz,block)
            valuex += Dx
            valuey += Dy
            valuez += Dz
        }
    },
    Rlinear : function(fromx,fromy,fromz,tox,toy,toz,block,maxlen){
        put("#画线")
        let Dx = tox - fromx, Dy = toy - fromy, Dz = toz - fromz, lenx = fromx, leny = fromy, lenz = fromz
        let proto = tox + " " + toy + " " + toz
        let valuex = fromx, valuey = fromy, valuez = fromz
        for(let c = 1; c <= maxlen; c++){
            latter = lenx + " " + leny + " " + lenz
            lenx = lenx + Dx
            leny = leny + Dy
            lenz = lenz + Dz
            this.fill(Rn(valuex) + " " + Rn(valuey) + " " + Rn(valuez),Rn(lenx) + " " + Rn(leny) + " " + Rn(lenz),block)
            valuex += Dx
            valuey += Dy
            valuez += Dz
        }
    },
}
const smcf = {
    version: "v1.0.0",
    authors: ["Love-Kogasa", "XiaozhiSans", "Mys"]
}

function Rn/*relative number*/(number){
    return "~" + number;
}

function say(str){
    put("#PlayerName => " + str);
    put("say " + str);
    return str;
}

function give(item,number,data,who,json){
    if(!item || item == '') {put("# on give(); 错误: 物品名不能为空!"); return -1;}
    if( !who || who == ''){
        who = _S;
    }
    if( !data || data == ''){
        data = 0;
    }
    if( !number || number == '' ){
        number = 1;
    }
    if(!json || json == '') {json = ''}
    put("#command => 将" + number + "个数据值为" + data + "的" + item + "给与" + who + " json: " + json);
    put("give " + who + " " + item + " " + number + " " + data + ' ' + json);
    return item;
}

function command(command){
    put("#执行指令" + command);
    put(command);
    return command;
}
var cmd = command;

function path(){
    put("#当前文件名为" + __PATH__);
    put("say MC包内文件位置为 /function/" + __PATH__);
    return __PATH__;
}

function mcfunction(str){
    put("#引用" + str);
    put("function " + str );
    return str;
}
var mcf = mcfunction;

function loop(smcf,number){
    for(let h = 1; h <= number; h ++) {
        put(smcf);
    }
    return number;
}

function kill(kill,type){
    if(!type || type == '') {
        type = "";
    }
    else {
        type = "[type=" + type + "]";
    }
    put("#杀死" + kill + type);
    put("kill "+ kill + type);
    return kill;
}

function table(str){
    let black = "█";
    let empty = "";
    for(let len2 = 0; len2 <= str.length; len2 += 1) {black += "█";}
    for(let len = 0; len < black.length - str.length - 2; len ++) {empty += " ";}
    put("say " + black);
    put("say " + "█" + str + empty + "█");
    put("say " + black);
    return str;
}

function tp(f,t){
    // better tp
    if(!t || t == '') {
        put("# 传送到" + f);
        put("tp " + f)
        return f;
    }
    put("#将" + f + "传送到" + t );
    put("tp " + f + " " + t );
    return t;
}
var teleport = tp;

/* function tpeasy(xyz){
    put("#将玩家传送到" + xyz );
    put("tp " + xyz );
} */

function Bn(number){
    return number.toString(2);
}

function random(max){
    return Math.floor(Math.random()*max);
}

function clear(str,h){
    let th = h || "";
    put("#清除玩家的物品" + str + h + "个<br>");
    put("clear " + str + ' ' + h);
}

function put(str){
    // 适配编译器
    // document.write(str + EOL);
    result.innerHTML += ('\n' + str);
    return str;
}

/* function header(src){
    let script = document.createElement("script");
    script.src = src + ".js";
    document.card.insertBefore(script);
} */

function setblock(block,xyz){
    put("#设置" + xyz + "的方块为" + block);
    put("setblock " + xyz + " " + block);
    return xyz;
}

//基础功能到此完毕
