function displayUpgradeButton(stuff, upgradePrice=50){
    stuffTypeButton = '.up' + stuff;
    if (inventory[stuff].upgradeLvl == 10){
        $(stuffTypeButton).text('Upgrade: Max');
        $(stuffTypeButton).prop('disabled', true);
    }
    else{
        $(stuffTypeButton).text('Upgrade : '+upgradePrice+'g');
        $(stuffTypeButton).prop('disabled', false);
    }
}

function upgrade(stuff){
    if (inventory[stuff] != ""){
        let upgradePrice = 50*(inventory[stuff].upgradeLvl+1);
        if (inventory.gold >= upgradePrice){
            inventory.gold -= upgradePrice;
            let chanceUpgrade = 100-((inventory[stuff].upgradeLvl+1)*9.9);
            if (inventory[stuff].upgradeLvl < 10 && randInt([1, 100]) <= chanceUpgrade){
                toastAction("Upgrade success !", colors.green);
                inventory[stuff].upgradeLvl += 1;
                upgradePrice = 50*(inventory[stuff].upgradeLvl+1)
                if (stuff == "weapon"){
                    player.atk -= inventory[stuff].damage;
                    inventory[stuff].damage = addPercentage(inventory[stuff].damage, 8);
                    player.atk += inventory[stuff].damage;
                }
                else{
                    player.def -= inventory[stuff].defense;
                    inventory[stuff].defense = addPercentage(inventory[stuff].defense, 8);
                    player.def += inventory[stuff].defense;
                }
            }
            else{
                toastAction("Upgrade failed...", colors.red);
            }
        }
        colorizeStats();
        displayInventory(true);
        displayStats();
        displayUpgradeButton(stuff, upgradePrice);
    }
}