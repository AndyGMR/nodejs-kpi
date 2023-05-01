function add(num){
    // створюємо змінну sum, якій спочатку присвоюємо значення, введене аргументом функції 
    let sum = num;
    // ініціалізуємо нову функцію всередині add()
    function addNext(nextNum){
        // перевірка чи аргумент рівний undefined 
        if (nextNum === undefined) {
            return sum;
        // якщо ні, то додаємо до sum агрумент функції addNext() та заново повертаємо функцію addNext()   
        } else {
            sum += nextNum;
            return addNext;
        }
    }
    // викликаємо функцію addNext()
    return addNext;
}
// перевірка
console.log(add(1)(2)(3)(4)(5)(10)()) // 25