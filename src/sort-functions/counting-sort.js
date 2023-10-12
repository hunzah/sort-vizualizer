// Функция сортировки подсчетом
async function countingSort(arr) {
    let min = arr[0].h;
    let max = arr[0].h;

    // Находим минимальное и максимальное значения в массиве
    for (let i = 0; i < arr.length; i++) {
        // Вызываем функцию паузы, которая остановит сортировку при нажатии на кнопку
        await checkPause();
        if (arr[i].h < min) {
        min = arr[i].h;
        } else if (arr[i].h > max) {
        max = arr[i].h;
        }
    }

    let z = 0;
    const count = [];

    // Инициализируем счетчик для каждого значения в диапазоне [min, max]
    for (let i = min; i <= max; i++) {
        count[i] = 0;
    }

    // Заполняем счетчик значениями из исходного массива
    for (let i = 0; i < arr.length; i++) {
        colorBars(arr[i], arr[i]); // Подсвечиваем столбец
        count[arr[i].h]++;
        await sleep(); // Задержка для визуализации
        remColor(arr[i], arr[i]); // Убираем подсветку
    }

    // Восстанавливаем отсортированный массив
    for (let i = min; i <= max; i++) {
        while (count[i]-- > 0) {
        colorBars(arr[z], arr[z]); // Подсвечиваем столбец
        arr[z++].h = i;
        await sleep(); // Задержка для визуализации
        remColor(arr[z - 1], arr[z - 1]); // Убираем подсветку
        }
    }
}
