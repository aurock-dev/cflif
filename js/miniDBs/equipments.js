var weapon = {
    w1 : {
        type : "weapon",
        name : "sword",
        damage : [15,21],
        bonusStats : {
            "criticalDamage" : [3,7]
        },
        price : 40
    },
    w2 : {
        type : "weapon",
        name : "bow",
        damage : [13,17],
        bonusStats : {
            "criticalChance" : [1,3],
            "agility" : [1,3]
        },
        price : 35
    }
}

var helmet = {
    h1 : {
        type : "helmet",
        name : "helmet of vigour",
        defense : [10,14],
        bonusStats : {
            "vigour" : [1,3]
        },
        price : 20
    },
    h2 : {
        type : "helmet",
        name : "helmet of critical damage",
        defense : [10,14],
        bonusStats : {
            "force" : [1,3],
            "criticalDamage" : [2,4]
        },
        price : 20
    }
}

var chest = {
    c1 : {
        type : "chest",
        name : "chest of bear",
        defense : [18,27],
        bonusStats : {
            "force" : [2,5],
            "agility" : [2,5]
        },
        price : 65
    },
    c2 : {
        type : "chest",
        name : "chest of stag",
        defense : [18,27],
        bonusStats : {
            "wisdom" : [2,5],
            "criticalChance" : [1,4]
        },
        price : 65
    }
}

var boots = {
    b1 : {
        type : "boots",
        name : "boots of shine",
        defense : [8,10],
        bonusStats : {
            "expBonus" : [1,6],
            "criticalChance" : [1,4]
        },
        price : 45
    },
    b2 : {
        type : "boots",
        name : "boots of rich",
        defense : [8,10],
        bonusStats : {
            "goldBonus" : [1,10]
        },
        price : 45
    }
}

var buttonsNumbers = 0;
var stuffDisplayed = [];
var stuffList1 = [weapon.w1, weapon.w2, helmet.h1, helmet.h2, chest.c1, chest.c2, boots.b1, boots.b2];
