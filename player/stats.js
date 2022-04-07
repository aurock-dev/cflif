function displayStats(){
    $('.className').text(player.class);
    $('.lvl').text(player.lvl);
    if (player.prestige == 3){
        $('.prestige').text(" (PMax)")
    }
    else{
        $('.prestige').text(" (P"+player.prestige+")")
    }
    $('#exp').text(player.exp);
    $('#expNeeded').text(expNeeded(player.lvl));
    $('.statsPts').text(player.statsPoints);
    $('.for').text(player.force);
    $('.vig').text(player.vigour);
    $('.agi').text(player.agility);
    $('.wis').text(player.wisdom);
    $('.hp').text(player.hp);
    $('.hpMax').text(player.hpMax);
    $('.atk').text(player.atk);
    $('.def').text(player.def);
    $('.expB').text(player.expBonus);
    $('.goldB').text(player.goldBonus);
    if (player.atkSpeed <= 100){
        $('.atkSpeed').text("200% (Max)");
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
    $('.gold').text(inventory.gold);
}

function displayUpgradableStat(state){
    if (state == true){
        $('[id=upgradableStatMessage]').show();
    }
    else if (state == false){
        $('[id=upgradableStatMessage]').hide();
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
                $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
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
                break;
            case "vigour":
                player.vigour += value;
                player.def += value * 75;
                player.hpMax += value * 350;
                player.hp = player.hpMax;
                $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
                break;
            case "agility":
                player.agility += value;
                player.atkSpeed -= value * 50;
                player.criticalChance += value * 1;
                break;
            case "wisdom":
                player.wisdom += value;
                player.expBonus += value * 1;
                player.goldBonus += value * 1;
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
                $('#playerHPPB').attr('aria-valuenow', 100).css('width', '100%');
                break;
            case "agility":
                player.agility -= value;
                player.atkSpeed += value * 50;
                player.criticalChance -= value * 1;
                break;
            case "wisdom":
                player.wisdom -= value;
                player.expBonus -= value * 1;
                player.goldBonus -= value * 1;
                break;
            default:
                break;
        }
    }
    displayStats();
}