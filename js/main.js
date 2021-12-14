displayStats();
displayMonsters();

var fightButton = document.querySelectorAll("[id^='fightButton']");
for (let index = 0; index < fightButton.length; index++) {   
    fightButton[index].addEventListener("click", function(){
        fight(index), false});
}

