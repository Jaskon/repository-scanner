export default class PromisePool {
  concurrency: number;
  running: number;
  queue: any[];

  constructor(concurrency: number) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add<T>(promiseFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const task = async () => {
        this.running++;
        try {
          console.debug('Running promise. Running:', this.running, 'Queue:', this.queue.length);
          const result = await promiseFn();
          resolve(result);
        } catch (error) {
          console.error('Promise rejected. Error:', error);
          reject(error);
        } finally {
          this.running--;
          console.debug('Promise complete. Running:', this.running, 'Queue:', this.queue.length);
          this.next();
        }
      };

      this.queue.push(task);
      console.debug('Promise added to queue. Running:', this.running, 'Queue:', this.queue.length);
      if (this.running < this.concurrency) {
        this.next();
      }
    });
  }

  next() {
    if (this.queue.length > 0 && this.running < this.concurrency) {
      const task = this.queue.shift();
      task();
    }
  }
}
