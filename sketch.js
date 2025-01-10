let player;
let baseSpeed = 10;
let playerSpeed = baseSpeed;
let carrying = false;
let carried = {id: null, type: null,
    reset() {
        this.id = null;
        this.type = null;
    }
};

let gamePaused = false;
let restarted = false;
let pickupPrompt = false;
let prompt;

let soundToggle = true;
let musicToggle = true;

let Karried = {
    id: null,
    type: null,

    reset() {
        console.log("carried reset");
        this.id = null;
        this.type = null;
    },

    set(id, type) {
        console.log("carried set");
        this.id = id;
        this.type = type;
    },

    get() {
        return {id: this.id, type: this.type};
    }

}

let pickupRange = 100;

let trashMail;
let trashPhotos;
let trashVideos;

let emails = [];
let emailCount = 0;
let photos = [];
let photoCount = 0;
let videos = [];
let videoCount = 0;

let score = 0;

let table;
let clients = [];
let chairs = [];

let canvasWidth = 1180;
let canvasHeight = 850;
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2;

//start ................................................
let timermillieseconde = 0;
let timerseconde=0;
let timerminute=0;
let totalscore = 0;

let colorfont = "#464646";

let ambianceSound;
let musicSound;
let finSound;
let grabSound;
let pauseSound;
let poubelle1Sound;
let poubelle2Sound;

let downAnimation;
let upAnimation;
let rightAnimation;
let leftAnimation;
let walkdownAnimation;
let walkleftAnimation;
let walkrightAnimation;
let walkupAnimation;

let walkdownAnimationR;
let walkleftAnimationR;
let walkrightAnimationR;
let walkupAnimationR;
let assisgaucheAnimationR;
let assisdroiteAnimationR;

let walkdownAnimationB;
let walkleftAnimationB;
let walkrightAnimationB;
let walkupAnimationB;
let assisgaucheAnimationB;
let assisdroiteAnimationB;

let walkdownAnimationV;
let walkleftAnimationV;
let walkrightAnimationV;
let walkupAnimationV;
let assisgaucheAnimationV;
let assisdroiteAnimationV;

function preload(){
    ambianceSound = loadSound("asset/ambiance.wav");
    musicSound = loadSound("asset/music.mp3");
    musicSound.setVolume(0.5);
    finSound = loadSound("asset/fin.wav");
    grabSound = loadSound("asset/grab.wav");
    pauseSound = loadSound("asset/pause.wav");
    pauseSound.setVolume(0.5);
    poubelle1Sound = loadSound("asset/poubelle1.wav");
    poubelle2Sound = loadSound("asset/poubelle2.wav");
    poubelle2Sound.setVolume(0.3);

    downAnimation = loadAni('asset/filledown.png');
    upAnimation = loadAnimation('asset/filleup.png');
    rightAnimation = loadAnimation('asset/filleright.png');
    leftAnimation = loadAnimation('asset/filleleft.png');
    walkdownAnimation = loadAnimation('asset/fille.png', { width: 64, height: 64, frames: [0,1,2] });
    walkleftAnimation = loadAnimation('asset/fille.png', { width: 64, height: 64, frames: [6,7,8] });
    walkrightAnimation = loadAnimation('asset/fille.png', { width: 64, height: 64, frames: [3,4,5] });
    walkupAnimation = loadAnimation('asset/fille.png', { width: 64, height: 64, frames: [9,10,11] });



    walkupAnimationR = loadAnimation('asset/fillerouge.png', { width: 64, height: 64, frames: [9,10,11] });
    assisgaucheAnimationR = loadAnimation('asset/fillerougegauche.png');
    assisdroiteAnimationR = loadAnimation('asset/fillerougedroite.png');


   
    walkupAnimationB = loadAnimation('asset/fillebleu.png', { width: 64, height: 64, frames: [9,10,11] });
    assisgaucheAnimationB = loadAnimation('asset/fillebleugauche.png');
    assisdroiteAnimationB = loadAnimation('asset/fillebleudroite.png');

    
    walkupAnimationV = loadAnimation('asset/fillevert.png', { width: 64, height: 64, frames: [9,10,11] });
    assisgaucheAnimationV = loadAnimation('asset/fillevertgauche.png');
    assisdroiteAnimationV = loadAnimation('asset/fillevertdroite.png');
}

function createBorders() {
    let borderTop = new Sprite(centerX, 110, canvasWidth, 10); // Create the Top border
    
    borderTop.color = '#332518'; // Color of the border
    borderTop.collider = 'static'; // Make the border static 
    borderTop.border= "none";
    borderTop.opacity = 1;
    borderTop.stroke = false;
    borderTop.layer = -9;

    let borderzone = new Sprite(centerX, 0, canvasWidth, 0); // Create the zone border
    borderzone.shape = 'box'; // Specify shape as rectangle
    borderzone.color = 'white'; // Color of the border
    borderzone.collider = 'static'; // Make the border static 
    borderzone.opacity = 0;
    borderzone.layer = -9;

    backscore = new Sprite(centerX,-55,canvasWidth,160);
    backscore.image = "asset/plancher4.png";
    backscore.collider = "none";
    backscore.layer = -10;
    backscore.scale=0.9;



    let borderzone2 = new Sprite(centerX, 0, canvasWidth, 10); // Create the zone border
    borderzone2.color = colorfont; // Color of the border
    borderzone2.collider = 'static'; // Make the border static 
    borderzone2.border= "none";
    borderzone2.opacity = 1;
    borderzone2.nostroke = true;
    borderzone2.layer = -10;


    let borderBottom = new Sprite(centerX, canvasHeight, canvasWidth, 10); // Create the Bottom border
    borderBottom.shape = 'box'; // Specify shape as rectangle
    borderBottom.color = colorfont; // Color of the border
    borderBottom.collider = 'static'; // Make the border static
    borderBottom.border= "none";
    borderBottom.opacity = 1;

    let borderLeft = new Sprite(0, centerY, 10, canvasHeight); // Create the Left border
    borderLeft.shape = 'box'; // Specify shape as rectangle
    borderLeft.color = colorfont; // Color of the border
    borderLeft.collider = 'static'; // Make the border static
    borderLeft.border= "none";
    borderLeft.opacity = 1;

    let borderRight = new Sprite(canvasWidth, centerY, 10, canvasHeight); // Create the Right border
    borderRight.shape = 'box'; // Specify shape as rectangle
    borderRight.color = colorfont; // Color of the border
    borderRight.collider = 'static'; // Make the border static
    borderRight.border= "none";
    borderRight.opacity = 1;

    let block = new Sprite(1085, 317, 200, 470); // Create the Right border
    block.shape = 'box'; // Specify shape as rectangle
    block.color = colorfont; // Color of the border
    block.collider = 'static'; // Make the border static
    block.border= "none";
    block.opacity = 0;

    let block2 = new Sprite(1037, 120, 84, 40); // Create the Right border
    block2.shape = 'box'; // Specify shape as rectangle
    block2.color = '#613d24'; // Color of the border
    block2.collider = 'static'; // Make the border static
    block2.border= "none";
    block2.opacity = 1;
    block2.stroke = '#613d24';
    block2.layer = -8;

    let block3 = new Sprite(1028, 112, 80, 20); // Create the Right border
    block3.shape = 'box'; // Specify shape as rectangle
    block3.color = '#060301'; // Color of the border
    block3.collider = 'static'; // Make the border static
    block3.border= "none";
    block3.opacity = 1;
    block3.stroke = '#060301';
    block3.layer = -9;
}

