function attack(){
    hpMonstre = hpMonstre - atk;
    document.querySelector("#hpm").innerHTML = hpMonstre;
    if (hpMonstre <= 0){
        hpMonstre = 10;
        exp += 1;
        document.querySelector("#exp").innerHTML = exp;
        if (exp == calculExp(lvl)){
            lvl += 1;
            exp = 0
            atk += 1;
            displayStats();
        }
    }
}

function fight(){
    window.setInterval(function(){
        attack();
    }, vitesseAtk);
}