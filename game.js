//control
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var isJump=false; 
var shiftleftPressed=false; 
var re=false;
var j;
var jumpSpeed;

var func_re;
//keyboard
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = true;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = true;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = true;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = true;
                return;
                case "Space":
                   spacePressed=true;
                return;
            case "ShiftLeft":
                shiftleftPressed=true;
                return;
                case "KeyR":
                    re=true;

                return;
            default:
                return;
        }
    }
    
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    
}
function keyUpHandler(e) {
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = false;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = false;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = false;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = false;
                return;
            case "Space":
                spacePressed=false;
                
            return;
            case "ShiftLeft":
                shiftleftPressed=false;
                return
            case "KeyR":
                re=false
            return;
            default:
                return;
        }
    }

    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
}
function init(){
     rightPressed = false;
     leftPressed = false;
     upPressed = false;
     downPressed = false;
     spacePressed = false;
     isJump=false; 
     shiftleftPressed=false; 
     jumpSpeed=13;
     clearInterval(j);
     
    document.getElementById("bgm").pause();
    document.getElementById("bgm").currentTime=0;
// INIT
//canva
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var background=new Image();
    background.src="background2.gif";
//game 
var gameStart=false;
//player
    var player_model=new Image();
    player_model.src="player1_model/Elf_M_Idle_right_1.png";
    var player_stand_state=["player1_model/Elf_M_Idle_right_1.png","player1_model/Elf_M_Idle_right_2.png",
    "player1_model/Elf_M_Idle_left_1.png","player1_model/Elf_M_Idle_left_2.png"]
    var player_stand_gif;
    var player_is_stand=false;
    var player1=new player(5,5,0,10,0,canvas.width/2,(canvas.height - 100),100,100,5,13,player_model);
    function player(hp,mp,exp,atk,def,x,y,height,width,speed,jumpSpeed,img){
        this.hp=hp;
        this.mp=mp;
        this.exp=exp;
        this.atk=atk;
        this.def=def;
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.speed=speed;
        this.jumpSpeed=jumpSpeed;
        this.img=img;

        this.faceRight=true;
        this.faceLeft=false;
        this.ishit=false;
    }
//player life
var life=new Image();
life.src="life_icon/life.png";
//player mp
var mp=new Image();
mp.src="life_icon/mp.png";
//player walk
var player_walk_state=["player1_model/Elf_M_Walk_right_1.png","player1_model/Elf_M_Walk_right_2.png",
"player1_model/Elf_M_Walk_right_3.png","player1_model/Elf_M_Walk_right_4.png",
"player1_model/Elf_M_walk_left_1.png","player1_model/Elf_M_walk_left_2.png",
"player1_model/Elf_M_walk_left_3.png","player1_model/Elf_M_walk_left_4.png"];
var is_walk_right=false;
var is_walk_left=false;
//player bow
var bowState=["Light bows/LightBow_right_1.png","Light bows/LightBow_left_1.png"]
var bow=new Image();
bow.src="Light bows/LightBow_right_1.png";
var bowWidth=70;
var bowHeight=70;
var bow_atk_width=92;
var bow_atk_height=92;

var bowatkState=["Light bows/LightBow_atk_right_1.png","Light bows/LightBow_atk_right_2.png","Light bows/LightBow_atk_right_3.png",
"Light bows/LightBow_atk_right_4.png","Light bows/LightBow_atk_right_5.png",
"Light bows/LightBow_atk_left_1.png","Light bows/LightBow_atk_left_2.png","Light bows/LightBow_atk_left_3.png",
"Light bows/LightBow_atk_left_4.png","Light bows/LightBow_atk_left_5.png"];

var bow_is_atk=false;
//bow arrow
var arrow=new Image();
arrow.src="Light bows/magic_arrow.png";
var arrowWidth=100;
var arrowHeight=100;
var arrowX;
var realarrowY;
var arrowY;
var arrow_max_distance=300;
var arrowSpeed=20;
var max_force=1;
var is_shot=false;
//player skill
var skill1_active=false;
var skill1_isOK=true;
//enemy
function enemy(hp,atk,def,speed,jumpSpeed,x,y,width,height,img,state){
    this.hp=hp;
    this.atk=atk;
    this.def=def;
    this.speed=speed;
    this.jumpSpeed=jumpSpeed;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.img=img;
    this.state=state;

    this.canjump=false;
    this.isjump=false;
    this.faceLeft;
    this.faceRight;
    this.spawn=false;
    if(this.x>player1.x){
        this.img.src=this.state[4];
        this.faceLeft=true;
        this.faceRight=false;
    }else{
        this.img.src=this.state[0];
        this.faceLeft=false;
        this.faceRight=true;
    }
    
}
var enemies=new Array;
    //bandit
var bandit_state=["Bandit/Bandit_Walk_right_1.png","Bandit/Bandit_Walk_right_2.png","Bandit/Bandit_Walk_right_3.png","Bandit/Bandit_Walk_right_4.png",
"Bandit/Bandit_Walk_left_1.png","Bandit/Bandit_Walk_left_2.png","Bandit/Bandit_Walk_left_3.png","Bandit/Bandit_Walk_left_4.png"];
var bandit1_model = new Image();
var bandit2_model = new Image();
bandit1_model.src =bandit_state[4] ;
var bandit1=new enemy(100,1,0,5,13,700,player1.y,100,100,bandit1_model,bandit_state);
var bandit2=new enemy(100,1,0,5,13,0,player1.y,100,100,bandit2_model,bandit_state);
//var bandit3=new enemy(100,2,0,5,700,player1.y,100,100,bandit1_model,bandit_state);

  //  setTimeout(function(){
    //    bandit3.spawn=true;
      //  func_bandit3_walk=setInterval(bandit3_walk,100)
       // enemies.push(bandit3);},20000);
var func_bandit1_walk;
var func_bandit2_walk;
//var func_bandit3_walk;
//ground
    var ground = (canvas.height - player1.height)-20;
    var edge=canvas.width-(player1.width/2);
    player1.y=ground;
    bandit1.y=ground;
    bandit2.y=ground;
    //bandit3.y=ground;

//music
var attack_music=document.getElementById("hardattack");
var bgm= document.getElementById("bgm");
bgm.play();
//score and time
var score=0;
var time;
var time_value;
var time_str="60";

    // cooldown
    
    var attackcolldown=0;
    // DRAW(start)
    function draw() {
 
        document.getElementById("bgm").play();
        //player1 is face right or left
        if(!bow_is_atk){
            if(rightPressed&&player1.faceLeft){
                player1.faceRight=true;
                player1.faceLeft=false;
            }else if(leftPressed&&player1.faceRight){
                player1.faceRight=false;
                player1.faceLeft=true;
            }
            //remove the stand animation
        }
        if(player_is_stand==false&&(!is_walk_right||!is_walk_left )){
            clearInterval(player_stand_gif);
            
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0,canvas.width, canvas.height,0,0,canvas.width, canvas.height); //background
        //time update
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(time_str, canvas.width/2-15, 30);
        // KEYBOARD
        if(rightPressed&&player1.x<edge) {
            player_is_stand=false;
            player1.x += player1.speed;
            if(player1.x>=edge){
                player1.x=edge;
            }
            if(!is_walk_right&&!bow_is_atk){
                is_walk_left=false;
                is_walk_right=true;
                right_walk();
            }else if(!is_walk_right){
                is_walk_left=false;
                is_walk_right=true;
                right_walk();
            }
            
        }
        else if(leftPressed&&player1.x>0) {
            player_is_stand=false;
            player1.x -= player1.speed;
            if(player1.x<=0){
                player1.x=0;
            }
            if(!is_walk_left&&!bow_is_atk){
                is_walk_right=false;
                is_walk_left=true;
                left_walk();
            }
            else if(!is_walk_left){
                is_walk_right=false;
                is_walk_left=true;
                left_walk();
            }
           
        }
        if(upPressed&&!isJump) {

            jump();
            player_is_stand=false;
        }
        if(spacePressed&&bow_is_atk==false&&is_shot==false&&player1.mp>=1){
            player1.mp-=1;
            bow_is_atk=true;
            arrowX=player1.x+20;
            arrowY=player1.y+bow_atk_height/4+10;
            realarrowY=arrowY-40;
            //attackcolldown=3;
            //setTimeout(function(){attackcolldown=0}, 3000);
            changetoAttack();

            player_is_stand=false;
        }
        //stand animation
        else if(player_is_stand==false&&upPressed==false&&downPressed==false&&rightPressed==false&&leftPressed==false&&isJump==false){
            
            player_is_stand=true;
            var player_stand_state_id=0;
            player_stand_gif=setInterval(function(){
                                            if(player1.faceRight){                                             
                                                    player_model.src=player_stand_state[player_stand_state_id];
                                            }else if(player1.faceLeft){
                                            
                                                player_model.src=player_stand_state[player_stand_state_id+2];
                                            }
                                            player_stand_state_id+=1;
                                            if(player_stand_state_id>1){
                                                player_stand_state_id=0;
                                            }
                                        }
                                        ,200);
        }
        
        
        // bow_state
        if(player1.faceRight&&!bow_is_atk){
           
            bow.src=bowState[0];
        }else if(player1.faceLeft&&!bow_is_atk){
            
            bow.src=bowState[1];
        }
        //player
        
        if(!bow_is_atk){
            ctx.drawImage(bow,0,0,bowWidth,bowHeight,player1.x+bowWidth/4,player1.y+bowHeight/2,bowWidth,bowHeight); //bow
            ctx.drawImage(player1.img,0,0,player1.width,player1.height,player1.x,player1.y,player1.width,player1.height);
        }else{
            ctx.drawImage(player1.img,0,0,player1.width,player1.height,player1.x,player1.y,player1.width,player1.height);
            ctx.drawImage(bow,0,0,bow_atk_width,bow_atk_height,player1.x,player1.y+bow_atk_height/4+10,bow_atk_width,bow_atk_height);
        }
        if(is_shot){
            ctx.drawImage(arrow,0,0,bow_atk_width,bow_atk_height,arrowX,arrowY,bow_atk_width,bow_atk_height);
        }
        if(player1.y>ground){
            player1.y=ground;
        }
        //skill
        if(skill1_isOK&&player1.mp>=3&&shiftleftPressed){
            skill1_isOK=false;
            skill1_active=true;
            player1.mp-=3;
            if(player1.hp<5){
                player1.hp+=1;
            }
            player1.speed*=2;
            setTimeout(function(){
                player1.speed/=2;skill1_active=false;},5000);
            setTimeout(function(){skill1_isOK=true;},10000);
        }
        //enemy got hit
        hitenemy();
        //player check
        gothit();
        //enemies jump
        bandit1_jump();
        bandit2_jump();
        //enemy1
        if(!bandit1.spawn){
            if(bandit1.x<player1.x){
                bandit1_state_id=0;
            }else{
                bandit1_state_id=4;
            }
            bandit1.spawn=true;
            func_bandit1_walk=setInterval(bandit1_walk,100)
            enemies.push(bandit1);
        }
        //enemy2
        if(!bandit2.spawn){
            if(bandit2.x<player1.x){
                bandit2_state_id=0;
            }else{
                bandit2_state_id=4;
            }
            bandit2.spawn=true;
            func_bandit2_walk=setInterval(bandit2_walk,100)
            enemies.push(bandit2);
        }
        //enemies
        for(var enemy_id=0;enemy_id<enemies.length;enemy_id++){
            
            if(enemies[enemy_id].hp>0){
                
            ctx.drawImage(enemies[enemy_id].img,0,0,enemies[enemy_id].width,enemies[enemy_id].height,
                enemies[enemy_id].x,enemies[enemy_id].y,enemies[enemy_id].width,enemies[enemy_id].width);
            }else if(enemies[enemy_id].hp<=0){
                if(enemies[enemy_id].canjump){
                    score+=200;
                    
                }else{
                    score+=100;
                    
                }
                
                enemies.splice(enemy_id,1);
                
                enemy_id-=1;
            }
        }
        //player life board
            //ctx.beginPath();
            //ctx.lineWidth = "6";
            //ctx.rect(0,0,200,100)
            //ctx.fillstyle="red"
            //ctx.fill();
        //life
        for(var life_count=1;life_count<=player1.hp;life_count++){
            ctx.drawImage(life,life_count*20,0)
        }
        for(var mp_count=2;mp_count<=player1.mp+1;mp_count++){
            ctx.drawImage(mp,mp_count*20,50)
        }
        
        if(player1.hp<=0||time_value==0){
            //end the game
            cancelAnimationFrame(draw);
            ctx.font = "50px Arial";
            ctx.fillStyle = "white";
            score+=player1.hp*1000
            bgm.pause();
            bgm.currentTime=0
            ctx.fillText("Final Score:"+String(score), canvas.width/2-200, canvas.height/2);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Press R to start the new game",canvas.width/2-200, canvas.height/2+50)
            func_re=setInterval(restart,1)
        }else{
            requestAnimationFrame(draw);
        }
        
    }
//time update
time_value=60;
time=setInterval(time_countup,1000)
function time_countup(){
    time_value-=1;
    player1.mp+=1;
    if(player1.mp>5){
        player1.mp=5;
    }
    if(time_value<10&&time_value>0){
        time_str="0"+time_value;
    }else if(time_value<100){
        time_str=time_value;
    }
    else if(time_value<=0){
        time_str=="00";
        time_value=0;
    }
}
//walk
var func_right_walk;
var func_left_walk;
function right_walk(){
    clearInterval(player_stand_gif);
    clearInterval(func_left_walk);
    player1.faceRight=true;
    player1.faceLeft=false;
    var walk_right_id=0;
    func_right_walk=setInterval(
        function(){
            walk_right_id+=1;
            if(walk_right_id>=4){
                walk_right_id=0;
            }
            
            player_model.src=player_walk_state[walk_right_id];
            if(!rightPressed){
                player_model.src=player_stand_state[0];
                is_walk_right=false;
                clearInterval(func_right_walk);
            }
        }
        ,100)
}
function left_walk(){
    clearInterval(player_stand_gif);
    clearInterval(func_right_walk);
    player1.faceRight=false;
    player1.faceLeft=true;
    var walk_left_id=4;
    func_left_walk=setInterval(
        function(){
            walk_left_id+=1;
            if(walk_left_id>=8){
                walk_left_id=4;
            }
            
            player_model.src=player_walk_state[walk_left_id];
            if(!leftPressed){
                
                player_model.src=player_stand_state[2];
                is_walk_left=false;
                clearInterval(func_left_walk);
            }
        }
        ,100)
}
//jump
var gravity=0.5;

var f;
 jumpSpeed=player1.jumpSpeed;
function jump(){
    
    isJump=true;
    player1.y-=jumpSpeed-gravity;

    j=setInterval(function(){fall()},20);
    
}
function fall(){
    if(player1.y>=ground){
        clearInterval(j);
        jumpSpeed=player1.jumpSpeed;
        playerY=ground;
        isJump=false;
    }else{
        player1.y-=jumpSpeed;
        jumpSpeed-=gravity;
    }
    
}


//attack
var func_atk;
var func_atk_end;
function changetoAttack(){
    var bowatkState_id=0;
    if(player1.faceRight){
        bowatkState_id=0;
    }
    bow.src=bowatkState[bowatkState_id];
    func_atk=setInterval(function(){
                            if(bowatkState_id==4){
                                max_force=3;
                                arrow_max_distance=300;
                            }else{
                                max_force=1;
                                arrow_max_distance=100;
                            }
                            if(player1.faceRight&&bowatkState_id<=4){
                                arrowX=player1.x+20;
                                arrowY=player1.y+bow_atk_height/4+10;
                            }else if(player1.faceLeft&&bowatkState_id<=4){
                                arrowX=player1.x;
                                arrowY=player1.y+bow_atk_height/4+10;
                            }
                            realarrowY=arrowY-40;
                            if(spacePressed){

                                if(bowatkState_id<4){
                                    bowatkState_id+=1;
                                }
                                if(player1.faceRight){
                                    bow.src=bowatkState[bowatkState_id];
                                }else if(player1.faceLeft){
                                    
                                    bow.src=bowatkState[bowatkState_id+5];
                                }
                            }
                            else if(!spacePressed){
                                
                                if(max_force==3){
                                    attack_music.play();//heavy attack music
                                }else{
                                    document.getElementById("slightattack").play();//light attack music
                                }
        
                                var arrow_distance=0;
                                var arrow_axis;
                                if(player1.faceRight){
                                    arrow_axis=1;
                                }else if(player1.faceLeft){
                                    arrow_axis=-1;
                                }
                                bow.src="Light bows/LightBow_1.png";
                                is_shot=true;
                                bow_is_atk=false;
                                clearInterval(func_atk);
                                func_atk_end=setInterval(function(){
                                                            
                                                            arrow_distance+=arrowSpeed;
                                                            arrowX+=arrowSpeed*arrow_axis;
                                                            if(arrow_distance>=arrow_max_distance){
                                                               arrow_distance=0;
                                                                is_shot=false;
                                                                clearInterval(func_atk_end);
                                                            }
                                                        }
                                ,20)
                                
                                
                            }
                            
                            
                        }
                        ,100);
}

//player1 Invincible time

function Invincible(){

    setTimeout(function(){player1.ishit=false;},2000);
}
//bandit1 animation
var bandit1_state_id=0;
function bandit1_walk(){
    if(bandit1_state_id>=4){
        bandit1_state_id=0;
    }
    if(bandit1.x>player1.x){
        bandit1.faceLeft=true;
        bandit1.faceRight=false;
        bandit1.x-=bandit1.speed;
        bandit1.img.src=bandit_state[bandit1_state_id+4];
        
    }else{
        bandit1.faceLeft=false;
        bandit1.faceRight=true;
        bandit1.x+=bandit1.speed;
        bandit1.img.src=bandit_state[bandit1_state_id];
    }
    bandit1_state_id+=1;
    if(bandit1.hp<=0){
        clearInterval(func_bandit1_walk);
        setTimeout(function(){
            if(Math.floor(Math.random()*2)){
                bandit1.canjump=true;
            }else{
                bandit1.canjump=false;
            }
                    bandit1.spawn=false;
                    bandit1.y=ground;
                    bandit1.x=700;
                    bandit1.hp=100;
        },1000)
    }
}
var bandit2_state_id=0;
function bandit2_walk(){
    if(bandit2_state_id>=4){
        bandit2_state_id=0;
    }
    if(bandit2.x>player1.x){
        bandit2.faceLeft=true;
        bandit2.faceRight=false;
        bandit2.x-=bandit2.speed;
        bandit2.img.src=bandit_state[bandit2_state_id+4];
        
    }else{
        bandit2.faceLeft=false;
        bandit2.faceRight=true;
        bandit2.x+=bandit2.speed;
        bandit2.img.src=bandit_state[bandit2_state_id];
    }
    bandit2_state_id+=1;
    if(bandit2.hp<=0){
        clearInterval(func_bandit2_walk);
        setTimeout(function(){
                        if(Math.floor(Math.random()*2)){
                            bandit2.canjump=true;
                        }else{
                            bandit2.canjump=false;
                        }
                        bandit2.spawn=false;
                        bandit2.hp=100;
                        bandit2.x=0;}
            ,1000)
    }
}
//bandit1 jump
var func_bandit1_fall;
var bandit1_jumpSpeed=bandit1.jumpSpeed;
function bandit1_jump(){
    if(bandit1.canjump&&!bandit1.isJump&&bandit1.hp>0){
        bandit1.isJump=true;
        bandit1.y-=bandit1.jumpSpeed-gravity;
        func_bandit1_fall=setInterval(bandit1_fall,20);
    }
}
function bandit1_fall(){
    if(bandit1.y>=ground){
        clearInterval(func_bandit1_fall);
        bandit1_jumpSpeed=bandit1.jumpSpeed;
        bandit1.y=ground;
        bandit1.isJump=false;
    }else{
        bandit1.y-=bandit1_jumpSpeed;
        bandit1_jumpSpeed-=gravity;
    }
}
//bandit2 jump
var func_bandit2_fall;
var bandit2_jumpSpeed=bandit2.jumpSpeed;
function bandit2_jump(){
    if(bandit2.canjump&&!bandit2.isJump&&bandit2.hp>0){
        bandit2.isJump=true;
        bandit2.y-=bandit2.jumpSpeed-gravity;
        func_bandit2_fall=setInterval(bandit2_fall,20);
    }
}
function bandit2_fall(){
    if(bandit2.y>=ground){
        clearInterval(func_bandit2_fall);
        bandit2_jumpSpeed=bandit2.jumpSpeed;
        bandit2.y=ground;
        bandit2.isJump=false;
    }else{
        bandit2.y-=bandit2_jumpSpeed;
        bandit2_jumpSpeed-=gravity;
    }
}
//hit enemy
function hitenemy(){
    if(is_shot){
        for(var enemy_id=0;enemy_id<enemies.length;enemy_id++){
            if((realarrowY>=enemies[enemy_id].y-enemies[enemy_id].height/2&&realarrowY<=enemies[enemy_id].y)||
            (realarrowY+10>=enemies[enemy_id].y-enemies[enemy_id].height/2&&realarrowY+10<=enemies[enemy_id].y)){
                if((enemies[enemy_id].x<=arrowX+arrowWidth&&enemies[enemy_id].x+enemies[enemy_id].width>=arrowX+arrowWidth)
                ||(enemies[enemy_id].x<=arrowX&&enemies[enemy_id].x+enemies[enemy_id].width>=arrowX)){
                    enemies[enemy_id].hp-=player1.atk*max_force;
                    
                    is_shot=false;
                    clearInterval(func_atk_end);
                    
                    break;
                }
            }
        }
    }
}
//got hit
function gothit(){
    if(!player1.ishit){
        for(var enemy_id=0;enemy_id<enemies.length;enemy_id++){
            
            if(!player1.ishit&&(player1.y>=enemies[enemy_id].y-enemies[enemy_id].height/2&&player1.y<=enemies[enemy_id].y)||
            (player1.y-player1.height/2>=enemies[enemy_id].y-enemies[enemy_id].height/2&&player1.y-player1.height/2<=enemies[enemy_id].y) ){
                if(!player1.ishit&&(enemies[enemy_id].x<=player1.x+player1.width*2/3&&enemies[enemy_id].x+enemies[enemy_id].width>=player1.x+player1.width*2/3)
                ||(enemies[enemy_id].x<=player1.x+player1.width/3&&enemies[enemy_id].x+enemies[enemy_id].width>=player1.x+player1.width/3)){
                    //music
                    player1.hp-=enemies[enemy_id].atk;
                    player1.ishit=true;
                    Invincible();
                    break;
                }
            }
        }
    }
}
draw();
function restart(){
    
    if(re==true){
        init();
        clearInterval(func_re)
    }
}
}
//run file
$(document).ready(function(){
    $("button,#xx").mouseover(function(){
        document.getElementById("buttonsound").play();
    });
    $("#start").click(function(){
        document.getElementById("login").style.display = "none";
        document.getElementById("gamename").style.display = "none";
        document.getElementById("myCanvas").style.display = "";
        init();
    });
    $("#option").click(function(){
        document.getElementById("op").style.display = "";
        document.getElementById("xx").style.display = "";
      });
    $("#howtoplay").click(function(){
        document.getElementById("op").style.display = "";
        document.getElementById("xx").style.display = "";
      });
    $("#xx").click(function(){
        document.getElementById("op").style.display = "none";
        document.getElementById("xx").style.display = "none";
      });
    $("#leave").click(function(){
      if(confirm("確定要離開遊戲 ?")){
          window.close();
      }
    });
});