const canvas = document.querySelector("canvas"); // Получаем холст из DOM
const delay = document.querySelector("#delay"); // Получаем элемент управления задержкой
const select = document.querySelector("#selectAlgo"); // Получаем выпадающий список алгоритмов

const ctx = canvas.getContext("2d"); // Получаем контекст рисования на холсте
canvas.width = window.innerWidth - 10; // Устанавливаем ширину холста
canvas.height = window.innerHeight / 2; // Устанавливаем высоту холста

const barColor = "#cb11ab"; // Цвет столбцов
const iColor = 'white'; // Цвет активного столбца i
const jColor = '#007aff'; // Цвет активного столбца j

let ms = delay.value;  // Задержка в миллисекундах

let arr = []; // Массив для хранения значений столбцов

genArr(); // Генерируем начальные значения для массива столбцов

let w = (canvas.width - 20) / arr.length;  // Ширина столбцов

// Функция для установки цвета для активных столбцов
const colorBars = (a, b) => {
    a.color = iColor;
    b.color = jColor;
}

// Функция для удаления цвета с активных столбцов
const remColor = (a, b) => {
    a.color = barColor;
    b.color = barColor;
}

// Функция для создания задержки между шагами анимации
const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Генерация случайного числа в заданном диапазоне
function genArr() {
    arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push({
            h: ran(0, canvas.height),
            color: barColor,
        });
    }
    select.disabled = false;
    select.value = "Choose algorithm...";
}

// Отрисовка столбцов на холсте
const draw = () => {
    let x = 0;
    arr.forEach((col) => {
        ctx.beginPath();
        ctx.rect(x, canvas.height, w, -col.h);
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = col.color;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        x = x + w;
    });
}


// Инициализация обработчиков событий
const init = async () => {
    select.addEventListener("change", async (e) => {
        select.disabled = true;
        pauseResumeButton.disabled = false;

        switch (e.target.value) {
            case "Bubble Sort":
                await bubbleSort(arr);
                break;
            case "Odd Even Sort":
                await oddEvenSort(arr);
                break;
            case "Quick Sort":
                await quickSort(arr, 0, arr.length - 1);
                break;
            case "Shell Sort":
                await shellSort(arr);
                break;
            case "Count Sort":
                await shellSort(arr);
                break;
            default:
                break;
        }
        e.target.value = "Choose algorithm...";
        select.disabled = false;
        pauseResumeButton.disabled = true;
    });

    delay.addEventListener("input", (e) => {
        ms = 100 - e.target.value;
    });
}


// Переменная для отслеживания состояния паузы
// Сделал ее глобальной для того что бы можно было использовать в разных файлах
window.isPaused = false;

// Функция для отслеживания состояния паузы
const pauseResumeButton = document.querySelector("#pauseResume");

// Изначально отключаем кнопку, так как алгоритм еще не выбран
pauseResumeButton.disabled = true;

pauseResumeButton.addEventListener("click", () => {
    window.isPaused = !window.isPaused; // Изменяем состояние паузы при нажатии на кнопку
    if (window.isPaused) {
        pauseResumeButton.innerText = "Start"; // Измените текст кнопки на "Возобновить"
    } else {
        pauseResumeButton.innerText = "Pause"; // Измените текст кнопки на "Пауза"
    }
});


// Анимация отрисовки
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    draw();
}

// Обновление размеров холста при изменении размера окна
const windowResize = () => {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight / 2;
    w = (canvas.width - 20) / arr.length;
}

// Обработчик события изменения размера окна
window.addEventListener('resize', windowResize);

// Переменная для остановки и возобновления сортировки 
// Прописана тут и используется во всех файлах для сортировки, что бы избежать дублирования кода

async function checkPause() { // Приостанавливаем сортировку, если флаг isPaused установлен в true
    if (window.isPaused) {
        await new Promise((resolve) => {
            const checkPaused = () => {
                if (!window.isPaused) {
                    resolve();
                } else {
                    setTimeout(checkPaused, 100);
                }
            };
            checkPaused();
        });
    }
}


init();
animate();