//start...............................................................
function createStartButton() {
    
    
    
    /*new Canvas(canvasWidth, canvasHeight); 
    background(220);
    let backimg = new Sprite(canvasWidth / 2, canvasHeight / 2);
    backimg.image = "asset/depart.png";
    backimg.collider = "none";
    backimg.layer = 1;*/
    
    
    
    let button = document.createElement("button");
    button.innerHTML = "Start";
    button.id = "startButton";
    button.style.position = "absolute";
    button.style.bottom = "10rem";
    button.style.left = "50%";
    button.style.fontSize = "8rem";
    button.style.fontFamily = "'Jersey 15', serif";
    button.style.borderRadius = "10px";
    button.style.transform = "translateX(-50%)";
    button.style.zIndex = "1";
    document.body.appendChild(button);



    let buttonpara = document.createElement("button");
    buttonpara.innerHTML = "Settings";
    buttonpara.id = "startButtonpara";
    buttonpara.style.position = "absolute";
    buttonpara.style.bottom = "10rem";
    buttonpara.style.right = "-10%";
    buttonpara.style.fontSize = "6rem";
    buttonpara.style.fontFamily = "'Jersey 15', serif";
    buttonpara.style.borderRadius = "10px";
    buttonpara.style.transform = "translateX(-50%)";
    buttonpara.style.zIndex = "1";
    document.body.appendChild(buttonpara);


let backimg = document.createElement("img");
backimg.src = "asset/depart.png";
backimg.style.position = "absolute";
backimg.style.top = "50%";
backimg.style.left = "50%";
backimg.style.width = "100%";
backimg.style.objectFit = "cover";
backimg.style.transform = "translate(-50%, -50%)";
backimg.style.zIndex = "0";
backimg.style.filter=" brightness(0.8)";
document.body.appendChild(backimg);
    

    button.addEventListener("click", () => {
        button.remove(); // Remove the button
        buttonpara.remove(); // Remove the button
        backimg.remove();
        //backimg.remove();
        runstart(); // Start the game
        loop(); // Start the update loop

    });


    buttonpara.addEventListener("click", () => {
        button.remove(); // Remove the button
        buttonpara.remove(); // Remove the button
        
        //backimg.remove();
        para(); 
    });
}

