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
        var monsterAtkSpeed = (monsters[key]["atkSpeed"]/1000)+"/sec";
        var buttonId = "fightButton"+cpt;
        var hpmId = "hpm"+cpt;
        var monsterRow = "monsterRow"+cpt;
        
        $('#monsterList').append('<div class="row align-items-center top-buffer" id='+monsterRow+'></div>');

        var monsterButton = '<div class="col- "><button type="button" id='+buttonId+' class="btn btn-outline-primary">'+fightText+'</button></div>';
        var monsterName = '<div class="col-sm" id="detailMonster">'+monsterName+' | Level : '+monsterLvl+' | Exp given : '+monsterExp+'</div>';
        var monsterDetail = '<div class="col-sm"> HP : <span id='+hpmId+'>'+monsterHP+'</span>/'+monsterHPMax+' | Atk : '+monsterAtk+' | Atk Speed : '+monsterAtkSpeed+'</div>';
        $('#'+monsterRow).append(monsterButton+'<div class="col-sm border border-primary">'+monsterName+monsterDetail+'</div>');
        cpt += 1;
    }
}

function displayUpgradableStat(state){
    if (state == true){
        $('[id=upgradableStatMessage]').show()
    }
    else if (state == false){
        $('[id=upgradableStatMessage]').hide();
    }
}

function displayInventory(){
    $('.gold').text(inventory.gold);
}