// TODO passer les querySelector en jquery

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
        if (player.exp >= expNeeded(player.lvl)){
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

function choseStat(index){
    if (player.statsPoints > 0){
        switch (index) {
            case 1:
                player.force += 1;
                break;
            case 2:
                player.vigour += 1;
                break;
            case 3:
                player.agility += 1;
                break;
            case 4:
                player.wisdom += 1;
                break;
            default:
                break;
            }
        player.statsPoints -= 1;
        displayStats();
    }
}