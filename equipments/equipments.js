var buttonsNumbers = 0;
var stuffDisplayed = [];
var listOfStats = ["lvl","exp","statsPoints","force","vigour","agility","wisdom","hpMax","hp","atk","def","atkSpeed","criticalChance","criticalDamage","expBonus","lootBonus"];
var listOfStatsFormat = ["Level","Experience","Stats Points","Force","Vigour","Agility","Wisdom","HP Maximum","HP","Attack","Defense","Attack Speed","Critical Chance","Critical Damage","Experience Bonus","Loot Bonus"];

function displayInventory(state=false){
    if (state == true){
        if (inventory.weapon != ""){
            $('.listWeapon').empty();
            $('.listWeapon').append('<li class="upgrade">Upgrade +'+inventory.weapon.upgradeLvl+'</li>');
            $('.listWeapon').append('<li>Damage : '+inventory.weapon.damage+'</li>');
            for (var key in inventory.weapon.bonusStats){
                if (listOfStats.includes(inventory.weapon.bonusStats[key][0], -4)){
                    $('.listWeapon').append('<li class="awake">'+convertKey(inventory.weapon.bonusStats[key][0])+' : '+inventory.weapon.bonusStats[key][1]+'%</li>');
                }
                else if (inventory.weapon.bonusStats[key][0] == "atkSpeed"){
                    let speed = 100*(inventory.weapon.bonusStats[key][1]/2000)
                    $('.listWeapon').append('<li class="awake">'+convertKey(inventory.weapon.bonusStats[key][0])+' : '+speed+'%</li>');
                }
                else{
                    $('.listWeapon').append('<li class="awake">'+convertKey(inventory.weapon.bonusStats[key][0])+' : '+inventory.weapon.bonusStats[key][1]+'</li>');
                }
            }
        }
        if (inventory.helmet != ""){
            $('.listHelmet').empty();
            $('.listHelmet').append('<li class="upgrade">Upgrade +'+inventory.helmet.upgradeLvl+'</li>');
            $('.listHelmet').append('<li>Defense : '+inventory.helmet.defense+'</li>');
            for (var key in inventory.helmet.bonusStats){
                    $('.listHelmet').append('<li class="awake">'+convertKey(inventory.helmet.bonusStats[key][0])+' : '+inventory.helmet.bonusStats[key][1]+'</li>');
            }
        }
        if (inventory.chest != ""){
            $('.listChest').empty();
            $('.listChest').append('<li class="upgrade">Upgrade +'+inventory.chest.upgradeLvl+'</li>');
            $('.listChest').append('<li>Defense : '+inventory.chest.defense+'</li>');
            for (var key in inventory.chest.bonusStats){
                if (listOfStats.includes(inventory.chest.bonusStats[key][0], -4)){
                    $('.listChest').append('<li class="awake">'+convertKey(inventory.chest.bonusStats[key][0])+' : '+inventory.chest.bonusStats[key][1]+'%</li>');
                }
                else{
                    $('.listChest').append('<li class="awake">'+convertKey(inventory.chest.bonusStats[key][0])+' : '+inventory.chest.bonusStats[key][1]+'</li>');
                }
            }
        }
        if (inventory.boots != ""){
            $('.listBoots').empty();
            $('.listBoots').append('<li class="upgrade">Upgrade +'+inventory.boots.upgradeLvl+'</li>');
            $('.listBoots').append('<li>Defense : '+inventory.boots.defense+'</li>');
            for (var key in inventory.boots.bonusStats){
                if (listOfStats.includes(inventory.boots.bonusStats[key][0], -4)){
                    $('.listBoots').append('<li class="awake">'+convertKey(inventory.boots.bonusStats[key][0])+' : '+inventory.boots.bonusStats[key][1]+'%</li>');
                }
                else if (inventory.boots.bonusStats[key][0] == "atkSpeed"){
                    let speed = 100*(inventory.boots.bonusStats[key][1]/2000)
                    $('.listBoots').append('<li class="awake">'+convertKey(inventory.boots.bonusStats[key][0])+' : '+speed+'%</li>');
                }
                else{
                    $('.listBoots').append('<li class="awake">'+convertKey(inventory.boots.bonusStats[key][0])+' : '+inventory.boots.bonusStats[key][1]+'</li>');
                }
            }
        }
    }
}

function displayMonsterDrop(stuff){
    if (stuff.type == "weapon"){
        var formatedStuff = '<span class="title">'+stuff.name.toUpperCase()+'</span> | Damage : <span class="damage">'+stuff.damage+'</span> | Price : '+stuff.price;
    }
    else {
        var formatedStuff = '<span class="title">'+stuff.name.toUpperCase()+'</span> | Defense : <span class="defense">'+stuff.defense+'</span> | Price : '+stuff.price;
    }
    let monsterDrop =
    '<div class="listedStuff'+buttonsNumbers+'">'+
        '<div class="droppedStuffInfos">'+
            formatedStuff+
        '</div>'+
        '<div class="droppedStuffButtons">'+
            '<button id="equipButton'+buttonsNumbers+'">Equip</button>'+
            '<button id="sellButton'+buttonsNumbers+'">Sell</button>'+
        '</div>'+
    '</div>'

    $('.droppedStuff').append(monsterDrop);

    buttonsNumbers += 1;
}

