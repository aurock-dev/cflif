var hpMonstre = 10;

function attaquer(){
    hpMonstre = hpMonstre - stats.atk;
    document.querySelector("#hpm").innerHTML = hpMonstre;
    if (hpMonstre <= 0){
        hpMonstre = 10;
        stats.exp += 1;
        document.querySelector("#exp").innerHTML = stats.exp;
        if (exp == 3){
            stats.lvl += 1;
            stats.exp = 0
            stats.atk += 1;
            document.querySelector("#lvl").innerHTML = stats.lvl;
            document.querySelector("#exp").innerHTML = stats.exp;
            document.querySelector("#atk").innerHTML = stats.atk;
        }
    }
}

function frappe(){
    window.setInterval(function(){
        attaquer();
    }, 1000);
}

document.querySelector("#lvl").innerHTML = stats.lvl;
document.querySelector("#exp").innerHTML = stats.exp;
document.querySelector("#atk").innerHTML = stats.atk;
var boutonAttaquer = document.querySelector("#boutonAttaquer");
boutonAttaquer.addEventListener("click", frappe);