function displayStats(){
    $('.className').text(player.class);
    $('.lvl').text(player.lvl);
    if (player.prestige == 3){
        $('.prestige').text(" (PMax)")
    }
    else{
        $('.prestige').text(" (P"+player.prestige+")")
    }
    $('.exp').text(player.exp);
    $('.expNeeded').text(expNeeded(player.lvl));
    $('.progressExp').width(calcPercentage(player.exp, expNeeded(player.lvl))+'%');
    $('.statsPts').text(player.statsPoints);
    $('.for').text(player.force);
    $('.vig').text(player.vigour);
    $('.agi').text(player.agility);
    $('.wis').text(player.wisdom);
    $('.hp').text(player.hp);
    $('.hpMax').text(player.hpMax);
    $('.hp5').text(player.hp5);
    $('.progressHP').width(calcPercentage(player.hp, player.hpMax)+'%');
    $('.mp').text(player.mp);
    $('.mpMax').text(player.mpMax);
    $('.mp5').text(player.mp5);
    $('.progressMP').width(calcPercentage(player.mp, player.mpMax)+'%');
    $('.atk').text(player.atk);
    $('.def').text(player.def);
    $('.expB').text(player.expBonus);
    $('.lootB').text(player.lootBonus);
    if (player.atkSpeed <= 100){
        $('.atkSpeed').text("195% (Max)");
    }
    else if (player.atkSpeed >= 2000){
        $('.atkSpeed').text("100%");
    }
    else {
        $('.atkSpeed').text(200-(100*(player.atkSpeed/2000))+"%");
    }
    if (player.criticalChance >= 100){
        $('.critC').text("100% (Max)");
    }
    else{
        $('.critC').text(player.criticalChance+"%");
    }
    $('.critD').text(player.criticalDamage);
    $('.dodge').text(player.dodgeChance);
    $('.gold').text(inventory.gold);
}

function displayUpgradableStat(state){
    if (state == true){
        $('.messagesBox').css('opacity', '1');
        $('.messagesBox').css('background-color', colors.green);
        $('.messagesBox').text("Stats can be upgraded! Click on it!");
    }
    else if (state == false){
        $('.messagesBox').css('opacity', '0');
    }
}

function choseStat(index){
    if (player.statsPoints > 0){
        switch (index) {
            case 1:
                calcStat("force", 1, "add");
                toastAction("+1 Force.", colors.blue);
                break;
            case 2:
                calcStat("vigour", 1, "add");
                toastAction("+1 Vigour.", colors.blue);
                break;
            case 3:
                calcStat("agility", 1, "add");
                toastAction("+1 Agility.", colors.blue);
                break;
            case 4:
                calcStat("wisdom", 1, "add");
                toastAction("+1 Wisdom.", colors.blue);
                break;
            default:
                break;
            }
        player.statsPoints -= 1;
        player.allStatsPoints += 1;
        displayStats();
    }
    if (player.statsPoints <= 0){
        displayUpgradableStat(false);
    }
}

function calcStat(stat, value, operand){
    if (operand == "add"){
        switch (stat) {
            case "force":
                player.force += value;
                player.atk += value * 60;
                player.criticalDamage += value * 1;
                player.lootBonus += value * 1;
                break;
            case "vigour":
                player.vigour += value;
                player.def += value * 75;
                player.hpMax += value * 350;
                player.hp = player.hpMax;
                player.hp5 += 1;
                break;
            case "agility":
                player.agility += value;
                player.atkSpeed -= value * 50;
                player.criticalChance += value * 1;
                player.dodgeChance += 0.5;
                break;
            case "wisdom":
                player.wisdom += value;
                player.expBonus += value * 1;
                player.mpMax += value * 200;
                player.mp = player.mpMax;
                player.mp5 += 1;
                break;
            default:
                break;
        }
    }
    if (operand == "sub"){
        switch (stat) {
            case "force":
                player.force -= value;
                player.atk -= value * 60;
                player.criticalDamage -= value * 1;
                break;
            case "vigour":
                player.vigour -= value;
                player.def -= value * 75;
                player.hpMax -= value * 350;
                player.hp = player.hpMax;
                player.hp5 -= 1;
                break;
            case "agility":
                player.agility -= value;
                player.atkSpeed += value * 50;
                player.criticalChance -= value * 1;
                player.dodgeChance -= 0.5;
                break;
            case "wisdom":
                player.wisdom -= value;
                player.expBonus -= value * 1;
                player.lootBonus -= value * 1;
                player.mp5 -= 1;
                break;
            default:
                break;
        }
    }
    displayMonstersStats();
    displayStats();
}

function regens(){
    setInterval(() => {
        player.hp += player.hp5;
        if (player.hp >= player.hpMax){
            player.hp = player.hpMax;
        }
        displayStats();
    }, 5000);

    setInterval(() => {
        player.mp += player.mp5;
        if (player.mp >= player.mpMax){
            player.mp = player.mpMax;
        }
        displayStats();
    }, 5000);
}