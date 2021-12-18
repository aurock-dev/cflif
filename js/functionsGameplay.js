function selectMonster(){
    var fightButton = document.querySelectorAll("[id^='fightButton']");
    for (let index = 0; index < fightButton.length; index++) {   
        fightButton[index].addEventListener("click", function(){
            fight(index+1), false});
    }
}


function selectStat(){
    var statButton = document.querySelectorAll("[id^='statButton']");
    for (let index = 0; index < statButton.length; index++) {   
        statButton[index].addEventListener("click", function(){
            choseStat(index+1), false});
    }
}

function fight(index){
    var monsterFighted = monsters["monster"+index]
    var queryHpm = "#hpm"+index;
    var queryButton = "#fightButton"+index;

    if (!playerAttacking){
        playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryButton);}, player.atkSpeed);
        monsterAttacking = setInterval(function(){monsterAttack(monsterFighted, queryHpm, queryButton);}, monsterFighted["atkSpeed"]);
    }
    else if(playerAttacking){
        clearAttacks();
        resetMonster(monsterFighted, queryHpm, queryButton);
    }
}

function playerAttack(monsterFighted, queryHpm, queryButton){
    monsterFighted["hp"] = monsterFighted["hp"] - player.atk;
    document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
    document.querySelector(queryButton).innerHTML = "Fighting...";
    if (monsterFighted["hp"] <= 0){
        monsterFighted["hp"] = monsterFighted["hpBase"];
        player.exp += monsterFighted["exp"];
        document.querySelector("#exp").innerHTML = player.exp;
        if (player.exp >= calculExp(player.lvl)){
            levelUp();
        }
    }
}

function monsterAttack(monsterFighted, queryHpm, queryButton){
    player.hp -= monsterFighted["atk"];
    document.querySelector("#hp").innerHTML = player.hp;
    if (player.hp <= 0){
        resetMonster(monsterFighted, queryHpm, queryButton);
        clearAttacks();
        player.hp = player.hpMax;
        player.exp = 0;
        displayStats()
    }

}

function clearAttacks(){
    clearInterval(playerAttacking);
    playerAttacking = null;
    clearInterval(monsterAttacking);
    monsterAttacking = null;
}

function resetMonster(monsterFighted, queryHpm, queryButton){
    monsterFighted["hp"] = monsterFighted["hpBase"];
    document.querySelector(queryHpm).innerHTML = monsterFighted["hp"];
    document.querySelector(queryButton).innerHTML = "Fight";
}

function levelUp(){
    player.lvl += 1;
    player.exp = 0 //TODO pas egale 0, calculer le reste et ajouter
    player.statsPoints += 1;
    player.hp = player.hpMax;
    displayStats();
    $('#statButton1').show();
    $('#statButton2').show();
}

function choseStat(index){
    switch (index) {
        case 1:
            player.atk += playerLvlUp.atk;
            break;
        case 2:
            player.hpMax += playerLvlUp.hp;
            player.hp = player.hpMax;
            break;
        default:
            break;
        }
    player.statsPoints -= 1;
    displayStats();
    if (player.statsPoints <= 0){
        $('#statButton1').hide();
        $('#statButton2').hide();
    }
}