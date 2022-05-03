function saveButton(){
    $('.saveButton').click(function(){
        save()});
    $('.loadButton').click(function(){
        load()});
    $('.autosaveButton').click(function(){
        autoSave()});
}

function save(){
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('playerInventory', JSON.stringify(inventory));
    toastAction("Game auto-saved", colors.green);
}

function load(){
    player = JSON.parse(localStorage.getItem('player'));
    inventory = JSON.parse(localStorage.getItem('playerInventory'));
    displayStats();
    displayInventory(true);
    displayUpgradableStat(false);
    if (player.statsPoints > 0){
        displayUpgradableStat(true);
    }
    if (inventory.weapon != "" || inventory.helmet != "" || inventory.chest != "" || inventory.boots != "" ){
        displayUpgradeButton("weapon", 50*(inventory.weapon.upgradeLvl+1) || 50);
        displayAwakeButton("weapon");
        displayUpgradeButton("helmet", 50*(inventory.helmet.upgradeLvl+1) || 50);
        displayAwakeButton("helmet");
        displayUpgradeButton("chest", 50*(inventory.chest.upgradeLvl+1) || 50);
        displayAwakeButton("chest");
        displayUpgradeButton("boots", 50*(inventory.boots.upgradeLvl+1) || 50);
        displayAwakeButton("boots");
    }
    if (player.lvl >= 100){
        if (player.prestige < 3){
            $('.xpbar').hide();
            $('.prestigeDiv').show();
        }
        else {
            $('.prestigeDiv').hide();
            $('.xpbar').show();
            $('.progressExp').width('100%');
            $('.exp').text("Max")
            $('.expNeeded').text("Max")
        }
        selectPrestige();
    }
    $('.healButton').text("Heal : "+healPrice()+" golds");
    updateDisplayRestatPrice();
}

function clearSave(){
    localStorage.clear();
}

function autoSave(){
    if (options.autosave == false){
        $('.autosaveButton').text("AUTO SAVE ON (5min)");
        $('.autosaveButton').css("background-color", "var(--button-autosave-on)")
        options.autosave = true;
        toastAction("AutoSave activated", colors.blue);
    }
    else {
        $('.autosaveButton').text("AUTO SAVE OFF");
        $('.autosaveButton').css("background-color", "var(--button-autosave-off)")
        options.autosave = false;
        toastAction("AutoSave desactivated", colors.blue);
    }

    if (options.autosave){
        autoSaveState = setInterval(() => {
            save();
        }, 300000);
    }
    else{
        clearInterval(autoSaveState);
        autoSaveState = null;
    }
}

var autoSaveState;