//smcf.js By freeDayO 李君子
//ItemsList -- Xi⃰aozhi⃰Sans

const _A = "@a", _P = "@p", _R = "@r", _S = "@s", _E = "@e", _C = "@c", _V = "@v", _I = "@initiator";

const EOL = "<br>";
var __SUFFIX__ = ".mcfunction";
var __PATH__ = "mainsmcf" + __SUFFIX__;

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
        var tother = other || ""
        put("clone " + xyz + " " + toxyz + " " + whithxyz + " " + other)
    },
    linear : function(fromx,fromy,fromz,tox,toy,toz,block,maxlen){
        put("#画线")
        var Dx = tox - fromx
        var Dy = toy - fromy
        var Dz = toz - fromz
        var lenx = fromx
        var leny = fromy
        var lenz = fromz
        var proto = tox + " " + toy + " " + toz
        var latter
        var c = 1
        var valuex = fromx
        var valuey = fromy
        var valuez = fromz
        while( c <= maxlen){
            latter = lenx + " " + leny + " " + lenz
            lenx = lenx + Dx
            leny = leny + Dy
            lenz = lenz + Dz
            c += 1
            this.fill(valuex + " " + valuey + " " + valuez,lenx + " " + leny + " " + lenz,block)
            valuex += Dx
            valuey += Dy
            valuez += Dz
        }
    },
    Rlinear : function(fromx,fromy,fromz,tox,toy,toz,block,maxlen){
        put("#画线")
        var Dx = tox - fromx
        var Dy = toy - fromy
        var Dz = toz - fromz
        var lenx = fromx
        var leny = fromy
        var lenz = fromz
        var proto = tox + " " + toy + " " + toz
        var latter
        var c = 1
        var valuex = fromx
        var valuey = fromy
        var valuez = fromz
        while( c <= maxlen){
            latter = lenx + " " + leny + " " + lenz
            lenx = lenx + Dx
            leny = leny + Dy
            lenz = lenz + Dz
            c += 1
            this.fill(Rn(valuex) + " " + Rn(valuey) + " " + Rn(valuez),Rn(lenx) + " " + Rn(leny) + " " + Rn(lenz),block)
            valuex += Dx
            valuey += Dy
            valuez += Dz
        }
    },
}

function Rn/*relative number*/(number){
    return "~" + number;
}

function say(str){
    put("#PlayerName => " + str);
    put("say " + str);
    return str;
}

function give(item,number,nai,who){
    if( !who ){
        var twho = "@a";
    }
    else {
        var twho = who;
    }
    if( !nai ){
        var tnai = "0";
    }
    else {
        var tnai = nai;
    }
    if( !number ){
        var tnumber = 1;
    }
    else {
        var tnumber = number;
    }
    put("#command => 将" + tnumber + "个破损为" + tnai + "的" + item + "给与" + twho);
put("give " + twho + " " + item + " " + tnumber + " " + tnai);
    return item;
}

function command(command){
    put("#执行指令" + command);
    put(command);
    return command;
}

function path(){
    put("#当前文件名为" + __PATH__);
    put("say MC包内文件位置为 /function/" + __PATH__);
    return __PATH__;
}

function mcfunction(str){
    put("#引用" + str);
    put("function" + str );
    return str;
}

function tick(smcf,number){
    var h = 1;
    var smcffunc = smcf;
    while ( h <= number ){
        put(smcffunc);
        h++;
    }
    return number;
}

function kill(kill,type){
    if (!type){
        var ttype = "";
    }
    else {
        var ttype = "[type=" + type + "]";
    }
    put("#杀死" + kill + ttype);
    put("kill "+ kill + ttype);
    return kill;
}

function table(str){
    var black = "█";
    var air = "";
    var len = 0;
    var len2 = 0;
    var strlength = str.length;
    while ( len2 <= strlength ){
        black = black + "█";
        len2 += 1;
    }
    while ( len < black.length - str.length - 2 ){
        air = air + " ";
        len += 1;
    }
    put("say " + black);
    put("say " + "█" + str + air + "█");
    put("say " + black);
    return str;
}

function tp(f,t){
    // better tp
    if(typeof(t) == "undefined" || t == '') {
        put("# 传送到" + f);
        put("tp" + ' ' + f)
        return f;
    }
    put("#将" + f + "传送到" + t );
    put("tp " + f + " " + t );
    return t;
}

function tpeasy(xyz){
    put("#将玩家传送到" + xyz );
    put("tp " + xyz );
}

function Bn(number){
    return number.toString(2);
}

function random(max){
    var randommath = Math.floor(Math.random()*max);
    return randommath;
}

function clear(str,h){
    var th = h || "";
    put("#清除玩家的物品" + str + h + "个<br>");
    put("clear " + str + h);
}

function put(str){
    // 适配编译器
    // document.write(str + EOL);
    result.innerHTML += ('\n' + str);
}

function header(src){
    var script = document.createElement("script");
    script.src = src + ".js";
    document.card.insertBefore(script);
}

function setblock(block,xyz){
    put("#设置" + xyz + "的方块为" + block);
    put("setblock " + xyz + " " + block);
    return xyz;
}

//基础功能到此完毕
