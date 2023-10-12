// Функция быстрой сортировки
async function quickSort(arr, lo, hi) {
  if (lo < hi) {
    let pi = await partition(arr, lo, hi);
    await quickSort(arr, lo, pi);
    await quickSort(arr, pi + 1, hi);
  }
}

// Функция для разделения массива
async function partition(arr, lo, hi) {
  let pivot = arr[lo].h;
  let i = lo - 1;
  let j = hi + 1;

  while (1) {
    // Вызываем функцию паузы, которая остановит сортировку при нажатии на кнопку
    await checkPause();
    
    do {
      i++;
    } while (arr[i].h < pivot);

    do {
      j = j - 1;
    } while (arr[j].h > pivot);

    if (i >= j) {
      return j;
    }

    colorBars(arr[i], arr[j]); // Подсвечиваем столбцы для сравнения
    await sleep(); // Задержка для визуализации
    let tmp = arr[i].h;
    arr[i].h = arr[j].h;
    arr[j].h = tmp;
    remColor(arr[i], arr[j]); // Убираем подсветку
  }
}
