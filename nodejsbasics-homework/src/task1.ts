// створюємо async функцію runSequent
async function runSequent<T, R>(array: T[],
    callback: (item: T, index: number) => Promise<R>): Promise<R[]> {
    // константа з результатами, яку поверне функція
    const results: R[] = [];
    // проходимось по всім елементам
    for (let i = 0; i < array.length; i++) {
      // тут викликається коллбек
      const result = await callback(array[i], i);
      results.push(result);
    }
    return results;
  }
// для того, щоб використовувати конструкцію async-await обгортаємо код у деяку асинхронну функцію main
async function  main() {
  // приклад використання
    const array: string[] = ["one", "two", "three"];
    const results = await runSequent(array, (item, index) =>
    Promise.resolve({
      item,
      index,
    })
  );
  console.log(results);
}

main();
  
