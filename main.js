const paint = document.querySelector('.paint');

const context = paint.getContext('2d');

const colorPicker = document.querySelector(".js-color-picker");
const eraser = document.querySelector(".js-eraser-elem");
const eraseBtn = document.querySelector(".js-erase-btn");

const state = { // обьект в котором прописываем дефолтные значения.. в последующих действия в функции draw будем брать отсюда данные
    isDrawing: false,
    prevX: 0,
    prevY: 0,
    currX: 0,
    currY: 0,
    strokeStyle: 'black',
    lineWidth: 2,
};
function initDrawing() {
    paint.addEventListener('mousedown', evt => {
        getCoords('down', evt);
    });
    paint.addEventListener('mousemove', evt => {
        getCoords('move', evt);
    });
    paint.addEventListener('mouseup', evt => {
        getCoords('stop', evt);
    });
    paint.addEventListener('mouseout', evt => {
        getCoords('stop', evt);
    });
}
initDrawing();

function draw() {
    context.beginPath(); // начало пути
    context.moveTo(state.prevX, state.prevY); // начальная точка
    context.lineTo(state.currX, state.currY); // точка тогда когда пользователь начнет водить мышкой ..иначе путь смещения 
    context.strokeStyle = state.strokeStyle;
    context.lineWidth = state.lineWidth;
    context.stroke();
    context.closePath();
}

function getCoords(type, evt) { // функция для отслеживания координатов
    if (type === 'move') {
        if (state.isDrawing) {
            state.prevX = state.currX;
            state.prevY = state.currY;
            state.currX = evt.clientX - paint.offsetLeft;
            state.currY = evt.clientY - paint.offsetTop;
            draw();
        }
    }
    if (type === 'down') {
        state.isDrawing = true;
        state.isDot = true;
        state.currX = evt.clientX - paint.offsetLeft;
        state.currY = evt.clientY - paint.offsetTop;
        context.beginPath();
        context.fillStyle = context.strokeStyle; // для тогоо чтобы цвет точки совпадал с цветом линии
        context.fillRect(state.currX, state.currY, 2, 2); // метод который собсна отрисовывает саму точку
        context.closePath();
        state.isDot = false;
    }
    if (type === 'stop') {
        state.isDrawing = false;
    }
}

function toggleColor(){
    state.strokeStyle = colorPicker.value;
    state.lineWidth = 2;
    paint.style.cursor = "url(./paint-pencil.png), auto";
}

function setEraser(){
    state.strokeStyle = "white";
    state.lineWidth = 14;
    paint.style.cursor = "url(./paint-eraser.png), auto";
}

function clear(){
    context.clearRect(0, 0, paint.clientWidth, paint.clientHeight)
}

colorPicker.addEventListener('input', toggleColor);
eraser.addEventListener('click', setEraser);
eraseBtn.addEventListener('click', clear);
