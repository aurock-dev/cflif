function displayStats(){
    $('#lvl').text(player.lvl);
    $('#exp').text(player.exp);
    $('#expNeeded').text(expNeeded(player.lvl));
    $('#statsPts').text(player.statsPoints);
    $('#for').text(player.force);
    $('#vig').text(player.vigour);
    $('#agi').text(player.agility);
    $('#wis').text(player.wisdom);
    $('#hp').text(player.hp);
    $('#hpMax').text(player.hpMax);
    $('#atk').text(player.atk);
    $('#def').text(player.def);
    $('#expB').text(player.expBonus);
    $('#goldB').text(player.goldBonus);
    $('#atkSpeed').text(player.atkSpeed/1000);
    $('#critC').text(player.criticalChance);
    $('#critD').text(player.criticalDamage);
}

function displayMonsters(){
    var cpt = 1;
    for (var key in monsters) {      
        var monsterName = monsters[key]["name"];
        var monsterLvl = monsters[key]["lvl"];
        var monsterExp = monsters[key]["exp"];
        var monsterHP = monsters[key]["hp"];
        var monsterHPMax = monsters[key]["hpMax"];
        var monsterAtk = monsters[key]["atk"];
        var monsterAtkSpeed = "every " + monsters[key]["atkSpeed"]/1000 + " sec";
        var monsterGold = monsters[key]["gold"];
        var monsterLootChance =  monsters[key]["lootChance"];
        var buttonId = "fightButton"+cpt;
        var progressId = "monsterHPPB"+cpt;
        var hpmId = "hpm"+cpt;
        var monsterRow = "monsterRow"+cpt;
        
        $('#monsterList').append('<div class="row align-items-center top-buffer" id='+monsterRow+'></div>');

        var monsterButton = '<div class="col-2 text-center "><button type="button" id='+buttonId+' class="btn btn-outline-primary btn-block">'+fightText+'</button></div>';
        
        var monsterName = '<div class="col-sm text-center" id="detailMonster">'+monsterName+' | Level : '+monsterLvl+' | Exp given : '+monsterExp+' | Gold dropped : '+monsterGold+' | Loot Chance : '+monsterLootChance+'</div>';
        
        var monsterHPPB = '<div class="progress top-buffer" style="height: 15px;">'+
        '<div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" id='+progressId+' role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">'+
        '<div class="progress-bar-text"><nobr>HP : <span id='+hpmId+'>'+monsterHP+'</span> / '+monsterHPMax+'</nobr></div>'+
        '</div>'+
        '</div>'
        
        var monsterDetail = '<div class="row text-center"><div class="col-sm">'+monsterHPPB+'</div><div class="col-sm"> Atk : '+monsterAtk+' | Atk Speed : '+monsterAtkSpeed+'</div></div>';
        
        $('#'+monsterRow).append(monsterButton+'<div class="col-sm border border-primary rounded">'+monsterName+monsterDetail+'</div>');
        cpt += 1;
    }
}

function displayUpgradableStat(state){
    if (state == true){
        $('[id=upgradableStatMessage]').show();
    }
    else if (state == false){
        $('[id=upgradableStatMessage]').hide();
    }
}

