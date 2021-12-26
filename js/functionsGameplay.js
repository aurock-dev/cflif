function selectMonster(){
    for (let index = 0; index <= monstersNumber; index++) {   
        $('[id=fightButton'+index+']').click(function(){
            fight(index)});
    }
}

function selectStat(){
    for (let index = 0; index <= 4; index++) {   
        $('[id=statButton'+index+']').click(function(){
            choseStat(index)});
    }
}

function fight(index){
    let monsterFighted = monsters["monster"+index]
    let queryHpm = "#hpm"+index;
    let queryButton = "#fightButton"+index;
    let queryProgressBar = "#monsterHPPB"+index;

    if (!playerAttacking){
        $('#playerAction').text("Player begin to fight "+monsterFighted["name"]+".");
        $(queryButton).text("Fighting...");
        playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryProgressBar);}, player.atkSpeed);
        monsterAttacking = setInterval(function(){monsterAttack(monsterFighted);}, monsterFighted["atkSpeed"]);
    }
    else if(playerAttacking){
        clearAttacks();
        resetMonsters();
    }
}

function playerAttack(monsterFighted, queryHpm, queryProgressBar){ 
    var damages = damage(monsterFighted);
    var hpPercent = calcPercentage(monsterFighted["hp"], monsterFighted["hpMax"])
    $(queryProgressBar).attr('aria-valuenow', hpPercent).css('width', hpPercent+'%');
    $('#playerAction').text("Player attack "+monsterFighted["name"]+" with "+damages+" damages.")
    $(queryHpm).text(monsterFighted["hp"]);
    if (monsterFighted["hp"] <= 0){
        playerKillMonster(monsterFighted);
    }
}

function playerKillMonster(monsterFighted){
    $('#playerAction').text("Player defeat "+monsterFighted["name"]+" and gain "+monsterFighted["exp"]+" exp.")
    monsterFighted["hp"] = monsterFighted["hpMax"];
    calcExp(monsterFighted);
    lootGold(monsterFighted);
    displayStats();
    displayInventory();
    if (player.exp >= expNeeded(player.lvl)){
        levelUp();
        displayUpgradableStat(true);
    }
}

function monsterAttack(monsterFighted){
    var damageMonster = attackMinusDefense(monsterFighted["atk"])
    var hpRemaining = player.hp -= damageMonster;
    var hpPercent = calcPercentage(hpRemaining, player.hpMax);
    $('#playerHPPB').attr('aria-valuenow', hpPercent).css('width', hpPercent+'%');
    $('#hp').text(player.hp)
    $('#monsterAction').text(monsterFighted["name"]+" attack player with "+damageMonster+" damages.")
    if (player.hp <= 0){
        resetMonsters();
        clearAttacks();
        playerDeath();
        $('#playerAction').text("Player is dead.")
        $('#monsterAction').text(monsterFighted["name"]+" beat Player.")
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
    $('[id^=monsterHPPB]').attr('aria-valuenow', 100).css('width', 100+'%');
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