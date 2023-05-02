// визначимо функцію, що аргументом приймає число і повертатиме Function
function add(num: number): Function {
  // змінна sum з типом number, яка спочатку буде дорівнювати аргументу
  let sum: number = num;
  // вкладена функція, що аргументом приймає або число або undefined і повертатиме або число або Function
  function addNext(nextNum: number | undefined): number | Function {
    // перевірка чи аргумент = undefined, якщо так, то повертаємо суму, що вийшла
    if(typeof nextNum === "undefined"){
      return sum;
    } else {
      // в іншому ж випадку додаємо до суми значення аргументу і повертаємо функцію addNext
      sum += nextNum;
      return addNext;
    }
  }
  // повертаємо функцію addNext
  return addNext;
}

// перевірка
console.log(add(1)(2)(3)(4)(5)(10)()) // 25
  