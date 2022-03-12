var player = {
    class : "Vagrant",
    classLvl : 0,
    lvl : 1,
    exp : 0,
    prestige : 0,
    expMult : 1,
    statsMult : 1,
    statsPoints : 3,
    force : 1,
    vigour : 1,
    agility : 1,
    wisdom : 1,
    hpMax : 2500,
    hp : 2500,
    atk : 200,
    def : 100,
    atkSpeed : 2000,
    criticalChance : 10,
    criticalDamage : 100,
    expBonus : 1,
    goldBonus : 1,
};

var inventory = {
    gold : 1000000000,
    weapon : "",
    helmet : "",
    chest : "",
    boots : ""
}

var listOfStats = ["lvl","exp","statsPoints","force","vigour","agility","wisdom","hpMax","hp","atk","def","atkSpeed","criticalChance","criticalDamage","expBonus","goldBonus"];
var listOfStatsFormat = ["Level","Experience","Stats Points","Force","Vigour","Agility","Wisdom","HP Maximum","HP","Attack","Defense","Attack Speed","Critical Chance","Critical Damage","Experience Bonus","Gold Bonus"];


var playerAttacking;
var monsterAttacking;
var fightText = "Fight";