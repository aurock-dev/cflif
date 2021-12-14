function selectMonster(){
    var fightButton = document.querySelectorAll("[id^='fightButton']");
    for (let index = 0; index < fightButton.length; index++) {   
        fightButton[index].addEventListener("click", function(){
            fight(index+1), false});
    }
}

function fight(index){
    var monsterFighted = monsters["monster"+index]
    var queryHpm = "#hpm"+index;
    var queryButton = "#fightButton"+index;

    if (!playerAttacking){
        playerAttacking = setInterval(function(){attack(monsterFighted, queryHpm, queryButton);}, player.atkSpeed);
        monsterAttacking = setInterval(function(){monsterAttack(monsterFighted);}, monsterFighted["atkSpeed"]);
    }
    else if(playerAttacking){
        clearAttacks()
        monsterFighted["hp"] = monsterFighted["hpBase"];
        document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
        document.querySelector(queryButton).innerHTML = "Fight";
    }
}

function attack(monsterFighted, queryHpm, queryButton){
    monsterFighted["hp"] = monsterFighted["hp"] - player.atk;
    document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
    document.querySelector(queryButton).innerHTML = "Fighting...";
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

function monsterAttack(monsterFighted, queryButton){
    player.hp -= monsterFighted["atk"];
    document.querySelector("#hp").innerHTML = player.hp;
    if (player.hp <= 0){
        player.hp = player.hpMax;
        player.exp = 0;
        displayStats()
        clearAttacks()
        console.log("mort")
    }

}

function clearAttacks(){
    clearInterval(playerAttacking);
    playerAttacking = null;
    clearInterval(monsterAttacking);
    monsterAttacking = null;
}
