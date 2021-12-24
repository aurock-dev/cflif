function selectMonster(){
    for (let index = 0; index < monstersNumber; index++) {   
        $('[id=fightButton'+index+']').click(function(){
            fight(index)});
    }
}

function selectStat(){
    for (let index = 0; index < 4; index++) {   
        $('[id=statButton'+index+']').click(function(){
            choseStat(index)});
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
        resetMonsters();
    }
}

function playerAttack(monsterFighted, queryHpm, queryButton){
    var damage = testIfAtkCrit(monsterFighted);
    $(queryHpm).text(monsterFighted["hp"]);
    $(queryButton).text("Fighting...");
    $('#playerAction').text("Player attack "+monsterFighted["name"]+" with "+damage+" damages.")
    if (monsterFighted["hp"] <= 0){
        playerKillMonster(monsterFighted);
    }
}

function playerKillMonster(monsterFighted){
    monsterFighted["hp"] = monsterFighted["hpMax"];
    player.exp += monsterFighted["exp"];
    $('#exp').text(player.exp);
    $('#playerAction').text("Player defeat "+monsterFighted["name"]+" and gain "+monsterFighted["exp"]+" exp.")
    inventory.gold += lootGold(monsterFighted);
    displayInventory();
    if (player.exp >= expNeeded(player.lvl)){
        levelUp();
        displayUpgradableStat(true);
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
        resetMonsters();
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

function resetMonsters(){
    for (let index = 1; index < monstersNumber+1; index++) {
        $('[id=hpm'+index+']').text(monsters["monster"+index]["hpMax"]);
    }
    $('[id^=fightButton]').text("Fight");
    $('#playerAction').text("Player stop fighting.");
    $('#monsterAction').text("");
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