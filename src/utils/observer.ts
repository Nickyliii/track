import Taro, { IntersectionObserver } from "@tarojs/taro";
import { document, PageInstance } from "@tarojs/runtime";
interface IOptions {
  selector: string;
  current: PageInstance;
  relativeTo?: string;
  observeAll: boolean;
  initialRatio: number;
  threshold: number;
  viewport: IntersectionObserver.RelativeToViewportMargins;
  once: boolean;
  exposureTime: number;
  interval: number;
  onFinal: (startTime?: string, endTime?: string, value?: any) => void;
}

class Observer {
  constructor(options) {
    this.options = {
      once: false,
      initialRatio: 0, // 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。
      threshold: 0, //一个数值数组，包含所有阈值。
      observeAll: true, //是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点（注意：同时选中过多节点将影响渲染性能
      exposureTime: 5000, // 浏览多长时间==
      viewport: { top: 0, bottom: 0 },
      ...options,
    };
  }
  options: IOptions;
  observer: IntersectionObserver | null = null;
  startTime: Date | null = null;
  stopObserving = false;
  isIntervaling = false;
  neverObserving = false;
  connect() {
    this.stopObserving = false;
    if (this.observer || this.isIntervaling || this.neverObserving) return;
    this.observer = this.createObserver();
  }
  disconnect() {
    this.stopObserving = true;
    if (!this.observer) return;
    this.observer.disconnect();
    this.observer = null;
    if (!this.startTime) return;
    this.judgeExposureTime();
  }
  reconnect() {
    this.disconnect();
    this.connect();
  }
  createObserver() {
    if (!this.options) return null;
    const observerOptions = {
      observeAll: this.options.observeAll,
      initialRatio: this.options.initialRatio,
      thresholds: [this.options.threshold],
    };
    const ob = Taro.createIntersectionObserver(
      this.options.current,
      observerOptions
    );
    if (this.options.relativeTo) {
      ob.relativeTo(this.options.relativeTo);
    } else {
      ob.relativeToViewport(this.options.viewport);
    }
    ob.observe(this.options.selector, (res: any) => {
      const { intersectionRatio, id } = res;
      const node = document.querySelector(`#${id}`);
      console.log(id);
      console.log(intersectionRatio);
      console.log(this.options.threshold);
      const visible = intersectionRatio >= this.options.threshold;
      console.log(visible)
      console.log("9999999999999999")

      if (visible && !this.startTime) {
        this.startTime = new Date();
      }
      console.log(this.startTime)
      if (!visible && this.startTime) {
        this.judgeExposureTime(node);
      }
    });
    return ob;
  }
  judgeExposureTime(node?: any) {
    const endTime = new Date();
    const lastTime = endTime.getTime() - this.startTime!.getTime();
    console.log('--------------------------------------')
    console.log(lastTime);
    console.log(this.options.exposureTime);
    if (lastTime < this.options.exposureTime) {
      this.startTime = null;
      return;
    }
    console.log("11111111111111111111111");
    this.options?.onFinal(this.startTime, endTime, node);
    this.startTime = null;
    if (this.options.once) {
      this.neverObserving = true;
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
    if (this.options.interval) {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      this.isIntervaling = true;
      setTimeout(() => {
        this.isIntervaling = false;
        if (!this.stopObserving) {
          this.connect();
        }
      }, this.options.interval);
    }
  }
}

export default Observer;
