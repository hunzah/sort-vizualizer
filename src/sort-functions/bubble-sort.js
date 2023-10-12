
async function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Вызываем функцию паузы она сработает при нажатии на кнопку
      await checkPause()
      if (arr[j].h > arr[j + 1].h) {
        colorBars(arr[j], arr[j + 1]); // Подсвечиваем столбцы
        let tmp = arr[j].h;
        arr[j].h = arr[j + 1].h;
        arr[j + 1].h = tmp;
        await sleep(); 
        remColor(arr[j], arr[j + 1]); 
      }
    }
  }
}
