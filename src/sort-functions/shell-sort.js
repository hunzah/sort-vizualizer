// Функция сортировки Шелла
async function shellSort(arr) {
  for (var h = arr.length; h > 0; h = parseInt(h / 2)) {
    for (var i = h; i < arr.length; i++) {
      // Вызываем функцию паузы, которая остановит сортировку при нажатии на кнопку
      await checkPause();

      var k = arr[i].h;

      // Сортировка вставками с шагом h
      for (var j = i; j >= h && k < arr[j - h].h; j -= h) {
        arr[j].h = await arr[j - h].h;
      }
      arr[j].h = await k;

      colorBars(arr[i], arr[j]); // Подсвечиваем столбцы для сравнения
      await sleep(); // Задержка для визуализации
      remColor(arr[i], arr[j]); // Убираем подсветку
    }
  }
  return arr;
}
