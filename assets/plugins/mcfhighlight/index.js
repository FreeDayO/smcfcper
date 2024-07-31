function mcfHighLight( mcfunction ){
    var out = []
    // line是JSLabel
    line : for( let cmd of mcfunction.split( "\n" ) ){
        let words = cmd.trim().split( " " ),
            add = []
        for( let index in words ){
            let word = words[ index ]
            if( word[0] == "#" ){
                add = '<span class="mcf-note">' +
                    words
                        .join( " " )
                            + "</span>"
                out.push( add )
                continue line;
            }
            add.push(
                index == 0 ?
                    '<span class="mcf-cmd">' +
                    word + '</span>' :
                    word[ 0 ] === "@" ?
                        '<span class="mcf-type">' +
                        word + "</span>" :
                        ( word[0] === "~" ||
                        word[0] === "^" ||
                        Number( word ) ) ?
                            '<span class="mcf-num">' +
                            word + "</span>" :
                            '<span class="mcf-arg">' +
                            word + "</span>"
            )
        }
        out.push( add.join( " " ) )
    }
    return out.join( "\n" )
}
if( typeof module == "object" ) module.exports = mcfHighLight
//test console.log( mcfHighLight( "say @a SeeAtMe\n#114514" ) )