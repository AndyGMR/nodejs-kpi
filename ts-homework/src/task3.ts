function deepClone<T>(object: T) {
    // перевірка чи рівний переданий аргумент null або переданий аргумент не є об'єктом
    if (object === null || typeof object !== 'object') {
        // якщо так, то повертаємо аргумент, оскільки примітивні типи не можуть бути клоновані
        return object;
    }
    // створюємо об'єкт clone і затверджуємо його тип як T
    let clone = {} as T;
    // перевірка чи є аргумент масивом, якщо так, то перетворюємо clone на масив затверджуємо його тип як T
    if (object instanceof Array) {
        clone = [] as T;
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
let arr: number[] = [0, 2, 5, 6, 110];
let cloneArr: number[] = deepClone(arr);

console.log(cloneArr);
console.log(arr === cloneArr); // false

// перевірка з об'єктом
let obj = {
    property1: 'test',
    property2: 111,
    property3: true
}
let clonedObj = deepClone(obj);
console.log(clonedObj);
console.log(obj === clonedObj); // false

// перевірка з простим типом даних 
let num:number = 10;
let num2:number = deepClone(num);
console.log('num2 =', num2);

