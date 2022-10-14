
var I=[
    [[1],
     [1],
     [1],
     [1]],
    [[1,1,1,1]],
    [[1],
     [1],
     [1],
     [1]],
    [[1,1,1,1]]
     ]
 
 var J=[[[2,0,0],
     [2,2,2]],
    [[2,2],
     [2,0],
     [2,0]],
    [[2,2,2],
     [0,0,2]],
    [[0,2],
     [0,2],
     [2,2]]
 ]
 var L=[[[3,0],
     [3,0],
     [3,3]],
    [[3,3,3],
     [3,0,0]],
    [[3,3],
     [0,3],
     [0,3]],
    [[0,0,3],
     [3,3,3]]
    ]
     
 var O=[
   [[4,4],
    [4,4]],
   
   [[4,4],
    [4,4]],
   
    [[4,4],
    [4,4]],
    
   [[4,4],
    [4,4]]
 ]
     
 var S=[[[0,5,5],
     [5,5,0]],
    [[5,0],
     [5,5],
     [0,5]],
    [[0,5,5],
     [5,5,0]],
    [[5,0],
     [5,5],
     [0,5]]
    ]
     
 var T=[[[0,6,0],
     [6,6,6]],
    [[6,0],
     [6,6],
     [6,0]],
    [[6,6,6],
     [0,6,0]],
    [[0,6],
     [6,6],
     [0,6]]
    ]
     
 var Z=[[[7,7,0],
     [0,7,7]],
    [[0,7],
     [7,7],
     [7,0]],
    [[7,7,0],
     [0,7,7]],
    [[0,7],
     [7,7],
     [7,0]]
    ]
 

const LSL = [
    [0,48,10],
    [1,43,20],
    [2,38,30],
    [3,33,40],
    [4,28,50],
    [5,23,60],
    [6,18,70],
    [7,13,80],
    [8,8,90],
    [9,6,100],
    [10,5,100],
    [11,5,100],
    [12,5,100],
    [13,4,100],
    [14,4,100],
    [15,4,100],
    [16,3,110],
    [17,3,120],
    [18,3,130],
    [19,2,140],
    [20,2,150],
    [21,2,160],
    [22,2,170],
    [23,2,180],
    [24,2,190],
    [25,2,200],
    [26,2,200],
    [27,2,200],
    [28,2,200],
    [29,1,200]]



var figtype= [I,J,L,O,S,T,Z]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

class Tetrimino {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.vfig = this.rndfig();
        this.fig = figtype[this.vfig];
        this.rot = 0;
        if (this.vfig == 0 || this.vfig==2) {
            this.rot=1;
        }
    }
    rndfig() {
        return getRandomInt(figtype.length);
    }
    getFig() {
        return this.fig[this.rot];
    }
    rotate() {
        if (this.rot == 3) {
            this.rot=0;
        } else {
            this.rot=this.rot+1;
        }
    }
    reverseRotate() {
        if (this.rot == 0) {
            this.rot=3;
        } else {
            this.rot=this.rot-1;
        }
    }

    
}







var sizecase= parseInt(document.documentElement.clientHeight / 30);
const xcase= 10;
const ycase = 22;

grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));


t_green = document.createElement("img")
t_darkblue = document.createElement("img")
t_lightblue = document.createElement("img")
t_orange = document.createElement("img")
t_purple = document.createElement("img")
t_red = document.createElement("img")
t_yellow = document.createElement("img")
t_gray = document.createElement("img")

var imgarr = [t_lightblue,t_darkblue,t_orange,t_yellow,t_green,t_purple,t_red]
var imgarrpath = ["t_lightblue","t_darkblue","t_orange","t_yellow","t_green","t_purple","t_red"]
var fallfig
var nextfallfig = new Tetrimino(x=4,y=0);
var canvas
var ctx

var canvasT;
var ctxT;

var level = 0
var startlevel =0;
var fps = 120;
var fallspeed = 0;

var npk = true;
var speedboost = 1;
var aiharddrop = false;


var play = false;

var harddrop = 0.0;
var harddropEnabled = false


var TetrisGame;
var kd;
var ku;

var ploose= false;




var pscore2 = 0;
var deltapscore2 = 0;
var level2 = 0;
var fallfig2;
var nextfallfig2 = new Tetrimino(nextfallfig.x,nextfallfig.y);
nextfallfig2.vfig = nextfallfig.vfig
nextfallfig2.fig = nextfallfig.fig
nextfallfig2.rot = nextfallfig.rot

var grid2= new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
var harddropEnabled2 = false
var fallspeed2 = 0;
var TetrisGame2;


var deltapscore=0;
var pscore=0;
var ai 
var aienabled = false;

var aivplayer = false;

const cleangrid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));

// wltop=1,wlbot=0.760666,wb=0.184483,wh=0.35663,wgh=0.510066
0.58981, 0.67119, 0.23295, 0.38006, 0.47393
0.5907, 0.5328, 0.20009, 0.46768, 0.42088

0.5529, 0.4939, 0.18257, 0.47463, 0.35215


var weightbump =0.23295;
var weighthole = 0.38006;
var weightlinetop = 0.58981;
var weightlinebottom = 0.67119;
var weightgheight = 0.47393;



