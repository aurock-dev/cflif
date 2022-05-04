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
        var monsterGold = monsters[key].gold[0] + '-' +monsters[key].gold[1];
        var monsterLootChance =  monsters[key].lootChance;
        var progressId = "monsterHPPB"+cpt;
        var hpmId = "hpm"+cpt;
        var monsterRow = "monsterRow"+cpt;
        var monsterRowExpBase = "monsterRowExpBase"+cpt;
        var monsterRowExpBonus = "monsterRowExpBonus"+cpt;
        
        $('.monsterList').append('<div class='+monsterRow+'></div>');

        var monsterInfos = '<div class="monsterInfos">'+
            '<div><span class="title">Name : </span>'+monsterName+'</div>'+
            '<div><span class="title">Level : </span>'+monsterLvl+'</div>'+
            '<div><span class="title">Gold : </span>'+monsterGold+'</div>'+
            '<div><span class="title">Exp : </span><span class='+monsterRowExpBase+'>'+monsterExp+'</span> +<span class='+monsterRowExpBonus+'>0</span> bonus</div>'+
            '<div><span class="title">Loot Chance : </span>'+monsterLootChance+'%</div>'+
        '</div>';

        var monsterStats = '<div class="monsterStats">'+
            '<div><span class="title">Attack : </span>'+monsterAtk+'</div>'+
            '<div><span class="title">Attack Speed: </span>'+monsterAtkSpeed+'</div>'+
        '</div>';

        var monsterLife = '<div class="monsterLife">'+
            '<div class="progressWrapper">'+
                '<div class='+progressId+'>'+
                    '<div class="barText">Hp : <span class='+hpmId+'>'+monsterHP+'</span> / '+monsterHPMax+'</div>'+
                '</div>'+
            '</div>'+
        '</div>';

        var monsterRight = '<div class="monsterRight">'+monsterStats+monsterLife+'</div>';

        var monsterCard = monsterInfos + monsterRight
        $("."+monsterRow).append(monsterCard);
        cpt += 1;
    }
}

function displayMonstersStats(){
    for (let index = 0; index < monstersNumber; index++) {
        let expBase = $('.monsterRowExpBase'+index).text();
        let expBonus = addPercentage(parseInt(expBase), player.expBonus) - expBase;
        $('.monsterRowExpBonus'+index).text(expBonus)
    }
}