// поле из элементов Cube[y][x]
let cube = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// будущая фигура,  =={undefined} 
let fg;

// будущее поле,  =={undefined}
let field;


// счет игры
let score = 0;

// обновление счета
function scoreUpd8(){
    buttonScore = document.getElementById('score');
    buttonScore.innerHTML = `Score: ${score}`
}

// замена кнопки на счет
function show_score(){
    button = document.getElementById('btns');
    button.style.visibility = `hidden`;
    button1 = document.getElementById('score');
    button1.style.visibility = `visible`;
    score = 0;
    scoreUpd8();
}

// замена счета на кнопку
function show_button(){
    button = document.getElementById('btns');
    button.style.visibility = `visible`;
    button1 = document.getElementById('score');
    button1.style.visibility = `hidden`;
}

// проверка конца игры
function is_end(){
    if((cube[0][3].type != 0) || (cube[0][4].type != 0) || (cube[0][5].type != 0) || (cube[1][3].type != 0) || (cube[1][4].type != 0) || (cube[1][5].type != 0)){
        return(1);
    } else {
        return(0);
    }
}

// случайный цвет квадрата
function randClr(){
    var x = Math.floor(Math.random() * 4);
    switch(x){
        case 0:
            return(`res/pics/red_square.png`);
            break;
        case 1:
            return(`res/pics/blue_square.png`);
            break;
        case 2:
            return(`res/pics/green_square.png`);
            break;
        case 3:
            return(`res/pics/yellow_square.png`);
            break;
    }
}

// конструктор квадрата
var Cube = function(xin, yin){
    // координаты квадрата
    var x = xin;
    var y = yin;
    var colour;

    // создание квадрата
    let imag = document.createElement('img');

    // функция смены цвета (цветной или пустой)
    this.changeColor = function(clr){
        colour = clr;
        imag.src = colour;
    }

    // геттер цвета
    this.getColour = function(){
        return(colour);
    }

    // параметры элемента HTML <img>
    this.changeColor(`res/pics/empty_square.png`)
    imag.id = `square_${x}_${y}`;
    imag.className = "square";
    imag.style.position = `absolute`;
    imag.style.marginTop = `${30*yin}px`;
    imag.style.marginLeft = `${30*xin}px`;   

    // размещение <img> внутри <div>
    let but_ar = document.getElementById('buttons_array');
    but_ar.insertAdjacentElement('beforeend', imag);

    // 0 - незанят, 1 - занят, -1 - нынешняя фигура
    this.type = 0;    
}