function para() {

    let calque = document.createElement("div");
    calque.style.position = "absolute";
    calque.style.top = "50%";
    calque.style.left = "50%";
    calque.style.width = "1200px";
    calque.style.height = "900px";
    calque.style.backgroundColor = "rgba(0, 0, 0, 0.79)";
    calque.style.backdropFilter= "blur(5px)";
    calque.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(calque);

    let touchecolor="rgba(0, 0, 0, 0.77)";
    let textcolor="white";


    let titre1 = document.createElement("div");
    titre1.innerHTML = "Control";
    titre1.style.position = "absolute";
    titre1.style.top = "20%";
    titre1.style.left = "15%";
    titre1.style.fontSize = "80px";
    titre1.style.color = "white";
    titre1.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(titre1);


    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.position = "absolute";
    container.style.top = "35%";
    container.style.left = "22%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.backgroundColor = touchecolor;
    container.style.padding = "20px 40px";
    container.style.width = "50px";
    container.style.borderRadius = "10px";

    let text1 = document.createElement("div");
    text1.innerHTML = "Z";
    text1.style.fontSize = "40px";
    text1.style.marginBottom = "10px";
    text1.style.color=textcolor;

    let text2 = document.createElement("div");
    text2.innerHTML = "up";
    text2.style.fontSize = "20px";
    text2.style.color=textcolor;

    container.appendChild(text1);
    container.appendChild(text2);
    document.body.appendChild(container);

    let container2 = document.createElement("div");
    container2.style.display = "flex";
    container2.style.flexDirection = "column";
    container2.style.alignItems = "center";
    container2.style.justifyContent = "center";
    container2.style.position = "absolute";
    container2.style.top = "50%";
    container2.style.left = "10%";
    container2.style.width = "50px";
    container2.style.transform = "translate(-50%, -50%)";
    container2.style.backgroundColor = touchecolor;
    container2.style.padding = "20px 40px";
    container2.style.borderRadius = "10px";

    let text3 = document.createElement("div");
    text3.innerHTML = "Q";
    text3.style.fontSize = "40px";
    text3.style.marginBottom = "10px";
    text3.style.color=textcolor;

    let text4 = document.createElement("div");
    text4.innerHTML = "left";
    text4.style.fontSize = "20px";
    text4.style.color=textcolor;

    container2.appendChild(text3);
    container2.appendChild(text4);
    document.body.appendChild(container2);

    let container3 = document.createElement("div");
    container3.style.display = "flex";
    container3.style.flexDirection = "column";
    container3.style.alignItems = "center";
    container3.style.justifyContent = "center";
    container3.style.position = "absolute";
    container3.style.top = "50%";
    container3.style.left = "22%";
    container3.style.width = "50px";
    container3.style.transform = "translate(-50%, -50%)";
    container3.style.backgroundColor = touchecolor;
    container3.style.padding = "20px 40px";
    container3.style.borderRadius = "10px";

    let text5 = document.createElement("div");
    text5.innerHTML = "S";
    text5.style.fontSize = "40px";
    text5.style.marginBottom = "10px";
    text5.style.color=textcolor;

    let text6 = document.createElement("div");
    text6.innerHTML = "down";
    text6.style.fontSize = "20px";
    text6.style.color=textcolor;

    container3.appendChild(text5);
    container3.appendChild(text6);
    document.body.appendChild(container3);

    let container4 = document.createElement("div");
    container4.style.display = "flex";
    container4.style.flexDirection = "column";
    container4.style.alignItems = "center";
    container4.style.justifyContent = "center";
    container4.style.position = "absolute";
    container4.style.top = "50%";
    container4.style.left = "34%";
    container4.style.width = "50px";
    container4.style.transform = "translate(-50%, -50%)";
    container4.style.backgroundColor = touchecolor;
    container4.style.padding = "20px 40px";
    container4.style.borderRadius = "10px";

    let text7 = document.createElement("div");
    text7.innerHTML = "D";
    text7.style.fontSize = "40px";
    text7.style.marginBottom = "10px";
    text7.style.color=textcolor;

    let text8 = document.createElement("div");
    text8.innerHTML = "right";
    text8.style.fontSize = "20px";
    text8.style.color=textcolor;

    container4.appendChild(text7);
    container4.appendChild(text8);
    document.body.appendChild(container4);




    let container5 = document.createElement("div");
    container5.style.display = "flex";
    container5.style.flexDirection = "column";
    container5.style.alignItems = "center";
    container5.style.justifyContent = "center";
    container5.style.position = "absolute";
    container5.style.top = "50%";
    container5.style.left = "50%";
    container5.style.width = "50px";
    container5.style.transform = "translate(-50%, -50%)";
    container5.style.backgroundColor = touchecolor;
    container5.style.padding = "20px 40px";
    container5.style.borderRadius = "10px";

    let text9 = document.createElement("div");
    text9.innerHTML = "E";
    text9.style.fontSize = "40px";
    text9.style.marginBottom = "10px";
    text9.style.color=textcolor;

    let text10 = document.createElement("div");
    text10.innerHTML = "Grab";
    text10.style.fontSize = "20px";
    text10.style.color=textcolor;

    container5.appendChild(text9);
    container5.appendChild(text10);
    document.body.appendChild(container5);


    let titre2 = document.createElement("div");
    titre2.innerHTML = "Audio";
    titre2.style.position = "absolute";
    titre2.style.top = "20%";
    titre2.style.left = "70%";
    titre2.style.fontSize = "80px";
    titre2.style.color = "white";
    titre2.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(titre2);


    let container6 = document.createElement("div");
    container6.style.display = "flex";
    container6.style.gap = "10px";
    container6.style.flexDirection = "row";
    container6.style.alignItems = "center";
    container6.style.justifyContent = "center";
    container6.style.position = "absolute";
    container6.style.top = "35%";
    container6.style.left = "80%";
    container6.style.width = "80px";
    container6.style.transform = "translate(-50%, -50%)";
    container6.style.backgroundColor = touchecolor;
    container6.style.padding = "20px 40px";
    container6.style.borderRadius = "10px";
    container6.style.cursor = "pointer"; // Make the container clickable

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.width = "70px";
    checkbox.style.marginRight = "10px";
    checkbox.checked = true;

    let label = document.createElement("label");
    label.innerHTML = "music";
    label.style.fontSize = "40px";
    label.style.color = textcolor;

    container6.appendChild(checkbox);
    container6.appendChild(label);
    document.body.appendChild(container6);

    // Add click event to the container to toggle the checkbox
    container6.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
        musicToggle = checkbox.checked;
    });


    let container7 = document.createElement("div");
    container7.style.display = "flex";
    container7.style.flexDirection = "row";
    container7.style.alignItems = "center";
    container7.style.justifyContent = "center";
    container7.style.position = "absolute";
    container7.style.top = "50%";
    container7.style.left = "80%";
    container7.style.width = "80px";
    container7.style.transform = "translate(-50%, -50%)";
    container7.style.backgroundColor = touchecolor;
    container7.style.padding = "20px 40px";
    container7.style.borderRadius = "10px";
    container7.style.cursor = "pointer"; // Make the container clickable

    let checkbox1 = document.createElement("input");
    checkbox1.type = "checkbox";
    checkbox1.style.width = "70px";
    checkbox1.style.marginRight = "10px";
    checkbox1.checked = true;

    let label1 = document.createElement("label");
    label1.innerHTML = "Sound";
    label1.style.fontSize = "40px";
    label1.style.color = textcolor;

    container7.appendChild(checkbox1);
    container7.appendChild(label1);
    document.body.appendChild(container7);

    // Add click event to the container to toggle the checkbox
    container7.addEventListener("click", () => {
        checkbox1.checked = !checkbox1.checked;
        soundToggle = checkbox1.checked;
    });




    let buttonparaquit = document.createElement("button");
    buttonparaquit.innerHTML = "Settings";
    buttonparaquit.id = "startButtonparaquit";
    buttonparaquit.style.position = "absolute";
    buttonparaquit.style.bottom = "10rem";
    buttonparaquit.style.right = "-10%";
    buttonparaquit.style.fontSize = "6rem";
    buttonparaquit.style.fontFamily = "'Jersey 15', serif";
    buttonparaquit.style.borderRadius = "10px";
    buttonparaquit.style.transform = "translateX(-50%)";
    document.body.appendChild(buttonparaquit);

    
    buttonparaquit.addEventListener("click", () => {
        container.remove();
        container2.remove();
        container3.remove();
        container4.remove();
        container5.remove();
        container6.remove();
        container7.remove();
        buttonparaquit.remove();
        calque.remove();
        titre1.remove();
        titre2.remove();
        createStartButton(); 
    });
}


