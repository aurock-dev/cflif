function attack(monsterFighted, queryHpm){
    monsterFighted["hp"] = monsterFighted["hp"] - player.atk;
    document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
    if (monsterFighted["hp"] <= 0){
        monsterFighted["hp"] = monsterFighted["hpBase"];
        player.exp += monsterFighted["exp"];
        document.querySelector("#exp").innerHTML = player.exp;
        if (player.exp >= calculExp(lvl)){
            player.lvl += 1;
            player.exp = 0
            player.atk += 1;
            displayStats();
        }
    }
}

function fight(index){
    var monsterFighted = monsters["monster"+index]
    var queryHpm = "#hpm"+index;

    if (!toggleFight){
        toggleFight = setInterval(function(){attack(monsterFighted, queryHpm);}, player.vitesseAtk);
    }
    else if(toggleFight){
        clearInterval(toggleFight);
        toggleFight = null;
        monsterFighted["hp"] = monsterFighted["hpBase"];
        document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
    }
}