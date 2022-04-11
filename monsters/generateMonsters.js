function generateMonsters(number){
    var monstersList = [];

    for (let index = 0; index < number; index++) {
        var generateMonster = {
            name : monsterNamesListShuffled[index],
            lvl : Math.max(1, 3*index),
            exp : Math.max(30, Math.round((index*30)*(1+index))),
            hpMax : Math.max(1000, Math.round((925*(index+1))*0.85)),
            hp : Math.max(1000, Math.round((925*(index+1))*0.85)),
            atk : Math.max(125, Math.round((95*(index+1))*1.15)),
            atkSpeed : Math.max(100, Math.round((2000-(index*45.5)))),
            gold : [Math.max(50,50*(index+1)) , Math.max(130,130*(index+1)) ],
            lootChance : 100
        };
        monstersList.push(generateMonster);
    }

    return monstersList;
}

var monsters = generateMonsters(34);
var monstersNumber = Object.keys(monsters).length;

function displayMonsters(){
    var cpt = 0;
    for (var key in monsters) {      
        var monsterName = monsters[key].name;
        var monsterLvl = monsters[key].lvl;
        var monsterExp = monsters[key].exp;
        var monsterHP = monsters[key].hp;
        var monsterHPMax = monsters[key].hpMax;
        var monsterAtk = monsters[key].atk;
        var atks = 200-(100*(monsters[key].atkSpeed/2000))
        var monsterAtkSpeed = atks.toFixed(2) + "%";
        var monsterGold = monsters[key].gold;
        var monsterLootChance =  monsters[key].lootChance;
        var progressId = "monsterHPPB"+cpt;
        var hpmId = "hpm"+cpt;
        var monsterRow = "monsterRow"+cpt;
        
        $('.monsterList').append('<div class='+monsterRow+'></div>');

        var monsterInfos = '<div class="monsterInfos">'+
            '<div>'+monsterName+'</div>'+
            '<div> Level : '+monsterLvl+'</div>'+
            '<div> Exp : '+monsterExp+'</div>'+
            '<div> Gold : '+monsterGold+'</div>'+
            '<div> Loot Chance : '+monsterLootChance+'%</div>'+
        '</div>';

        var monsterStats = '<div class="monsterStats">'+
            'Attack : '+monsterAtk+' | Attack Speed : '+monsterAtkSpeed+
        '</div>';

        var monsterLife = '<div class="monsterLife">'+
            '<div class="progressWrapper">'+
                '<div class='+progressId+'>'+
                    '<div class="text"><span class='+hpmId+'>'+monsterHP+'</span> / '+monsterHPMax+'</div>'+
                '</div>'+
            '</div>'+
        '</div>';

        var monsterRight = '<div class="monsterRight">'+monsterStats+monsterLife+'</div>';

        var monsterCard = monsterInfos + monsterRight
        $("."+monsterRow).append(monsterCard);

        // var monsterButton = '<div class="col-2 text-center d-grid"><button type="button" id='+buttonId+' class="btn btn-outline-primary">'+fightText+'</button></div>';
        
        // var monsterName = '<div class="col-sm text-center" id="detailMonster">'+monsterName+' | Level : '+monsterLvl+' | Exp given : '+monsterExp+' | Gold dropped : '+monsterGold+' | Loot Chance : '+monsterLootChance+'%</div>';
        
        // var monsterHPPB = '<div class="progress top-buffer" style="height: 15px;">'+
        // '<div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" id='+progressId+' role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">'+
        // '<div class="progress-bar-text"><nobr>HP : <span id='+hpmId+'>'+monsterHP+'</span> / '+monsterHPMax+'</nobr></div>'+
        // '</div>'+
        // '</div>'
        
        // var monsterDetail = '<div class="row text-center"><div class="col-sm">'+monsterHPPB+'</div><div class="col-sm"> Atk : '+monsterAtk+' | Atk Speed : '+monsterAtkSpeed+'</div></div>';
        
        // $('.'+monsterRow).append(monsterButton+'<div class="col-sm border border-primary rounded">'+monsterName+monsterDetail+'</div>');
        cpt += 1;
    }
}