function initTetris() {

    canvas = document.getElementById("Tetris1");
    ctx = canvas.getContext('2d');

    canvas2 = document.getElementById("NP");
    ctx2 = canvas2.getContext('2d');

    stylesizex2 = sizecase*4
    stylesizey2 = sizecase*4

    canvas2.height=stylesizey2*2;
    canvas2.width=stylesizex2*2;

    canvas2.style.width = stylesizex2.toString().concat("px");
    canvas2.style.height = stylesizey2.toString().concat("px");

    document.getElementById("w1in").value =weightbump;
    document.getElementById("w2in").value =weighthole;
    document.getElementById("w3in").value =weightgheight;
    document.getElementById("w4in").value =weightlinetop;
    document.getElementById("w5in").value =weightlinebottom;


    stylesizex = sizecase*xcase+(2*sizecase)
    stylesizey = sizecase*ycase+(2*sizecase)

    canvas.height=stylesizey*2;
    canvas.width=stylesizex*2;

    canvas.style.width = stylesizex.toString().concat("px");
    canvas.style.height = stylesizey.toString().concat("px");

    document.getElementById("c").style.height = stylesizey.toString().concat("px");

    document.getElementById("header").style.height = ((document.documentElement.clientHeight-stylesizey)/2).toString().concat("px");
    document.getElementById("footer").style.height = ((document.documentElement.clientHeight-stylesizey)/2).toString().concat("px");


    document.getElementById("DPLAYER").style.height = (stylesizey*0.2).toString().concat("px");
    document.getElementById("DAI").style.height = (stylesizey*0.8-40-(stylesizey*0.03)).toString().concat("px");

    document.getElementById("DAI").style.marginTop = (stylesizey*0.03).toString().concat("px");

    document.getElementById("DNP").style.height = (stylesizey*0.2).toString().concat("px");

    document.getElementById("DSL").style.height = (stylesizey*0.7-60-(stylesizey*0.03*2)).toString().concat("px");
    document.getElementById("DB").style.height = (stylesizey*0.1).toString().concat("px");

    document.getElementById("DSL").style.marginTop = (stylesizey*0.03).toString().concat("px");
    document.getElementById("DB").style.marginTop = (stylesizey*0.03).toString().concat("px");

    document.getElementById("DPLAYERTEXT").style.fontSize = ((document.getElementById("CLEFT").offsetWidth/6)+1).toString().concat("px");
    document.getElementById("DPLAYERTEXT").style.width = (document.getElementById("CLEFT").offsetWidth-10).toString().concat("px");

    document.getElementById("st").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)-1).toString().concat("px");
    document.getElementById("lt").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)).toString().concat("px");

    document.getElementById("score").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/4)).toString().concat("px");
    document.getElementById("level").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/4)).toString().concat("px");


    document.getElementById("lt").style.marginTop = ((document.getElementById("DSL").offsetHeight-(document.getElementById("score").offsetHeight*4))/3).toString().concat("px");

    document.getElementById("st").style.marginTop = "10".toString().concat("px");




    document.getElementById("bp").style.width = document.getElementById("bai").style.width = document.getElementById("bpvsai").style.width = (document.getElementById("DB").offsetWidth-40).toString().concat("px");
   
    document.getElementById("bp").style.fontSize =  document.getElementById("bai").style.fontSize =  document.getElementById("bpvsai").style.fontSize = ((document.getElementById("DB").offsetHeight-4-20-(3*3))/7).toString().concat("px")


    
    document.getElementById("aiui").style.width = (document.getElementById("DAI").offsetWidth-20).toString().concat("px");
   
    canvasT = document.getElementById("Tetris2");
    ctxT = canvas.getContext('2d');

    canvasT.height=stylesizey*2;
    canvasT.width=stylesizex*2;

    canvasT.style.width = stylesizex.toString().concat("px");
    canvasT.style.height = stylesizey.toString().concat("px");

    var scale = 2; 
    ctx.setTransform(scale,0,0,scale,0,0);
    ctxT.setTransform(scale,0,0,scale,0,0);
    ctx2.setTransform(scale,0,0,scale,0,0);
    
   
renderTetris(rendergrid=cleangrid)

backgroundRender(rendergrid=cleangrid);


resizeObserver.observe(document.documentElement)


}

function updateHD() {

aiharddrop= document.getElementById("hdin").checked
if(aiharddrop) {
    harddropEnabled=true;
    fallspeed=harddrop;
}
}


function updateW(){
   weightbump= document.getElementById("w1in").value 
    weighthole=document.getElementById("w2in").value 
    weightgheight=document.getElementById("w3in").value 
    weightlinetop=document.getElementById("w4in").value 
    weightlinebottom=document.getElementById("w5in").value 
}

function updateNPK(){
npk = document.getElementById("npkin").checked

}


function updateSpeed() {
   
    speedboost = document.getElementById("sbin").value 
   
    fallspeed=(LSL[level][1]*2/speedboost)/fps;
   

}

function playGame(){
    play=true;
    document.getElementById("TCPLAY").hidden = true;
    document.getElementById("TCB").hidden = true;
    document.getElementById("TCL").hidden = true;

    document.getElementById("lc").hidden = true;
    document.getElementById("minl").hidden = true;
    document.getElementById("maxl").hidden = true;
    document.getElementById("ls").hidden = true;

    if(aivplayer) {
        document.getElementById("T2H").hidden = true;

        runAIVP();

    }else {


    if(aienabled==true) {
        runAIGame();
    }else {
        runPlayerGame();
    }
}
}

function minlevel() {
if(startlevel>0) {
    startlevel--; 
    
}
document.getElementById("lc").innerText=startlevel
}

function maxlevel() {
    if(startlevel<29) {
        startlevel++; 
    }
    document.getElementById("lc").innerText=startlevel
    
}


function AIVPLAYER() {
    if(aivplayer==false) {
        aivplayer=true;
        document.getElementById("aivpbox").hidden = false;
        document.getElementById("CVS").hidden = false;
        backgroundRender(rendergrid=cleangrid);



        speedboost=1;

    clearInterval(TetrisGame);
    clearInterval(ai);
    aienabled = false;
    document.removeEventListener('keydown', kd); 
    document.removeEventListener('keyup', ku); 
    document.getElementById("AII").hidden = false;
    document.getElementById("DPLAYERTEXT").innerHTML="PLAYER"
    document.getElementById("aiui").hidden = true;
    fallspeed=(LSL[level][1]*2/speedboost)/fps;
    fallspeed2=(LSL[level2][1]*2/speedboost)/fps;
    this.falltime = 0
    harddropEnabled=false;




    grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()
        renderTetris2()
        play=false;
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
        //document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;

        pscore=0;
        deltapscore=0;
        level=0;



    }
}


