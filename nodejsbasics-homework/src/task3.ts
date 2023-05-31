import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Отримуємо шлях до JSON-файлу з командного рядка
const jsonFilePath = process.argv[2];

// Перевіряємо, чи був переданий шлях до JSON-файлу
if (!jsonFilePath) {
  console.log('Шлях до JSON-файлу не був наданий.');
  process.exit(1);
}

// Перевіряємо, чи існує JSON-файл
if (!fs.existsSync(jsonFilePath)) {
  console.log('JSON-файл не існує.');
  process.exit(1);
}

// Зчитуємо вміст JSON-файлу
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');

// Розпарсюємо JSON-дані
let links: string[];
try {
  links = JSON.parse(jsonData);
} catch (error) {
  console.log('Неправильний формат JSON-файлу.');
  process.exit(1);
}

// Отримуємо ім'я JSON-файлу без розширення
const jsonFileName = path.parse(jsonFilePath).name;

// Створюємо назву папки
const folderName = `${jsonFileName}_pages`;

// Створюємо папку
fs.mkdirSync(folderName);

// Зберігаємо HTML-вміст кожного посилання в окремому файлі
links.forEach(async (link, index) => {
  try {
    const response = await axios.get(link);
    const htmlContent = response.data;
    const fileName = `page${index + 1}.html`;
    const filePath = path.join(folderName, fileName);
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Збережено сторінку ${fileName}`);
  } catch (error) {
    console.log(`Помилка при отриманні сторінки ${link}`);
  }
});
