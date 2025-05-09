function randInt([min, max]) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randArray(array){
    return array[Math.floor(Math.random() * array.length)];
}

function addPercentage(stat, multiplicator){
    return Math.round(stat + (multiplicator/100*stat));
}

function subPercentage(stat, multiplicator){
    return Math.round(stat - (multiplicator/100*stat));
}

function calcPercentage(remainValue, maxValue){
    return (remainValue*100)/maxValue;
}

function convertKey(key){
    return listOfStatsFormat[listOfStats.indexOf(key)];
}

function weightedRandom(items, weights){
    let chance = randInt([0,100]);

    for (let i = 0; i < weights.length; i++) {
        if (chance >= weights[i][0] && chance <= weights[i][1]){
            return items[i];
        }
    }
}