const resizeObserver = new ResizeObserver(entries =>{
    //console.log('Body height changed:', entries[0].target.clientHeight)
    sizecase= parseInt(document.documentElement.clientHeight / 30)
    canvas = document.getElementById("Tetris1");
    ctx = canvas.getContext('2d');

    canvas2 = document.getElementById("NP");
    ctx2 = canvas2.getContext('2d');

    stylesizex2 = sizecase*4
    stylesizey2 = sizecase*4

    canvas2.height=stylesizey2*2;
    canvas2.width=stylesizex2*2;

    canvas2.style.width = stylesizex2.toString().concat("px");
    canvas2.style.height = stylesizey2.toString().concat("px");


    stylesizex = sizecase*xcase+(2*sizecase)
    stylesizey = sizecase*ycase+(2*sizecase)

    canvas.height=stylesizey*2;
    canvas.width=stylesizex*2;

    canvas.style.width = stylesizex.toString().concat("px");
    canvas.style.height = stylesizey.toString().concat("px");

    document.getElementById("c").style.height = stylesizey.toString().concat("px");

    fh = ((document.documentElement.clientHeight-stylesizey)/2)

    document.getElementById("header").style.height = fh.toString().concat("px");
    document.getElementById("footer").style.height = fh.toString().concat("px");

    document.getElementById("DPLAYER").style.height = (stylesizey*0.2).toString().concat("px");
    document.getElementById("DPLAYER2").style.height = (stylesizey*0.2).toString().concat("px");

    document.getElementById("DAI").style.height = (stylesizey*0.8-40-(stylesizey*0.03)).toString().concat("px");

    document.getElementById("DAI").style.marginTop = (stylesizey*0.03).toString().concat("px");

    document.getElementById("DNP").style.height = (stylesizey*0.2).toString().concat("px");

    document.getElementById("DSL").style.height = (stylesizey*0.6-60-(stylesizey*0.03*2)).toString().concat("px");
    document.getElementById("DSL2").style.height = (stylesizey*0.6-60-(stylesizey*0.03*2)).toString().concat("px");

    document.getElementById("DB").style.height = (stylesizey*0.2).toString().concat("px");
    

    document.getElementById("DSL").style.marginTop = (stylesizey*0.03).toString().concat("px");
    document.getElementById("DB").style.marginTop = (stylesizey*0.03).toString().concat("px");


    document.getElementById("DPLAYERTEXT").style.fontSize = ((document.getElementById("CLEFT").offsetWidth/6)+1).toString().concat("px");
    document.getElementById("DPLAYERTEXT").style.width = (document.getElementById("CLEFT").offsetWidth-10).toString().concat("px");

    document.getElementById("DPLAYERTEXT2").style.fontSize = ((document.getElementById("CLEFT").offsetWidth/6)+1).toString().concat("px");
    document.getElementById("DPLAYERTEXT2").style.width = (document.getElementById("CLEFT").offsetWidth-10).toString().concat("px");

    document.getElementById("st").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)-1).toString().concat("px");
    document.getElementById("lt").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)).toString().concat("px");

    document.getElementById("st2").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)-1).toString().concat("px");
    document.getElementById("lt2").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/5)).toString().concat("px");

    document.getElementById("score").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/4)).toString().concat("px");
    document.getElementById("level").style.fontSize = ((document.getElementById("CRIGHT").offsetWidth/4)).toString().concat("px");


    document.getElementById("lt").style.marginTop = ((document.getElementById("DSL").offsetHeight-(document.getElementById("score").offsetHeight*4))/3).toString().concat("px");

    document.getElementById("st").style.marginTop = "10".toString().concat("px");

    document.getElementById("lt2").style.marginTop = ((document.getElementById("DSL").offsetHeight-(document.getElementById("score").offsetHeight*4))/3).toString().concat("px");

    document.getElementById("st2").style.marginTop = "10".toString().concat("px");




    document.getElementById("bp").style.width = document.getElementById("bai").style.width = document.getElementById("bpvsai").style.width = (document.getElementById("DB").offsetWidth-40).toString().concat("px");
   
    document.getElementById("bp").style.fontSize =  document.getElementById("bai").style.fontSize =  document.getElementById("bpvsai").style.fontSize = ((document.getElementById("DB").offsetHeight-4-20-(3*3))/7).toString().concat("px")

    document.getElementById("aiui").style.width = (document.getElementById("DAI").offsetWidth-20).toString().concat("px");
   

    document.getElementById("w1in").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");
    document.getElementById("w2in").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");
    document.getElementById("w3in").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");
    document.getElementById("w4in").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");
    document.getElementById("w5in").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");

    document.getElementById("gin").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");
    document.getElementById("sbin").style.width = (document.getElementById("DAI").offsetWidth-40).toString().concat("px");

    canvasT = document.getElementById("Tetris2");
    ctxT = canvasT.getContext('2d');

    canvasT.height=stylesizey*2;
    canvasT.width=stylesizex*2;

    canvasT.style.width = stylesizex.toString().concat("px");
    canvasT.style.height = stylesizey.toString().concat("px");
    
    var scale = 2; 
    ctx.setTransform(scale,0,0,scale,0,0);
    ctxT.setTransform(scale,0,0,scale,0,0);
    ctx2.setTransform(scale,0,0,scale,0,0);
    backgroundRender(rendergrid=cleangrid);
});


