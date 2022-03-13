function expNeeded(lvl){
    return Math.round(((lvl*25)*(1+lvl))*player.expMult);
}

function levelUp(){
    var expSpare = Math.max(0, player.exp - expNeeded(player.lvl));
    player.lvl += 1;
    player.exp = expSpare;
    player.statsPoints += (1*player.statsMult);
    player.hp = player.hpMax;
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
    displayStats();
    toastAction("Player leveled up ! +1 Stat Point", "bg-primary");
    if (player.lvl == lvlChangeClass && player.classLvl == 0){
        displayClassModal();
    }
    if (player.lvl == lvlChangeClassSup && player.classLvl == 1){
        displayClassSupModal();
    }  
}

function calcExp(monsterFighted){
    player.exp += addPercentage(monsterFighted.exp, player.expBonus);
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
}

function prestige(){
    switch (player.prestige) {
        case 0:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Vagrant";
            player.statsPoints = 3;
            player.expMult = 1.5;   
            player.statsMult = 2;   
            player.prestige = 1;
            $('#prestige').text("(P1)");
            break;
            
        case 1:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Vagrant";
            player.statsPoints = 3;
            player.expMult = 2;   
            player.statsMult = 3;   
            player.prestige = 2;
            $('#prestige').text("(P2)");      
            break;
        
        case 2:
            player.prestige = 3;
            $('#prestige').text("(PMax)");      
            break;
    
        default:
            break;
    }

    displayStats(); 
    $('#progressXP').show();
    $('#prestigeButton').remove();
    $('[id^=fightButton').prop('disabled', false);
}

function displayClassModal(){
    resetMonsters();
    clearAttacks();
    $('#classChooseModal').modal('show');
    $('#classChooseModal .modal-footer').append(
    '<button type="button" class="btn btn-outline-danger" id="buttonMe" data-dismiss="modal" onclick="mercenaryClass()">Mercenary</button>'+
    '<button type="button" class="btn btn-outline-warning" id="buttonAs" data-dismiss="modal" onclick="assistClass()">Assist</button>'+
    '<button type="button" class="btn btn-outline-success" id="buttonAc" data-dismiss="modal" onclick="acrobatClass()">Acrobat</button>'+
    '<button type="button" class="btn btn-outline-primary" id="buttonMa" data-dismiss="modal" onclick="magicianClass()">Magician</button>'
    )

    $('#buttonMe').mouseover(function(){
        $('#classChooseModal .modal-body').text('Force +5 / Vigour +5')
    })
    $('#buttonAs').mouseover(function(){
        $('#classChooseModal .modal-body').text('Agility +5 / Wisdom +5')
    })
    $('#buttonAc').mouseover(function(){
        $('#classChooseModal .modal-body').text('Force +5 / Agility +5')
    })
    $('#buttonMa').mouseover(function(){
        $('#classChooseModal .modal-body').text('Wisdom +5 / Vigour +5')
    })
}

