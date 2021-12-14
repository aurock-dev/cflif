function attack(index){
    // monsters["monster"+index]["hp"] = hpMonstre - atk;
    // document.querySelector("#hpm").innerHTML = hpMonstre;
    // if (hpMonstre <= 0){
    //     hpMonstre = 10;
    //     exp += 1;
    //     document.querySelector("#exp").innerHTML = exp;
    //     if (exp == calculExp(lvl)){
    //         lvl += 1;
    //         exp = 0
    //         atk += 1;
    //         displayStats();
    //     }
    // }
    var monsterIndex = "monster"+index
    var queryHpm = "#hpm"+index;
    monsters[monsterIndex]["hp"] = monsters[monsterIndex]["hp"] - atk;
    document.querySelector(queryHpm).innerHTML = monsters[monsterIndex]["hp"];
    if (monsters[monsterIndex]["hp"] <= 0){
        monsters[monsterIndex]["hp"] = monsters[monsterIndex]["hpBase"];
        exp += monsters[monsterIndex]["exp"];
        document.querySelector("#exp").innerHTML = exp;
        if (exp >= calculExp(lvl)){
            lvl += 1;
            exp = 0
            atk += 1;
            displayStats();
        }
    }

}

function fight(index){
    window.setInterval(function(){
        attack(index+1);
    }, vitesseAtk);
}