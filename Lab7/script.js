window.onhashchange=switchToStateFromURLHash;

text_content = {"Main": 'Танцевальный коллектив' + "<br>" + 'Генеральный директор: Химик Иван Сергеевич', "About": "Зажигательные котята - танцевальный коллектив и вообще они очень крутые молодцы реально классные просто успешный успех!"}
var state={};

function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    var stateStr=URLHash.substring(1);

    if (stateStr!="" ) {
        var parts=stateStr.split("_")
        state={pagename: parts[0]};
    }
    else
        state={pagename:"Main"};

    var pageHTML="";
    switch(state.pagename) {
        case "Main":
            pageHTML+="<p>"+text_content[state.pagename]+"</p>";
            break;
        case "About":
            pageHTML+="<h2>"+"О нас"+"<h2>";
            pageHTML+="<p>"+text_content[state.pagename]+"</p>";
            var photo="source/alotofcats.jpg";
            pageHTML+="<img src='"+photo+"'>";
            break;
    }

    document.getElementById('APage').innerHTML=pageHTML;
}

function switchToState(newState) {
    var stateStr=newState.pagename;
    location.hash=stateStr;
}

function switchToMainPage(photoId) {
    switchToState( { pagename:'Main', photoid:photoId} );
}

function switchToAboutPage(photoId) {
    switchToState( { pagename:'About', photoid:photoId} );
}

