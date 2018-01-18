//https://jqueryui.com/droppable/#photo-manager
let name = "";
let dificulty = -1;
let points = 0;
let lifes = 3;
let imageNum = 0;
let profNum = 0;
$(document).ready(function(){
    $(".resizable").resizable();
    $("#initButton").click(initGame);
    $(".difButton").click(function(event){
        dificulty = ($(event.target).val());
        $("#selectDificulty").dialog("close");
        createImages();
    });
    toastr.options.closeButton = true;
        toastr.options.positionClass = "toast-bottom-right";
        function notification( type, message ) {
            if( type == 'success' ) {
                toastr.success(message,'<i>Éxito</i>');
            } else if( type == 'error' ) {
                toastr.error(message,'Error');
            } else if( type == 'warning' ) {
                toastr.warning(message,'Peligro');
            } else {
                toastr.info(message,'Información');
            }	
        }
});

function initGame(){
    if($("#nameInput").val() != ""){
        name = $("#nameInput").val();
        $("#nameForm").hide();
        $("#selectDificulty").dialog();
    }
    else{
        toastr.error("Introduzca un nombre válido.");
    }
}

function createImages(){
    $("#gameBoard").show();
    switch(dificulty){
        case "0": 
            imageNum = 4;
            profNum = 2;
        break;
        case "1": 
            imageNum = 7;
            profNum = 3;
        break;
        case "2": 
            imageNum = 9;
            profNum = 4;
        break;
        default:
            imageNum = -1;
            profNum = -1; 
        break;
    }

    //profesiones random
    let i = 0;
    while(i < profNum){
        let professions = $(".profession");
        let random = Math.floor(Math.random() * professions.length);
        if($(professions[random]).is(":visible") == false){
            $(professions[random]).show();
            i++;
        } 
    }
    //tools random
    i = 0;
    let professions = $(".profession:visible");
    let query = "";
    for(let j = 0; j < professions.length; j++){
        query += "." + professions[j].id;
        if(j != professions.length -1){
            query += ",";
        }
    }
    let tools = $(query);
    let selectedTools = [];
    while(selectedTools.length < imageNum){
        let random = Math.floor(Math.random() * tools.length);
        selectedTools.push(tools[random]);
        tools.splice(random, 1);
    }
    $(selectedTools).show();
    $(selectedTools).draggable();
    //Control del evento drop
    $(professions).droppable({
        drop: function(event, ui){
            if($(ui.draggable).hasClass(event.target.id)){
                toastr.success("Muy bien " + name  + ", sigue asi, tienes " + points + " puntos.");
                $(ui.draggable).toggle({ effect: "scale", direction: "both" });
                points++;
                if(points == imageNum){
                    endGame();
                }
            }
            else{
                lifes--;
                if(lifes == 0){
                    toastr.error("Te has quedado sin vidas D:");
                    endGame();
                }
                else{
                    toastr.error("Va a ser que no, te quedan " + lifes + " vidas.");
                }
            }
        }
    });
    shuffleTools(selectedTools);
}

function shuffleTools(tools){
    for(let i = 0; i < tools.length; i++){
        let random = Math.floor(Math.random() * 9);
        tools[i].style.order = random;
    }
}


function endGame(){
    alert("Juego completado con un total de " + points + " puntos.");
    let answer = confirm("¿Desea jugar de nuevo?");
    if(answer == true){
        resetGame();
    }
}

function resetGame(){
    lifes = 3;
    imageNum = 0;
    profNum = 0;
    points = 0;
    var tools = $(".tool");
    createImages();
    $(".tool").css({"top":"", "left":""});
    $(".tool").hide();
    $(".profession").hide();
    $("#gameBoard").hide();
    $("#selectDificulty").dialog("open");
}

