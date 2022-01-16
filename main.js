video="";
objects=[];
Status="";
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);

    objectDetector=ml5.objectDetector('cocossd',modleLoaded);
    

    if(Status!="") {
     objectDetector.detect(video, gotResults);
     for(i=0; i< objects.length ;i++) {
  document.getElementById('status').innerHTML="Status : Object Detecting";
  document.getElementById('number_of_object').innerHTML="Number of object Detected : "+objects.length; 

  fill("FF0000");
  precent=floor(objects[i].confidence *100);
  text(objects[i].label+precent+"%",objects[i].x+15,objects[i].y+15);
  noFill()
  stroke("FF0000");
  rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
     }
    }

}
function modleLoaded(){
    console.log("Modle Loaded !")
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);

}
function gotResults(error,results){
    if(error){
      console.log(error);
      

    }
    console.log(results);
    objects=results;
}