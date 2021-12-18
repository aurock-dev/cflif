var player = {
    lvl : 1,
    exp : 0,
    statsPoints : 0,
    hpMax : 25,
    hp : 25,
    atk : 2,
    atkSpeed : 1000
}

var playerLvlUp = {
    atk : 1,
    hp : 5
}

var playerAttacking;
var monsterAttacking;
var fightText = "Fight";
var statsState = false;