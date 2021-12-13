var PLAY = 1;
var  END = 0;

let ground;
var invisibleground;

var runner, runner_Img;
var bird1;
var bird2,bird3;
let  bird1_Img, bird2_Img, bird3_Img;
var motorcar1;
var  motorcar2;
var  motorcar3;
var motorcar1_Img;
var  motorcar2_Img;
let motorcar3_Img;
let motorbike1, motorbike2;
let motorbike1_Img, motorbike2_Img;

var coin;


function preload(){
    motorcar1_Img = loadImage("motorcar_1.png");
    motorcar2_Img = loadImage("motor_2.png");

    runner_Img = loadAnimation("runner_1.png"+"runner_2.png");
    
    bird2_Img = loadImage("bird_2.png");
    
   
    bird1_Img = loadImage("bird_1.png");
    runner_Img = loadImage("runner_1.png");

}

//API is a service which gives us some data based on our query.
//We use ‘fetch()’ to get data from API in javascript.



function setup(){
    createCanvas(600,300);

    bird1 = createSprite(200,150,20,20);
    bird1.addImage(bird_1.png);
    bird1.scale = 0.5;

    bird1 = createSprite(230,130,60,30);
    bird2_Img.addImage(bird_2.png);
    bird2.scale = 0.5;



    runner=  createSprite(150,300,20,30);
    runner.addImage(runner_Img);
    runner.scale = 0.6;

    
    motorcar1 = createSprite (137,247,20,30);
    motorcar1.addImage(motorcar1_Img );
    motorcar1.scale = 0.5

    motorcar2 = createSprite(237,127,30,30);
    motorcar2.addImage(motorcar2_Img);
    motorcar2.scale = 0.5


    ground = createSprite(0,190,1200,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);


}


function draw(){
    background("red");

   
    
    textSize(20);
    fill(255);
    text("Score: "+ score, 500,40);
    text("Life: "+ life , 500,60);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
         if(score >= 0){
           ground.velocityX = -6;
         }else{
           ground.velocityX = -(6 + 3*score/100);
         }
       
         if(keyDown("space") && mario.y >= 139) {
           runner.velocityY = -12;
         }
       
      runner.velocityY = runner.velocityY + 0.8
       
         if (ground.x < 0){
           ground.x = ground.width/2;
         }
         
         runner.collide(ground);
      
      
       
        if(obstaclesGroup.isTouching(runner)){
            life = life-1 
          gameState = END;
         } 
         if(coin.isTouching(runner)){
        
          
         }
         
       }

       else if (gameState === END ) {
        gameOver.visible = true;
        restart.visible = true;
        runner.addAnimation("collided",runner_Img );
        
       
        ground.velocityX = 0;
        runner.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        
       
        runner.changeAnimation("collided",mario_collided);
        runner.scale =0.35;
        
       
        motorbike1.setLifetimeEach(-1);
      coin.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
    
    




    drawSprites();
  
    }


    function spawnCoin() {
      
      if (frameCount % 60 === 0) {
        var coin = createSprite(600,120,40,10);
        coin.y = Math.round(random(80,120));
        coin.addImage(coinImage);
        coin.scale = 0.1;
        coin.velocityX = -3;
        
       
        coin.lifetime = 200;
        
        //adjust the depth
        coin.depth = runner.depth;
        runner.depth = runner.depth + 1;
        
        
      }
      
    }

    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      
      obstaclesGroup.destroyEach();
      coinGroup.destroyEach();
      
     runner.changeAnimation("running",runne_running);
      runner.scale =0.5;
    }    
