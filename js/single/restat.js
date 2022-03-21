function restat(skip=false){
    if (inventory.gold >= restatPrice() || skip){
        player.force = 1;
        player.vigour = 1;
        player.agility = 1;
        player.wisdom = 1;
        player.hpMax = 2500;
        player.hp = 2500;
        player.atk = 200;
        player.def = 100;
        player.atkSpeed = 2000;
        player.criticalChance = 10;
        player.criticalDamage = 100;
        player.expBonus = 1;
        player.goldBonus = 1;
        player.statsPoints = player.allStatsPoints;
        player.allStatsPoints = 0;
        if (skip == false){
            inventory.gold -= restatPrice();
        }
        calcPlayerStatsWithEquipment();
        displayStats();
        displayInventory();
        displayUpgradableStat(true);
        toastAction("Re-stat done.", "bg-primary");
    }
}

function restatPrice(){
    let restatPrice = 2000;
    let restatPriceModified = restatPrice * player.lvl;
    return restatPriceModified;
}