declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

const PIXEL_ID = "1631441611994369";

export function initMetaPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  const scheduleIdle =
    "requestIdleCallback" in window
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
      : (cb: () => void) => setTimeout(cb, 3000);

  scheduleIdle(() => {
    if (window.fbq) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fbq: any = ((window as any).fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    });
    if (!(window as any)._fbq) (window as any)._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode?.insertBefore(t, s);

    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  });
}

export function trackPageView() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView");
}

export function trackEvent(
  eventName: string,
  data?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (data) {
    window.fbq("track", eventName, data);
  } else {
    window.fbq("track", eventName);
  }
}
