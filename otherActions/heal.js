function heal(){
    if (inventory.gold >= healPrice()){
        inventory.gold -= healPrice();
        player.hp = player.hpMax;
        player.mp = player.mpMax;
        displayStats();
        toastAction("Player healed.", colors.green);
    }
}

function healPrice(){
    let healPrice = 1000;
    let percentageModificator = 100-calcPercentage(player.hp, player.hpMax);
    let priceWithPercentage = addPercentage(healPrice, percentageModificator);
    return priceWithPercentage;
}