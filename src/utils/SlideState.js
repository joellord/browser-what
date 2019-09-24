import Emitter from "es6-event-emitter";

class SlideState extends Emitter {
  constructor() {
    super();

    this.slide = 0;
    this.maxSlide = 2;
  }

  setSlideCount(num) {
    this.maxSlide = num - 1;
  }

  gotoSlide(num) {
    this.slide = num;
    this.trigger("gotoSlide", this.slide);
  }

  previousSlide() {
    if (this.slide === 0) return;
    this.slide = this.slide - 1;
    this.gotoSlide(this.slide);
  }

  nextSlide() {
    if (this.slide === this.maxSlide) return;
    this.slide = this.slide + 1;
    this.gotoSlide(this.slide);
  }

  getCurrentSlide() {
    return this.slide;
  }

  subscribe(cb) {
    this.on("gotoSlide", cb);
  }

  unsubscribe(cb) {
    this.off("gotoSlide", cb);
  }
}

let instance = new SlideState();
export default instance;