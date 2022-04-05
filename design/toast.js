function toastAction(text, color){
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = text;
    x.style.backgroundColor = color;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}