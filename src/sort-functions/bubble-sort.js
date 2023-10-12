// Переменная для отслеживания состояния паузы
let isPaused = false;

// Функция для отслеживания состояния паузы
const pauseResumeButton = document.querySelector("#pauseResume");
pauseResumeButton.addEventListener("click", () => {
  isPaused = !isPaused; // Изменяем состояние паузы при нажатии на кнопку
  if (isPaused) {
    pauseResumeButton.innerText = "Возобновить"; // Измените текст кнопки на "Возобновить"
  } else {
    pauseResumeButton.innerText = "Пауза"; // Измените текст кнопки на "Пауза"
  }
});

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (isPaused) {
        // Приостанавливаем сортировку, если флаг isPaused установлен в true
        await new Promise((resolve) => {
          const checkPaused = () => {
            if (!isPaused) {
              resolve();
            } else {
              setTimeout(checkPaused, 100); // Проверяем каждые 100 миллисекунд
            }
          };
          checkPaused();
        });
      }

      if (arr[j].h > arr[j + 1].h) {
        colorBars(arr[j], arr[j + 1]); // Подсвечиваем столбцы
        let tmp = arr[j].h;
        arr[j].h = arr[j + 1].h;
        arr[j + 1].h = tmp;
        await sleep(); // Задержка между шагами сортировки
        remColor(arr[j], arr[j + 1]); // Убираем подсветку
      }
    }
  }
}
