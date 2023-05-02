// функція, яку будемо 'обгортати'
const calc = (a: number, b: number, c: number) => a + b + c;

// створюємо тип Func<T>. Цей тип описує функцію, яка приймає довільну кількість числових параметрів та повертає значення типу T.
type Func<T> = (...args: number[]) => T;

function wrapper<T> (func: Func<T>): Func<T>{
    // створюємо константу cache, яка є об'єктом, в якому ключі є рядковими значеннями, а значення - це значення типу T
    const cache: {[key: string]: T} = {};
    // повертаємо функцію, яка приймає будь-яку кількість числових аргументів (...args)
    return function (...args:number[]): T {
        // з'єднуємо всі аргументи в один рядок
        const key: string = args.join('')
        // якщо значення є в об'єкті кешування ми повертаємо результат обчислень, який ми зберегли в cache[key]
        if(key in cache){
            console.log(`${cache[key]}`, 'from cache')
            return cache[key];
        }
        // якщо значення ще немає в об'єкті кешування записуємо результат виконання в кеш і повертаємо цей результат
        else {
            const result = func(...args)
            cache[key] = result;
            console.log(`${result}`, 'calculated')
            return result;
        }
    };
};

// перевірка
const cachedCalc = wrapper(calc);
cachedCalc(2,2,3); // 7 calculated
cachedCalc(5,8,1); // 14 calculated
cachedCalc(2,2,3); // 7 from cache