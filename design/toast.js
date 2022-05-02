function toastAction(text, color){
    $('.messagesBox').css('opacity', '1');
    $('.messagesBox').css('background-color', color);
    $('.messagesBox').text(text);
    setTimeout(function(){
        $('.messagesBox').fadeTo( 150, 0, function() {});
    }, 300);


}