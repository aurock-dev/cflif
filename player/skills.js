function skills(index){
    switch (index) {
        case 1:
            skillWayfarer(index);
            break;  
        default:
            break;
    }
}
/**
 * @param {*} duration in sec
 * @param {*} index of the skill
 */
function displayDuration(duration, index){
    var displayDuration = setInterval(function(){
        duration -= 1;
        $('#skill'+index).text(duration);
        if (duration <= 0){
            clearInterval(displayDuration);
            $('#skill'+index).text('skill'+index);
        }
    }, 1000)
}

function skillWayfarer(index){
    // Skill effect
    let duration = 30;
    player.mp -= 50;
    player.atk += 50;
    player.def += 50;
    // UI change
    displayStats();
    $('#skill'+index).css("pointer-events","none");

    // Skill duration
    displayDuration(duration, index);
    setTimeout(function(){
        // Skill effect reversed
        player.atk -= 50;
        player.def -= 50;
        // UI change back
        displayStats();
        $('#skill'+index).css("pointer-events","auto");
    }, duration*1000);
}