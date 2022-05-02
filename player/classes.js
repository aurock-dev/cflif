var lvlChangeClass = 2;
var lvlChangeClassSup = 3;

function warriorClass(){
    calcStat("force", 3, "add");
    calcStat("vigour", 3, "add");
    player.class = "Warrior";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function fighterClass(){
    calcStat("agility", 3, "add");
    calcStat("wisdom", 3, "add");
    player.class = "Fighter";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function scoutClass(){
    calcStat("force", 3, "add");
    calcStat("agility", 3, "add");
    player.class = "Scout";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function mageClass(){
    calcStat("wisdom", 3, "add");
    calcStat("vigour", 3, "add");
    player.class = "Mage";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function assassinClass(){
    calcStat("force", 4, "add");
    calcStat("vigour", 2, "add");
    player.class = "Assassin";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function templarClass(){
    calcStat("vigour", 4, "add");
    calcStat("force", 2, "add");
    player.class = "Templar";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function monkClass(){
    calcStat("agility", 4, "add");
    calcStat("wisdom", 2, "add");
    player.class = "Monk";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function dancerClass(){
    calcStat("wisdom", 4, "add");
    calcStat("agility", 2, "add");
    player.class = "Dancer";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function hunterClass(){
    calcStat("agility", 4, "add");
    calcStat("force", 2, "add");
    player.class = "Hunter";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function gamblerClass(){
    calcStat("force", 4, "add");
    calcStat("agility", 2, "add");
    player.class = "Gambler";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function elementalistClass(){
    calcStat("vigour", 4, "add");
    calcStat("wisdom", 2, "add");
    player.class = "Elementalist";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function illusionistClass(){
    calcStat("wisdom", 4, "add");
    calcStat("vigour", 2, "add");
    player.class = "Illusionist";
    player.classLvl = 2;
    displayStats();
    $('.classModal').hide();
}

function displayClassModal(){
    resetMonsters();
    clearAttacks();
    $('.classModal').show()
    $('.classesButton').show()
    $('.classesWarriorButton').hide();
    $('.classesFighterButton').hide();
    $('.classesScoutButton').hide();
    $('.classesMageButton').hide();
    $('.modalContent h3').text('');

    $('.buttonWarrior').mouseover(function(){
        $('.modalContent h3').text('Force +3 / Vigour +3');
    })
    $('.buttonFighter').mouseover(function(){
        $('.modalContent h3').text('Agility +3 / Wisdom +3');
    })
    $('.buttonScout').mouseover(function(){
        $('.modalContent h3').text('Force +3 / Agility +3');
    })
    $('.buttonMage').mouseover(function(){
        $('.modalContent h3').text('Wisdom +3 / Vigour +3');
    })
}

function displayClassSupModal(){
    resetMonsters();
    clearAttacks();
    $('.classModal').show();
    switch (player.class) {
        case "Warrior":
            $('.classesButton').hide();
            $('.classesWarriorButton').show();
            $('.modalContent h3').text('');
        
            $('.buttonAssassin').mouseover(function(){
                $('.modalContent h3').text('Force +4 / Vigour +2');
            })
            $('.buttonTemplar').mouseover(function(){
                $('.modalContent h3').text('Vigour +4 / Force +2');
            })   
            break;

        case "Fighter":
            $('.classesButton').hide();
            $('.classesFighterButton').show();
            $('.modalContent h3').text('');
        
            $('.buttonMonk').mouseover(function(){
                $('.modalContent h3').text('Agility +4 / Wisdom +2');
            })
            $('.buttonDancer').mouseover(function(){
                $('.modalContent h3').text('Wisdom +4 / Agility +2');
            })   
            break;

        case "Scout":
            $('.classesButton').hide();
            $('.classesScoutButton').show();
            $('.modalContent h3').text('');
        
            $('.buttonHunter').mouseover(function(){
                $('.modalContent h3').text('Agility +4 / Force +2');
            })
            $('.buttonGambler').mouseover(function(){
                $('.modalContent h3').text('Force +4 / Agility +2');
            })   
            break;

        case "Mage":
            $('.classesButton').hide();
            $('.classesMageButton').show();
            $('.modalContent h3').text('');
        
            $('.buttonElementalist').mouseover(function(){
                $('.modalContent h3').text('Vigour +4 / Wisdom +2');
            })
            $('.buttonIllusionist').mouseover(function(){
                $('.modalContent h3').text('Wisdom +4 / Vigour +2');
            })    
            break;
    
        default:
            break;
    }

    player.classLvl = 2;
    displayStats();
}