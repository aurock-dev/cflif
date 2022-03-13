var buttonsNumbers = 0;
var stuffDisplayed = [];

function generateStuff(monster){
    let typeList = ["weapon", "helmet", "chest", "boots"];
    let typeName = randArray(typeList);

    if (typeName == "weapon"){
        stuff = {
            type : typeName,
            name : typeName,
            upgradeLvl : 0,
            damage : randInt([8, 18])*monster.lvl,
            price : randInt([45,75])*monster.lvl
        }
    }
    else{
        stuff = {
            type : typeName,
            name : typeName,
            upgradeLvl : 0,
            defense : randInt([8, 18])*monster.lvl,
            price : randInt([45,75])*monster.lvl
        }
    }

    stuffDisplayed.push(stuff);
    return stuff;
}