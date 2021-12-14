function attack(index){
    var monsterIndex = "monster"+index
    var queryHpm = "#hpm"+index;
    monsters[monsterIndex]["hp"] = monsters[monsterIndex]["hp"] - player.atk;
    document.querySelector(queryHpm).innerHTML = monsters[monsterIndex]["hp"];
    if (monsters[monsterIndex]["hp"] <= 0){
        monsters[monsterIndex]["hp"] = monsters[monsterIndex]["hpBase"];
        player.exp += monsters[monsterIndex]["exp"];
        document.querySelector("#exp").innerHTML = player.exp;
        if (player.exp >= calculExp(lvl)){
            player.lvl += 1;
            player.exp = 0
            player.atk += 1;
            displayStats();
        }
    }
}

var toggleFight;

function fight(index){
    if (!toggleFight){
        toggleFight = setInterval(function(){attack(index+1);}, player.vitesseAtk);
    }
    else if(toggleFight){
        clearInterval(toggleFight);
        toggleFight = null;
    }
}