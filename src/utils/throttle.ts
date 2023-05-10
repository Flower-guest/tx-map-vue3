export default function throttle<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let isThrottled = false;

  return function throttled(...args: Parameters<F>): void {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, wait);
    }
  };
}
