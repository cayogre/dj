PulsoEsquerdoX = 0
PulsoDireitoX = 0
PulsoEsquerdoY = 0
PulsoDireitoY = 0
scorePulsoEsquerdo = 0
scorePulsoDireito = 0
var r = 1;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoad);
    poseNet.on('pose', gotPoses)
    
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("seagreen");
    stroke("black");
    if(scorePulsoEsquerdo > 0.1){
        circle(PulsoEsquerdoX, PulsoEsquerdoY, 50);
        leftWristYNumero = Number(PulsoEsquerdoY)
        ajustado = floor(leftWristYNumero)
        volume = ajustado / 500
        document.getElementById("volume").innerHTML = "volume = " + volume
        song.setVolume(volume)   
    }
    if(scorePulsoDireito > 0.1){
        fill("navy")
        circle(PulsoDireitoX, PulsoDireitoY, 50)
        song.rate(r)
        if(PulsoDireitoY > 0 && PulsoDireitoY <= 100){
            document.getElementById("velocidade").innerHTML = "Velocidade = 0.5x"
            r = 0.5
        }
        if(PulsoDireitoY > 100 && PulsoDireitoY <= 200){
            document.getElementById("velocidade").innerHTML = "Velocidade = 1.0x"
            r = 1.0
        }
        if(PulsoDireitoY > 200 && PulsoDireitoY <= 300){
            document.getElementById("velocidade").innerHTML = "Velocidade = 1.5x"
            r = 1.5
        }
        if(PulsoDireitoY > 300 && PulsoDireitoY <= 400){
            document.getElementById("velocidade").innerHTML = "Velocidade = 2.0x"
            r = 2.0
        }
        if(PulsoDireitoY > 0 && PulsoDireitoY <= 100){
            document.getElementById("velocidade").innerHTML = "Velocidade = 0.5x"
            r = 0.5
        }
    }
}
function globo_terrestre(){
    song.play();
    song.setVolume(0.3);
}
function modelLoad(){
    console.log("catarina")
}
function gotPoses(results){
    if(results.length<0){
    console.log("que burro da 0 para ele")
    }else{
        console.log(results)
        PulsoEsquerdoX = results[0].pose.leftWrist.x
        PulsoEsquerdoY = results[0].pose.leftWrist.y
        PulsoDireitoX = results[0].pose.rightWrist.x
        PulsoDireitoY = results[0].pose.rightWrist.y
        scorePulsoEsquerdo = results[0].pose.leftWrist.confidence
        scorePulsoDireito = results[0].pose.rightWrist.confidence
    }
    
}