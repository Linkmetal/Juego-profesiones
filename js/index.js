//https://jqueryui.com/droppable/#photo-manager
let name = "";
let dificulty = -1;
$(document).ready(function(){
    $(".resizable").resizable();
    $("#initButton").click(initGame);
    $(".difButton").click(function(event){
        dificulty = ($(event.target).val());
        toastr.info(dificulty);
        $("#selectDificulty").hide();
        createImages()
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
        $("#selectDificulty").show();
    }
    else{
        toastr.error("Introduzca un nombre válido.");
    }
}

function createImages(){
    $("#gameBoard").show();
    let imageNum = 0;
    let profNum = 0;
    switch(dificulty){
        case 0: 
            imageNum = 4;
            profNum = 2;
        break;
        case 1: 
            imageNum = 7;
            profNum = 3;
        break;
        case 2: 
            imageNum = 9;
            profNum = 4;
        break;
    }

}

