async function shellSort(arr) {
    for (var h = arr.length; h > 0; h = parseInt(h / 2)) {
      for (var i = h; i < arr.length; i++) {

        if (isPaused) { // Приостанавливаем сортировку, если флаг isPaused установлен в true
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
        var k = arr[i].h
        for (var j = i; j >= h && k < arr[j - h].h; j -= h)
          arr[j].h = await arr[j - h].h
        arr[j].h = await k
        colorBars(arr[i], arr[j])
        await sleep()
        remColor(arr[i], arr[j])
      }
    }
    return arr
  }