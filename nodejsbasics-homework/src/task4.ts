import * as os from 'os';
import * as si from 'systeminformation';

function printSystemInfo() {
  const osInfo = os.type();
  const arch = os.arch();
  const currentUser = os.userInfo().username;

  console.log('Operating System:', osInfo);
  console.log('Architecture:', arch);
  console.log('Current User Name:', currentUser);
  // інформація про CPU
  si.cpu().then((cpuData) => {
    const cpuCores: string[] = Object.values(cpuData.cores).map((core: {model: string}) => core.model);
    console.log('CPU Cores Models:', cpuCores);

    si.cpuTemperature().then((temperatureData) => {
      console.log('CPU Temperature:', temperatureData.main, '°C');
      // Graphic controllers, vendors and models
      si.graphics().then((graphicsData) => {
        console.log('Graphic Controllers:');
        graphicsData.controllers.forEach((controller) => {
          console.log('Vendor:', controller.vendor);
          console.log('Model:', controller.model);
        });
        // Memory
        si.mem().then((memData) => {
          const totalMemory = memData.total / (1024 * 1024 * 1024);
          const usedMemory = memData.used / (1024 * 1024 * 1024);
          const freeMemory = memData.free / (1024 * 1024 * 1024);
          console.log('Total Memory:', totalMemory.toFixed(2), 'GB');
          console.log('Used Memory:', usedMemory.toFixed(2), 'GB');
          console.log('Free Memory:', freeMemory.toFixed(2), 'GB');
          // Battery
          si.battery().then((batteryData) => {
            console.log('Battery:');
            console.log('Charging:', batteryData.isCharging);
            console.log('Percent:', batteryData.percent);
            console.log('Remaining Time:', batteryData.timeRemaining);
          });
        });
      });
    });
  });
}

// Отримання частоти з командного рядка(аргументом при виклику програми)
const frequency = parseInt(process.argv[2], 10);

// Перевірка частоти
if (isNaN(frequency) || frequency <= 0) {
  console.error('Неправильна частота. Введіть додатнє число.');
  process.exit(1);
}

// Виклик функції для виведення системної інформації з заданою частотою
setInterval(printSystemInfo, frequency * 1000);