function createTables() {
    const tablePositions = [
        { x: 200, y: 280, layer: 7 },
        { x: 500, y: 280, layer: 7 },
        { x: 800, y: 280, layer: 7 },
        { x: 200, y: 580, layer: 9 },
        { x: 500, y: 580, layer: 9 },
        { x: 800, y: 580, layer: 9 }
    ];

    tablePositions.forEach(pos => {
        table = new Sprite(pos.x, pos.y, 120, 90);
        table.shape = 'box';
        table.color = 'brown';
        table.collider = 'static';
        table.opacity = 0;

        let chairLeft = { x: pos.x - 80, y: pos.y, occupied: false, side: 'left' };
        let chairRight = { x: pos.x + 80, y: pos.y, occupied: false, side: 'right' };
        chairs.push(chairLeft, chairRight);

        backimage = new Sprite(pos.x, pos.y + 20);
        backimage.image = "asset/table2.png";
        backimage.collider = "none";
        backimage.scale = 2;
        backimage.layer = pos.layer;
    });
}

function createTrashcans() {
    const trashData = [
        { x: 40, y: 110,  image: 'asset/poubelleVfini.png' },
        { x: 470, y: 110, image: 'asset/poubelleBfini.png' },
        { x: 960, y: 110, image: 'asset/poubelleRfini.png' }
    ];

    trashData.forEach((data, index) => {
        let trash = new Sprite(data.x, data.y, 50, 50);
        trash.shape = 'box';
        trash.color = color(255, 0, 0, 0);
        trash.collider = 'static';
        trash.layer = trash.y;
        trash.text = data.text;
        trash.stroke = color(255, 0, 0, 0);

        let backimage = new Sprite(data.x , data.y);
        backimage.image = data.image;
        backimage.collider = 'none';
        backimage.layer = -9;
        backimage.scale = 3;

        if (index === 0) trashMail = trash;
        if (index === 1) trashPhotos = trash;
        if (index === 2) trashVideos = trash;
    });
}

function createEmail(posX, posY) {
    testEmail = new Sprite(posX, posY, 50, 50); // Create the testEmail sprite
    testEmail.shape = 'circle';
    testEmail.color = 'blue';
    testEmail.collider = 'none';
    testEmail.layer = testEmail.y;
    testEmail.collected = false;
    testEmail.id = emailCount;
    testEmail.image = "asset/JETONpoubellev.png";
    testEmail.scale = 3;
    emailCount++;

    emails.push(testEmail);
    return testEmail; // Return the created email
}

function createPhoto(posX, posY){
    testPhoto = new Sprite(posX, posY, 50, 50); // Create the testPhoto sprite
    testPhoto.shape = 'circle';
    testPhoto.color = 'blue';
    testPhoto.collider = 'none';
    testPhoto.layer = testPhoto.y;
    testPhoto.collected = false;
    testPhoto.id = photoCount;
    testPhoto.image = "asset/JETONpoubelleB.png";
    testPhoto.scale = 3;
    photoCount++;

    photos.push(testPhoto);
    return testPhoto; // Return the created photo
}

function createVideo(posX, posY){

    testVideo = new Sprite(posX, posY, 50, 50); // Create the testVideo sprite
    testVideo.shape = 'circle';
    testVideo.color = 'blue';
    testVideo.collider = 'none';
    testVideo.layer = testVideo.y;
    testVideo.collected = false;
    testVideo.id = videoCount;
    testVideo.image = "asset/JETONpoubelleR.png";
    testVideo.scale = 3;
    videoCount++;

    videos.push(testVideo);
    return testVideo; // Return the created video
}

function runstart() {
    new Canvas(canvasWidth, canvasHeight); // Create with specified width and height
    backimage = new Sprite(canvasWidth/2,canvasHeight/2+43);
    backimage.image = "asset/fondmap3.png";
    backimage.collider = "none";
    backimage.layer = -10;
    backimage.scale=2.5;
    
    if (soundToggle){
        ambianceSound.play();        
    }

    if (musicToggle){
        musicSound.play();
    }

    //start.............. remplacer setup par runstart
    timermillieseconde=0;
    timerseconde=30;
    timerminute=1;

    text = new Sprite(900, 45, 0, 0);
    text.textSize = 80;
    text.text = "Score: " + score;
    text.right = 10;
    text.collider = "none";
    text.textFill = "white";
    text.layer=1000000;
    
    prompt = new Sprite(centerX, canvasHeight-50, 0, 0);
    prompt.textSize = 24;
    prompt.text = "Press 'E' to interact";
    prompt.textColor = "white";
    prompt.collider = "none";
    prompt.layer = 1000000;

    //start..........................
    time = new Sprite(160, 45, 0, 0);
    time.textSize = 40;
    time.text = "Time : " +timerminute+ "min" + timermillieseconde+"s";
    time.collider = "none";
    time.textColor = "white";
    time.layer=1000000;
    

    player = new Sprite(centerX, centerY, 10, 5); // Create the player sprite
    player.vel.x = 0; // Initial x velocity
    player.vel.y = 0; // Initial y velocity
    player.friction = 10;
    player.rotationLock = true; // Lock rotation
    player.scale = 3;
    player.animation = 'down';
    player.layer = 10;
    player.addAnimation('down', downAnimation, { width: 64, height: 64 });
    player.addAnimation('up', upAnimation, { width: 64, height: 64 });
    player.addAnimation('right', rightAnimation, { width: 64, height: 64 });
    player.addAnimation('left', leftAnimation, { width: 64, height: 64 });
    player.addAnimation('walkdown', walkdownAnimation, { width: 64, height: 64});
    player.addAnimation('walkleft', walkleftAnimation, { width: 64, height: 64});
    player.addAnimation('walkright', walkrightAnimation, { width: 64, height: 64});
    player.addAnimation('walkup', walkupAnimation, { width: 64, height: 64});

    createBorders(); // Create the borders
    createTables(); // Create the tables
    createTrashcans(); // Create the trashcans

    spawnClient(); // Spawn a client
    if (!restarted){
        clientSpawningRoutine(); // Start the client spawning routine
    }
}



