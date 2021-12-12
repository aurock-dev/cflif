var hpMonstre = 10;

function attaquer(){
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
            document.querySelector("#lvl").innerHTML = lvl;
            document.querySelector("#exp").innerHTML = exp;
            document.querySelector("#atk").innerHTML = atk;
            document.querySelector("#expNeeded").innerHTML = calculExp(lvl);
        }
    }
}

function frappe(){
    window.setInterval(function(){
        attaquer();
    }, vitesseAtk);
}

document.querySelector("#lvl").innerHTML = lvl;
document.querySelector("#exp").innerHTML = exp;
document.querySelector("#expNeeded").innerHTML = calculExp(lvl);
document.querySelector("#atk").innerHTML = atk;
var boutonAttaquer = document.querySelector("#boutonAttaquer");
boutonAttaquer.addEventListener("click", frappe);