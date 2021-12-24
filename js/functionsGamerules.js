function expNeeded(lvl){
    return lvl * (4);
}

function levelUp(){
    var expSpare = Math.max(0, player.exp - expNeeded(player.lvl));
    player.lvl += 1;
    player.exp = expSpare;
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
    player.atkSpeed -= 100;
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

function attackMinusDefense(atk){
    return Math.max(0, atk - player.def);
}

function testIfAtkCrit(monsterFighted){
    var randNumber = randInt(1,100);
    var damage = player.atk;
    if (randNumber <= player.criticRate){
        var damage = Math.round(player.atk + (player.criticDamage/100*player.atk));
    }
    monsterFighted["hp"] = Math.max(0, (monsterFighted["hp"] - damage));
    return damage;
}

function lootGold(monsterFighted){
    return randInt(monsterFighted["gold"][0],monsterFighted["gold"][1]);
}