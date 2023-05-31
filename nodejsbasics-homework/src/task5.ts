// створюємо тип =
type Handler = () => void;
// клас нашого еміттера 
class MyEventEmitter {
  private events: Map<string, Handler[]> = new Map();
// хендлер реєстрації
  registerHandler(eventName: string, handler: Handler) {
    let handlers = this.events.get(eventName);
    // перевіряємо  чи масив handlers не пустий
    if (!handlers) {
      handlers = [];
      this.events.set(eventName, handlers);
    }
    handlers.push(handler);
  }
// функція emitEvent
  emitEvent(eventName: string) {
    const handlers = this.events.get(eventName);
    if (handlers && handlers.length > 0) {
      handlers.forEach((handler) => handler());
    }
  }
}

// Приклад використання
const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено
