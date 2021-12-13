function displayStats(){
    document.querySelector("#lvl").innerHTML = lvl;
    document.querySelector("#exp").innerHTML = exp;
    document.querySelector("#expNeeded").innerHTML = calculExp(lvl);
    document.querySelector("#atk").innerHTML = atk;
}

function displayMonsters(){
    for (var key in monsters) {      
        var obj = monsters[key];
        for (var prop in obj){
            var monsterName = obj["name"];
            var monsterHP = obj["hp"];
        }
        $('#monsterList').append('<button type="button" id="fightButton" class="btn btn-outline-primary">Fight</button>');
        $('#monsterList').append('<span id="monsterName"> '+monsterName+'</span> : <span id="hpm">'+monsterHP+'</span> HP');
        $('#monsterList').append('<br>')
    }
}