function colorizeStats(){
    for (let key in stuffDisplayed){
        if (inventory[stuffDisplayed[key].type].defense > stuffDisplayed[key].defense){
            $('[class=listedStuff'+key+'] .defense').attr({"class":"defense" ,"id": "statLess"});
        }
        else if(inventory[stuffDisplayed[key].type].defense < stuffDisplayed[key].defense){
            $('[class=listedStuff'+key+'] .defense').attr({"class":"defense" ,"id": "statMore"});
        }
        if (inventory[stuffDisplayed[key].type].damage > stuffDisplayed[key].damage){
            $('[class=listedStuff'+key+'] .damage').attr({"class":"damage" ,"id": "statLess"});
        }
        else if(inventory[stuffDisplayed[key].type].damage < stuffDisplayed[key].damage){
            $('[class=listedStuff'+key+'] .damage').attr({"class":"damage" ,"id": "statMore"});
        }
    }
}

function generateStuff(monster){
    let typeList = ["weapon", "helmet", "chest", "boots"];
    let typeName = randArray(typeList);

    if (typeName == "weapon"){
        stuff = {
            type : typeName,
            name : typeName,
            upgradeLvl : 0,
            damage : randInt([8, 18])*monster.lvl,
            price : randInt([45,75])*monster.lvl
        }
    }
    else{
        stuff = {
            type : typeName,
            name : typeName,
            upgradeLvl : 0,
            defense : randInt([8, 18])*monster.lvl,
            price : randInt([45,75])*monster.lvl
        }
    }

    stuffDisplayed.push(stuff);
    return stuff;
}

function equipStuff(index){
    unequipStuff();
    var indexTrimed = index.substring(11);
    stuff = stuffDisplayed[indexTrimed];
    switch (stuff.type) {
        case "weapon":
            inventory.weapon = stuff;
            inventory.weapon.damage = stuff.damage;
            inventory.weapon.upgradeLvl = stuff.upgradeLvl;
            break;

        case "helmet":
            inventory.helmet = stuff;
            inventory.helmet.defense = stuff.defense;
            inventory.helmet.upgradeLvl = stuff.upgradeLvl;
            break;

        case "chest":
            inventory.chest = stuff;
            inventory.chest.defense = stuff.defense;
            inventory.chest.upgradeLvl = stuff.upgradeLvl;
            break;

        case "boots":
            inventory.boots = stuff;
            inventory.boots.defense = stuff.defense;
            inventory.boots.upgradeLvl = stuff.upgradeLvl;
            break;

        default:
            break;
    }
    displayUpgradeButton(stuff.type)
    displayAwakeButton(stuff.type)
    colorizeStats();
    toastAction("Item equiped.", colors.blue);
    displayInventory(true);
    $('.listedStuff'+indexTrimed).remove();
    calcPlayerStatsWithEquipment();
}

function unequipStuff(){
    if (inventory.weapon != ""){
        player.atk -= inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(inventory.weapon.bonusStats[key][0], inventory.weapon.bonusStats[key][1], "sub");
            }
            else if (inventory.weapon.bonusStats[key][0] == "atkSpeed"){
                player[inventory.weapon.bonusStats[key][0]] += inventory.weapon.bonusStats[key][1];
            }
            else {
                player[inventory.weapon.bonusStats[key][0]] -= inventory.weapon.bonusStats[key][1];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def -= inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            calcStat(inventory.helmet.bonusStats[key][0], inventory.helmet.bonusStats[key][1], "sub");
        }
    }
    if (inventory.chest != ""){
        player.def -= inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            player[inventory.chest.bonusStats[key][0]] -= inventory.chest.bonusStats[key][1];
        }
    }
    if (inventory.boots != ""){
        player.def -= inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            if (inventory.boots.bonusStats[key][0] == "atkSpeed"){
                player[inventory.boots.bonusStats[key][0]] += inventory.boots.bonusStats[key][1];

            }
            else {
                player[inventory.boots.bonusStats[key][0]] -= inventory.boots.bonusStats[key][1];
            }
        }
    }
    displayInventory(true);
}

function calcPlayerStatsWithEquipment(){
    if (inventory.weapon != ""){
        player.atk += inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(inventory.weapon.bonusStats[key][0], inventory.weapon.bonusStats[key][1], "add");
            }
            else if (inventory.weapon.bonusStats[key][0] == "atkSpeed"){
                player[inventory.weapon.bonusStats[key][0]] -= inventory.weapon.bonusStats[key][1];
            }
            else {
                player[inventory.weapon.bonusStats[key][0]] += inventory.weapon.bonusStats[key][1];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def += inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            calcStat(inventory.helmet.bonusStats[key][0], inventory.helmet.bonusStats[key][1], "add");
        }
    }
    if (inventory.chest != ""){
        player.def += inventory.chest.defense;
        for (let key in inventory.chest.bonusStats){
            player[inventory.chest.bonusStats[key][0]] += inventory.chest.bonusStats[key][1];
        }
    }
    if (inventory.boots != ""){
        player.def += inventory.boots.defense;
        for (let key in inventory.boots.bonusStats){
            if (inventory.boots.bonusStats[key][0] == "atkSpeed"){
                player[inventory.boots.bonusStats[key][0]] -= inventory.boots.bonusStats[key][1];
            }
            else {
                player[inventory.boots.bonusStats[key][0]] += inventory.boots.bonusStats[key][1];
            }
        }
    }
    displayStats();
}

function sellStuff(index){
    var indexTrimed = index.substring(10);
    stuff = stuffDisplayed[indexTrimed];
    inventory.gold += stuff.price;
    $('.gold').text(inventory.gold);
    $('.listedStuff'+indexTrimed).remove();
    displayInventory();
    toastAction("Item sold.", colors.yellow);
}