let clicked = false;
let pressed = false;
function update() {

    Canvas(canvasWidth, canvasHeight);
    background(0,0,0,0);

   
    
    

    //start ...............................................
    if (timerminute == 0 && timerseconde == 0) {
        noLoop(); // Stop the update loop
        end();
        return; // Exit the function
    }

    if (timerminute == 0 && timerseconde == 10 && soundToggle) {
        finSound.play();
    }

    if (timerseconde == 0 ) {
        timermillieseconde = 0;
        timerseconde = 60;
        timerminute--;
    } else {
        if (timermillieseconde == 60) {
            timermillieseconde = 0;
            timerseconde--;
        } else {
            timermillieseconde++;
            time.text = "Time : " + timerminute + "min " + timerseconde + "s";
        }
    }

    if (player.y < 273) {
        player.layer = 6;
        
    } else {
        if (player.y < 550) {
        player.layer = 8;}
        else {
            player.layer = 10;
        }
    }


    if (kb.pressing('w')) { // 'w' key
        player.direction = 270;
        player.speed = playerSpeed;
        player.animation = 'walkup';
    } else if (kb.pressing('s')) { // 's' key
        player.direction = 90;
        player.speed = playerSpeed;
        player.animation = 'walkdown';
    } else if (kb.pressing('a')) { // 'a' key
        player.direction = 180;
        player.speed = playerSpeed;
        player.animation = 'walkleft';
    } else if (kb.pressing('d')) { // 'd' key
        player.direction = 0;
        player.speed = playerSpeed;
        player.animation = 'walkright';
    } else {
        player.speed = 0;
        if (player.speed == 0) {
            if (player.direction === 270) {
                player.animation = 'up';
            } else if (player.direction === 90) {
                player.animation = 'down';
            } else if (player.direction === 180) {
                player.animation = 'left';
            } else if (player.direction === 0) {
                player.animation = 'right';
            }
        }
    
    }

    // Handle diagonal movement
    if (kb.pressing('w') && kb.pressing('a')) { // 'w' and 'a' keys
        player.direction = 225;
        player.speed = playerSpeed;
    }
    if (kb.pressing('w') && kb.pressing('d')) { // 'w' and 'd' keys
        player.direction = 315;
        player.speed = playerSpeed;
    }
    if (kb.pressing('s') && kb.pressing('a')) { // 's' and 'a' keys
        player.direction = 135;
        player.speed = playerSpeed;
    }
    if (kb.pressing('s') && kb.pressing('d')) { // 's' and 'd' keys
        player.direction = 45;
        player.speed = playerSpeed;
    }

    if (!kb.pressing('w') && !kb.pressing('s') && !kb.pressing('a') && !kb.pressing('d')) {
        player.speed = 0;
    }

    // Calculate distance between player and each trashcan
    let distanceToTrashMail = dist(player.x, player.y, trashMail.x, trashMail.y);
    let distanceToTrashPhotos = dist(player.x, player.y, trashPhotos.x, trashPhotos.y);
    let distanceToTrashVideos = dist(player.x, player.y, trashVideos.x, trashVideos.y);
    
    if (!carrying) {
        player.color = 'white';
        pickupPrompt = false;
        

        // Calculate distance between player and each file
        for (let email of emails) {
            let distanceToEmail = dist(player.x, player.y, email.x, email.y);
            if (distanceToEmail < pickupRange) {
                if (!carrying) {
                    player.color = 'yellow';
                    pickupPrompt = true;
                    
                    if (kb.pressing('e')) {
                        if (soundToggle){
                            grabSound.play();
                        }
                        carrying = true;
                        carried.type = "email";
                        carried.id = email.id;
                        playerSpeed = baseSpeed * 0.8;
                        email.scale = 2;
                        email.layer = player.layer + 1;
                        email.color = 'green'; // Change color to green when collected
                        email.collected = true;
                    }
                }
            }
        }

        for (let photo of photos) {
            let distanceToPhoto = dist(player.x, player.y, photo.x, photo.y);
            if (distanceToPhoto < pickupRange) {
                if (!carrying) {
                    player.color = 'yellow';
                    pickupPrompt = true;
                    if (kb.pressing('e')) {
                        if (soundToggle){
                            grabSound.play();
                        }
                        carrying = true;
                        carried.type = "photo";
                        carried.id = photo.id;
                        playerSpeed = baseSpeed * 0.6;
                        photo.scale = 2;
                        photo.layer = player.layer + 1;
                        photo.color = 'green'; // Change color to green when collected
                        photo.collected = true;
                    }
                }
            }
        }

        for (let video of videos) {
            let distanceToVideo = dist(player.x, player.y, video.x, video.y);
            if (distanceToVideo < pickupRange) {
                if (!carrying) {
                    player.color = 'yellow';
                    pickupPrompt = true;
                    if (kb.pressing('e')) {
                        if (soundToggle){
                            grabSound.play();
                        }
                        carrying = true;
                        carried.type = "video";
                        carried.id = video.id;
                        playerSpeed = baseSpeed * 0.4;
                        video.scale = 2;
                        video.layer = player.layer + 1;
                        video.color = 'green'; // Change color to green when collected
                        video.collected = true;
                    }
                }
            }
        }
    } else {
        if (distanceToTrashMail < pickupRange && carried.type == "email") {
            player.color = 'yellow';
            pickupPrompt = true;
        }
        else if (distanceToTrashPhotos < pickupRange && carried.type == "photo") {
            player.color = 'yellow';
            pickupPrompt = true;
        }
        else if (distanceToTrashVideos < pickupRange && carried.type == "video") {
            player.color = 'yellow';
            pickupPrompt = true;
        }
        else {            
            player.color = 'white';
            pickupPrompt = false;
        }

        if (carried.type == "email") {
            let email = emails.find(e => e.id === carried.id);
            if (email) {
                email.x = player.x+30;
                email.y = player.y;
            }
        }
        if (carried.type == "photo") {
            let photo = photos.find(p => p.id === carried.id);
            if (photo) {
                photo.x = player.x+30;
                photo.y = player.y;
            }
        }
        if (carried.type == "video") {
            let video = videos.find(v => v.id === carried.id);
            if (video) {
                video.x = player.x+30;
                video.y = player.y;
            }
        }


        if (carried.type == "email" && distanceToTrashMail < pickupRange && kb.pressing('e')) {
            playerSpeed = baseSpeed;
            carrying = false;
            let email = emails.find(e => e.id === carried.id);
            if (email) {
                if (soundToggle){
                    poubelle1Sound.play();
                    poubelle2Sound.play();
                }
                email.collected = false;
                email.remove();
                emails = emails.filter(e => e.id !== carried.id); // Remove from array
                score += floor(random(100, 1000));
                text.text = "Score: " + score;
                carried.reset();
            }
        } else if (carried.type == "photo" && distanceToTrashPhotos < pickupRange && kb.pressing('e')) {
            playerSpeed = baseSpeed;
            carrying = false;
            let photo = photos.find(p => p.id === carried.id);
            if (photo) {
                if (soundToggle){
                    poubelle1Sound.play();
                    poubelle2Sound.play();
                }
                photo.collected = false;
                photo.remove();
                photos = photos.filter(p => p.id !== carried.id); // Remove from array
                score += floor(random(500, 5000));
                text.text = "Score: " + score;
                carried.reset();
            }
        } else if (carried.type == "video" && distanceToTrashVideos < pickupRange && kb.pressing('e')) {
            playerSpeed = baseSpeed;
            carrying = false;
            let video = videos.find(v => v.id === carried.id);
            if (video) {
                if (soundToggle){
                    poubelle1Sound.play();
                    poubelle2Sound.play();
                }
                video.collected = false;
                video.remove();
                videos = videos.filter(v => v.id !== carried.id); // Remove from array
                score += floor(random(1000, 10000));
                text.text = "Score: " + score;
                carried.reset();
            }
        }
    }

    // Move the clients to their target table positions
    clients.forEach(client => {
        let targetX = client.targetChair.x;
        let targetY = client.targetChair.y;

        let dx = targetX - client.x;
        let dy = targetY - client.y;
        let distance = dist(client.x, client.y, targetX, targetY);

        if (distance > 5) {
            client.vel.x = dx * 0.05;
            client.vel.y = dy * 0.05;
        } else {
            client.vel.x = 0;
            client.vel.y = 0;
        }

        // Check if the client's time limit is reached
        if (millis() - client.spawnTime > client.timeLimit) {
            if (client.data && !client.data.collected) { // Check if the trash is not being carried
                let data = emails.find(e => e.id === client.data.id);
                if (data){
                    data.x = 10000;
                    emails = emails.filter(e => e.id !== data.id);
                    data.remove();
                }
                else {
                    data = photos.find(p => p.id === client.data.id);
                    if (data){
                        data.x = 10000;
                        photos = photos.filter(p => p.id !== data.id);
                        data.remove();
                    }
                    else {
                        data = videos.find(v => v.id === client.data.id);
                        if (data){
                            data.x = 10000;
                            videos = videos.filter(v => v.id !== data.id);
                            data.remove();
                        }
                    }
                }
                
                // Remove the client
                clients = clients.filter(c => c !== client);
                client.remove();
                client.targetChair.occupied = false;
            }
        }

        if (millis() - client.spawnTime > client.timeLimit * 4) {
            // Remove the client. Failsafe if client is stuck
            clients = clients.filter(c => c !== client);
            client.remove();
            client.targetChair.occupied = false;
        }
    });

    if (kb.pressing('Escape')) {
        if (gamePaused===false){
            noLoop(); // Stop the update loop
            pause();
            return; // Exit the function
        }
    }

    if (pickupPrompt){
        prompt.visible = true;
    }
    else {
        prompt.visible = false;
    }
}

