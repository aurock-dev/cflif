function displayStats(){
    document.querySelector("#lvl").innerHTML = lvl;
    document.querySelector("#exp").innerHTML = exp;
    document.querySelector("#expNeeded").innerHTML = calculExp(lvl);
    document.querySelector("#atk").innerHTML = atk;
}

function displayMonsters(){
    for (let index = 0; index < monsters; index++) {        
        $('#monsterList').append('<button type="button" id="fightButton" class="btn btn-outline-primary">Fight</button>');
        $('#monsterList').append('<span id="monsterName"> monster</span> : <span id="hpm">10</span> HP');
        $('#monsterList').append('<br>')
    }
}