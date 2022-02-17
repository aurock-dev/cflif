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
            lootChance : 10
        };
        monstersList.push(generateMonster);
    }

    return monstersList;
}

var monsters = generateMonsters(12);
var monstersNumber = Object.keys(monsters).length;
