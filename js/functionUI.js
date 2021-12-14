function displayStats(){
    document.querySelector("#lvl").innerHTML = player.lvl;
    document.querySelector("#exp").innerHTML = player.exp;
    document.querySelector("#expNeeded").innerHTML = calculExp(player.lvl);
    document.querySelector("#atk").innerHTML = player.atk;
    document.querySelector("#hp").innerHTML = player.hp;
}

function displayMonsters(){
    var cpt = 1;
    for (var key in monsters) {      
        var monsterName = monsters[key]["name"];
        var monsterHP = monsters[key]["hp"];
        var monsterAtk = monsters[key]["atk"];
        var buttonId = "fightButton"+cpt;
        var hpmId = "hpm"+cpt;
        $('#monsterList').append('<button type="button" id='+buttonId+' class="btn btn-outline-primary">Fight</button>');
        $('#monsterList').append( monsterName+' => <span id='+hpmId+'> HP : '+monsterHP+'</span> | Atk : '+monsterAtk);
        $('#monsterList').append('<br>')
        cpt += 1;
    }
}
