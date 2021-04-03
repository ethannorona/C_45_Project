var player, enemy, edges, backgroundImg;
var dodgeball1, dodgeball2;

var gameState = "play";

function preload()
{
	backgroundImg = loadImage("download.jpg");
}

function setup() {
	createCanvas(750, 700);

	player = createSprite(380, 550, 50, 50);
	enemy = createSprite(380, 150, 50, 50);
	player.shapeColor = "red";
	enemy.shapeColor = "blue";

	dodgeball1 = createSprite(380, 450, 30, 30);
	dodgeball2 = createSprite(380, 250, 30, 30);
	dodgeball1.shapeColor = "darkOrange";
	dodgeball2.shapeColor = "darkOrange";
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);

	if(gameState === "play"){

  edges = createEdgeSprites();
  player.bounceOff(edges);
  enemy.bounceOff(edges);
  
  keyPressed();

  if(player.y < 360){
	  player.y += 7;
  }

  if(enemy.y > 325){
	enemy.y -= 7;
  }	

	if(dodgeball1.isTouching(player) && dodgeball1.velocityY > 0){
		gameState = "end0";
	}

	if(dodgeball2.isTouching(player) && dodgeball2.velocityY > 0){
		gameState = "end0";
	}

	if(dodgeball1.isTouching(enemy) && dodgeball1.velocityY < 0){
		gameState = "end1";
	}

	if(dodgeball2.isTouching(enemy) && dodgeball2.velocityY < 0){
		gameState = "end1";
	}


	dodgeball1.collide(edges);
	dodgeball2.collide(edges);

  drawSprites();
}

if(gameState === "play"){
	textSize(20);
	fill("black");
	text("Red: Arrow keys to move. Hold 'N' when close to a non-moving", 20, 660);
	text("dodgeball to hold. Press 'M' to Release.", 20, 680);

	text("Blue: WSAD keys to move. Hold 'C' when close to a non-moving", 20, 30);
	text("dodgeball to hold. Press 'V' to Release.", 20, 50);

	text("Goal: Hit the other opponent.", 15,350);
}

if(gameState === "end0"){
	textSize(30);
	fill("black");
	text("Game Over", 280, 350);
	text("Blue Wins", 300, 380);
}

if(gameState === "end1"){
	textSize(30);
	fill("black");
	text("Game Over", 280, 350);
	text("Red Wins", 300, 380);
}

}

function keyPressed(){
	if(keyDown(RIGHT_ARROW)){
		player.x += 6;
	}
  
	if(keyDown(LEFT_ARROW)){
	  player.x -= 6;
	}
  
   if(keyDown(DOWN_ARROW)){
	  player.y += 6;
	}
  
   if(keyDown(UP_ARROW)){
	  player.y -= 6;
	}

	if(keyDown("d")){
		enemy.x += 6;
	}
  
	if(keyDown("a")){
		enemy.x -= 6;
	}
  
   if(keyDown("s")){
		enemy.y += 6;
	}
  
   if(keyDown("w")){
		enemy.y -= 6;
	}

	if(keyDown("n") && player.isTouching(dodgeball1)){
		dodgeball1.x = player.x;
		dodgeball1.y = player.y - 30;
		if(keyDown("m")){
			dodgeball1.velocityY = -16;
		}
	}

	if(keyDown("n") && player.isTouching(dodgeball2)){
		dodgeball2.x = player.x;
		dodgeball2.y = player.y - 30;
		if(keyDown("m")){
			dodgeball2.velocityY = -16;
		}
	}

	if(keyDown("c") && enemy.isTouching(dodgeball1)){
		dodgeball1.x = enemy.x;
		dodgeball1.y = enemy.y + 30;
		if(keyDown("v")){
			dodgeball1.velocityY = 16;
		}
	}

	if(keyDown("c") && enemy.isTouching(dodgeball2)){
		dodgeball2.x = enemy.x;
		dodgeball2.y = enemy.y + 30;
		if(keyDown("v")){
			dodgeball2.velocityY = 16;
		}
	}
}