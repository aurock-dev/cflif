function playerDeath(){
    toastAction("You're dead", colors.red)
    player.hp = player.hpMax;
    player.exp = 0;
    displayStats();
    $('.progressExp').width('0%');
}