// конструктор двигаемой фигуры
var Figure = function(){
    // создание фигуры 3х2 в определенном месте случайного цвета 
    const i = 6;
    var elem = [[3,0], [4,0], [5,0], [3,1], [4,1], [5,1]];
    var type = Math.floor(Math.random() * 9);
    var fgr_clr = randClr();
    // выбор формы
    switch(type){
        case 0:
            elem[0].type = 1;
            elem[1].type = 0;
            elem[2].type = 0;
            elem[3].type = 1;
            elem[4].type = 1;
            elem[5].type = 1;
            break;
        case 1:
            elem[0].type = 0;
            elem[1].type = 0;
            elem[2].type = 1;
            elem[3].type = 1;
            elem[4].type = 1;
            elem[5].type = 1;
        break;
            case 2:
            elem[0].type = 0;
            elem[1].type = 1;
            elem[2].type = 0;
            elem[3].type = 1;
            elem[4].type = 1;
            elem[5].type = 1;
            break;
        case 3:
            elem[0].type = 1;
            elem[1].type = 1;
            elem[2].type = 1;
            elem[3].type = 1;
            elem[4].type = 0;
            elem[5].type = 0;
            break;
        case 4:
            elem[0].type = 1;
            elem[1].type = 1;
            elem[2].type = 1;
            elem[3].type = 0;
            elem[4].type = 0;
            elem[5].type = 1;
            break;
        case 5:
            elem[0].type = 1;
            elem[1].type = 1;
            elem[2].type = 1;
            elem[3].type = 0;
            elem[4].type = 1;
            elem[5].type = 0;
            break;
        case 6:
            elem[0].type = 1;
            elem[1].type = 1;
            elem[2].type = 0;
            elem[3].type = 1;
            elem[4].type = 1;
            elem[5].type = 0;
            break;
        case 7:
            elem[0].type = 1;
            elem[1].type = 1;
            elem[2].type = 1;
            elem[3].type = 0;
            elem[4].type = 0;
            elem[5].type = 0;
            break;
        case 8:
            elem[0].type = 1;
            elem[1].type = 0;
            elem[2].type = 0;
            elem[3].type = 1;
            elem[4].type = 0;
            elem[5].type = 0;
            break;
            
    }

    // функция отрисовки фигуры
    var draw = function(color){
        for(var j = 0; j < i; j++){
            if(elem[j].type == 1){
                cube[elem[j][1]][elem[j][0]].changeColor(color);
                if(color == `res/pics/empty_square.png`){
                    cube[elem[j][1]][elem[j][0]].type = 0;
                } else {
                    cube[elem[j][1]][elem[j][0]].type = -1;
                }
            }
        }
    }

    // непосредственно отрисовка при создании
    draw(fgr_clr);

    // делает фигуру частью поля
    var End = function(){
        for(var j = 0; j < i; j++){
            if(elem[j].type == 1){
                cube[elem[j][1]].fillness++;
                cube[elem[j][1]][elem[j][0]].type = 1;
            }
        }
    }

    // деструктор? фигуры
    var endFigure = function(){
        End();
        field.checkLine(elem[0][1]);
        field.checkLine(elem[3][1]);
        if(is_end()){
            field.clearField();
            show_button();
            endg = true;
            alert(`Score: ${score}`);
        } else {
            fg = new Figure();
        }
    }

    // сдвиг фигуры
    this.Move = function(side){
        switch(side){
            // сдвиг налево
            case 'l':{
                var is_move = 't';
                for(var j = 0; j < i; j++){
                    if(elem[j].type == 1 && (elem[j][0] == 0 || cube[elem[j][1]][elem[j][0] - 1].type == 1)){
                        is_move = 'f';
                    }
                }
                if(is_move == 't'){
                    draw(`res/pics/empty_square.png`);
                    for(var j = 0; j < i; j++){
                        elem[j][0]--;
                    }
                    draw(fgr_clr);
                } 
                break;
            }

            // сдвиг вправо
            case 'r':{
                var is_move = 't';
                for(var j = 0; j < i; j++){
                    if(elem[j].type == 1 && (elem[j][0] == 9 || cube[elem[j][1]][elem[j][0] + 1].type == 1)){
                        is_move = 'f';
                    }
                }
                if(is_move == 't'){
                    draw(`res/pics/empty_square.png`);
                    for(var j = 0; j < i; j++){
                        elem[j][0]++;
                    }
                    draw(fgr_clr);
                } 
                break;
            }

            // движение вниз
            case 'd':{
                var is_move = 't';
                for(var j = 0; j < i; j++){
                    if(elem[j].type == 1 && (elem[j][1] == 14 || cube[elem[j][1] + 1][elem[j][0]].type == 1)) {
                        is_move = 'f';
                        break;
                    }
                }
                // сдвиг, если можно
                if(is_move == 't'){
                    draw(`res/pics/empty_square.png`);
                    for(var j = 0; j < i; j++){
                        elem[j][1]++;
                    }
                    draw(fgr_clr);
                } 

                // если сдвинуть нельзя
                if(is_move == 'f'){
                    endFigure();
                }
                break;
            }
        }
    }
}

// конструктор пустого поля
var Field = function(){
    // создание пустого поля
    let tr_lr = 0;
    let line = 0;  
    while(line < 15){
        cube[line][tr_lr] = new Cube(tr_lr, line);
        if(tr_lr != 9){
            tr_lr++;
        } else{
            tr_lr = 0;
            line++;
        }
    }
    for(line = 0; line < 15; line++){
        cube[line].fillness = 0;
    }
    
    // очистка заданной линии, сдвиг всех на одну вниз и заполнение верхней пустыми
    var clearLine = function(line){     
        for(var curr_line = line; curr_line >= 0; curr_line--){
            for(var cubeId = 0; cubeId != 10; cubeId++){
                cube[line][cubeId].changeColor(cube[line - 1][cubeId].getColour());
                cube[line][cubeId].type = cube[line - 1][cubeId].type;
            }
            cube[line].fillness = cube[line - 1].fillness;
        }
        for(cubeId = 0; cubeId != 10; cubeId++){
            cube[0][cubeId].changeColor(`res/pics/empty_square.png`);
            cube[0][cubeId].type = 0;

        }
        cube[0].fillness = 0;
    }

    // проверка линии на заполненность
    this.checkLine = function(line){
        if(cube[line].fillness == 10){
            clearLine(line);
            score++;
            scoreUpd8();
        }
    }

    // очистка поля от клеток
    this.clearField = function(){
        var buttons = document.getElementById("buttons_array");
        while(buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }
        cube = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    }
}

// функция сдвига со временем
var timerId = 0;
function timer(is_ended){
    if(!is_ended){
        fg.Move('d');
    } else{
        clearInterval(timerId);
    }
}

// основная функция
function main(){
    // создаем поле и первую фигуру, запускаем движение вниз по таймеру
    field = new Field();
    fg = new Figure();
    show_score();
    var endg = false;
    timerId = setInterval(() => timer(endg), 1000);
}

// обработка нажатия стрелок
document.addEventListener('keydown', function(event) {
    
    if (event.code == 'ArrowRight') {
        fg.Move('r');
    }
    
    
    if(event.code == 'ArrowLeft'){
        fg.Move('l');
    }
    
    if(event.code == 'ArrowDown'){
        fg.Move('d');
    }
    
});