function skills(index){
    switch (index) {
        case 1:
            skillWayfarer();
            break;
    
        default:
            break;
    }
}

function skillWayfarer(){
    // Skill effect
    player.atk += 50;
    player.def += 50;
    let duration = 30;
    // UI change
    displayStats();
    $('#skill1').css("pointer-events","none");
    // Skill duration
    setTimeout(function(){
        // Skill effect reversed
        player.atk -= 50;
        player.def -= 50;
        // UI change back
        displayStats();
        $('#skill1').css("pointer-events","auto");
    }, duration*1000);
    // Display timer
    var displayDuration = setInterval(function(){
        duration -= 1;
        $('#skill1').text(duration);
        if (duration <= 0){
            clearInterval(displayDuration);
            $('#skill1').text('skill1');
        }
    }, 1000)
}