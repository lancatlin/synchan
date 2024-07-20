type TimerCallback = (play: boolean, time: number) => void;

class Timer {
  private intervalId: NodeJS.Timeout | null = null;
  private lastUpdate: Date = new Date();
  private currentTime: number = 0;
  private callbacks: TimerCallback[] = [];
  private playing: boolean = false;

  constructor(private duration: number) {}

  play() {
    this.playing = true;
    this.lastUpdate = new Date();
    this.notifyCallbacks();
  }

  pause() {
    const now = new Date();
    const delta = (now.getTime() - this.lastUpdate.getTime()) / 1000;
    this.currentTime += delta % this.duration;
    this.lastUpdate = now;
    this.playing = false;
    this.notifyCallbacks();
  }

  seek(time: number) {
    this.currentTime = time;
    this.lastUpdate = new Date();
    this.notifyCallbacks();
  }

  addCallback(callback: TimerCallback) {
    this.callbacks.push(callback);
  }

  removeCallback(callback: TimerCallback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  getCurrentTime() {
    return this.currentTime;
  }

  private notifyCallbacks() {
    this.callbacks.forEach((callback) =>
      callback(this.playing, this.currentTime)
    );
  }
}

export default Timer;
