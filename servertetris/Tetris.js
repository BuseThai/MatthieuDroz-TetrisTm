function initTetris() {

    var canvas = document.getElementById("Tetris");
    var ctx = canvas.getContext('2d');

    const sizecase= 30;
    const xcase= 10;
    const ycase = 20;
    
    canvas.height=sizecase*ycase;
    canvas.width=sizecase*xcase;
    document.getElementById('c').style.maxWidth =canvas.width;
    document.getElementById('c').style.maxHeight =canvas.height;

    
    

    


}