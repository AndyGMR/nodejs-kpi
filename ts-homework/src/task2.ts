// функція приймає 2 аргументи з типом string та повертає boolean значення
const areAnagrams = (str1: string, str2: string): boolean => {
    // константи типу string, що містять в собі відсортовані за алфавітом та приведені до нижнього регістра символи першої та другої строки
    const arr1: string[] = str1.toLowerCase().split('').sort();
    const arr2: string[] = str2.toLowerCase().split('').sort();
    // повернення результату перевірки
    return (arr1.join('') === arr2.join(''));
}
// перевірка
console.log(areAnagrams('hello', 'olhel')); // true
console.log(areAnagrams('hello', 'world')); // false
