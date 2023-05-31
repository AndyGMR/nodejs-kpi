// створюємо фунцію, що приймає параметрами масив та ще деяку функцію, що повертає булеве значення
function arrayChangeDelete<T>(array: T[], shouldDelete: (item: T) => boolean): T[] {
    // масив, який поверне дана функція
    const deletedElements: T[] = [];
    // проходимось по елементам масиву і перевіряємо чи треба видаляти елемент
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if(shouldDelete(item)){
            deletedElements.push(item);
            array.splice(i, 1);
            i--;
        }
    }
    return deletedElements;
}
// приклад використання
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array);
console.log(deletedElements);

