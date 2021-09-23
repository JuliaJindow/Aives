var objects = [];
var video = "";
var status = "";
var objN = "";


function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();    
}

function start() {
    objectD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objN = document.getElementById("obj-name").value;
}

function draw() {
    image(video,0,0,380,380);

    if (status != "") {
        
        objectD.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
        
           document.getElementById("status").innerHTML = "Status = Objects Detected";

           percent = floor(objects[i].confidence *100);
           fill("#FF0000");
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if (objects[i].label == objN) {
            
            document.getElementById("found").innerHTML = objN + " found";
            video.stop();
            
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(objN + " found");
            synth.speak(utterThis);
        }
        else {
            document.getElementById("found").innerHTML = objN + " not found";
        }
        
    }
    objectD.detect(gotResult);
  }
}

function modelLoaded() {
    console.log("The CocoSSD model is loaded!!");
    status = true;
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}