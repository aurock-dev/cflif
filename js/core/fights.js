function fight(index){
    let monsterFighted = monsters[index]
    let queryHpm = "#hpm"+index;
    let queryButton = "#fightButton"+index;
    let queryProgressBar = "#monsterHPPB"+index;

    if (!playerAttacking){
        $(queryButton).text("Fighting...");
        $(queryButton).removeClass("btn btn-outline-primary btn-block").addClass("btn btn-outline-warning btn-block");
        if (player.atkSpeed <= 100){
            playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryProgressBar);}, 100);
        }
        else if (player.atkSpeed >= 2000){
            playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryProgressBar);}, 2000);
        }
        else {
            playerAttacking = setInterval(function(){playerAttack(monsterFighted, queryHpm, queryProgressBar);}, player.atkSpeed);
        }
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
        testIfMonsterDrop(monsterFighted);
    }
    if (player.prestige < 3){
        calcExp(monsterFighted);
        if (player.exp >= expNeeded(player.lvl)){
            if (player.expBlock == false){
                levelUp();
                displayUpgradableStat(true);
                if (player.lvl >= 100){
                    player.expBlock = true;
                    $('#progressXP').hide();
                    $('#columnXP').append('<button type="button" id="prestigeButton" class="btn btn-sm btn-outline-dark border-custom-xp py-0 bm-sm">Get prestige</button>');
                    selectPrestige();
                }
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

function attackMinusDefense(atk){
    return Math.max(0, atk - player.def);
}

function damage(monsterFighted){
    var randNumber = randInt([1,100]);
    var damage = player.atk;
    if (randNumber <= player.criticalChance){
        var damage = addPercentage(player.atk, player.criticalDamage);
    }
    monsterFighted.hp = Math.max(0, (monsterFighted.hp - damage));
    return damage;
}


function testIfMonsterDrop(monster){
    if (randInt([1,100]) <= monster.lootChance){
        displayMonsterDrop(generateStuff(monster));
        colorizeStats();
        selectStuff();
    }
}