function fight(index){
    let monsterFighted = monsters[index]
    let queryHpm = ".hpm"+index;
    let queryProgressBar = ".monsterHPPB"+index;

    if (!playerAttacking){
        $('.monsterRow'+index).attr('class', 'monsterFighted monsterRow'+index);
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
        $('[class^=monsterFighted').removeClass('monsterFighted');
        clearAttacks();
        resetMonsters();
    }
}

function playerAttack(monsterFighted, queryHpm, queryProgressBar){ 
    damage(monsterFighted);
    var hpPercent = calcPercentage(monsterFighted.hp, monsterFighted.hpMax)
    $(queryProgressBar).width(hpPercent+'%');
    $(queryHpm).text(monsterFighted.hp);
    if (monsterFighted.hp <= 0){
        playerKillMonster(monsterFighted);
    }
}

function playerKillMonster(monsterFighted){
    monsterFighted.hp = monsterFighted.hpMax;
    lootGold(monsterFighted);
    updateDisplayRestatPrice();
    if ($('[class^=listedStuff]').length <= 14){
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
                    $('.xpbar').hide();
                    $('.prestigeDiv').show();
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
    player.hp -= attackMinusDefense(monsterFighted.atk);
    displayStats();
    $('.healButton').text("Heal : "+healPrice()+" golds");
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
        $('[class=hpm'+index+']').text(monsters[index].hpMax);
    }
    $('[class^=monsterHPPB]').width('100%');
    $('[class^=monsterFighted').removeClass('monsterFighted');
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
    let dice = randInt([1,100]);
    let lootChance = monster.lootChance + player.lootBonus;
    if (dice > 0 && dice <= lootChance){
        displayMonsterDrop(generateStuff(monster));
        colorizeStats();
        selectStuff();
    }
}