function backgroundRender(rendergrid=cleangrid){

    t_gray.onload = function (e){
    for (var a =0;a<rendergrid.length+2;a++) {
        ctx.drawImage(t_gray, 0, a*sizecase,sizecase,sizecase); 
        ctx.drawImage(t_gray, (xcase+1)*sizecase, a*sizecase,sizecase,sizecase);
        if(aivplayer) {
            ctxT.drawImage(t_gray, 0, a*sizecase,sizecase,sizecase); 
            ctxT.drawImage(t_gray, (xcase+1)*sizecase, a*sizecase,sizecase,sizecase);
            
        }
    }
   
    for (var b =0; b<rendergrid[0].length+2;b++) {
        ctx.drawImage(t_gray, b*sizecase, 0,sizecase,sizecase); 
        ctx.drawImage(t_gray, b*sizecase, (ycase+1)*sizecase,sizecase,sizecase); 
        if(aivplayer) {
            ctxT.drawImage(t_gray, b*sizecase, 0,sizecase,sizecase); 
            ctxT.drawImage(t_gray, b*sizecase, (ycase+1)*sizecase,sizecase,sizecase); 
        }
    }
    }
    t_gray.src = "/static/img/t_gray.png"


}


function initFig(){
   
    
    fallfig = nextfallfig
    nextfallfig = new Tetrimino(x=4,y=0);
    rendernextp();
    
    if(isInitCollide()){
        if(!aivplayer) {
        
        ploose=true;
        clearInterval(TetrisGame);
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()

        play=false;
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
        document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;
        }else {
            
        ploose=true;
        clearInterval(TetrisGame2);
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()
        grid2 = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris2()
        document.getElementById("T2H").hidden = false;


        play=false;
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
        document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;




        }
    }else {

    grid = convertFigToGrid(fallfig,grid);
    renderTetris();

    }
    
    
if(aienabled==true) {
    ai = setInterval(() => {
        runAI();
    clearInterval(ai);
    },0);
}
    

}

function initFig2(){
   
    
    fallfig2 = nextfallfig2
    nextfallfig2 = new Tetrimino(nextfallfig.x,nextfallfig.y);
    nextfallfig2.vfig = nextfallfig.vfig
    nextfallfig2.fig = nextfallfig.fig
    nextfallfig2.rot = nextfallfig.rot

    rendernextp();
    
    if(isInitCollide(fallfig2,grid2)){
        
        ploose=true;
        clearInterval(TetrisGame2);
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()
        grid2 = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris2()
        document.getElementById("T2H").hidden = false;


        play=false;
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
        document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;


    }else {

    grid2 = convertFigToGrid(fallfig2,grid2);
    renderTetris2();

    }
    
    
}


async function rendernextp(ffig=nextfallfig) {
   

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {
            if(fig[i][j]!=0){
                if(ffig.vfig == 1 || ffig.vfig == 2 || ffig.vfig == 4 || ffig.vfig == 5 || ffig.vfig == 6) {
                    ctx2.drawImage(imgarr[nextfallfig.vfig], j*sizecase+(sizecase/2), sizecase+i*sizecase,sizecase,sizecase); 
                }
                if(ffig.vfig == 0) {
                    ctx2.drawImage(imgarr[nextfallfig.vfig], j*sizecase, (sizecase/2)+sizecase+i*sizecase,sizecase,sizecase); 
                }
                if(ffig.vfig == 3) {
                    ctx2.drawImage(imgarr[nextfallfig.vfig], sizecase+j*sizecase, sizecase+i*sizecase,sizecase,sizecase); 
                }
                
            }
            
            
        }

    }
    
        
        
  
    
    imgarr[nextfallfig.vfig].src = "/static/img/"+imgarrpath[nextfallfig.vfig]+".png"
    
}



function isInitCollide(ffig=fallfig,rendergrid=grid){

    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {

            if(rendergrid[i+ffig.y][j+ffig.x]!=0){
                return true;
            }

        }

    }

    for(var i = 0;i<xcase;i++) {
        if(rendergrid[0][i]!=0) {
            return true;
        }
    }

return false;
}


async function btai() {
    if(aivplayer) {
        document.getElementById("aivpbox").hidden = true;
        document.getElementById("CVS").hidden = true;

        clearInterval(TetrisGame2);
        grid=new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        grid2=new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()
        play=false;
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
        //document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;



        aivplayer=false;
    }
    
    runAIGame();   
}
async function btplayer() {
    if(aivplayer) {
        document.getElementById("aivpbox").hidden = true;
        document.getElementById("CVS").hidden = true;
        

        clearInterval(TetrisGame2);
        grid=new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        grid2=new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris()
        play=false;
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        
        document.getElementById("TCPLAY").hidden = false;
        document.getElementById("TCB").hidden = false;
       // document.getElementById("TCL").hidden = false;
        document.getElementById("lc").hidden = false;
        document.getElementById("minl").hidden = false;
        document.getElementById("maxl").hidden = false;
        document.getElementById("ls").hidden = false;

        aivplayer=false;
    }

runPlayerGame();
}

async function runAIVP(){

    level=startlevel;
    level2=startlevel;
    pscore=0;
    pscore2=0;
    deltapscore=0;
    deltapscore2=0;

    document.getElementById("score").innerHTML = pscore
    document.getElementById("score2").innerHTML = pscore2
    document.getElementById("level").innerHTML = level
    document.getElementById("level2").innerHTML = level2


this.falltime=0;
this.falltime2=0;
nextfallfig2 = new Tetrimino(nextfallfig.x,nextfallfig.y);
    nextfallfig2.vfig = nextfallfig.vfig
    nextfallfig2.fig = nextfallfig.fig
    nextfallfig2.rot = nextfallfig.rot

initFig();
initFig2();
fallspeed = fallspeed2 = (LSL[level][1]*2)/fps;

document.addEventListener('keydown', kd =function kd(event) {
        if(!harddropEnabled) {
        switch(event.key){
            case "ArrowLeft":
                tLeft();
            break;
            case "ArrowRight":
                tRight();
            break;
            case "ArrowDown":
                fallspeed=harddrop
                fallspeed2=harddrop
                harddropEnabled2 = true;
                harddropEnabled=true
            break;
            case "ArrowUp":
                rotateFig();
            break;

            case "a":
                tLeft();
            break;
            case "d":
                tRight();
            break;
            case "s":
                fallspeed=harddrop
                fallspeed2=harddrop
                harddropEnabled2 = true;
                harddropEnabled=true
            break;
            case "w":
                rotateFig();
            break;
    
        }
        
    }
    });




    ai = setInterval(() => {
        runAI(fallfig2,nextfallfig2,grid2,true);
    clearInterval(ai);
    },0);


TetrisGame2 = setInterval(()=> {
    if(this.falltime/fps >fallspeed) {
        this.falltime = 0
        gravity()
        console.log(fallspeed)
        
    }
    
    if(this.falltime2/fps >fallspeed2) {
        this.falltime2 = 0
        gravity2()
        
        
    }

    this.falltime++;
    this.falltime2++;
    ploose=false;
} , 1000/fps)

}



