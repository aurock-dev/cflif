function displayStats(){
    document.querySelector("#lvl").innerHTML = lvl;
    document.querySelector("#exp").innerHTML = exp;
    document.querySelector("#expNeeded").innerHTML = calculExp(lvl);
    document.querySelector("#atk").innerHTML = atk;
}

function displayMonsters(){
    var cpt = 1;
    for (var key in monsters) {      
        var monsterName = monsters[key]["name"];
        var monsterHP = monsters[key]["hp"];
        var buttonId = "fightButton"+cpt;
        var hpmId = "hpm"+cpt;
        $('#monsterList').append('<button type="button" id='+buttonId+' class="btn btn-outline-primary">Fight</button>');
        $('#monsterList').append('<span id="monsterName"> '+monsterName+'</span> : <span id='+hpmId+'>'+monsterHP+'</span> HP');
        $('#monsterList').append('<br>')
        cpt += 1;
    }
}
