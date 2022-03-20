var buttonsNumbers = 0;
var stuffDisplayed = [];

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
    colorizeStats();
    toastAction("Item equiped.", "bg-primary");
    displayInventory(true);
    $('#listedStuff'+indexTrimed).remove();
    calcPlayerStatsWithEquipment();
}

function unequipStuff(){
    if (inventory.weapon != ""){
        player.atk -= inventory.weapon.damage;
        for (let key in inventory.weapon.bonusStats){
            if (key == "force" || key == "vigour" || key == "agility" || key == "wisdom"){
                calcStat(key, inventory.weapon.bonusStats[key], "sub");
            }
            else if (key == "atkSpeed"){
                player[key] += inventory.boots.bonusStats[key];
            }
            else {
                player[key] -= inventory.weapon.bonusStats[key];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def -= inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            calcStat(key, inventory.helmet.bonusStats[key], "sub");
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
            if (key == "atkSpeed"){
                player[key] += inventory.boots.bonusStats[key];
            }
            else {
                player[key] -= inventory.boots.bonusStats[key];
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
                calcStat(key, inventory.weapon.bonusStats[key], "add");
            }
            else if (key == "atkSpeed"){
                player[key] -= inventory.boots.bonusStats[key];
            }
            else {
                player[key] += inventory.weapon.bonusStats[key];
            }
        }
    }
    if (inventory.helmet != ""){
        player.def += inventory.helmet.defense;
        for (let key in inventory.helmet.bonusStats){
            calcStat(key, inventory.helmet.bonusStats[key], "add");
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
            if (key == "atkSpeed"){
                player[key] -= inventory.boots.bonusStats[key];
            }
            else {
                player[key] += inventory.boots.bonusStats[key];
            }
        }
    }
    displayStats();
}