function displayInventory(state=false){
    $('.gold').text(inventory.gold);
    if (state == true){
        if (inventory.weapon != ""){
            $('.listWeapon').empty();
            $('.listWeapon').append('<li class="stuffName">'+inventory.weapon.name+'</li>');
            $('.listWeapon').append('<li>Damage : '+inventory.weapon.damage+'</li>');
            for (var key in inventory.weapon.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listWeapon').append('<li>'+convertKey(key)+' : '+inventory.weapon.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listWeapon').append('<li>'+convertKey(key)+' : '+inventory.weapon.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.helmet != ""){
            $('.listHelmet').empty();
            $('.listHelmet').append('<li class="stuffName">'+inventory.helmet.name+'</li>');
            $('.listHelmet').append('<li>Defense : '+inventory.helmet.defense+'</li>');
            for (var key in inventory.helmet.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listHelmet').append('<li>'+convertKey(key)+' : '+inventory.helmet.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listHelmet').append('<li>'+convertKey(key)+' : '+inventory.helmet.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.chest != ""){
            $('.listChest').empty();
            $('.listChest').append('<li class="stuffName">'+inventory.chest.name+'</li>');
            $('.listChest').append('<li>Defense : '+inventory.chest.defense+'</li>');
            for (var key in inventory.chest.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listChest').append('<li>'+convertKey(key)+' : '+inventory.chest.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listChest').append('<li>'+convertKey(key)+' : '+inventory.chest.bonusStats[key]+'</li>');
                }
            }
        }
        if (inventory.boots != ""){
            $('.listBoots').empty();
            $('.listBoots').append('<li class="stuffName">'+inventory.boots.name+'</li>');
            $('.listBoots').append('<li>Defense : '+inventory.boots.defense+'</li>');
            for (var key in inventory.boots.bonusStats){
                if (listOfStats.includes(key, -4)){
                    $('.listBoots').append('<li>'+convertKey(key)+' : '+inventory.boots.bonusStats[key]+'%</li>');
                }
                else{
                    $('.listBoots').append('<li>'+convertKey(key)+' : '+inventory.boots.bonusStats[key]+'</li>');
                }
            }
        }
    }
}

function displayMonsterDrop(stuff){
    var formatedBonuses = "";
    for (let key in stuff.bonusStats){
        let type = stuff.type
        if (stuff.bonusStats[key] > inventory[type].bonusStats[key]){
            if (listOfStats.includes(key, -4)){
                formatedBonuses += convertKey(key) +' : <span id="statMore">'+stuff.bonusStats[key]+'</span> ~ ';
            }
            else {
                formatedBonuses += convertKey(key) +' : <span id="statMore">'+stuff.bonusStats[key]+'</span> ~ ';
            }
        }
        else if (stuff.bonusStats[key] < inventory[type].bonusStats[key]){
            if (listOfStats.includes(key, -4)){
                formatedBonuses += convertKey(key) +' : <span id="statLess">'+stuff.bonusStats[key]+'</span>% ~ ';
            }
            else {
                formatedBonuses += convertKey(key) +' : <span id="statLess">'+stuff.bonusStats[key]+'</span> ~ ';
            }
        }
        else {
            if (listOfStats.includes(key, -4)){
                formatedBonuses += convertKey(key) +' : '+stuff.bonusStats[key]+'% ~ ';
            }
            else {
                formatedBonuses += convertKey(key) +' : '+stuff.bonusStats[key]+' ~ ';
            }      
        }
    }
    var trimedBonuses = formatedBonuses.slice(0, -3);
    if (stuff.type == "weapon"){
        if (stuff.damage > inventory.weapon.damage){
            var formatedStuff = stuff.name+' | Damage : <span id="statMore">'+stuff.damage+'</span> | '+trimedBonuses+' | Price : '+stuff.price;
        }
        else {
            var formatedStuff = stuff.name+' | Damage : <span id="statLess">'+stuff.damage+'</span> | '+trimedBonuses+' | Price : '+stuff.price;
        }
    }
    else {
        if (stuff.defense > inventory.weapon.defense){
            var formatedStuff = stuff.name+' | Defense : <span id="statMore">'+stuff.defense+'</span> | '+trimedBonuses+' | Price : '+stuff.price;
        }
        else {
            var formatedStuff = stuff.name+' | Defense : <span id="statLess">'+stuff.defense+'</span> | '+trimedBonuses+' | Price : '+stuff.price;
        }
    }
    let monsterDrop =
    '<div class="row text-center top-buffer border border-warning rounded" id="listedStuff'+buttonsNumbers+'">'+
        '<div class="col-10" style="white-space: nowrap">'+
            formatedStuff+
        '</div>'+
        '<div class="col-2">'+
            '<button type="button" id="equipButton'+buttonsNumbers+'" class="btn btn-sm btn-outline-primary py-0 bm-sm">Equip</button>'+
            '<button type="button" id="sellButton'+buttonsNumbers+'" class="btn btn-sm btn-outline-primary py-0 bm-sm">Sell</button>'+
        '</div>'+
    '</div>'

    $('.IW').append(monsterDrop);

    buttonsNumbers += 1;
}