// створюємо константу deepClone та присвоюємо їй функцію з одним аргументом object
const deepClone = (object) => {
    // перевірка чи рівний переданий аргумент null або переданий аргумент не є об'єктом
    if (object === null || typeof object !== 'object') {
        // якщо так, то повертаємо аргумент, оскільки примітивні типи не можуть бути клоновані
        return object;
    }
    // створюємо змінну clone з типом 'object'
    let clone = {};
    // оскільки масиви у JS також типу 'object', то необхідно перевірити чи є аргумент масивом, якщо так, то перетворюємо clone на масив
    if (object instanceof Array) {
        clone = [];
    }
    // цикл з перевіркою наявності в об'єкті, що клонується деякої властивості(property)
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            // рекурсія
            clone[key] = deepClone(object[key]);
        }
    }
    // повертаємо клонований об'єкт
    return clone;
}
// перевірка з масивом
let arr = [0, 2, 5, 6, 110];
let cloneArr = deepClone(arr);

console.log(cloneArr);
console.log(arr === cloneArr); // false

// перевірка з об'єктом
let obj = {
    property1: 'test',
    property2: 111,
    property3: true
}

let cloneObj = deepClone(obj);

console.log(cloneObj);
console.log(obj === cloneObj); // false