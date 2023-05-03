// функція, яку будемо 'обгортати'
const calc = (a: number, b: number, c: number) => a + b + c;

type Func<T> = (...args: number[]) => T;
function wrapper<T> (func: Func<T>): Func<T>{
    // створюємо об'єкт cache 
    const cache: {[key: string]: T} = {};
    // повертаємо функцію, яка приймає будь-яку кількість числових аргументів (...args)
    return function (...args:number[]): T {
        // конвертуємо аргументи в рядок JSON
        const key: string = args.join('')
        // якщо argsStr немає в об'єкті кешування записуємо результат виконання в кеш і повертаємо цей результат
        if(key in cache){
            return (`${cache[key]}` + ' from cache') as T;
        }
        // якщо key є в об'єкті кешування ми повертаємо результат обчислень, який ми зберегли в cache[argsStr]
        else {
            const result = func(...args)
            cache[key] = result;
            return (`${result}` + ' calculated') as T;
        }
    };
};

// перевірка
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3)) // 7 from cache