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
    displayInventory();
    displayUpgradableStat(false);
    if (player.statsPoints > 0){
        displayUpgradableStat(true);
    }
}

function clearSave(){
    localStorage.clear();
}