async function runAIGame(){
   
    if(!play) {
        aienabled = true;
        document.getElementById("AII").hidden = true;
        document.getElementById("DPLAYERTEXT").innerHTML="AI"
        document.getElementById("aiui").hidden = false;
        return;
    }
    if(aienabled==true) {
        
        speedboost = document.getElementById("sbin").value 
      
        clearInterval(TetrisGame);
        clearInterval(ai);
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku); 
        grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris();

        document.getElementById("DPLAYERTEXT").innerHTML="AI"
        document.getElementById("AII").hidden = true;
        document.getElementById("aiui").hidden = false;

    aienabled = true;
    this.falltime = 0
    pscore = 0
    deltapscore=0;
    level=startlevel;
    fallspeed=(LSL[level][1]*2/speedboost)/fps;
    document.getElementById("score").innerHTML = pscore
    document.getElementById("level").innerHTML = level
    initFig();
   
    }else {
       
        speedboost = document.getElementById("sbin").value 
        
        clearInterval(TetrisGame);
        document.removeEventListener('keydown', kd); 
        document.removeEventListener('keyup', ku);
        document.getElementById("DPLAYERTEXT").innerHTML="AI"
        document.getElementById("AII").hidden = true;
        document.getElementById("aiui").hidden = false;
        fallspeed=(LSL[level][1]*2/speedboost)/fps;
        this.falltime = 0
        aienabled = true;

        ai = setInterval(() => {
            runAI();
        clearInterval(ai);
        },0);

    }

        TetrisGame = setInterval(()=> {

            if(this.falltime/fps >fallspeed) {
                this.falltime = 0
                gravity()
                //console.log(fallspeed)
            }
    
            this.falltime++;
            ploose=false;
        } , 1000/fps)


}


async function runAI(ffig=fallfig,nextffig=nextfallfig,rendergrid=grid,avp=false) {

    Mscore = 999999
    rotopt = 0
    popt = 0
    
    paramsopt = []

    var testfallfig = new Tetrimino(ffig.x,ffig.y)
    testfallfig.vfig = ffig.vfig
    testfallfig.fig = ffig.fig
    testfallfig.rot = ffig.rot

    var testnextfallfig = new Tetrimino(nextffig.x,nextffig.y)
    testnextfallfig.vfig = nextffig.vfig
    testnextfallfig.fig = nextffig.fig
    testnextfallfig.rot = nextffig.rot



    var testgrid = JSON.parse(JSON.stringify(rendergrid));
  

    contopt=0
    pxopt=[]
    pyopt=[]
    
        if (npk == true){
            for(var rotnext = 0; rotnext<4 ; rotnext++){
                if (rotnext==2 || rotnext==3) {
                            if (testnextfallfig.fig==I || testnextfallfig.fig==O || testnextfallfig.fig==S || testnextfallfig.fig==Z) {
                                break
                            }
                }
                testnextfallfig.rot=rotnext

                for (var pnext = 0;pnext<xcase-testnextfallfig.getFig()[0].length+1;pnext++) {
                    testnextfallfig.x=pnext

                    for (var rot = 0; rot<4 ; rot++){
                        if (rot==2 || rot==3) {
                            if (testfallfig.fig==I || testfallfig.fig==O || testfallfig.fig==S || testfallfig.fig==Z){
                                break
                        }
                        }
                        testfallfig.rot=rot

                        for (var p = 0;p<xcase-testfallfig.getFig()[0].length+1;p++){
                            testfallfig.x = p
                            
                            params = getParams(testfallfig,testnextfallfig,testgrid)
                            
                            bump=params[2]*weightbump
                            hole=params[0]*weighthole  

                            line=params[1]*remap(params[3],0,(ycase-1),weightlinetop,weightlinebottom)        
                            gheight=params[4]*weightgheight


                            if(Mscore>hole+gheight+bump-line) {
                                Mscore=hole+gheight+bump-line
                                rotopt = rot
                                popt = p
                                paramsopt = params
                            }
                            
                           
                        }
                    }
                }
            }
            
            }else {



                for (var rot = 0; rot<4 ; rot++){
                    if (rot==2 || rot==3) {
                        if (testfallfig.fig==I || testfallfig.fig==O || testfallfig.fig==S || testfallfig.fig==Z){
                            break
                    }
                    }
                    testfallfig.rot=rot

                    for (var p = 0;p<xcase-testfallfig.getFig()[0].length+1;p++){
                        testfallfig.x = p
                        
                        params = getParams(testfallfig,testnextfallfig,testgrid)
                        
                        bump=params[2]*weightbump
                        hole=params[0]*weighthole  

                        line=params[1]*remap(params[3],0,(ycase-1),weightlinetop,weightlinebottom)        
                        gheight=params[4]*weightgheight


                        if(Mscore>hole+gheight+bump-line) {
                            Mscore=hole+gheight+bump-line
                            rotopt = rot
                            popt = p
                            paramsopt = params
                        }
                        
                       
                    }
                }





            }
            
            
            if(!avp) {
            clearpiece(fallfig)
            fallfig.rot=rotopt
            fallfig.x = popt

            convertFigToGrid(fallfig)
            if(aiharddrop) {
                harddropEnabled=true;
                fallspeed=harddrop
            }
        }else {
            grid2 = clearpiece(fallfig2,grid2)
            fallfig2.rot=rotopt
            fallfig2.x = popt
            grid2 = convertFigToGrid(fallfig2,grid2)



        }

}

