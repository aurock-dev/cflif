function displayAwakeButton(stuff){
    stuffTypeButton = '#aw' + stuff;
    $(stuffTypeButton).prop('disabled', false);
}

function awake(stuff){
    if (inventory[stuff] != ""){
        if (inventory.gold >= awakePrice){
            inventory.gold -= awakePrice;
            switch (stuff) {
                case "weapon":
                    var awakeResult = {};
                    let awakeNumber = randArray(awakeNumberTable);
                    for (let index = 0; index < awakeNumber; index++) {
                        let stat = randArray(awakeListWeapon);
                        let statNumber = 0;
                        if (stat == "force" || stat == "vigour" || stat == "agility" || stat == "wisdom"){
                            statNumber = weightedRandom(awakeChanceTablePS, awakeWeight);
                        }
                        else if (stat == "expBonus" || stat == "goldBonus" || stat == "criticalChance" || stat == "criticalDamage"){
                            statNumber = weightedRandom(awakeChanceTablePC, awakeWeight);
                        }
                        else if (stat == "hpMax" || stat == "atk" || stat == "def"){
                            statNumber = weightedRandom(awakeChanceTableADH, awakeWeight);
                        }
                        else {
                            statNumber = weightedRandom(awakeChanceTableAS, awakeWeight);
                        }
                        awakeResult[stat] = statNumber;
                    }
                    inventory.weapon.bonusStat = awakeResult;
                    console.log(inventory.weapon);
                    displayInventory(true);
                    calcPlayerStatsWithEquipment();
                    break;
            
                default:
                    break;
            }
        }
    }
}

var awakePrice = 5;
var awakeNumberTable = [1, 2, 3];
var awakeListWeapon = ["force","vigour","agility","wisdom","hpMax","atk","def","atkSpeed","criticalChance","criticalDamage","expBonus","goldBonus"];
var awakeListHelmet = ["force","vigour","agility","wisdom"];
var awakeListChest = ["hpMax","def","expBonus","goldBonus"];
var awakeListBoots = ["criticalChance","criticalDamage","atk","atkSpeed"];

var awakeWeight = [
    [0,24],
    [25,43],
    [44,59],
    [60,71],
    [72,80],
    [81,89],
    [90,94],
    [95,97],
    [98,99],
    [100,100]
];

// force, vigour, agility, wisdom
var awakeChanceTablePS = [1,3,5,7,9,11,13,15,17,19];

// expBonus, goldBonus, criticalChance, criticalDamage
var awakeChanceTablePC = [1,2,3,4,5,6,7,8,9,10];

// atk, def, hpmax
var awakeChanceTableADH = [10,20,30,40,50,60,70,80,90,100];

// atkSpeed
var awakeChanceTableAS = [25,50,75,100,125,150,175,200,225,250];
