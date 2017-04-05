window.onload = letGo;

let canvas, ctx;        //Глобальні змінні для тегу canvas
let width = 512;        //Глобальні змінні для ширини і висоти холста
let height = 480; 

let startLoad = 0;      //Кількість об'єктів
let endLoad = 0;        //Кількість завантажених об'єктів

let keyRight = false;   //Змінна для візначення нажатих клавіш "Вліво" і "Вправо"
let keyLeft = false;
let keyUp = false;      //Натиснена кнопка "верх"
let keyDown = false;    //Натиснена кнопка "низ"

let keySpace=false;     //Натиснена кнопка "пробіл"
let lastFire;           //Останній вистрел

let lastTime;               //Останній час обновлення
let objectImage, bgImage;   //Малюнки ігри
let bg;                     //Фон

let player = {       //Літак ігрока і параметри
        x: 40,       //Положення літака по вісі Х
        y: 220,     //Положення літака по вісі Y
        w: 39,      //Ширина літака      
        h: 39,      //Висота літака
        row: 0,     //Положення літака по вісі Y на картинці
        col: 0,     //Ширина літака на картинці
        count: 2,   //ількість анімацій літака
        action:0    //Активна анімація
    }
  
let playerSpeed = 0.2;      //Скорость літака
let bullets=[];             //Снаряди
let bulletSpeed = 0.5;      //Скорость снарядів

function drawBullet(dt){ // Функція для малювання снарядів
    for(let i = 0; i < bullets.length; i++) { // Проходим по циклу масив снарядів
        let bullet = bullets[i]; // Заносим в тимчасову змінну, поточний снаряд з масиву

        switch(bullet.type) { // Визначаєм тип снаряду
            case 'up': 
                bullet.y -= bulletSpeed * dt; // Руххаєм снарядв вверх по вісі Y
            break;
            case 'down': 
                bullet.y += bulletSpeed * dt; // Руххаєм снарядв вниз по вісі Y
            break;
            case 'forward': 
                bullet.x += bulletSpeed * dt; // Руххаєм снарядв вперед по вісі Х
            break;
        }
        
        ctx.drawImage(objectImage, bullet.col, bullet.row, bullet.w, bullet.h, bullet.x, bullet.y, bullet.w, bullet.h); // Малюєм снаряди з картинки об'єктів
        
        if(bullet.y < 0 || bullet.y > height || bullet.x > width) { // Якщо снаряд виходить за холст
            bullets.splice(i, 1); // Видаляєм снаряд з масиву
            i--; // Так як видалили снаряд і масив змінився, залишаємся на тій же позиції
        }
    }
}
function drawPlayer(dt) { // Функція для малювання літака

    player.action += 1; // Наступна анімація
    if(player.action == player.count){player.action = 0;} // Якщо попередня анімація була остання, тоді переходим на першу анімацію
    
    ctx.drawImage(objectImage, (player.action * player.col), player.row, player.w, player.h, player.x, player.y, player.w, player.h); // Малюєм літак з картинки об'єктів
}

function setKey(dt){        //Функція натиснень клавіш
    if(keyLeft){            //Якщо натиснена клавіша "вліво"
        player.x -= playerSpeed * dt; //Змінюєм положення літака по вісі Х
        if(player.x < 0){   //Якщо літак виходить за межі холста
            player.x = 0;   //Ставим на початок
        }
    }
    if(keyRight){           //Якщо натиснена клавіша "право"
        player.x += playerSpeed * dt; // Змінюєм положення літака по вісі Х
        if(player.x > (width - player.w)){ // Якщо літак виходить за межі холста
            player.x = width - player.w; // Ставим на кінець
        }
    }
    if(keyUp){ //Якщо натиснена клавіша "верх"
        player.y -= playerSpeed * dt; // Змінюєм положення літака по вісі Y
        if(player.y < 0){ // Якщо літак виходить за межі холста
            player.y = 0; // Ставим на початок
        }
    }
    if(keyDown){ // Якщо натиснена клавіша "низ"
        player.y += playerSpeed * dt; // Змінюєм положення літака по вісі Y
        if(player.y > (height - player.h)){ // Якщо літак виходить за межі холста
            player.y = height - player.h; // Ставим на кінець
        }
    }
    if(keySpace){ // Якщо натиснена клавіша "низ"
        if((Date.now() - lastFire) > 100){ // Якщо прошло більше 0.1 с від попереднього вистріла
            let x = player.x + player.w / 2; // Центр літака по вісі Х
            let y = player.y + player.h / 2; // Центр літака по вісі Y
            
            bullets.push({ x:x, y:y, type: 'forward', row: 39, col: 0, w: 18, h: 8});   //Занесення в масив снарядів переднього снаряду
            bullets.push({ x:x, y:y, type: 'up', row: 50, col: 0, w: 9, h: 5});         //Занесення в масив снарядів нижнього снаряду
            bullets.push({ x:x, y:y, type: 'down', row: 60, col: 0, w: 9, h: 5});       //Занесення в масив снарядів верхнього снаряду
            
            lastFire = Date.now(); // Обновлення часу останнього вистрілу
        }
    }    
}