function stopnow()  {
    while(1){}
}


function remap(x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function isc(ffig=fallfig,rendergrid=grid) {
  
    
        fig = ffig.getFig()
        for(var i = 0; i < fig.length; i++) {
            for(var j = 0; j < fig[i].length; j++) {
                if(fig[i][j]==0) continue;


                    if((i+1)==fig.length) {
                        if(i+ffig.y+1==ycase){return true;}
                    
                        if (rendergrid[i+ffig.y+1][j+ffig.x]!=0) {return true;}
                        continue;
                    }
                    if(i+ffig.y+1==ycase) {continue;}
                   

                    if(fig[i+1][j]==0) {
                        if (rendergrid[i+ffig.y+1][j+ffig.x]!=0) {return true;}
                    }
               
                    
                    
                
    
    
                
    
            }
        }
    return false;
    
}




function getParams(testfallfig,testnextfallfig,testgrid){
        
        params=[]
        holes=0
        lines=0
        bump=0
        maxheight=0
        globalheight=0
        p = testfallfig.x
        pnext= testnextfallfig.x

        yinit = testfallfig.y
        ynextinit = testnextfallfig.y
        /*
        fmh=false
        testgrid.forEach(item => {
            item.forEach(pc => {
                if (pc!=0) {
                    fmh=true
                    return
                }
               
            });
            
                
            if (fmh==true) {
                fmh=false
                return
            }
            maxheight=maxheight+1
        });
        */
        
       
        

        testgrid = clearpiece(ffig=testfallfig,rendergrid=testgrid)
        while (1) {
            if(isc(ffig=testfallfig,rendergrid=testgrid)){
                testgrid = convertFigToGrid(ffig=testfallfig,rendergrid=testgrid)
                
                while (1) {
                    if(isc(ffig=testnextfallfig,rendergrid=testgrid)){
                        testgrid = clearpiece(ffig=testfallfig,rendergrid=testgrid)
                        
                        

                        for (var Rcase = 0; Rcase<testfallfig.getFig().length; Rcase++) {
                            
                            for (var i = 0;i<testfallfig.getFig()[0].length;i++) {
                                
                                if (testfallfig.getFig()[Rcase][i] !=0) {
                                    if(testfallfig.y+Rcase+1==ycase) {
                                        continue
                                    }
                                    if(testfallfig.getFig().length != Rcase+1) {
                                        if(testfallfig.getFig()[Rcase+1][i] != 0){
                                            continue
                                        }
                                    }
                                    if(testgrid[testfallfig.y+Rcase+1][p+i]==0){
                                        
                                        
                                            try {
                                                if(testgrid[testfallfig.y+Rcase+1][p+i]==0) {
                                                    holes=holes+1
                                                }else{
                                                    break
                                                }
                                            }catch {
                                                break;
                                            }
                                    }
                                }
                            }                    
                        }                    
                                   
                        testgrid = convertFigToGrid(ffig=testfallfig,rendergrid=testgrid)  

                        for (var Rcase = 0; Rcase<testnextfallfig.getFig().length; Rcase++) {
                            
                            for (var i = 0;i<testnextfallfig.getFig()[0].length;i++) {
                                
                                if (testnextfallfig.getFig()[Rcase][i] !=0) {
                                    if(testnextfallfig.y+Rcase+1==ycase) {
                                        continue
                                    }
                                    if(testnextfallfig.getFig().length != Rcase+1) {
                                        if(testnextfallfig.getFig()[Rcase+1][i] != 0){
                                            continue
                                        }
                                    }
                                    if(testgrid[testnextfallfig.y+Rcase+1][p+i]==0){
                                        
                                        
                                            try {
                                                if(testgrid[testnextfallfig.y+Rcase+1][p+i]==0) {
                                                    holes=holes+1
                                                }else{
                                                    break
                                                }
                                            }catch {
                                                break;
                                            }
                                    }
                                }
                            }                    
                        }        
                                            
                                    
                        testgrid = clearpiece(ffig=testfallfig,rendergrid=testgrid)
                        
                        indy=0
                        testfallfig.getFig().forEach(row => {
                            fc=0
                            row.forEach(cp => {
                                if (cp!=0) {
                                    fc=fc+1
                                }
                            });
                            for (var x = 0; x<xcase ;x++) {
                                if(testgrid[indy+testfallfig.y][x] ==0) {
                                    fc=fc-1
                                }
                            }
                            if (fc==0){
                                lines=lines+1
                            }         
                            indy=indy+1
                        });

                        indy=0
                        testnextfallfig.getFig().forEach(row => {
                            fc=0
                            row.forEach(cp => {
                                if (cp!=0) {
                                    fc=fc+1
                                }
                            });
                            for (var x = 0; x<xcase ;x++) {
                                if(testgrid[indy+testnextfallfig.y][x] ==0) {
                                    fc=fc-1
                                }
                            }
                            if (fc==0){
                                lines=lines+1
                            }         
                            indy=indy+1
                        });
                        


                        bumpmap= new Array(xcase).fill(0)
                        testgrid = convertFigToGrid(testfallfig,testgrid)
                        testgrid = convertFigToGrid(testnextfallfig,testgrid)
                        
                        
                        for (var x = 0;x<xcase;x++) {
                            for (var column = 0;column<ycase;column++){
                                if (testgrid[column][x]!=0){
                                    bumpmap[x]=ycase-column
                                    break
                                }
                            }
                        }
                        
                        globalheight=bumpmap.reduce((a, b) => a + b);
                        
                        testgrid = clearpiece(ffig=testfallfig,rendergrid=testgrid)
                        testgrid = clearpiece(ffig=testnextfallfig,rendergrid=testgrid)



                        break;
                    }
                    testnextfallfig.y++;
                }

                break;
            }
            testfallfig.y++;
           
        }
        




        
        
        testfallfig.y=yinit
        testnextfallfig.y= ynextinit

        
        for (var b = 0;b<bumpmap.length-1;b++) {
           bump+= Math.abs(bumpmap[b]-bumpmap[b+1])
        }
        maxheight = ycase-Math.max.apply(null, bumpmap)
        
        params=[holes,lines,bump,maxheight,globalheight]
        return params
        
}
























async function runPlayerGame(){
    if(!play) {
        aienabled = false;
        document.getElementById("AII").hidden = false;
        document.getElementById("DPLAYERTEXT").innerHTML="PLAYER"
        document.getElementById("aiui").hidden = true;
        return;
    }
    if(!aienabled) {
    speedboost=1;
   
    aienabled = false;
    clearInterval(TetrisGame);
    clearInterval(ai);
    document.removeEventListener('keydown', kd); 
    document.removeEventListener('keyup', ku); 
    grid = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
    renderTetris();
    document.getElementById("AII").hidden = false;
    document.getElementById("DPLAYERTEXT").innerHTML="PLAYER"
    document.getElementById("aiui").hidden = true;


   
    this.falltime = 0
    pscore = 0
    deltapscore=0;
    level=startlevel;
    fallspeed=(LSL[level][1]*2/speedboost)/fps;
    document.getElementById("score").innerHTML = pscore
    document.getElementById("level").innerHTML = level
    
    initFig();
    }else {
    speedboost=1;

    clearInterval(TetrisGame);
    clearInterval(ai);
    aienabled = false;
    document.removeEventListener('keydown', kd); 
    document.removeEventListener('keyup', ku); 
    document.getElementById("AII").hidden = false;
    document.getElementById("DPLAYERTEXT").innerHTML="PLAYER"
    document.getElementById("aiui").hidden = true;
    fallspeed=(LSL[level][1]*2/speedboost)/fps;
    this.falltime = 0
    harddropEnabled=false;
    }

    document.addEventListener('keydown', kd =function kd(event) {
        if(!harddropEnabled) {
        switch(event.key){
            case "ArrowLeft":
                tLeft();
            break;
            case "ArrowRight":
                tRight();
            break;
            case "ArrowDown":
                fallspeed=harddrop
                harddropEnabled=true
            break;
            case "ArrowUp":
                rotateFig();
            break;

            case "a":
                tLeft();
            break;
            case "d":
                tRight();
            break;
            case "s":
                fallspeed=harddrop
                harddropEnabled=true
            break;
            case "w":
                rotateFig();
            break;
    
        }
        
    }
    });
   
    TetrisGame = setInterval(()=> {

        if(this.falltime/fps >fallspeed) {
            this.falltime = 0
            gravity()
            
        }

        this.falltime++;
        ploose=false;
    } , 1000/fps)
    
    
    
    
}


function rotateFig(ffig=fallfig,rendergrid=grid){
    if(ffig.vfig==3) return;
    grid = clearpiece(ffig,rendergrid)
    ffig.rotate();
    if(isCollideRotate()){
        ffig.reverseRotate();
    }

    grid = convertFigToGrid(ffig,rendergrid);
    renderTetris();
       
}


function isCollideRotate(ffig=fallfig,rendergrid=grid){

    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {
            try {
            if(rendergrid[i+ffig.y][j+ffig.x]!=0){
                return true;
            }
        }catch{
            return true;
        }
        }

    }

return false;
}


