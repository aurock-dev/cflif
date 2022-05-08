function main(){
    displayStats();
    displayInventory();
    displayMonsters();
    displayMonstersStats()
    selectAll();
    saveButton();
    $('.prestigeDiv').hide();
    $('.messagesBox').css('opacity','0')
    displayUpgradableStat(true);
    regens();
}

main();
