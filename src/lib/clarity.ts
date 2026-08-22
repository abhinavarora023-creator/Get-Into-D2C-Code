declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity?: (...args: any[]) => void;
  }
}

const CLARITY_PROJECT_ID = "y4fajds6ea";

export function initClarity() {
  if (typeof window === "undefined") return;
  if (window.clarity) return;

  const scheduleIdle =
    "requestIdleCallback" in window
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
      : (cb: () => void) => setTimeout(cb, 3000);

  scheduleIdle(() => {
    if (window.clarity) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] =
        c[a] ||
        function () {
          // eslint-disable-next-line prefer-rest-params
          (c[a].q = c[a].q || []).push(arguments);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      } else {
        document.head.appendChild(t);
      }
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  });
}
