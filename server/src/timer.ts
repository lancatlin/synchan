type TimerCallback = (play: boolean, time: number) => void;

class Timer {
  private timeoutId: NodeJS.Timeout | null = null;
  private lastUpdate: Date = new Date();
  private currentTime: number = 0;
  private callbacks: TimerCallback[] = [];
  private playing: boolean = false;

  constructor(private duration: number) {
    setInterval(() => {
      if (this.playing) {
        this.computeDuration();
        this.notifyCallbacks();
      }
    }, 2000);
  }

  play() {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.lastUpdate = new Date();
    this.setTimeout();
    this.notifyCallbacks();
  }

  pause() {
    if (!this.playing) {
      return;
    }
    this.computeDuration();
    this.playing = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.notifyCallbacks();
  }

  seek(time: number, play: boolean = false) {
    this.currentTime = time;
    this.lastUpdate = new Date();
    this.playing = play;
    this.notifyCallbacks();
  }

  addCallback(callback: TimerCallback) {
    this.callbacks.push(callback);
    callback(this.playing, this.currentTime);
  }

  removeCallback(callback: TimerCallback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  replay() {
    this.currentTime = 0;
    this.lastUpdate = new Date();
    this.playing = true;
    this.setTimeout();
    this.notifyCallbacks();
  }

  private computeDuration() {
    const now = new Date();
    const delta = (now.getTime() - this.lastUpdate.getTime()) / 1000;
    this.lastUpdate = now;
    this.currentTime += delta;
  }

  private notifyCallbacks() {
    console.log("notifyCallbacks", this.playing, this.currentTime);
    this.callbacks.forEach((callback) =>
      callback(this.playing, this.currentTime)
    );
  }

  private setTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(
      () => this.replay(),
      (this.duration - this.currentTime) * 1000
    );
  }
}

export default Timer;
