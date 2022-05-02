function main(){
    displayStats();
    displayInventory();
    displayMonsters();
    selectAll();
    displayUpgradableStat(true);
    saveButton();
    $('.prestigeDiv').hide();
    $('.messagesBox').css('opacity','0')
}

main();
