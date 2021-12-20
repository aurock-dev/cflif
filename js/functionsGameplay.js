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
        $('#playerAction').text("Player begin to fight "+monsterFighted["name"]+".")
        monsterAttacking = setInterval(function(){monsterAttack(monsterFighted, queryHpm, queryButton);}, monsterFighted["atkSpeed"]);
    }
    else if(playerAttacking){
        clearAttacks();
        resetMonster(monsterFighted, queryHpm, queryButton);
    }
}

function playerAttack(monsterFighted, queryHpm, queryButton){
    var damage = testIfAtkCrit(monsterFighted);
    $(queryHpm).text(monsterFighted["hp"]);
    $(queryButton).text("Fighting...");
    $('#playerAction').text("Player attack "+monsterFighted["name"]+" with "+damage+" damages.")
    if (monsterFighted["hp"] <= 0){
        monsterFighted["hp"] = monsterFighted["hpMax"];
        player.exp += monsterFighted["exp"];
        $('#exp').text(player.exp);
        $('#playerAction').text("Player defeat "+monsterFighted["name"]+" and gain "+monsterFighted["exp"]+" exp.")
        if (player.exp >= expNeeded(player.lvl)){
            levelUp();
            displayUpgradableStat(true);
        }
    }
}

function monsterAttack(monsterFighted, queryHpm, queryButton){
    var damageMonster = attackMinusDefense(monsterFighted["atk"])
    player.hp -= damageMonster;
    $('#hp').text(player.hp)
    $('#monsterAction').text(monsterFighted["name"]+" attack player with "+damageMonster+" damages.")
    if (player.hp <= 0){
        $('#playerAction').text("Player is dead.")
        $('#monsterAction').text(monsterFighted["name"]+" beat Player.")
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
    monsterFighted["hp"] = monsterFighted["hpMax"];
    $(queryHpm).text(monsterFighted["hp"]);
    $(queryButton).text("Fight");
}

function choseStat(index){
    if (player.statsPoints > 0){
        switch (index) {
            case 1:
                calcForce();
                $('#playerAction').text("Player chooses to upgrade Force.")
                break;
            case 2:
                calcVigour();
                $('#playerAction').text("Player chooses to upgrade Vigour.")
                break;
            case 3:
                calcAgility();
                $('#playerAction').text("Player chooses to upgrade Agility.")
                break;
            case 4:
                calcWisdom();
                $('#playerAction').text("Player chooses to upgrade Wisdom.")
                break;
            default:
                break;
            }
        player.statsPoints -= 1;
        displayStats();
    }
    if (player.statsPoints <= 0){
        displayUpgradableStat(false);
    }
}