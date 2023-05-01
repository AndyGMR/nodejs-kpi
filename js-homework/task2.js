// створюємо константу areAnagrams та присвоюємо їй функцію з двома аргументами
const areAnagrams = (str1, str2) => {
  // створюємо константи, що будуть містити в собі відсортовані за алфавітом та приведені до нижнього регістра символи першої та другої строки
    const arr1 = str1.toLowerCase().split('').sort();
    const arr2 = str2.toLowerCase().split('').sort();
    // константа, якій передано перевірку на рівність двох строк, що вийшли
    const checkAnagrams = (arr1.join('') === arr2.join(''));
    // повернення результату перевірки
    return checkAnagrams;
  };

// перевірка
console.log(areAnagrams('hello', 'olhel')); // true
console.log(areAnagrams('false', 'test')); // false