function heal(){
    if (player.hp < player.hpMax && inventory.gold >= healPrice()){
        inventory.gold -= healPrice();
        player.hp = player.hpMax;
        // $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
        $('.progressHP').width('100%');
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