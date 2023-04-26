// функція, яку будемо 'обгортати'
const calc = (a, b, c) => a + b + c;


const wrapper = (func) => {
    // створюємо об'єкт cache 
    const cache = {};
    // повертаємо функцію, яка приймає будь-яку кількість числових аргументів (...args)
    return (...args) => {
        // конвертуємо аргументи в рядок JSON
        const argsStr = JSON.stringify(args);
        // якщо argsStr немає в об'єкті кешування записуємо результат виконання в кеш і повертаємо цей результат
        if (!(argsStr in cache)){
            const result = func(...args);
            cache[argsStr] = result;
            console.log(`${result} calculated`);
            return result;
        }
        // якщо argsStr є в об'єкті кешування ми повертаємо результат обчислень, який ми зберегли в cache[argsStr]
        else {
            console.log(`${cache[argsStr]} from cache`);
            return cache[argsStr];
        }
    };
};

// перевірка
const cachedCalc = wrapper(calc);
cachedCalc(2,2,3); // 7 calculated
cachedCalc(5,8,1); // 14 calculated
cachedCalc(2,2,3); // 7 from cache