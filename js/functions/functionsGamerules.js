function expNeeded(lvl){
    return Math.round(lvl * 300 * 1.1);
}

function levelUp(){
    var expSpare = Math.max(0, player.exp - expNeeded(player.lvl));
    player.lvl += 1;
    player.exp = expSpare;
    player.statsPoints += 1;
    player.hp = player.hpMax;
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
    displayStats();
}

function calcExp(monsterFighted){
    player.exp += addPercentage(monsterFighted["exp"], player.expBonus);
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
}

function calcForce(){
    player.force += 1;
    player.atk += 60;
    player.criticalDamage += 1;
    displayStats();
}

function calcVigour(){
    player.vigour += 1;
    player.hpMax += 350;
    player.hp = player.hpMax;
    player.def += 75;
    displayStats();
}

function calcAgility(){
    player.agility += 1;
    player.atkSpeed -= 50;
    player.criticalChance += 1;
    displayStats();
}

function calcWisdom(){
    player.wisdom += 1;
    player.expBonus += 1;
    player.goldBonus += 1;
    displayStats();
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
    monsterFighted["hp"] = Math.max(0, (monsterFighted["hp"] - damage));
    return damage;
}

function lootGold(monsterFighted){
    let goldLooted = randInt(monsterFighted["gold"]);
    inventory.gold += addPercentage(goldLooted, player.goldBonus);
}

function playerDeath(){
    player.hp = player.hpMax;
    player.exp = 0;
    displayStats();
}

function healPrice(){
    let healPrice = 1000;
    let percentageModificator = 100-calcPercentage(player.hp, player.hpMax);
    let priceWithPercentage = addPercentage(healPrice, percentageModificator);
    return priceWithPercentage;
}

function restatPrice(){
    let restatPrice = 3000;
    let restatPriceModified = restatPrice * player.lvl;
    return restatPriceModified;
}

function equipStuff(index){
    unequipStuff();
    var indexTrimed = index.substring(11);
    stuff = stuffDisplayed[indexTrimed];
    switch (stuff.type) {
        case "weapon":
            inventory.weapon = stuff;
            inventory.weapon.damage = stuff.damage;
            $('.listWeapon').text("Damage : "+inventory.weapon.damage)
            for (var key in inventory.weapon.bonusStats){
                inventory.weapon.bonusStats[key] = stuff.bonusStats[key];
                $('.listWeapon').append('<li>'+convertKey(key)+' : '+inventory.weapon.bonusStats[key]);
            }
            break;
        case "helmet":
            inventory.helmet = stuff;
            inventory.helmet.defense = stuff.defense;
            $('.listHelmet').text("Defense : "+inventory.helmet.defense)
            for (var key in inventory.helmet.bonusStats){
                inventory.helmet.bonusStats[key] = stuff.bonusStats[key];
                $('.listHelmet').append('<li>'+convertKey(key)+' : '+inventory.helmet.bonusStats[key]);
            }
            break;
        case "chest":
            inventory.chest = stuff;
            inventory.chest.defense = stuff.defense;
            $('.listChest').text("Defense : "+inventory.chest.defense)
            for (var key in inventory.chest.bonusStats){
                inventory.chest.bonusStats[key] = stuff.bonusStats[key];
                $('.listChest').append('<li>'+convertKey(key)+' : '+inventory.chest.bonusStats[key]);
            }
            break;
        case "boots":
            inventory.boots = stuff;
            inventory.boots.defense = stuff.defense;
            $('.listBoots').text("Defense : "+inventory.boots.defense)
            for (var key in inventory.boots.bonusStats){
                inventory.boots.bonusStats[key] = stuff.bonusStats[key];
                $('.listBoots').append('<li>'+convertKey(key)+' : '+inventory.boots.bonusStats[key]);
            }
            break;
        default:
            break;
    }
    $('#listedStuff'+indexTrimed).remove();
    calcPlayerStatsWithEquipment();
}

function testIfMonsterDrop(){
    if (randInt([1,100]) <= 100){
        displayMonsterDrop(calcEquipmentsStats(randArray(stuffList1)));
        selectStuff();
    }
}

function calcEquipmentsStats(stuff){
    var stuffCalculated = $.extend( true, {}, stuff );
    if (stuff.type == "weapon"){
        stuffCalculated.damage = randInt(stuff.damage);
    }
    else {
        stuffCalculated.defense = randInt(stuff.defense);
    }
    for (let key in stuffCalculated.bonusStats){
        stuffCalculated.bonusStats[key] = randInt(stuff.bonusStats[key]);
    }
    
    stuffDisplayed.push(stuffCalculated);
    return stuffCalculated;
}

function calcPlayerStatsWithEquipment(){
    if (inventory.weapon != ""){
        player.atk += inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            player[key] += inventory.weapon.bonusStats[key];
        }
    }
    if (inventory.helmet != ""){
        player.def += inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            player[key] += inventory.helmet.bonusStats[key];
        }
    }
    if (inventory.chest != ""){
        player.def += inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            player[key] += inventory.chest.bonusStats[key];
        }
    }
    if (inventory.boots != ""){
        player.def += inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            player[key] += inventory.boots.bonusStats[key];
        }
    }
    displayStats();
}

function unequipStuff(){
    if (inventory.weapon != ""){
        player.atk -= inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            player[key] -= inventory.weapon.bonusStats[key];
        }
    }
    if (inventory.helmet != ""){
        player.def -= inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            player[key] -= inventory.helmet.bonusStats[key];
        }
    }
    if (inventory.chest != ""){
        player.def -= inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            player[key] -= inventory.chest.bonusStats[key];
        }
    }
    if (inventory.boots != ""){
        player.def -= inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            player[key] -= inventory.boots.bonusStats[key];
        }
    }
}