function displayClassSupModal(){
    resetMonsters();
    clearAttacks();
    $('#classChooseModal').modal('show');
    switch (player.class) {
        case "Mercenary":
            $('#classSupChooseModal .modal-footer').append(
            '<button type="button" class="btn btn-outline-danger" id="buttonBl" data-dismiss="modal" onclick="bladeClass()">Blade</button>'+
            '<button type="button" class="btn btn-outline-danger" id="buttonKn" data-dismiss="modal" onclick="knightClass()">Knight</button>'
            )
        
            $('#buttonBl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })
            $('#buttonKn').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })   
            break;

        case "Assist":
            $('#classSupChooseModal .modal-footer').append(
            '<button type="button" class="btn btn-outline-warning" id="buttonBi" data-dismiss="modal" onclick="billposterClass()">Billposter</button>'+
            '<button type="button" class="btn btn-outline-warning" id="buttonRi" data-dismiss="modal" onclick="ringmasterClass()">Ringmaster</button>'
            )
        
            $('#buttonBi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonRi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;

        case "Acrobat":
            $('#classSupChooseModal .modal-footer').append(
            '<button type="button" class="btn btn-outline-warning" id="buttonRa" data-dismiss="modal" onclick="rangerClass()">Ranger</button>'+
            '<button type="button" class="btn btn-outline-warning" id="buttonJe" data-dismiss="modal" onclick="jesterClass()">Jester</button>'
            )
        
            $('#buttonRa').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonJe').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })   
            break;

        case "Magician":
            $('#classSupChooseModal .modal-footer').append(
            '<button type="button" class="btn btn-outline-warning" id="buttonEl" data-dismiss="modal" onclick="elementorClass()">Elementor</button>'+
            '<button type="button" class="btn btn-outline-warning" id="buttonPs" data-dismiss="modal" onclick="psykeeperClass()">Psykeeper</button>'
            )
        
            $('#buttonEl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })
            $('#buttonPs').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;
    
        default:
            break;
    }

    player.classLvl = 2;
    displayStats();
}

function calcStat(stat, value, operand){
    if (operand == "add"){
        switch (stat) {
            case "force":
                player.force += value;
                player.atk += value * 60;
                player.criticalDamage += value * 1;
                break;
            case "vigour":
                player.vigour += value;
                player.def += value * 75;
                player.hpMax += value * 350;
                player.hp = player.hpMax;
                break;
            case "agility":
                player.agility += value;
                if (player.atkSpeed > 100){
                    player.atkSpeed -= value * 50;
                }
                player.criticalChance += value * 1;
                break;
            case "wisdom":
                player.wisdom += value;
                player.expBonus += value * 1;
                player.goldBonus += value * 1;
                break;
            default:
                break;
        }
    }
    if (operand == "sub"){
        switch (stat) {
            case "force":
                player.force -= value;
                player.atk -= value * 60;
                player.criticalDamage -= value * 1;
                break;
            case "vigour":
                player.vigour -= value;
                player.def -= value * 75;
                player.hpMax -= value * 350;
                player.hp = player.hpMax;
                break;
            case "agility":
                player.agility -= value;
                player.atkSpeed += value * 50;
                player.criticalChance -= value * 1;
                break;
            case "wisdom":
                player.wisdom -= value;
                player.expBonus -= value * 1;
                player.goldBonus -= value * 1;
                break;
            default:
                break;
        }
    }
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
    monsterFighted.hp = Math.max(0, (monsterFighted.hp - damage));
    return damage;
}

function lootGold(monsterFighted){
    let goldLooted = randInt(monsterFighted.gold);
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

function testIfMonsterDrop(lootChance){
    if (randInt([1,100]) <= lootChance){
        displayMonsterDrop(calcEquipmentsStats(randArray(stuffList1)));
        colorizeStats();
        selectStuff();
    }
}

function equipStuff(index){
    unequipStuff();
    var indexTrimed = index.substring(11);
    stuff = stuffDisplayed[indexTrimed];
    switch (stuff.type) {
        case "weapon":
            inventory.weapon = stuff;
            inventory.weapon.damage = stuff.damage;
            for (var key in inventory.weapon.bonusStats){
                inventory.weapon.bonusStats[key] = stuff.bonusStats[key];
            }
            inventory.weapon.upgradeLvl = stuff.upgradeLvl;
            break;
        case "helmet":
            inventory.helmet = stuff;
            inventory.helmet.defense = stuff.defense;
            for (var key in inventory.helmet.bonusStats){
                inventory.helmet.bonusStats[key] = stuff.bonusStats[key];
            }
            inventory.helmet.upgradeLvl = stuff.upgradeLvl;
            break;
        case "chest":
            inventory.chest = stuff;
            inventory.chest.defense = stuff.defense;
            for (var key in inventory.chest.bonusStats){
                inventory.chest.bonusStats[key] = stuff.bonusStats[key];
            }
            inventory.chest.upgradeLvl = stuff.upgradeLvl;
            break;
        case "boots":
            inventory.boots = stuff;
            inventory.boots.defense = stuff.defense;
            for (var key in inventory.boots.bonusStats){
                inventory.boots.bonusStats[key] = stuff.bonusStats[key];
            }
            inventory.boots.upgradeLvl = stuff.upgradeLvl;
            break;
        default:
            break;
    }
    displayUpgradeButton(stuff.type)
    colorizeStats();
    toastAction("Item equiped.", "bg-primary");
    displayInventory(true);
    $('#listedStuff'+indexTrimed).remove();
    calcPlayerStatsWithEquipment();
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
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.weapon.bonusStats[key], "add");
            }
            else {
                player[key] += inventory.weapon.bonusStats[key];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def += inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.helmet.bonusStats[key], "add");
            }
            else {
                player[key] += inventory.helmet.bonusStats[key];
            }
        }
    }
    if (inventory.chest != ""){
        player.def += inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.chest.bonusStats[key], "add");
            }
            else {
                player[key] += inventory.chest.bonusStats[key];
            }
        }
    }
    if (inventory.boots != ""){
        player.def += inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.boots.bonusStats[key], "add");
            }
            else {
                player[key] += inventory.boots.bonusStats[key];
            }
        }
    }
    displayStats();
}

function unequipStuff(){
    if (inventory.weapon != ""){
        player.atk -= inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.weapon.bonusStats[key], "sub");
            }
            else {
                player[key] -= inventory.weapon.bonusStats[key];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def -= inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.helmet.bonusStats[key], "sub");
            }
            else {
                player[key] -= inventory.helmet.bonusStats[key];
            }
        }
    }
    if (inventory.chest != ""){
        player.def -= inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.chest.bonusStats[key], "sub");
            }
            else {
                player[key] -= inventory.chest.bonusStats[key];
            }
        }
    }
    if (inventory.boots != ""){
        player.def -= inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.boots.bonusStats[key], "sub");
            }
            else {
                player[key] -= inventory.boots.bonusStats[key];
            }
        }
    }
    displayInventory(true);
}