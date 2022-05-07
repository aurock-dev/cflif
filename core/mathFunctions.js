/**
 * @param {*} [min, max]
 * @return {*} random number between min and max included
 */
function randInt([min, max]) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {*} array
 * @return {*} random element from an array
 */
function randArray(array){
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {*} stat
 * @param {*} multiplicator
 * @return {*} integer with percentage added
 */
function addPercentage(stat, multiplicator){
    return Math.round(stat + (multiplicator/100*stat));
}

/**
 * @param {*} stat
 * @param {*} multiplicator
 * @return {*} integer with percentage added
 */
function subPercentage(stat, multiplicator){
    return Math.round(stat - (multiplicator/100*stat));
}

/**
 * @param {*} remainValue
 * @param {*} maxValue
 * @return {*} percetange between a maximum value and a remain value from this maximum
 */
function calcPercentage(remainValue, maxValue){
    return (remainValue*100)/maxValue;
}

function convertKey(key){
    return listOfStatsFormat[listOfStats.indexOf(key)];
}

/**
 * @param {*} awakeList
 * @param {*} weights
 * @return {*} Awake from a awake list weighted  
 */
function weightedRandom(awakeList, weights){
    let chance = randInt([0,100]);

    for (let i = 0; i < weights.length; i++) {
        if (chance >= weights[i][0] && chance <= weights[i][1]){
            return awakeList[i];
        }
    }
}