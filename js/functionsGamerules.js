var baseExp = 3;

function expNeeded(lvl){
    let expNeeded = 0;
    expNeeded = lvl * (baseExp+1);
    return expNeeded;
}

function levelUp(){
    player.lvl += 1;
    player.exp = 0 
    player.statsPoints += 1;
    player.hp = player.hpMax;
    displayStats();
}

function calcForce(){
    player.force += 1;
    player.atk += 1;
    player.criticDamage += 1;
    displayStats();
}

function calcVigour(){
    player.vigour += 1;
    player.hpMax += 5;
    player.hp = player.hpMax;
    player.def += 1;
    displayStats();
}

function calcAgility(){
    player.agility += 1;
    player.atkSpeed += 100;
    player.criticRate += 1;
    displayStats();
}

function calcWisdom(){
    player.wisdom += 1;
    player.castingTime += 1;
    player.mpMax += 5;
    player.mp = player.mpMax;
    displayStats();
}

function testIfAtkCrit(monsterFighted){
    var randNumber = Math.floor(Math.random() * 101);
    if (randNumber <= player.criticRate){
        var crit = (player.atk + (player.criticDamage/100*player.atk));
        monsterFighted["hp"] = monsterFighted["hp"] - crit;
        return crit;
    }
    else{
        monsterFighted["hp"] = monsterFighted["hp"] - player.atk;
        return player.atk;
    }
}