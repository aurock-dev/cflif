var buttonsNumbers = 0;
var stuffDisplayed = [];
var listOfStats = ["lvl","exp","statsPoints","force","vigour","agility","wisdom","hpMax","hp","atk","def","atkSpeed","criticalChance","criticalDamage","expBonus","goldBonus"];
var listOfStatsFormat = ["Level","Experience","Stats Points","Force","Vigour","Agility","Wisdom","HP Maximum","HP","Attack","Defense","Attack Speed","Critical Chance","Critical Damage","Experience Bonus","Gold Bonus"];

function displayInventory(state=false){
    $('.gold').text(inventory.gold);
    if (state == true){
        if (inventory.weapon != ""){
            $('.listWeapon').empty();
            $('.listWeapon').append('<li class="stuffName">'+inventory.weapon.name+' +'+inventory.weapon.upgradeLvl+'</li>');
            $('.listWeapon').append('<li>Damage : '+inventory.weapon.damage+'</li>');
            for (var key in inventory.weapon.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listWeapon').append('<li>'+convertKey(key)+' : '+inventory.weapon.bonusStats[key]+'%</li>');
                }
                else if (key == "atkSpeed"){
                    let test = 100*(inventory.weapon.bonusStats[key]/2000)
                    $('.listWeapon').append('<li>'+convertKey(key)+' : '+test+'%</li>');
                }
                else{
                    $('.listWeapon').append('<li>'+convertKey(key)+' : '+inventory.weapon.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.helmet != ""){
            $('.listHelmet').empty();
            $('.listHelmet').append('<li class="stuffName">'+inventory.helmet.name+' +'+inventory.helmet.upgradeLvl+'</li>');
            $('.listHelmet').append('<li>Defense : '+inventory.helmet.defense+'</li>');
            for (var key in inventory.helmet.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listHelmet').append('<li>'+convertKey(key)+' : '+inventory.helmet.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listHelmet').append('<li>'+convertKey(key)+' : '+inventory.helmet.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.chest != ""){
            $('.listChest').empty();
            $('.listChest').append('<li class="stuffName">'+inventory.chest.name+' +'+inventory.chest.upgradeLvl+'</li>');
            $('.listChest').append('<li>Defense : '+inventory.chest.defense+'</li>');
            for (var key in inventory.chest.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listChest').append('<li>'+convertKey(key)+' : '+inventory.chest.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listChest').append('<li>'+convertKey(key)+' : '+inventory.chest.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.boots != ""){
            $('.listBoots').empty();
            $('.listBoots').append('<li class="stuffName">'+inventory.boots.name+' +'+inventory.boots.upgradeLvl+'</li>');
            $('.listBoots').append('<li>Defense : '+inventory.boots.defense+'</li>');
            for (var key in inventory.boots.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listBoots').append('<li>'+convertKey(key)+' : '+inventory.boots.bonusStats[key]+'%</li>');
                }
                else if (key == "atkSpeed"){
                    let test = 100*(inventory.boots.bonusStats[key]/2000)
                    $('.listBoots').append('<li>'+convertKey(key)+' : '+test+'%</li>');
                }
                else{
                    $('.listBoots').append('<li>'+convertKey(key)+' : '+inventory.boots.bonusStats[key]+'</li>');
                }
            }
        }
    }
}

function displayMonsterDrop(stuff){
    if (stuff.type == "weapon"){
        var formatedStuff = stuff.name+' | Damage : <span class="damage">'+stuff.damage+'</span> | Price : '+stuff.price;
    }
    else {
        var formatedStuff = stuff.name+' | Defense : <span class="defense">'+stuff.defense+'</span> | Price : '+stuff.price;
    }
    let monsterDrop =
    '<div class="row text-center top-buffer border border-warning rounded" id="listedStuff'+buttonsNumbers+'">'+
        '<div class="col-10" style="white-space: nowrap">'+
            formatedStuff+
        '</div>'+
        '<div class="col-2">'+
            '<button type="button" id="equipButton'+buttonsNumbers+'" class="btn btn-sm btn-outline-primary py-0 bm-sm">Equip</button>'+
            '<button type="button" id="sellButton'+buttonsNumbers+'" class="btn btn-sm btn-outline-primary py-0 bm-sm">Sell</button>'+
        '</div>'+
    '</div>'

    $('.IW').append(monsterDrop);

    buttonsNumbers += 1;
}

function colorizeStats(){
    for (let key in stuffDisplayed){
        if (inventory[stuffDisplayed[key].type].defense > stuffDisplayed[key].defense){
            $('[id=listedStuff'+key+'] .defense').attr({"class":"defense" ,"id": "statLess"});
        }
        else if(inventory[stuffDisplayed[key].type].defense < stuffDisplayed[key].defense){
            $('[id=listedStuff'+key+'] .defense').attr({"class":"defense" ,"id": "statMore"});
        }
        if (inventory[stuffDisplayed[key].type].damage > stuffDisplayed[key].damage){
            $('[id=listedStuff'+key+'] .damage').attr({"class":"damage" ,"id": "statLess"});
        }
        else if(inventory[stuffDisplayed[key].type].damage < stuffDisplayed[key].damage){
            $('[id=listedStuff'+key+'] .damage').attr({"class":"damage" ,"id": "statMore"});
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
                player[key] += inventory.weapon.bonusStats[key];
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
                player[key] -= inventory.weapon.bonusStats[key];
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

function sellStuff(index){
    var indexTrimed = index.substring(10);
    stuff = stuffDisplayed[indexTrimed];
    inventory.gold += stuff.price;
    $('#listedStuff'+indexTrimed).remove();
    displayInventory();
    toastAction("Item sold.", colors.yellow);
}