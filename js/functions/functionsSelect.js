function selectAll(){
    selectStat();
    selectMonster();
    selectHeal();
    selectRestat();
    selectStuff();
    selectUpgrade();
}

function selectMonster(){
    for (let index = 0; index <= monstersNumber; index++) {   
        $('[id=fightButton'+index+']').click(function(){
            fight(index)});
    }
}

function selectStat(){
    for (let index = 0; index <= 4; index++) {   
        $('[id=statButton'+index+']').click(function(){
            choseStat(index)});
    }
}

function selectHeal(){
    $('#healButton').click(function(){
        heal();
    });
}

function selectRestat(){
    $('#restatButton').click(function(){
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
    $('#upweapon').click(function(){
        upgrade("weapon");
    })
    $('#uphelmet').click(function(){
        upgrade("helmet");
    })
    $('#upchest').click(function(){
        upgrade("chest");
    })
    $('#upboots').click(function(){
        upgrade("boots");
    })
}