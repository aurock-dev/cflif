function randInt([min, max]) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addPercentage(stat, multiplicator){
    return Math.round(stat + (multiplicator/100*stat));
}

function subPercentage(stat, multiplicator){
    return Math.round(stat - (multiplicator/100*stat));
}