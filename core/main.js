function main(){
    displayStats();
    displayInventory();
    displayMonsters();
    selectAll();
    saveButton();
    $('.prestigeDiv').hide();
    $('.messagesBox').css('opacity','0')
    displayUpgradableStat(true);
}

main();
