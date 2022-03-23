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
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
    displayStats();
    toastAction("Player leveled up ! +1 Stat Point", colors.blue);
    if (player.lvl == lvlChangeClass && player.classLvl == 0){
        player.allStatsPoints += 10;
        displayClassModal();
    }
    if (player.lvl == lvlChangeClassSup && player.classLvl == 1){
        player.allStatsPoints += 10;
        displayClassSupModal();
    }  
}

function calcExp(monsterFighted){
    player.exp += addPercentage(monsterFighted.exp, player.expBonus);
    let expPercent = calcPercentage(player.exp, expNeeded(player.lvl));
    $('#playerExpPB').attr('aria-valuenow', expPercent).css('width', expPercent+'%');
}

function prestige(){
    switch (player.prestige) {
        case 0:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Vagrant";
            player.statsPoints = 3;
            player.expMult = 1.5;   
            player.statsMult = 2;   
            player.prestige = 1;
            $('#prestige').text("(P1)");
            break;
            
        case 1:
            restat(true);
            player.lvl = 1;
            player.exp = 0;
            player.classLvl = 0;
            player.class =  "Vagrant";
            player.statsPoints = 3;
            player.expMult = 2;   
            player.statsMult = 3;   
            player.prestige = 2;
            $('#prestige').text("(P2)");      
            break;
        
        case 2:
            player.prestige = 3;
            $('#prestige').text("(PMax)");      
            break;
    
        default:
            break;
    }

    displayStats(); 
    $('#progressXP').show();
    $('#prestigeButton').remove();
    $('[id^=fightButton').prop('disabled', false);
    updateDisplayRestatPrice();
}

function displayClassModal(){
    resetMonsters();
    clearAttacks();
    $('#classChooseModal').modal('show');
    $('#classChooseModal .modal-footer').replaceWith(
        '<div class="modal-footer align-self-center">'+
        '<button type="button" class="btn btn-outline-danger" id="buttonMe" data-dismiss="modal" onclick="mercenaryClass()">Mercenary</button>'+
        '<button type="button" class="btn btn-outline-warning" id="buttonAs" data-dismiss="modal" onclick="assistClass()">Assist</button>'+
        '<button type="button" class="btn btn-outline-success" id="buttonAc" data-dismiss="modal" onclick="acrobatClass()">Acrobat</button>'+
        '<button type="button" class="btn btn-outline-primary" id="buttonMa" data-dismiss="modal" onclick="magicianClass()">Magician</button>'+
        '</div>'
    )

    $('#buttonMe').mouseover(function(){
        $('#classChooseModal .modal-body').text('Force +5 / Vigour +5')
    })
    $('#buttonAs').mouseover(function(){
        $('#classChooseModal .modal-body').text('Agility +5 / Wisdom +5')
    })
    $('#buttonAc').mouseover(function(){
        $('#classChooseModal .modal-body').text('Force +5 / Agility +5')
    })
    $('#buttonMa').mouseover(function(){
        $('#classChooseModal .modal-body').text('Wisdom +5 / Vigour +5')
    })
}

function displayClassSupModal(){
    resetMonsters();
    clearAttacks();
    $('#classSupChooseModal').modal('show');
    switch (player.class) {
        case "Mercenary":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-danger" id="buttonBl" data-dismiss="modal" onclick="bladeClass()">Blade</button>'+
                '<button type="button" class="btn btn-outline-danger" id="buttonKn" data-dismiss="modal" onclick="knightClass()">Knight</button>'+
                '</div>'
            )
        
            $('#buttonBl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })
            $('#buttonKn').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })   
            break;

        case "Assist":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonBi" data-dismiss="modal" onclick="billposterClass()">Billposter</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonRi" data-dismiss="modal" onclick="ringmasterClass()">Ringmaster</button>'+
                '</div>'
            )
        
            $('#buttonBi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonRi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;

        case "Acrobat":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonRa" data-dismiss="modal" onclick="rangerClass()">Ranger</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonJe" data-dismiss="modal" onclick="jesterClass()">Jester</button>'+
                '</div>'
            )
        
            $('#buttonRa').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonJe').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })   
            break;

        case "Magician":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonEl" data-dismiss="modal" onclick="elementorClass()">Elementor</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonPs" data-dismiss="modal" onclick="psykeeperClass()">Psykeeper</button>'+
                '</div>'
            )
        
            $('#buttonEl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })
            $('#buttonPs').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;
    
        default:
            break;
    }

    player.classLvl = 2;
    displayStats();
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

function attackMinusDefense(atk){
    return Math.max(0, atk - player.def);
}

function damage(monsterFighted){
    var randNumber = randInt([1,100]);
    var damage = player.atk;
    if (randNumber <= player.criticalChance){
        var damage = addPercentage(player.atk, player.criticalDamage);
    }
    monsterFighted.hp = Math.max(0, (monsterFighted.hp - damage));
    return damage;
}

function lootGold(monsterFighted){
    let goldLooted = randInt(monsterFighted.gold);
    inventory.gold += addPercentage(goldLooted, player.goldBonus);
}

function healPrice(){
    let healPrice = 1000;
    let percentageModificator = 100-calcPercentage(player.hp, player.hpMax);
    let priceWithPercentage = addPercentage(healPrice, percentageModificator);
    return priceWithPercentage;
}

function restatPrice(){
    let restatPrice = 2000;
    let restatPriceModified = restatPrice * player.lvl;
    return restatPriceModified;
}

function testIfMonsterDrop(monster){
    if (randInt([1,100]) <= monster.lootChance){
        displayMonsterDrop(generateStuff(monster));
        colorizeStats();
        selectStuff();
    }
}
