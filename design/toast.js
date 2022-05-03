function toastAction(text, color){
    $('.messagesBox').css('opacity', '1');
    $('.messagesBox').css('background-color', color);
    $('.messagesBox').text(text);
    toast = setTimeout(function(){
        $('.messagesBox').fadeTo( 200, 0, function() {});
    }, 400);


}