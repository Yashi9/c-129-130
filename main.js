song1 = "";
song2 = "";
leftWristX = 0 ;
leftWristY = 0 ;
rightWristX = 0 ;
rightWristY = 0 ; 
scoreLeftwrist = 0 ;
scoreRightwrist = 0;
song1_status = "";
song2_status = "";


function preload()
{
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500 );
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotPoses);
}

function gotPoses(results)
{
    if(results.length >0)
    {
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist  = " +scoreLeftwrist+ "  ,  scoreRightWrist = " +scoreRightwrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = " +leftWristX+ "leftWrist Y = " +leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = " +rightWristX+ "rightWrist Y = " +rightWristY);
    }

}

function modelLoaded()
{
    console.log("Model is intialized ");
}

function draw()
{
    image(video , 0 , 0 ,600 , 500);

    fill("red");
    stroke("red");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreLeftwrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "song 1 is playing ";
        }
    }
    if(scoreRightwrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "song 2 is playing ";
        }
    }


}