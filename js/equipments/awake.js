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
                    let awakeNumber = randArray(awakeNumberTable);
                    for (let index = 0; index < awakeNumber; index++) {
                        let stat = randArray(awakeListWeapon);
                        if (stat == "force" || stat == "vigour" || stat == "agility" || stat == "wisdom"){
                            console.log(stat, randArray(awakeChanceTablePS)[0])
                        }
                        else if (stat == "expBonus" || stat == "goldBonus" || stat == "criticalChance" || stat == "criticalDamage"){
                            console.log(stat, randArray(awakeChanceTablePC)[0])
                        }
                        else if (stat == "hpMax" || stat == "atk" || stat == "def"){
                            console.log(stat, randArray(awakeChanceTableADH)[0])
                        }
                        else {
                            console.log(stat, randArray(awakeChanceTableAS)[0])
                        }
                    }
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

// force, vigour, agility, wisdom
var awakeChanceTablePS = [
    [1, 25],
    [3, 20],
    [5, 16],
    [7, 12],
    [9, 9],
    [11, 7],
    [13, 5],
    [15, 3],
    [17, 2],
    [19, 1]
];

// expBonus, goldBonus, criticalChance, criticalDamage
var awakeChanceTablePC = [
    [1, 25],
    [2, 20],
    [3, 16],
    [4, 12],
    [5, 9],
    [6, 7],
    [7, 5],
    [8, 3],
    [9, 2],
    [10, 1]
];

// atk, def, hpmax
var awakeChanceTableADH = [
    [10, 25],
    [20, 20],
    [30, 16],
    [40, 12],
    [50, 9],
    [60, 7],
    [70, 5],
    [80, 3],
    [90, 2],
    [100, 1]
];

// atkSpeed
var awakeChanceTableAS = [
    [25, 25],
    [50, 20],
    [75, 16],
    [100, 12],
    [125, 9],
    [150, 7],
    [175, 5],
    [200, 3],
    [225, 2],
    [250, 1]
];
