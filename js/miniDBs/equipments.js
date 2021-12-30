var weapon = {
    w1 : {
        type : "weapon",
        name : "sword",
        damage : [7,11],
        bonusStats : {
            "criticalDamage" : [3,7]
        },
        price : 40
    },
    w2 : {
        type : "weapon",
        name : "bow",
        damage : [6,9],
        bonusStats : {
            "criticalChance" : [1,5],
            "agility" : [1,3]
        },
        price : 35
    }
}

var helmet = {
    h1 : {
        type : "helmet",
        name : "helmet",
        defense : [1,3],
        bonusStats : {
            "vigour" : [2,4]
        },
        price : 20
    }
}

var chest = {
    c1 : {
        type : "chest",
        name : "chest",
        defense : [3,6],
        bonusStats : {
            "atk" : [5,9],
            "force" : [3,8],
            "agility" : [5,9]
        },
        price : 65
    }
}

var boots = {
    b1 : {
        type : "boots",
        name : "boots",
        defense : [2,4],
        bonusStats : {
            "expBonus" : [1,6],
            "criticalChance" : [1,4]
        },
        price : 45
    }
}

var buttonsNumbers = 0;
var stuffDisplayed = [];
var stuffList1 = [weapon.w1, helmet.h1, chest.c1, boots.b1];