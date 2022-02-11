var lvlChangeClass = 2;
var lvlChangeClassSup = 50;

function mercenaryClass(){
    calcStat("force", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Mercenary";
}

function assistClass(){
    calcStat("agility", 5, "add");
    calcStat("wisdom", 5, "add");
    player.class = "Assist";
}

function acrobatClass(){
    calcStat("force", 5, "add");
    calcStat("agility", 5, "add");
    player.class = "Acrobat";
}

function magicianClass(){
    calcStat("wisdom", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Magician";
}