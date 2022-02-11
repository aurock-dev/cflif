var lvlChangeClass = 10;
var lvlChangeClassSup = 50;

function mercenaryClass(){
    calcStat("force", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Mercenary";
    player.classLvl = 1;
    displayStats();
}

function assistClass(){
    calcStat("agility", 5, "add");
    calcStat("wisdom", 5, "add");
    player.class = "Assist";
    player.classLvl = 1;
    displayStats();
}

function acrobatClass(){
    calcStat("force", 5, "add");
    calcStat("agility", 5, "add");
    player.class = "Acrobat";
    player.classLvl = 1;
    displayStats();
}

function magicianClass(){
    calcStat("wisdom", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Magician";
    player.classLvl = 1;
    displayStats();
}

function bladeClass(){
    calcStat("force", 10, "add");
    player.class = "Blade";
    player.classLvl = 2;
    displayStats();
}

function knightClass(){
    calcStat("vigour", 10, "add");
    player.class = "Knight";
    player.classLvl = 2;
    displayStats();
}

function billposterClass(){
    calcStat("agility", 10, "add");
    player.class = "Billposter";
    player.classLvl = 2;
    displayStats();
}

function ringmasterClass(){
    calcStat("wisdom", 10, "add");
    player.class = "Ringmaster";
    player.classLvl = 2;
    displayStats();
}

function rangerClass(){
    calcStat("agility", 10, "add");
    player.class = "Ranger";
    player.classLvl = 2;
    displayStats();
}

function jesterClass(){
    calcStat("force", 10, "add");
    player.class = "Jester";
    player.classLvl = 2;
    displayStats();
}

function elementorClass(){
    calcStat("vigour", 10, "add");
    player.class = "Elementor";
    player.classLvl = 2;
    displayStats();
}

function psykeeperClass(){
    calcStat("wisdom", 10, "add");
    player.class = "Psykeeper";
    player.classLvl = 2;
    displayStats();
}
