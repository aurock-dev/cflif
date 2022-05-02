function expNeeded(lvl){
    return Math.round(((lvl*25)*(1+lvl))*player.expMult);
}

function levelUp(){
    var expSpare = Math.max(0, player.exp - expNeeded(player.lvl));
    player.lvl += 1;
    player.exp = expSpare;
    player.statsPoints += (1*player.statsMult);
    player.hp = player.hpMax;
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('.progressExp').width(expPercent+'%');
    displayStats();
    toastAction("Player leveled up ! +1 Stat Point", colors.blue);
    if (player.lvl == lvlChangeClass && player.classLvl == 0){
        player.allStatsPoints += 6;
        displayClassModal();
    }
    if (player.lvl == lvlChangeClassSup && player.classLvl == 1){
        player.allStatsPoints += 6;
        displayClassSupModal();
    }  
}

function calcExp(monsterFighted){
    player.exp += addPercentage(monsterFighted.exp, player.expBonus);
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('.progressExp').width(Math.min(expPercent, '100')+'%');
}

function prestige(){
    switch (player.prestige) {
        case 0:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Wayfarer";
            player.statsPoints = 3;
            player.expMult = 1.5;   
            player.statsMult = 2;   
            player.prestige = 1;
            $('.prestige').text("(P1)");
            break;
            
        case 1:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Wayfarer";
            player.statsPoints = 3;
            player.expMult = 2;   
            player.statsMult = 3;   
            player.prestige = 2;
            $('.prestige').text("(P2)");      
            break;
        
        case 2:
            player.prestige = 3;
            $('.prestige').text("(PMax)");      
            break;
    
        default:
            break;
    }

    if (player.prestige == 3){
        displayStats(); 
        $('.prestigeDiv').hide();
        $('.xpbar').show();
        $('.progressExp').width('100%');
        $('.exp').text("Max")
        $('.expNeeded').text("Max")
        updateDisplayRestatPrice();
    }
    else {
        displayStats(); 
        $('.prestigeDiv').hide();
        $('.xpbar').show();
        $('.progressExp').width('0%');
        updateDisplayRestatPrice();
    }
}