function fight(index){
    let monsterFighted = monsters["monster"+index]
    let queryHpm = "#hpm"+index;
    let queryButton = "#fightButton"+index;
    let queryProgressBar = "#monsterHPPB"+index;

    if (!playerAttacking){
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
    $(queryHpm).text(monsterFighted["hp"]);
    if (monsterFighted["hp"] <= 0){
        playerKillMonster(monsterFighted);
    }
}

function playerKillMonster(monsterFighted){
    monsterFighted["hp"] = monsterFighted["hpMax"];
    calcExp(monsterFighted);
    lootGold(monsterFighted);
    displayStats();
    displayInventory();
    if (buttonsNumbers < 15){
        testIfMonsterDrop(monsterFighted["lootChance"]);
    }
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
    $('#healButton').text("Heal : "+healPrice()+" golds");
    if (player.hp <= 0){
        resetMonsters();
        clearAttacks();
        playerDeath();
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
}

function choseStat(index){
    if (player.statsPoints > 0){
        switch (index) {
            case 1:
                calcStat("force", 1, "add");
                break;
            case 2:
                calcStat("vigour", 1, "add");
                break;
            case 3:
                calcStat("agility", 1, "add");
                break;
            case 4:
                calcStat("wisdom", 1, "add");
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

function sellStuff(index){
    var indexTrimed = index.substring(10);
    stuff = stuffDisplayed[indexTrimed];
    inventory.gold += stuff.price;
    $('#listedStuff'+indexTrimed).remove();
    buttonsNumbers -= 1;
    displayInventory();
}