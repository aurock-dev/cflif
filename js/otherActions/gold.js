function lootGold(monsterFighted){
    let goldLooted = randInt(monsterFighted.gold);
    inventory.gold += addPercentage(goldLooted, player.goldBonus);
}