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
    $('#casting').text(player.castingTime+"%");
    $('#mp').text(player.mp);
    $('#mpMax').text(player.mpMax);
    $('#atkSpeed').text(player.atkSpeed/1000+"/sec");
    $('#critR').text(player.criticRate+"%");
    $('#critD').text(player.criticDamage+"%");
}

function displayMonsters(){
    var cpt = 1;
    for (var key in monsters) {      
        var monsterName = monsters[key]["name"];
        var monsterHP = monsters[key]["hp"];
        var monsterAtk = monsters[key]["atk"];
        var buttonId = "fightButton"+cpt;
        var hpmId = "hpm"+cpt;

        $('#monsterList').append('<button type="button" id='+buttonId+' class="btn btn-outline-primary">'+fightText+'</button>');
        $('#monsterList').append( monsterName+' => HP : <span id='+hpmId+'>'+monsterHP+'</span> | Atk : '+monsterAtk);
        $('#monsterList').append('<br>')
        cpt += 1;
    }
}