function tRight(ffig=fallfig,rendergrid=grid){

    if(isCollideRight()){

    }else{
        grid = clearpiece(ffig,rendergrid)
        ffig.x++;
        grid = convertFigToGrid(ffig,rendergrid);
        renderTetris();
    }
    
}

function isCollideRight(ffig=fallfig,rendergrid=grid){
    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        li = fig[i].length
        for(var j = 0; j < li; j++) {
            if(fig[i][li-1-j]!=0){
                
                if(rendergrid[i+ffig.y][(li-j)+ffig.x]!=0){
                    return true;
                }

                break;
            }else{
                continue;  
            }
            


        }
    }

return false;
}

function tLeft(ffig=fallfig,rendergrid=grid){
    
    if(isCollideLeft()){

    }else{
        grid = clearpiece(ffig,rendergrid)
        ffig.x--;
        grid = convertFigToGrid(ffig,rendergrid);
        renderTetris();
    }
    
}

function isCollideLeft(ffig=fallfig,rendergrid=grid){
    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        li = fig[i].length
        for(var j = 0; j < li; j++) {
            if(fig[i][j]!=0){
                if(rendergrid[i+ffig.y][j-1+ffig.x]!=0){
                    return true;
                }

                break;
            }else{
                continue;  
            }
            


        }
    }

return false;
}





function isCollideDown(ffig=fallfig,rendergrid=grid){
   
    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {
            if(fig[i][j]==0) continue;

            try{
                if(fig[i+1][j]==0) {
                    if (rendergrid[i+ffig.y+1][j+ffig.x]!=0 || i+ffig.y+1==ycase) {return true;}
                }
            }catch{
                if(i+ffig.y+1==ycase){return true;}
                
                if (rendergrid[i+ffig.y+1][j+ffig.x]!=0) {return true;}
                
            }


            

        }
    }
return false;
}



function clearpiece(ffig=fallfig,rendergrid=grid){
if(ffig!=null) {

    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {
            
            if (fig[i][j]!=0) {
                
                rendergrid[i+ffig.y][j+ffig.x]=0
        }

        }
    }


    }
return rendergrid
}

function gravity(ffig=fallfig,rendergrid=grid){
    if(isCollideDown()) {
        if(islineclear()){
            

            if(level!=29) {
            if(deltapscore-LSL[level][2]>=0) {
                deltapscore-=LSL[level][2];
                level++;  
                
                
            }
        }


            document.getElementById("score").innerHTML = pscore
            document.getElementById("level").innerHTML = level
        }
        
        fallspeed=(LSL[level][1]*2/speedboost)/fps;
        harddropEnabled = false;
        initFig();
        if(ploose) return;
        

    }else {
    grid = clearpiece(ffig,rendergrid)
    ffig.y++;
    grid = convertFigToGrid(ffig,rendergrid);
    
    renderTetris();
    }
}


