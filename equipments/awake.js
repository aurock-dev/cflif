function displayAwakeButton(stuff){
    stuffTypeButton = '.aw' + stuff;
    $(stuffTypeButton).prop('disabled', false);
}

function awake(stuff){
    if (inventory[stuff] != ""){
        if (inventory.gold >= awakePrice){
            inventory.gold -= awakePrice;
            switch (stuff) {
                case "weapon":
                    unequipStuff();
                    var awakeResult = [];
                    for (let index = 0; index < randInt(awakeNumber); index++) {
                        let stat = randArray(awakeListWeapon);
                        let statNumber = getAwake(stat);
                        awakeResult.push([stat, statNumber])
                    }
                    inventory.weapon.bonusStats = awakeResult;
                    console.log(inventory.weapon)
                    calcPlayerStatsWithEquipment();
                    displayInventory(true);
                    toastAction("Item Awaked.", colors.green);
                    break;

                case "helmet":
                    unequipStuff();
                    var awakeResult = []
                    for (let index = 0; index < randInt(awakeNumber); index++) {
                        let stat = randArray(awakeListHelmet);
                        let statNumber = getAwake(stat);
                        awakeResult.push([stat, statNumber])
                    }
                    inventory.helmet.bonusStats = awakeResult;
                    calcPlayerStatsWithEquipment();
                    displayInventory(true);
                    toastAction("Item Awaked.", colors.green);
                    break;
                
                case "chest":
                    unequipStuff();
                    var awakeResult = [];
                    for (let index = 0; index < randInt(awakeNumber); index++) {
                        let stat = randArray(awakeListChest);
                        let statNumber = getAwake(stat);
                        awakeResult.push([stat, statNumber])
                    }
                    inventory.chest.bonusStats = awakeResult;
                    calcPlayerStatsWithEquipment();
                    displayInventory(true);
                    toastAction("Item Awaked.", colors.green);
                    break;

                case "boots":
                    unequipStuff();
                    var awakeResult = [];
                    for (let index = 0; index < randInt(awakeNumber); index++) {
                        let stat = randArray(awakeListBoots);
                        let statNumber = getAwake(stat);
                        awakeResult.push([stat, statNumber])
                    }
                    inventory.boots.bonusStats = awakeResult;
                    calcPlayerStatsWithEquipment();
                    displayInventory(true);
                    toastAction("Item Awaked.", colors.green);
                    break;

                default:
                    break;
            }
        }
    }
    displayMonstersStats();
}

function getAwake(stat){
    var statNumber;
    if (stat == "force" || stat == "vigour" || stat == "agility" || stat == "wisdom"){
        statNumber = weightedRandom(awakeTablePrimeStat, awakeWeight);
    }
    else if (stat == "expBonus" || stat == "lootBonus" || stat == "criticalChance" || stat == "criticalDamage"){
        statNumber = weightedRandom(awakeTableExpLootCrit, awakeWeight);
    }
    else if (stat == "atk" || stat == "def"){
        statNumber = weightedRandom(awakeTableAtkDef, awakeWeight);
    }
    else if (stat == "hp5" || stat == "mp5"){
        statNumber = weightedRandom(awakeTablePerFive, awakeWeight);
    }
    else if (stat == "hpMax" || stat == "mpMax"){
        statNumber = weightedRandom(awakeTableHPMP, awakeWeight);
    }
    else if (stat == "dodgeChance"){
        statNumber = weightedRandom(awakeTableDodge, awakeWeight);
    }
    else {
        statNumber = weightedRandom(awakeTableAtkSpeed, awakeWeight);
    }
    return statNumber;
}

var awakePrice = 1000;
var awakeNumber = [1,3];
var awakeListWeapon = ["force","vigour","agility","wisdom","hpMax","mpMax","atk","def","atkSpeed","hp5","mp5","criticalChance","criticalDamage","expBonus","lootBonus","dodgeChance"];
var awakeListHelmet = ["force","vigour","agility","wisdom","hp5","mp5"];
var awakeListChest = ["hpMax","mpMax","def","expBonus","lootBonus"];
var awakeListBoots = ["criticalChance","criticalDamage","atk","atkSpeed","dodgeChance"];

var awakeWeight = [
    [0,24],
    [25,43],
    [44,59],
    [60,71],
    [72,80],
    [81,87],
    [88,93],
    [94,97],
    [98,99],
    [100,100]
];

// force, vigour, agility, wisdom
var awakeTablePrimeStat = [1,3,5,7,9,11,13,15,17,19];

// expBonus, lootBonus, criticalChance, criticalDamage
var awakeTableExpLootCrit = [1,2,3,4,5,6,7,8,9,10];

// dodgeChance
var awakeTableDodge = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]

// hp5, mp5
var awakeTablePerFive = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]

// atk, def
var awakeTableAtkDef = [10,20,30,40,50,60,70,80,90,100];

// HPMax, MPMax
var awakeTableHPMP = [100,200,300,400,500,600,700,800,900,1000];

// atkSpeed
var awakeTableAtkSpeed = [25,50,75,100,125,150,175,200,225,250];
