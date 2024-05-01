const block = {
    about : "~",
    PI : 3.14,
    default_x : 0,
    default_y : 0,
    default_z : 0,
    add : function(block,x,y,z){
        put("#生成" + block + "在" + x + " " + y + " " + z)
        put("setblock " + x + "" + y + "" + z + " " + block)
        return x + " " + y + " " + z
    },
    kill : function(x,y,z){
        put("#清除" + x + " " + y + " " + z + "的方块")
        put("setblock " + x + "" + y + "" + z + " minecraft:air")
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