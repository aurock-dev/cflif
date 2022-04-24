var lvlChangeClass = 2;
var lvlChangeClassSup = 3;

function warriorClass(){
    calcStat("force", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Mercenary";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function fighterClass(){
    calcStat("agility", 5, "add");
    calcStat("wisdom", 5, "add");
    player.class = "Assist";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function hunterClass(){
    calcStat("force", 5, "add");
    calcStat("agility", 5, "add");
    player.class = "Acrobat";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function mageClass(){
    calcStat("wisdom", 5, "add");
    calcStat("vigour", 5, "add");
    player.class = "Magician";
    player.classLvl = 1;
    displayStats();
    $('.classModal').hide();
}

function bladeClass(){
    calcStat("force", 10, "add");
    player.class = "Blade";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function knightClass(){
    calcStat("vigour", 10, "add");
    player.class = "Knight";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function billposterClass(){
    calcStat("agility", 10, "add");
    player.class = "Billposter";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function ringmasterClass(){
    calcStat("wisdom", 10, "add");
    player.class = "Ringmaster";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function rangerClass(){
    calcStat("agility", 10, "add");
    player.class = "Ranger";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function jesterClass(){
    calcStat("force", 10, "add");
    player.class = "Jester";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function elementorClass(){
    calcStat("vigour", 10, "add");
    player.class = "Elementor";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function psykeeperClass(){
    calcStat("wisdom", 10, "add");
    player.class = "Psykeeper";
    player.classLvl = 2;
    displayStats();
    $('#classSupChooseModal').modal('hide');
}

function displayClassModal(){
    resetMonsters();
    clearAttacks();
    $('.classModal').show()

    // $('#classChooseModal').modal('show');
    // $('#classChooseModal .modal-footer').replaceWith(
    //     '<div class="modal-footer align-self-center">'+
    //     '<button type="button" class="btn btn-outline-danger" id="buttonMe" data-dismiss="modal" onclick="mercenaryClass()">Mercenary</button>'+
    //     '<button type="button" class="btn btn-outline-warning" id="buttonAs" data-dismiss="modal" onclick="assistClass()">Assist</button>'+
    //     '<button type="button" class="btn btn-outline-success" id="buttonAc" data-dismiss="modal" onclick="acrobatClass()">Acrobat</button>'+
    //     '<button type="button" class="btn btn-outline-primary" id="buttonMa" data-dismiss="modal" onclick="magicianClass()">Magician</button>'+
    //     '</div>'
    // )

    $('.buttonWarrior').mouseover(function(){
        $('.modalContent p').text('Force +5 / Vigour +5')
    })
    $('.buttonFighter').mouseover(function(){
        $('.modalContent p').text('Agility +5 / Wisdom +5')
    })
    $('.buttonHunter').mouseover(function(){
        $('.modalContent p').text('Force +5 / Agility +5')
    })
    $('.buttonMage').mouseover(function(){
        $('.modalContent p').text('Wisdom +5 / Vigour +5')
    })
}

function displayClassSupModal(){
    resetMonsters();
    clearAttacks();
    $('#classSupChooseModal').modal('show');
    switch (player.class) {
        case "Mercenary":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-danger" id="buttonBl" data-dismiss="modal" onclick="bladeClass()">Blade</button>'+
                '<button type="button" class="btn btn-outline-danger" id="buttonKn" data-dismiss="modal" onclick="knightClass()">Knight</button>'+
                '</div>'
            )
        
            $('#buttonBl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })
            $('#buttonKn').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })   
            break;

        case "Assist":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonBi" data-dismiss="modal" onclick="billposterClass()">Billposter</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonRi" data-dismiss="modal" onclick="ringmasterClass()">Ringmaster</button>'+
                '</div>'
            )
        
            $('#buttonBi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonRi').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;

        case "Acrobat":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonRa" data-dismiss="modal" onclick="rangerClass()">Ranger</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonJe" data-dismiss="modal" onclick="jesterClass()">Jester</button>'+
                '</div>'
            )
        
            $('#buttonRa').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Agility +10')
            })
            $('#buttonJe').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Force +10')
            })   
            break;

        case "Magician":
            $('#classSupChooseModal .modal-footer').replaceWith(
                '<div class="modal-footer align-self-center">'+
                '<button type="button" class="btn btn-outline-warning" id="buttonEl" data-dismiss="modal" onclick="elementorClass()">Elementor</button>'+
                '<button type="button" class="btn btn-outline-warning" id="buttonPs" data-dismiss="modal" onclick="psykeeperClass()">Psykeeper</button>'+
                '</div>'
            )
        
            $('#buttonEl').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Vigour +10')
            })
            $('#buttonPs').mouseover(function(){
                $('#classSupChooseModal .modal-body').text('Wisdom +10')
            })   
            break;
    
        default:
            break;
    }

    player.classLvl = 2;
    displayStats();
}