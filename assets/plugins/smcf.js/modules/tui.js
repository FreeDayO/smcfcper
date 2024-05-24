const mcTui = {
    rawTemplate : {
        rawtext : [
            {
                text : "string"
            }
        ]
    },
    textStyles : {
        black : "§0",
        purple :  "§1",
        green : "§2",
        blue : "§3",
        red : "§4",
        purpleRed : "§5",
        orange : "§6",
        lightdark : "§7",
        dark : "§8",
        lightpurple : "§9",
        lightgreen : "§a",
        lightblue : "§b",
        lightred : "§c",
        pink : "§d",
        yellow : "§e",
        white : "§f",
        IDKSTYLE : "§k",
        bold : "§l",
        italic : "§o",
        clear : "§r",
        remove : "§m",
        unline : "§n",
        underline : "§n",
        list : "• ",
        mouse : "↗ ",
        star : "☆ ",
        create : styles => styles.join( "" ),
        getByName : name => this[name],
        createByName : function( names ){
            let ret = ""
            for( let name of names ){
                ret += this[name] || name
            }
            return ret
        }
    },
    tell : function( text, who="@a"){
        put( "tell " + who + " " + text )
        put( "#输出" + text + "在" + who + "的屏幕上" )
    },
    getRawJson( text="" ){
        return JSON.stringify( mcTui.rawTemplate ).replace( "string", `"${text}"` )
    },
    tellraw : function( text, who="@a" ){
        put( "tellraw " + who + " " + this.getRawJson( text ))
        put( "#输出" + text + "在" + who + "的聊天栏里" )
    },
    init : function( cmd="tell @a" ){
        let cmdOut = ""
        let thenFuncs = {
            title : function( text ){
                cmdOut += cmd + " §l" + `———${text}———\n`
                return this
            },
            link : function( text, style="§n§3" ){
                cmdOut += cmd + " " + style + text + "\n"
                return this
            },
            button : function( btns, style="§n§3" ){
                let textText = cmd + " " + style
                if( Array.isArray( btns ) ){
                    for( btn of btns ){
                        make$( btn )
                    }
                } else {
                    make$( btns )
                }
                function make$( btnname ){
                    textText += "> " + btnname + " <"
                }
                cmdOut += textText + "\n"
                return this
            },
            list : function( array, showNum=false ){
                for( let li in array ){
                    if( showNum ){
                        cmdOut += cmd + " " + li + " " + array[li] + "\n"
                    } else {
                        cmdOut += cmd + " • " + array[li] + "\n"
                    }
                }
                return this
            },
            text : function( txt ){
                cmdOut += cmd + " " + txt + "\n"
                return this
            },
            put : function(){
                let retV = cmdOut
                put( cmdOut )
            }
        }
        return thenFuncs
    },
    initraw : function( cmd="tell", who="@a" ){
        let usecmd = cmd + "raw"
        let cmdOut = ""
        let thenFuncs = {
            title : function( text, style="§l§7" ){
                cmdOut += usecmd + " " + who + " " + mcTui.getRawJson( style + text.replace( /\n/g, "\\n" ) ) + "\n"
                return this
            },
            link : function( text, style="§n§3" ){
                cmdOut += usecmd + " " + who + " " + mcTui.getRawJson( style + text.replace( /\n/g, "\\n" ) ) + "\n"
                return this
            },
            button : function( btns, style="§n§3" ){
                let textText = usecmd + " " + who
                let text$ = ""
                if( Array.isArray( btns ) ){
                    for( btn of btns ){
                        make$( btn )
                    }
                } else {
                    make$( btns )
                }
                function make$( btnname ){
                    text$ += "> " + btnname + " <"
                }
                cmdOut += textText + " " + mcTui.getRawJson( text$.replace( /\n/g, "\\n" ) ) + "\n"
                return this
            },
            list : function( array, showNum=false ){
                for( let li in array ){
                    if( showNum ){
                        cmdOut += usecmd + " " + who + " " + mcTui.getRawJson( ( li + " " + array[li]).replace( /\n/g, "\\n" ) ) + "\n"
                    } else {
                        cmdOut += usecmd + " " + who + " " + mcTui.getRawJson( (" • " + array[li]).replace( /\n/g, "\\n" ) ) + "\n"
                    }
                }
                return this
            },
            text : function( txt ){
                cmdOut += usecmd + " " + who + " " + mcTui.getRawJson( txt.replace( /\n/g, "\\n" ) ) + "\n"
                return this
            },
            put : function(){
                let retV = cmdOut
                put( cmdOut )
            }
        }
        return thenFuncs
    }
}
//tellraw @a {"rawtext":[{"text": "helloWorld"}]}