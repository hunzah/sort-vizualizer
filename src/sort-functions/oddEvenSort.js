 // Функция 'чёт-нечет' сортировки

 async function oddEvenSort(arr) {
  // Функция для обмена элементов в массиве
  async function swap(arr, i, j) {
    let tmp = arr[i].h;
    arr[i].h = arr[j].h;
    arr[j].h = tmp;
  }

  let sorted = false;
  // Запускаем цикл сортировки до тех пор, пока массив не будет отсортирован
  while (!sorted) {
    sorted = true;
    
    // Сортировка нечетных индексов
    for (let i = 1; i < arr.length - 1; i += 2) {
      // Вызываем функцию паузы, которая остановит сортировку при нажатии на кнопку
      await checkPause();

      if (arr[i].h > arr[i + 1].h) {
        colorBars(arr[i], arr[i + 1]); // Подсвечиваем столбцы для сравнения
        await sleep(); // Задержка для визуализации
        swap(arr, i, i + 1); // Обмен элементов
        sorted = false; // Массив мог измениться, поэтому сортировка продолжается
        remColor(arr[i], arr[i + 1]); // Убираем подсветку
      }
    }

    // Сортировка четных индексов
    for (let i = 0; i < arr.length - 1; i += 2) {
      if (arr[i].h > arr[i + 1].h) {
        colorBars(arr[i], arr[i + 1]); // Подсвечиваем столбцы для сравнения
        await sleep(); // Задержка для визуализации
        swap(arr, i, i + 1); // Обмен элементов
        sorted = false; // Массив мог измениться, поэтому сортировка продолжается
        remColor(arr[i], arr[i + 1]); // Убираем подсветку
      }
    }
  }
}
