
async function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (window.isPaused) {
        // Приостанавливаем сортировку, если флаг isPaused установлен в true
        await new Promise((resolve) => {
          const checkPaused = () => {
            if (!window.isPaused) {
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
