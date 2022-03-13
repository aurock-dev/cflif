function fight(index){
    let monsterFighted = monsters[index]
    let queryHpm = "#hpm"+index;
    let queryButton = "#fightButton"+index;
    let queryProgressBar = "#monsterHPPB"+index;

    if (!playerAttacking){
        $(queryButton).text("Fighting...");
        $(queryButton).removeClass("btn btn-outline-primary btn-block").addClass("btn btn-outline-warning btn-block");
        playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryProgressBar);}, player.atkSpeed);
        monsterAttacking = setInterval(function(){monsterAttack(monsterFighted);}, monsterFighted.atkSpeed);
    }
    else if(playerAttacking){
        clearAttacks();
        resetMonsters();
    }
}

function playerAttack(monsterFighted, queryHpm, queryProgressBar){ 
    damage(monsterFighted);
    var hpPercent = calcPercentage(monsterFighted.hp, monsterFighted.hpMax)
    $(queryProgressBar).attr('aria-valuenow', hpPercent).css('width', hpPercent+'%');
    $(queryHpm).text(monsterFighted.hp);
    if (monsterFighted.hp <= 0){
        playerKillMonster(monsterFighted);
    }
}

function playerKillMonster(monsterFighted){
    monsterFighted.hp = monsterFighted.hpMax;
    lootGold(monsterFighted);
    $('#restatButton').text("Re-stat : "+restatPrice()+" golds");
    if ($('[id^=listedStuff').length <= 15){
        testIfMonsterDrop(monsterFighted.lootChance);
    }
    if (player.prestige < 3){
        calcExp(monsterFighted);
        if (player.exp >= expNeeded(player.lvl)){
            levelUp();
            displayUpgradableStat(true);
            if (player.lvl >= 4){
                clearAttacks();
                resetMonsters();
                $('[id^=fightButton').prop('disabled', true);
                $('#progressXP').hide();
                $('#columnXP').append('<button type="button" id="prestigeButton" class="btn btn-sm btn-outline-dark border-custom-xp py-0 bm-sm">Get prestige</button>');
                selectPrestige();
            }
        }
    }
    else {
        $('#progressXP').hide();
    }
    displayStats();
    displayInventory();
}

function monsterAttack(monsterFighted){
    var damageMonster = attackMinusDefense(monsterFighted.atk)
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
    for (let index = 0; index < monstersNumber; index++) {
        $('[id=hpm'+index+']').text(monsters[index].hpMax);
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
                toastAction("+1 Force.", "bg-primary");
                break;
            case 2:
                calcStat("vigour", 1, "add");
                toastAction("+1 Vigour.", "bg-primary");
                break;
            case 3:
                calcStat("agility", 1, "add");
                toastAction("+1 Agility.", "bg-primary");
                break;
            case 4:
                calcStat("wisdom", 1, "add");
                toastAction("+1 Wisdom.", "bg-primary");
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
        toastAction("Player healed.", "bg-success");
    }
}

function restat(skip=false){
    if (inventory.gold >= restatPrice() || skip){
        player.force = 1;
        player.vigour = 1;
        player.agility = 1;
        player.wisdom = 1;
        player.hpMax = 2500;
        player.hp = 2500;
        player.atk = 200;
        player.def = 100;
        player.atkSpeed = 2000;
        player.criticalChance = 10;
        player.criticalDamage = 100;
        player.expBonus = 1;
        player.goldBonus = 1;
        if (skip == false){
            if (player.classLvl == 1){
                player.statsPoints = player.lvl+12;
            }
            else if (player.classLvl == 2){
                player.statsPoints = player.lvl+22;
            }
            else {
                player.statsPoints = player.lvl+2;
            }
            inventory.gold -= restatPrice();
        }
        calcPlayerStatsWithEquipment();
        displayStats();
        displayInventory();
        displayUpgradableStat(true);
        toastAction("Re-stat done.", "bg-primary");
    }
}

function sellStuff(index){
    var indexTrimed = index.substring(10);
    stuff = stuffDisplayed[indexTrimed];
    inventory.gold += stuff.price;
    $('#listedStuff'+indexTrimed).remove();
    displayInventory();
    toastAction("Item sold.", "bg-warning");
}