function gravity2(ffig=fallfig2,rendergrid=grid2){
    if(isCollideDown(ffig,rendergrid)) {
        if(islineclear2()){
            

            if(level2!=29) {
            if(deltapscore2-LSL[level2][2]>=0) {
                deltapscore2-=LSL[level2][2];
                level2++;  
                
                
            }
        }


            document.getElementById("score2").innerHTML = pscore2
            document.getElementById("level2").innerHTML = level2
        }
        
        fallspeed2=(LSL[level2][1]*2/speedboost)/fps;
        harddropEnabled2 = false;
        initFig2();
        if(ploose) {
            grid2 = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
            renderTetris2();
            return;   
        }
        
        ai = setInterval(() => {
            runAI(fallfig2,nextfallfig2,grid2,true);
        clearInterval(ai);
        },0);

    }else {
    grid2 = clearpiece(ffig,rendergrid)
    ffig.y++;
    grid2 = convertFigToGrid(ffig,rendergrid);
    
    renderTetris2();
    if(ploose) {
        grid2 = new Array(ycase).fill(0).map(() => new Array(xcase).fill(0));
        renderTetris2();
        return;   
    }
    }
}



function islineclear(ffig=fallfig,rendergrid=grid){
    fig = ffig.getFig()
    var lc=false;
    for(var i = 0; i < fig.length; i++) {
        fc=1;
        for(var l = 0; l < xcase;l++) {
            if(rendergrid[i+ffig.y][l]==0){
                fc=0;
            }
            
        }
        if(fc==1) {
            grid = clearline(i+ffig.y);
            fc=0;
            pscore++;
            deltapscore++;
            lc=true;
        }
    }

if(lc) return true;

return false;
}

function islineclear2(ffig=fallfig2,rendergrid=grid2){
    fig = ffig.getFig()
    var lc=false;
    for(var i = 0; i < fig.length; i++) {
        fc=1;
        for(var l = 0; l < xcase;l++) {
            if(rendergrid[i+ffig.y][l]==0){
                fc=0;
            }
            
        }
        if(fc==1) {
            grid2 = clearline(i+ffig.y,grid2);
            fc=0;
            pscore2++;
            deltapscore2++;
            lc=true;
        }
    }

if(lc) return true;

return false;
}


function clearline(line,rendergrid=grid){
    
    rendergrid = rendergrid.slice(0); 
    rendergrid.splice(line, 1);
    rendergrid.splice(0, 0, new Array(xcase).fill(0));
return rendergrid;
}

function convertFigToGrid(ffig,rendergrid=grid){

    fig = ffig.getFig()
    for(var i = 0; i < fig.length; i++) {
        for(var j = 0; j < fig[i].length; j++) {
            
            if (fig[i][j]!=0) {
                
                rendergrid[i+ffig.y][j+ffig.x]=fig[i][j]
        }

        }
    }

return rendergrid
}



async function renderTetris2(rendergrid=grid2){  

    
   
                                //rendernextp();
                               
    for(var i = 0; i < rendergrid.length; i++) {
        for(var j = 0; j < rendergrid[i].length; j++) {
            switch (rendergrid[i][j]) {
                case 0:
                    ctxT.clearRect(j*sizecase+sizecase, i*sizecase+sizecase, sizecase, sizecase);
                break;
                case 5:
                    ctxT.drawImage(t_green, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);                  
                break;
                case 2:
                    ctxT.drawImage(t_darkblue, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 1:
                    ctxT.drawImage(t_lightblue, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 3:
                    ctxT.drawImage(t_orange, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 6:
                    ctxT.drawImage(t_purple, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 7:
                    ctxT.drawImage(t_red, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 4:
                    ctxT.drawImage(t_yellow, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;

            }
            
        }
    }



    t_green.src = "/static/img/t_green.png"
    t_darkblue.src = "/static/img/t_darkblue.png"
    t_lightblue.src = "/static/img/t_lightblue.png"
    t_orange.src = "/static/img/t_orange.png"
    t_purple.src = "/static/img/t_purple.png"
    t_red.src = "/static/img/t_red.png"
    t_yellow.src = "/static/img/t_yellow.png"

    
}


async function renderTetris(rendergrid=grid){  

   
   

    t_green.onload = function (e){
        t_darkblue.onload = function (e){   
            t_lightblue.onload = function (e){
                t_orange.onload = function (e){ 
                    t_purple.onload = function (e){
                        t_red.onload = function (e){
                            t_yellow.onload = function (e){
                                rendernextp();
    for(var i = 0; i < rendergrid.length; i++) {
        for(var j = 0; j < rendergrid[i].length; j++) {
            switch (rendergrid[i][j]) {
                case 0:
                    ctx.clearRect(j*sizecase+sizecase, i*sizecase+sizecase, sizecase, sizecase);
                break;
                case 5:
                    ctx.drawImage(t_green, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);                  
                break;
                case 2:
                    ctx.drawImage(t_darkblue, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 1:
                    ctx.drawImage(t_lightblue, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 3:
                    ctx.drawImage(t_orange, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 6:
                    ctx.drawImage(t_purple, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 7:
                    ctx.drawImage(t_red, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;
                case 4:
                    ctx.drawImage(t_yellow, j*sizecase+sizecase, i*sizecase+sizecase,sizecase,sizecase);
                break;

            }
            
        }
    }

}
                        }
                    }
                }
            }
        }
    }
    t_green.src = "/static/img/t_green.png"
    t_darkblue.src = "/static/img/t_darkblue.png"
    t_lightblue.src = "/static/img/t_lightblue.png"
    t_orange.src = "/static/img/t_orange.png"
    t_purple.src = "/static/img/t_purple.png"
    t_red.src = "/static/img/t_red.png"
    t_yellow.src = "/static/img/t_yellow.png"

    
}

