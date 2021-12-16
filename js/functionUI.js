function displayStats(){
    document.querySelector("#lvl").innerHTML = player.lvl;
    document.querySelector("#exp").innerHTML = player.exp;
    document.querySelector("#expNeeded").innerHTML = calculExp(player.lvl);
    document.querySelector("#statsPts").innerHTML = player.statsPoints;
    document.querySelector("#atk").innerHTML = player.atk;
    document.querySelector("#hp").innerHTML = player.hp;
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

function displayStatsPoints(){
    if (player.statsPoints > 0){
        $('#playerAtk').append('<button type="button" id="statButton1" class="btn btn-outline-primary">+'+playerLvlUp.atk+'</button>');
        $('#playerHp').append('<button type="button" id="statButton2" class="btn btn-outline-primary">+'+playerLvlUp.hp+'</button>');
    }
    else{
        $('#statButton1').remove();
        $('#statButton2').remove();
    }
}
