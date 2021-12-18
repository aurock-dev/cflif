var baseExp = 3;

function expNeeded(lvl){
    let expNeeded = 0;
    expNeeded = lvl * (baseExp+1);
    return expNeeded;
}

function levelUp(){
    player.lvl += 1;
    player.exp = 0 //TODO pas egale 0, calculer le reste et ajouter
    player.statsPoints += 1;
    player.hp = player.hpMax;
    displayStats();
}