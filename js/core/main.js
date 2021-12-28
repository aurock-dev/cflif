function main(){
    displayStats();
    displayInventory();
    displayMonsters();
    selectAll();
    displayUpgradableStat(true);
    saveButton();

    equipStuff(weapon.w2)
    console.log(inventory.weapon.bonusStats)
    equipStuff(helmet.h1)
    console.log(inventory.helmet.bonusStats)
    equipStuff(chest.c1)
    console.log(inventory.chest.bonusStats)
    equipStuff(boots.b1)
    console.log(inventory.boots.bonusStats)
}

main();
