window.onload = letGo;

let canvas, ctx;        //Глобальні змінні для тегу canvas
let width = 512;        //Глобальні змінні для ширини і висоти холста
let height = 480; 

let keyRight = false;   //Змінна для візначення нажатих клавіш "Вліво" і "Вправо"
let keyLeft = false;
let keyUp = false;      //Натиснена кнопка "верх"
let keyDown = false;    //Натиснена кнопка "низ"

let startLoad = 0;      //Кількість об'єктів
let endLoad = 0;        //Кількість завантажених об'єктів

let lastTime;               //Останній час обновлення
let objectImage, bgImage;   //Малюнки ігри
let bg;                     //Фон
let player = {};              //Літак ігрока і параметри
  
let playerSpeed = 0.2;      //Скорость літака

function drawPlayer(dt) { // Функція для малювання літака
    if(keyLeft){ // Якщо натиснена клавіша "вліво"
        player.x -= playerSpeed * dt; // Змінюєм положення літака по вісі Х
        if(player.x < 0){ // Якщо літак виходить за межі холста
            player.x = 0; // Ставим на початок
        }
    }
    if(keyRight){ // Якщо натиснена клавіша "право"
        player.x += playerSpeed * dt; // Змінюєм положення літака по вісі Х
        if(player.x > (width - player.w)){ // Якщо літак виходить за межі холста
            player.x = width - player.w; // Ставим на кінець
        }
    }
    if(keyUp){ // Якщо натиснена клавіша "верх"
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
    player.action += 1; // Наступна анімація
    if(player.action == player.count){player.action = 0;} // Якщо попередня анімація була остання, тоді переходим на першу анімацію
    
    ctx.drawImage(objectImage, (player.action * player.col), player.row, player.w, player.h, player.x, player.y, player.w, player.h); // Малюєм літак з картинки об'єктів
        }

function main() {       //Функція оброботки кадрів
    clear();            //Очищаєм холст
                
    times = Date.now();         //Поточний час
    dt = times - lastTime;      //Прошло часу від прошлого кадру
                
    ctx.fillStyle = bg;         //Визначаєм картинку фону
    ctx.fillRect(0, 0, width, height); // Малюєм фон холста
                
    drawPlayer(dt);             //Малюєм літак
            
    lastTime = times;           //Записуємо час поточного кадру
    requestAnimFrame(main);     //Повторяє запуск функції
};

function clear() {      //Функція для очищення холста
    ctx.clearRect(0, 0, width, height); // Малює прямокутник очищення (вісь x, вісь y, ширина, висота)
}
    
function startLoadData(){   //Функція для завантаження початкових даних
    startLoad++;        //+1 об'єкт на завантаження

    //startLoad++;        //+1 об'єкт на завантаження

    objectImage = new Image();              //Створюєм Малюнок
    objectImage.src = 'images/sprites.png';     //Визначаєм адрeсу малюнку
    objectImage.onload = function(){            //Завантаження малюнку
        endLoadData();
    } 

    startLoad++;            //+1 об'єкт на завантаження

    bgImage = new Image();  //Створюєм Малюнок
    bgImage.src = 'images/terrain.png';     //Визначаєм адрeсу малюнку
    bgImage.onload = function(){            //Завантаження малюнку
        endLoadData();
    }

    player = {              //Літак ігрока і параметри
        x: 40,       //Положення літака по вісі Х
        y: 220,     //Положення літака по вісі Y
        w: 39,      //Ширина літака      
        h: 39,      //Висота літака
        row: 0,     //Положення літака по вісі Y на картинці
        col: 0,     //Ширина літака на картинці
        count: 2,   //ількість анімацій літака
        action:0    //Активна анімація
    }

    endLoadData(); // Закінчення завантаження  
}

function endLoadData(){             //Функція для закінчення завантаження даних
    endLoad++;                  //+1 об'єкт завантажений
    if(startLoad == endLoad){   //Якщо всі об'єкти завантажені
        start();                //Запускаєм ігру
    }
}

function start(){       //Функція підготовки запуску ігри
    bg = ctx.createPattern(bgImage, 'repeat');  //Фон холста
                
    lastTime = Date.now();      //Час обновлення
    main();             //Запускаєм функцію оброботки кадрів
}


var requestAnimFrame = (function(){     //Функія для малювання (60 кадрів в секунду)
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
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
        }
    }
}      