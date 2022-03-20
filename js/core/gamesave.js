function saveButton(){
    $('[id=saveButton]').click(function(){
        save()});
    $('[id=loadButton]').click(function(){
        load()});
    $('[id=clearButton]').click(function(){
        clearSave()});
}

function save(){
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('playerInventory', JSON.stringify(inventory));
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
        displayUpgradeButton("weapon", 50*(inventory.weapon.upgradeLvl+1));
        displayAwakeButton("weapon");
        displayUpgradeButton("helmet", 50*(inventory.helmet.upgradeLvl+1));
        displayAwakeButton("helmet");
        displayUpgradeButton("chest", 50*(inventory.chest.upgradeLvl+1));
        displayAwakeButton("chest");
        displayUpgradeButton("boots", 50*(inventory.boots.upgradeLvl+1));
        displayAwakeButton("boots");
    }
    $('#healButton').text("Heal : "+healPrice()+" golds");
    $('#restatButton').text("Re-stat : "+restatPrice()+" golds");
}

function clearSave(){
    localStorage.clear();
}