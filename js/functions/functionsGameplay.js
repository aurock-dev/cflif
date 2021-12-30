function fight(index){
    let monsterFighted = monsters["monster"+index]
    let queryHpm = "#hpm"+index;
    let queryButton = "#fightButton"+index;
    let queryProgressBar = "#monsterHPPB"+index;

    if (!playerAttacking){
        $('#playerAction').text("Player begin to fight "+monsterFighted["name"]+".");
        $(queryButton).text("Fighting...");
        $(queryButton).removeClass("btn btn-outline-primary btn-block").addClass("btn btn-outline-warning btn-block");
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
    testIfMonsterDrop();
    if (player.exp >= expNeeded(player.lvl)){
        $('#restatButton').text("Re-stat : "+restatPrice()+" golds");
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
    $('#healButton').text("Heal : "+healPrice()+" golds");
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
    $('[id^=fightButton]').removeClass("btn btn-outline-warning btn-block").addClass("btn btn-outline-primary btn-block");
    $('#playerAction').text("Player stop fighting.");
    $('#monsterAction').text("");
}

function choseStat(index){
    if (player.statsPoints > 0){
        switch (index) {
            case 1:
                calcStat("force", 1, "add");
                $('#playerAction').text("Player chooses to upgrade Force.")
                break;
            case 2:
                calcStat("vigour", 1, "add");
                $('#playerAction').text("Player chooses to upgrade Vigour.")
                break;
            case 3:
                calcStat("agility", 1, "add");
                $('#playerAction').text("Player chooses to upgrade Agility.")
                break;
            case 4:
                calcStat("wisdom", 1, "add");
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

function heal(){
    if (player.hp < player.hpMax && inventory.gold >= healPrice()){
        inventory.gold -= healPrice();
        player.hp = player.hpMax;
        $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
        displayStats();
        $('#playerAction').text("player full-heal himself.");
    }
}

function restat(){
    if (inventory.gold >= restatPrice()){
        player.force = 1;
        player.vigour = 1;
        player.agility = 1;
        player.wisdom = 1;
        player.statsPoints = player.lvl+2;
        inventory.gold -= restatPrice();
        displayStats();
        displayInventory();
        displayUpgradableStat(true);
    }
}