function spawnData(targetChair, client) {
    let data = floor(random(3)); // Randomly select a data type
    let trash;

    // Wait until the client is seated
    let checkIfSeated = setInterval(() => {
        if (client.vel.x === 0 && client.vel.y === 0) {
            clearInterval(checkIfSeated); // Stop checking

            if (data === 0) {
                if (targetChair.side === 'left') {
                    trash = createEmail(targetChair.x + 50, targetChair.y);
                } else {
                    trash = createEmail(targetChair.x - 50, targetChair.y);
                }
            } else if (data === 1) {
                if (targetChair.side === 'left') {
                    trash = createPhoto(targetChair.x + 50, targetChair.y);
                } else {
                    trash = createPhoto(targetChair.x - 50, targetChair.y);
                }
            } else if (data === 2) {
                if (targetChair.side === 'left') {
                    trash = createVideo(targetChair.x + 50, targetChair.y);
                } else {
                    trash = createVideo(targetChair.x - 50, targetChair.y);
                }
            }

            client.data = trash; // Associate the trash with the client
        }
    }, 100); // Check every 100ms
}

function spawnClient() {
    let client = new Sprite(700, canvasHeight, 50, 50); // Create the client sprite
    client.color = 'yellow'; // Color of the client
    client.shape = 'box'; // Specify shape as rectangle
    client.collider = 'none'; // Make the client dynamic
    client.spawnTime = millis(); // Record the spawn time
    client.timeLimit = 5000; // Time limit for the client to wait
    client.scale = 3;

    let color = floor(random(3));
    if (color === 0) {
        client.addAnimation('assisgaucheV', assisgaucheAnimationV, { width: 64, height: 64 });
        client.addAnimation('assisdroiteV', assisdroiteAnimationV, { width: 64, height: 64 });
        client.addAnimation('walkupV', walkupAnimationV, { width: 64, height: 64 });
        client.animation = 'walkupV';
    } else if (color === 1) {
        client.addAnimation('assisgaucheB', assisgaucheAnimationB, { width: 64, height: 64 });
        client.addAnimation('assisdroiteB', assisdroiteAnimationB, { width: 64, height: 64 });
        client.addAnimation('walkupB', walkupAnimationB, { width: 64, height: 64 });
        client.animation = 'walkupB';
    } else {
        client.addAnimation('assisgaucheR', assisgaucheAnimationR, { width: 64, height: 64 });
        client.addAnimation('assisdroiteR', assisdroiteAnimationR, { width: 64, height: 64 });
        client.addAnimation('walkupR', walkupAnimationR, { width: 64, height: 64 });
        client.animation = 'walkupR';
    }

    

   

    // Select a random available chair to move to
    let availableChairs = chairs.filter(chair => !chair.occupied);
    if (availableChairs.length > 0) {
        let chairIndex = floor(random(availableChairs.length));
        let targetChair = availableChairs[chairIndex];
        targetChair.occupied = true;
        client.targetChair = targetChair;
        

        if (color === 0) {
            client.animation = 'walkupV';
            setTimeout(() => {
            if (targetChair.side === 'left') {
                client.animation = 'assisgaucheV';
            } else {
                client.animation = 'assisdroiteV';
            }
            }, 2000);
        } else if (color === 1) {
            client.animation = 'walkupB';
            setTimeout(() => {
            if (targetChair.side === 'left') {
                client.animation = 'assisgaucheB';
            } else {
                client.animation = 'assisdroiteB';
            }
            }, 2000);
        } else {
            client.animation = 'walkupR';
            setTimeout(() => {
            if (targetChair.side === 'left') {
                client.animation = 'assisgaucheR';
            } else {
                client.animation = 'assisdroiteR';
            }
            }, 2000);
        }
        
    

        
        spawnData(targetChair, client); // Pass the client to spawnData
        clients.push(client); // Add the client to the clients array
    }
}

