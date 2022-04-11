function playerDeath(){
    toastAction("You're dead", colors.red)
    player.hp = player.hpMax;
    player.exp = 0;
    displayStats();
    // $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
    $('.progressHP').width('100%');
    // $('#playerExpPB').attr('aria-valuenow', 0).css('width', '0%');
    $('.progressExp').width('0%');
}