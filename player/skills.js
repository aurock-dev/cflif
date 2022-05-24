function skills(index){
    switch (index) {
        case 1:
            skillWayfarer(index);
            break;
        case 2:
            switch (player.class){
                case "Warrior":
                    skillWarrior1(index);
                    break;
                case "Fighter":
                    skillFighter1();
                    break;
            }
            break;
        case 3:
            switch (player.class){
                case "Warrior":
                    skillWarrior2();
                    break;
                case "Fighter":
                    skillFighter2();
                    break;
            }
            break;      
        default:
            break;
    }
}

function changeNameSkillClass(){
    switch (player.class) {
        case "Warrior":
            $('#skill2').text('skill Warrior1');  
            $('#skill3').text('skill Warrior2');  
            $('#skill4').text('skill Warrior3');
            $('#skill5').text('skill Warrior4');
            break;
        case "Fighter":
            $('#skill2').text('skill Fighter1');  
            $('#skill3').text('skill Fighter2');  
            $('#skill4').text('skill Fighter3');
            $('#skill5').text('skill Fighter4');
            break;
        case "Scout":
            $('#skill2').text('skill Scout1');  
            $('#skill3').text('skill Scout2');  
            $('#skill4').text('skill Scout3');
            $('#skill5').text('skill Scout4');
            break;
        case "Mage":
            $('#skill2').text('skill Mage1');  
            $('#skill3').text('skill Mage2');  
            $('#skill4').text('skill Mage3');
            $('#skill5').text('skill Mage4');
            break;
        default:
            break;
    }
}

function displaySkillClass(){
    if (player.lvl >= 10){
        $('#skill2').removeClass('hidden');
    }
    else if (player.lvl >= 20){
        $('#skill3').removeClass('hidden');
    }
    else if (player.lvl >= 30){
        $('#skill4').removeClass('hidden');
    }
    else if (player.lvl >= 40){
        $('#skill5').removeClass('hidden');
    }
    else if (player.lvl >= 50){
        $('#skill6').removeClass('hidden');
    }
    else if (player.lvl >= 60){
        $('#skill7').removeClass('hidden');
    }
    else if (player.lvl >= 75){
        $('#skill8').removeClass('hidden');
    }
    else if (player.lvl >= 90){
        $('#skill9').removeClass('hidden');
    }
}

/**
 * @param {*} duration in sec
 * @param {*} index of the skill
 */
function displayDuration(duration, index){
    var displayDuration = setInterval(function(){
        duration -= 1;
        $('#skill'+index).text(duration);
        if (duration <= 0){
            clearInterval(displayDuration);
            $('#skill'+index).text('skill'+index);
        }
    }, 1000)
}

function skillWayfarer(index){
    // Skill effect
    let duration = 30;
    player.mp -= 400;
    player.atk += 50;
    player.def += 50;
    // UI change
    displayStats();
    $('#skill'+index).css("pointer-events","none");

    // Skill duration
    displayDuration(duration, index);
    setTimeout(function(){
        // Skill effect reversed
        player.atk -= 50;
        player.def -= 50;
        // UI change back
        displayStats();
        $('#skill'+index).css("pointer-events","auto");
    }, duration*1000);
}

function skillWarrior1(index){
    let duration = 30;
    player.mp -= 750;
    calcStat("force", 5, "add");
    displayStats();
    $('#skill'+index).css("pointer-events","none");
    displayDuration(duration, index);
    setTimeout(function(){
        calcStat("force", 5, "sub");
        displayStats();
        $('#skill'+index).css("pointer-events","auto");
    }, duration*1000);
}

function skillFighter1(){
    console.log("no")
}