function clientSpawningRoutine() {
    let interval = random(2000, 5000); // Random interval between 2 and 5 seconds
    setTimeout(() => {
        if (chairs.filter(chair => !chair.occupied).length > 0) {
            spawnClient();
            clientSpawningRoutine(); // Continue the routine
        }
        else {
            clientSpawningRoutine(); // Continue the routine
        }
    }, interval);
}




function end() {
   
    // Remove all elements
    
    text.remove();
    time.remove();
    
         Canvas(canvasWidth, canvasHeight);
         background(220);
    
        let calque = document.createElement("div");
        calque.style.position = "absolute";
        calque.style.top = "50%";
        calque.style.left = "50%";
        calque.style.width = "1200px";
        calque.style.height = "890px";
        calque.style.backgroundColor = "rgba(0, 0, 0, 0.79)";
        calque.style.backdropFilter= "blur(5px)";
        calque.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(calque);
         
    
        let gameOverText = document.createElement("div");
        gameOverText.style.position = "absolute";
        gameOverText.style.top = "50%";
        gameOverText.style.left = "50%";
        gameOverText.style.fontSize = "40px";
        gameOverText.style.color = "white";
        gameOverText.style.transform = "translate(-50%, -50%)";
        gameOverText.innerHTML = "Game Over";
        document.body.appendChild(gameOverText);
    
    
    
    
      
    
        let scoreText = document.createElement("div");
        scoreText.style.position = "absolute";
        scoreText.style.top = "30%";
        scoreText.style.left = "50%";
        scoreText.style.fontSize = "80px";
        scoreText.style.color = "white";
        scoreText.style.transform = "translate(-50%, -50%)";
        scoreText.innerHTML = "Score: " + score;
        document.body.appendChild(scoreText);
    
        let co2Text = document.createElement("div");
        co2Text.style.position = "absolute";
        co2Text.style.top = "40%";
        co2Text.style.left = "50%";
        co2Text.style.fontSize = "60px";
        co2Text.style.width = "100%";
        co2Text.style.textAlign = "center";
        co2Text.style.color = "white";
        co2Text.style.transform = "translate(-50%, -50%)";
        let scoreco2 = (score * 0.015).toFixed(1);
        co2Text.innerHTML = "You have removed " + scoreco2 + "g of CO2";
        document.body.appendChild(co2Text);
    
    
        let scoreTotalText = document.createElement("div");
        scoreTotalText.style.position = "absolute";
        scoreTotalText.style.top = "10%";
        scoreTotalText.style.right = "-5%";
        scoreTotalText.style.fontSize = "20px";
        scoreTotalText.style.color = "white";
        scoreTotalText.style.width = "max-content";
        scoreTotalText.style.transform = "translate(-50%, -50%)";
        totalscore = totalscore + parseFloat(scoreco2); 
        scoreTotalText.innerHTML = "Global world score: " + totalscore + "kg of CO2";
        document.body.appendChild(scoreTotalText);
    
        let restartButton = document.createElement("button");
        restartButton.innerHTML = "Back to Menu";
        restartButton.id = "restartButton";
        restartButton.style.position = "absolute";
        restartButton.style.bottom = "7rem";
        restartButton.style.left = "50%";
        restartButton.style.fontSize = "4rem";
        restartButton.style.fontFamily = "'Jersey 15', serif";
        restartButton.style.borderRadius = "10px";
        restartButton.style.transform = "translateX(-50%)";
        document.body.appendChild(restartButton);
    
        restartButton.addEventListener("click", () => {
            timermillieseconde=0;
            timerseconde=0;
            timerminute=0;
            score = 0;
            location.reload();
        });
    
        let newStartButton = document.createElement("button");
        newStartButton.innerHTML = "Restart";
        newStartButton.id = "newStartButton";
        newStartButton.style.position = "absolute";
        newStartButton.style.bottom = "15rem";
        newStartButton.style.left = "50%";
        newStartButton.style.fontSize = "8rem";
        newStartButton.style.fontFamily = "'Jersey 15', serif";
        newStartButton.style.borderRadius = "10px";
        newStartButton.style.transform = "translateX(-50%)";
        document.body.appendChild(newStartButton);
    
        newStartButton.addEventListener("click", () => {
            timermillieseconde=0;
            timerseconde=0;
            timerminute=0;
            score = 0;
            player.remove();
            calque.remove();
            
            gameOverText.remove();
            scoreTotalText.remove();
            scoreText.remove();
            co2Text.remove();
            restartButton.remove();
            newStartButton.remove();
            text.remove();
            scoreText.remove();
            for (let email of emails) {
                email.remove();
            }
            emails = [];

            for (let photo of photos) {
                photo.remove();
            }
            photos = [];

            for (let video of videos) {
                video.remove();
            }
            for (let client of clients) {
                client.remove();
            }
            clients = [];

            restarted = true;
            
            runstart(); // Start the game
            loop(); // Start the update loop
            
        });
    }
    
    function pause() {

        if (soundToggle){
            pauseSound.play();
        }
       
        // Remove all elements
        gamePaused = true;
        
        
             Canvas(canvasWidth, canvasHeight);
             background(220);
        
            let calque = document.createElement("div");
            calque.style.position = "absolute";
            calque.style.top = "50%";
            calque.style.left = "50%";
            calque.style.width = "1200px";
            calque.style.height = "890px";
            calque.style.backgroundColor = "rgba(0, 0, 0, 0.79)";
            calque.style.backdropFilter= "blur(5px)";
            calque.style.transform = "translate(-50%, -50%)";
            document.body.appendChild(calque);
             
        
            let gameOverText = document.createElement("div");
            gameOverText.style.position = "absolute";
            gameOverText.style.top = "40%";
            gameOverText.style.left = "50%";
            gameOverText.style.fontSize = "40px";
            gameOverText.style.color = "white";
            gameOverText.style.transform = "translate(-50%, -50%)";
            gameOverText.innerHTML = "Game Paused";
            document.body.appendChild(gameOverText);
        
        
        
        
          
        
            let scoreTextpause = document.createElement("div");
            scoreTextpause.style.position = "absolute";
            scoreTextpause.style.top = "30%";
            scoreTextpause.style.left = "50%";
            scoreTextpause.style.fontSize = "80px";
            scoreTextpause.style.color = "white";
            scoreTextpause.style.transform = "translate(-50%, -50%)";
            scoreTextpause.innerHTML = "Current Score: " + score;
            document.body.appendChild(scoreTextpause);
        
    
    
    
            let goButton = document.createElement("button");
            goButton.innerHTML = "Back to the game";
            goButton.id = "goButton";
            goButton.style.position = "absolute";
            goButton.style.bottom = "40%";
            goButton.style.left = "50%";
            goButton.style.fontSize = "6rem";
            goButton.style.width = "max-content";
            goButton.style.fontFamily = "'Jersey 15', serif";
            goButton.style.borderRadius = "10px";
            goButton.style.transform = "translateX(-50%)";
            document.body.appendChild(goButton);
        
            goButton.addEventListener("click", () => {
                gamePaused = false;
                goButton.remove();
                calque.remove();
                gameOverText.remove();
                scoreTextpause.remove();
                restartButtonpause.remove();
                newStartButtonpause.remove();
                
                loop(); // Start the update loop
            });
            
        
            let restartButtonpause = document.createElement("button");
            restartButtonpause.innerHTML = "Back to Menu";
            restartButtonpause.id = "restartButtonpause";
            restartButtonpause.style.position = "absolute";
            restartButtonpause.style.bottom = "7rem";
            restartButtonpause.style.left = "50%";
            restartButtonpause.style.fontSize = "4rem";
            restartButtonpause.style.fontFamily = "'Jersey 15', serif";
            restartButtonpause.style.borderRadius = "10px";
            restartButtonpause.style.transform = "translateX(-50%)";
            document.body.appendChild(restartButtonpause);
        
            restartButtonpause.addEventListener("click", () => {
                timermillieseconde=0;
                timerseconde=0;
                timerminute=0;
                score = 0;
                gamePaused = false;                
                restarted = false;
                location.reload();
            });
        
            let newStartButtonpause = document.createElement("button");
            newStartButtonpause.innerHTML = "Restart";
            newStartButtonpause.id = "newStartButtonpause";
            newStartButtonpause.style.position = "absolute";
            newStartButtonpause.style.bottom = "15rem";
            newStartButtonpause.style.left = "50%";
            newStartButtonpause.style.fontSize = "4rem";
            newStartButtonpause.style.fontFamily = "'Jersey 15', serif";
            newStartButtonpause.style.borderRadius = "10px";
            newStartButtonpause.style.transform = "translateX(-50%)";
            document.body.appendChild(newStartButtonpause);
        
            newStartButtonpause.addEventListener("click", () => {
                
                text.remove();
                time.remove();
                timermillieseconde = 0;
                timerseconde = 0;
                timerminute = 0;
                score = 0;
                player.remove();

                for (let email of emails) {
                    email.remove();
                }
                emails = [];

                for (let photo of photos) {
                    photo.remove();
                }
                photos = [];

                for (let video of videos) {
                    video.remove();
                }

                for (let client of clients) {
                    client.remove();
                }
                clients = [];

                calque.remove();
                gameOverText.remove();
                scoreTextpause.remove();
                goButton.remove();
                restartButtonpause.remove();
                newStartButtonpause.remove();
                
                gamePaused = false;
                pickupPrompt = false;
                prompt.visible = false;
                
                restarted = true;
                
                runstart(); // Start the game
                loop(); // Start the update loop
                
            });
        }
        
    
    
    // Create the start button when the script loads
    createStartButton();
    
    // Prevent the update loop from running until the game starts
    loop();