function main() {       //Функція оброботки кадрів
    clear();            //Очищаєм холст
                
    times = Date.now();         //Поточний часу - new Date().getTime()
    //console.log("times:" + times);
    dt = times - lastTime;      //Прошло часу від прошлого кадру
    //console.log("dt:" + dt);           
    ctx.fillStyle = bg;         //Визначаєм картинку фону
    ctx.fillRect(0, 0, width, height); // Малюєм фон холста
                
    setKey(dt);                //Малюєм літак
    drawPlayer(dt);            //Малюєм літак
    drawBullet(dt);            //Малюєм снаряди
            
    lastTime = times;           //Записуємо час поточного кадру
    //console.log("lastTime:" + lastTime);
    requestAnimFrame(main);     //Повторяє запуск функції
};

function clear() {      //Функція для очищення холста
    ctx.clearRect(0, 0, width, height); // Малює прямокутник очищення (вісь x, вісь y, ширина, висота)
}
    
function startLoadData(){   //Функція для завантаження початкових даних
    startLoad++;        //+1 об'єкт на завантаження

    startLoad++;        //+1 об'єкт на завантаження

    objectImage = new Image();              //Створюєм Малюнок
    objectImage.src = 'images/sprites.png';     //Визначаєм адрeсу малюнку
    objectImage.onload = function(){            //Завантаження малюнку
        endLoadData();
    } 

    startLoad++;            //+1 об'єкт на завантаження
    console.log("startLoad:" + startLoad);

    bgImage = new Image();  //Створюєм Малюнок
    bgImage.src = 'images/terrain.png';     //Визначаєм адрeсу малюнку
    bgImage.onload = function(){            //Завантаження малюнку
        endLoadData();
    }
    
    endLoadData(); // Закінчення завантаження  
}

function endLoadData(){             //Функція для закінчення завантаження даних
    endLoad++;                  //+1 об'єкт завантажений
    console.log("endLoad:" + endLoad);
    if(startLoad == endLoad){   //Якщо всі об'єкти завантажені
        start();                //Запускаєм ігру
    }
}

function start(){       //Функція підготовки запуску ігри
    bg = ctx.createPattern(bgImage, 'repeat');  //Фон холста
                
    lastFire = Date.now(); // Час вистрелу
    lastTime = Date.now();      //Час обновлення
    main();             //Запускаєм функцію оброботки кадрів
}

//http://html5.by/blog/what-is-requestanimationframe/
var requestAnimFrame = (function(){     //Функія для малювання (60 кадрів в секунду)
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||    //для Chrome и Safari
           window.mozRequestAnimationFrame ||       //Firefox 
           window.oRequestAnimationFrame ||         //Internet Explorer 10
           window.msRequestAnimationFrame || function(callback){
                                                window.setTimeout(callback, 1000/60);
                                            };
    })();


function letGo(){
    canvas = document.getElementById('canvas');     //Находим тег canvas по id
    ctx = canvas.getContext('2d');                  //Визначаєм тип малювання 2D
                
    startLoadData();                    //Запускаємо функцію завантаження данних
    
    document.onkeydown = function(e){     //Визначаєм яка клавіша натиснута
        switch(e.keyCode){
            case 37:{                     //клавіша "Вліво"
                keyLeft = true;
            }
            break;
            case 38:{                     //клавіша "Вліво"
                keyUp = true;
            }
            break;
            case 39:{                     //клавіша "Вправо"
                keyRight = true;
            }
            break;
            case 40:{                     //клавіша "Вправо"
                keyDown = true;
            }
            break;
            case 32:{                     //клавіша "SPACE"
                keySpace = true;
            }
            break;
        }
    }

    document.onkeyup = function(e){       //Визначаєм яка клавіша натиснута
        switch(e.keyCode){
            case 37:{                     //клавіша "Вліво"
                keyLeft = false;
            }
            break;
            case 38:{                     //клавіша "Вліво"
                keyUp = false;
            }
            break;
            case 39:{                     //клавіша "Вправо"
                keyRight = false;
            }
            break;
            case 40:{                     //клавіша "Вправо"
                keyDown = false;
            }
            break;
            case 32:{                     //клавіша "SPACE"
                keySpace = false;
            }
            break;
        }
    }
}      