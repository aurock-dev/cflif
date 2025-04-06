function selectAll(){
    selectStat();
    selectMonster();
    selectHeal();
    selectRestat();
    selectStuff();
    selectUpgrade();
    selectAwake();
}

function selectMonster(){
    for (let index = 0; index < monstersNumber; index++) {   
        $('[class=monsterRow'+index+']').click(function(){
            fight(index)});
    }
}

function selectStat(){
    for (let index = 0; index <= 4; index++) {   
        $('[class^=statButton'+index+']').click(function(){
            choseStat(index)});
    }
}

function selectHeal(){
    $('.healButton').click(function(){
        heal();
    });
}

function selectRestat(){
    $('.restatButton').click(function(){
        restat();
    });
}

function selectStuff(){
    $('[id^=equipButton]').unbind("click");
    $('[id^=equipButton]').click(function(event){
        equipStuff(event.target.id);
    });
    $('[id^=sellButton]').unbind("click");
    $('[id^=sellButton]').click(function(event){
        sellStuff(event.target.id);
    });
}

function selectUpgrade(){
    $('.upweapon').click(function(){
        upgrade("weapon");
    })
    $('.uphelmet').click(function(){
        upgrade("helmet");
    })
    $('.upchest').click(function(){
        upgrade("chest");
    })
    $('.upboots').click(function(){
        upgrade("boots");
    })
}
function selectAwake(){
    $('.awweapon').click(function(){
        awake("weapon");
    })
    $('.awhelmet').click(function(){
        awake("helmet");
    })
    $('.awchest').click(function(){
        awake("chest");
    })
    $('.awboots').click(function(){
        awake("boots");
    })
}

function selectPrestige(){
    $('.prestigeButton').unbind("click");
    $('.prestigeButton').click(function(){
        player.expBlock = false;
        resetMonsters();
        clearAttacks();
        prestige();
    });
}