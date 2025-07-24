import { watch, provide, inject, computed, toValue, onMounted, onBeforeUnmount, shallowRef, watchEffect, getCurrentInstance } from 'vue';
import { throttle, use, setPlatformAPI, registerPreprocessor, init } from 'echarts/core';

function useAutoresize(chart, {
  echarts,
  autoresize,
  root
}) {
  watch(
    [chart, autoresize, root],
    (values, _, onCleanup) => {
      const _chart = values[0];
      const _autoresize = values[1];
      const _root = values[2];
      let observer = null;
      if (_chart != null && _root != null && _autoresize) {
        const { offsetWidth, offsetHeight } = _root.$el;
        const autoresizeOptions = _autoresize === true ? {} : _autoresize;
        const { throttle: wait = 100, onResize } = autoresizeOptions;
        let triggered = false;
        const callback = () => {
          _chart.resize({
            width: _root.$el.offsetWidth,
            height: _root.$el.offsetHeight
          });
          if (onResize != null) {
            onResize();
          }
        };
        const resizeCallback = wait ? echarts.throttle(callback, wait) : callback;
        observer = new ResizeObserver(() => {
          if (!triggered) {
            triggered = true;
            if (_root.$el.offsetWidth === offsetWidth && _root.$el.offsetHeight === offsetHeight) {
              return;
            }
          }
          if (_root.$el.offsetWidth === 0 || _root.$el.offsetHeight === 0) {
            return;
          }
          resizeCallback();
        });
        observer.observe(_root.$el);
      }
      onCleanup(() => {
        if (observer == null) {
          return;
        }
        observer.disconnect();
        observer = null;
      });
    }
  );
}

const ECHARTS_KEY = Symbol("UniEcharts.echarts");
function provideEcharts(echarts) {
  provide(ECHARTS_KEY, echarts);
}
function useEcharts() {
  return inject(ECHARTS_KEY, {
    init,
    registerPreprocessor,
    setPlatformAPI,
    use,
    throttle
  });
}

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
}
function defaultTo(value, ...defaultValues) {
  if (defaultValues.length === 0) {
    return value;
  }
  if (value == null || value !== value) {
    return defaultTo(defaultValues[0], ...defaultValues.slice(1));
  }
  return value;
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function upperFirst(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function lowerFirst(value) {
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function mitt(events) {
  const _events = defaultTo(events, /* @__PURE__ */ new Map());
  return {
    events: _events,
    on(topic, handler) {
      const handlers = _events.get(topic);
      if (handlers) {
        handlers.push(handler);
      } else {
        _events.set(topic, [handler]);
      }
    },
    off(topic, handler) {
      const handlers = _events.get(topic);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          _events.set(topic, []);
        }
      }
    },
    emit(topic, event) {
      const handlers = _events.get(topic);
      if (handlers) {
        for (const handler of handlers.slice()) {
          handler(event);
        }
      }
      const hdlrs = _events.get("*");
      if (hdlrs) {
        for (const handler of hdlrs.slice()) {
          handler(topic, event);
        }
      }
    }
  };
}

const Platform = {
  APP: "APP",
  APP_ANDROID: "APP-ANDROID",
  APP_IOS: "APP-IOS",
  APP_HARMONY: "APP-HARMONY",
  WEB: "WEB",
  MP: "MP",
  MP_WEIXIN: "MP-WEIXIN",
  MP_ALIPAY: "MP-ALIPAY",
  MP_BAIDU: "MP-BAIDU",
  MP_TOUTIAO: "MP-TOUTIAO",
  MP_LARK: "MP-LARK",
  MP_QQ: "MP-QQ",
  MP_KUAISHOU: "MP-KUAISHOU",
  MP_JD: "MP-JD",
  MP_360: "MP-360",
  MP_XHS: "MP-XHS",
  MP_HARMONY: "MP-HARMONY",
  QUICKAPP_WEBVIEW: "QUICKAPP-WEBVIEW",
  QUICKAPP_WEBVIEW_UNION: "QUICKAPP-WEBVIEW-UNION",
  QUICKAPP_WEBVIEW_HUAWEI: "QUICKAPP-WEBVIEW-HUAWEI",
  OTHER: "OTHER"
};
function getPlatform() {
  let platform2 = Platform.OTHER;
  // #ifdef APP
  platform2 = Platform.APP;
  // #endif
  // #ifdef APP-ANDROID
  platform2 = Platform.APP_ANDROID;
  // #endif
  // #ifdef APP-IOS
  platform2 = Platform.APP_IOS;
  // #endif
  // #ifdef APP-HARMONY
  platform2 = Platform.APP_HARMONY;
  // #endif
  // #ifdef WEB
  platform2 = Platform.WEB;
  // #endif
  // #ifdef MP
  platform2 = Platform.MP;
  // #endif
  // #ifdef MP-WEIXIN
  platform2 = Platform.MP_WEIXIN;
  // #endif
  // #ifdef MP-ALIPAY
  platform2 = Platform.MP_ALIPAY;
  // #endif
  // #ifdef MP-BAIDU
  platform2 = Platform.MP_BAIDU;
  // #endif
  // #ifdef MP-TOUTIAO
  platform2 = Platform.MP_TOUTIAO;
  // #endif
  // #ifdef MP-LARK
  platform2 = Platform.MP_LARK;
  // #endif
  // #ifdef MP-QQ
  platform2 = Platform.MP_QQ;
  // #endif
  // #ifdef MP-KUAISHOU
  platform2 = Platform.MP_KUAISHOU;
  // #endif
  // #ifdef MP-JD
  platform2 = Platform.MP_JD;
  // #endif
  // #ifdef MP-360
  platform2 = Platform.MP_360;
  // #endif
  // #ifdef MP-XHS
  platform2 = Platform.MP_XHS;
  // #endif
  // #ifdef MP-HARMONY
  platform2 = Platform.MP_HARMONY;
  // #endif
  // #ifdef QUICKAPP-WEBVIEW
  platform2 = Platform.QUICKAPP_WEBVIEW;
  // #endif
  // #ifdef QUICKAPP-WEBVIEW-UNION
  platform2 = Platform.QUICKAPP_WEBVIEW_UNION;
  // #endif
  // #ifdef QUICKAPP-WEBVIEW-HUAWEI
  platform2 = Platform.QUICKAPP_WEBVIEW_HUAWEI;
  // #endif
  return platform2;
}
const platform = getPlatform();
const isApp = platform === Platform.APP;
const isAppAndroid = platform === Platform.APP_ANDROID;
const isAppIos = platform === Platform.APP_IOS;
const isAppHarmony = platform === Platform.APP_HARMONY;
const isWeb = platform === Platform.WEB;
const isMp = platform === Platform.MP;
const isMpWeixin = platform === Platform.MP_WEIXIN;
const isMpAlipay = platform === Platform.MP_ALIPAY;
const isMpBaidu = platform === Platform.MP_BAIDU;
const isMpToutiao = platform === Platform.MP_TOUTIAO;
const isMpLark = platform === Platform.MP_LARK;
const isMpQq = platform === Platform.MP_QQ;
const isMpKuaishou = platform === Platform.MP_KUAISHOU;
const isMpJd = platform === Platform.MP_JD;
const isMp360 = platform === Platform.MP_360;
const isMpXhs = platform === Platform.MP_XHS;
const isMpHarmony = platform === Platform.MP_HARMONY;
const isQuickappWebview = platform === Platform.QUICKAPP_WEBVIEW;
const isQuickappWebviewUnion = platform === Platform.QUICKAPP_WEBVIEW_UNION;
const isQuickappWebviewHuawei = platform === Platform.QUICKAPP_WEBVIEW_HUAWEI;
const isOtherPlatform = platform === Platform.OTHER;

function getDeviceInfo() {
  if (uni.canIUse("getDeviceInfo") || uni.getDeviceInfo) {
    return uni.getDeviceInfo();
  } else {
    return uni.getSystemInfoSync();
  }
}
function getWindowInfo() {
  if (uni.canIUse("getWindowInfo") || uni.getWindowInfo) {
    return uni.getWindowInfo();
  } else {
    return uni.getSystemInfoSync();
  }
}
function getAppBaseInfo() {
  if (uni.canIUse("getAppBaseInfo") || uni.getAppBaseInfo) {
    return uni.getAppBaseInfo();
  } else {
    return uni.getSystemInfoSync();
  }
}
function getVersion() {
  if (isMpAlipay) {
    return my.SDKVersion;
  }
  return getAppBaseInfo().SDKVersion;
}
function compareVersion(v1, v2) {
  const s1 = v1.split(".");
  const s2 = v2.split(".");
  for (let i = 0; i < Math.max(s1.length, s2.length); i += 1) {
    const num1 = Number.parseInt(defaultTo(s1[i], "0"));
    const num2 = Number.parseInt(defaultTo(s2[i], "0"));
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
function gte(version) {
  return compareVersion(getVersion(), version) >= 0;
}
function canIUseCanvas2d() {
  if (isMpWeixin) {
    if (getDeviceInfo().platform === "mac") {
      return false;
    }
    return gte("2.9.0");
  }
  if (isMpAlipay) {
    return gte("2.7.0");
  }
  if (isMpToutiao) {
    return gte("1.78.0");
  }
  return false;
}
function querySelect(component, selector, fields) {
  return new Promise((resolve, reject) => {
    uni.createSelectorQuery().in(component).select(selector).fields(fields, () => {
    }).exec(([node]) => {
      if (node) {
        resolve(node);
      } else {
        reject();
      }
    });
  });
}

const SHORT_HEX_REGEX = /#([0-9a-f])([0-9a-f])([0-9a-f])\b/gi;
class UniCanvas {
  tagName = "canvas";
  attrs = {};
  canvasId;
  context;
  canvasNode;
  _emitter;
  constructor(canvasId, context, canvasNode) {
    this.canvasId = canvasId;
    this.context = context;
    this.canvasNode = canvasNode;
    if (canvasNode == null) {
      this._setupContext(context);
    }
    this._emitter = mitt();
  }
  _setupContext(context) {
    const styles = [
      "fillStyle",
      "fontSize",
      "globalAlpha",
      "lineCap",
      "lineDash",
      "lineJoin",
      "lineWidth",
      "miterLimit",
      "strokeStyle",
      "textAlign",
      "textBaseline",
      "opacity",
      "shadowOffsetX",
      "shadowOffsetY",
      "shadowBlur",
      "shadowColor",
      "font"
    ];
    const shadow = {
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      color: "#000000"
    };
    for (const key of styles) {
      Object.defineProperty(context, key, {
        set(value) {
          if (key === "opacity") {
            context.setGlobalAlpha(value);
            return;
          }
          if (key === "font") {
            context.setFontSize(UniCanvas.parseFontSize(value));
            return;
          }
          if (key.indexOf("shadow") === 0) {
            if (key !== "shadowColor") {
              shadow[lowerFirst(key.slice(6))] = value;
            } else {
              shadow.color = UniCanvas.normalizeColor(context, value);
              context.setShadow(
                shadow.offsetX,
                shadow.offsetY,
                shadow.blur,
                shadow.color
              );
            }
            return;
          }
          if (key === "fillStyle" || key === "strokeStyle") {
            value = UniCanvas.normalizeColor(context, value);
          }
          context[`set${upperFirst(key)}`](value);
        }
      });
    }
    const _drawImage = context.drawImage;
    context.drawImage = (...args) => {
      _drawImage(args[0].src, ...args.slice(1));
    };
    if (context.strokeText == null) {
      context.strokeText = (...args) => {
        context.fillText(...args);
      };
    }
    if (context.createRadialGradient == null) {
      context.createRadialGradient = (...args) => {
        return context.createCircularGradient(...args.slice(-3));
      };
    }
    if (context.measureText == null || getDeviceInfo().osName === "harmonyos") {
      const strlen = (str) => {
        let len = 0;
        for (let i = 0; i < str.length; i += 1) {
          const unicode = str.charCodeAt(i);
          if (unicode > 0 && unicode < 128) {
            len += 1;
          } else {
            len += 2;
          }
        }
        return len;
      };
      context.measureText = (text, font) => {
        const fontSize = defaultTo(
          // @ts-expect-error whatever
          context.state && context.state.fontSize,
          UniCanvas.parseFontSize(font),
          12
        ) / 2;
        const factor = fontSize >= 16 ? 1.3 : 1;
        return {
          width: strlen(text) * fontSize * factor
        };
      };
    }
  }
  get width() {
    if (this.canvasNode == null) {
      return this.getAttribute("width");
    }
    return this.canvasNode.width;
  }
  set width(value) {
    if (this.canvasNode == null) {
      this.setAttribute("width", value);
      return;
    }
    this.canvasNode.width = value;
  }
  get height() {
    if (this.canvasNode == null) {
      return this.getAttribute("height");
    }
    return this.canvasNode.height;
  }
  set height(value) {
    if (this.canvasNode == null) {
      this.setAttribute("height", value);
      return;
    }
    this.canvasNode.height = value;
  }
  getContext(type) {
    if (type === "2d") {
      return this.context;
    }
  }
  setAttribute(key, value) {
    this.attrs[key] = value;
  }
  getAttribute(key) {
    return this.attrs[key];
  }
  addEventListener(type, listener) {
    this._emitter.on(type, listener);
  }
  removeEventListener(type, listener) {
    this._emitter.off(type, listener);
  }
  dispatchEvent(type, event) {
    if (typeof type === "object") {
      this._emitter.emit(type.type, type);
    } else {
      this._emitter.emit(type, event);
    }
    return true;
  }
  attachEvent() {
  }
  detachEvent() {
  }
  toTempFilePath(options = {}) {
    const opts = {};
    if (this.canvasNode != null) {
      opts.canvas = this.canvasNode;
    } else {
      opts.canvasId = this.canvasId;
    }
    return uni.canvasToTempFilePath({
      ...opts,
      ...options
    });
  }
  static parseFontSize(font) {
    return Number.parseFloat(defaultTo(font, "").match(/([\d.]+)px/)[1]);
  }
  static normalizeColor(context, color) {
    if (typeof color === "string") {
      // #ifdef MP-TOUTIAO
      SHORT_HEX_REGEX.lastIndex = 0;
      if (SHORT_HEX_REGEX.test(color)) {
        return color.replace(SHORT_HEX_REGEX, "#$1$1$2$2$3$3");
      }
      // #endif
    }
    return color;
  }
  static dispatch(handler, event, touch) {
    handler.dispatch(event, {
      zrX: touch.x,
      zrY: touch.y,
      zrDelta: touch.wheelDelta,
      preventDefault: () => {
      },
      stopImmediatePropagation: () => {
      },
      stopPropagation: () => {
      }
    });
  }
}
class UniImage {
  tagName = "img";
  width;
  height;
  onload;
  onerror;
  _src;
  constructor() {
    this._src = null;
    this.width = 0;
    this.height = 0;
  }
  get src() {
    return this._src;
  }
  set src(value) {
    this._src = value;
    uni.getImageInfo({
      src: value,
      success: (res) => {
        this.width = res.width;
        this.height = res.height;
        if (this.onload) {
          this.onload(res);
        }
      },
      fail: (err) => {
        if (this.onerror) {
          this.onerror(err);
        }
      }
    });
  }
}
function setupEchartsCanvas(echarts, {
  canvas,
  node
}) {
  echarts.registerPreprocessor((option) => {
    if (option == null) {
      return;
    }
    if (option.series != null) {
      if (Array.isArray(option.series)) {
        if (!isEmpty(option.series)) {
          for (const item of option.series) {
            item.progressive = 0;
          }
        }
      } else if (typeof option.series === "object") {
        option.series.progressive = 0;
      }
    }
  });
  const loadImage = (src, onload, onerror) => {
    if (node != null && node.createImage) {
      const image2 = node.createImage();
      image2.onload = onload;
      image2.onerror = onerror;
      image2.src = src;
      return image2;
    }
    const image = new UniImage();
    image.onload = onload;
    image.onerror = onerror;
    image.src = src;
    return image;
  };
  echarts.setPlatformAPI({
    loadImage: node != null ? loadImage : void 0,
    createCanvas() {
      return canvas;
    }
  });
}

function getIsPc() {
  // #ifdef WEB
  if (!("ontouchstart" in window)) {
    return true;
  }
  // #endif
  if (isMpWeixin || isMpToutiao || isMpAlipay) {
    return /windows/i.test(getDeviceInfo().platform);
  }
  return false;
}

const INIT_OPTIONS_KEY = Symbol("UniEcharts.initOptions");
function provideEchartsInitOptions(value) {
  provide(INIT_OPTIONS_KEY, value);
}
function useEchartsInitOptions(value) {
  const injectInitOptions = inject(INIT_OPTIONS_KEY, null);
  const unwrapInjectInitOptions = computed(() => {
    return toValue(injectInitOptions);
  });
  const innerInitOptions = computed(() => {
    return defaultTo(toValue(value), unwrapInjectInitOptions.value, {});
  });
  return {
    injectInitOptions: unwrapInjectInitOptions,
    innerInitOptions
  };
}

function useEchartsMouseWheel({
  isPc,
  chart,
  getTouch
}) {
  function mouseWheelHandler(event) {
    if (chart.value == null) {
      return;
    }
    const { handler } = chart.value.getZr();
    UniCanvas.dispatch(handler, "mousewheel", getTouch(event));
  }
  onMounted(() => {
    if (isPc) {
      document.addEventListener("wheel", mouseWheelHandler);
    }
  });
  onBeforeUnmount(() => {
    if (isPc) {
      document.removeEventListener("wheel", mouseWheelHandler);
    }
  });
}

const OPTION_KEY = "UniEcharts.option";
function getEchartsOptionKey(key) {
  if (isEmpty(key)) {
    return OPTION_KEY;
  }
  return `${OPTION_KEY}_${key}`;
}
function provideEchartsOption(keyOrValue, value) {
  if (typeof keyOrValue === "string") {
    provide(getEchartsOptionKey(keyOrValue), value);
    return;
  }
  provide(getEchartsOptionKey(), keyOrValue);
}
function useEchartsOption(key, value) {
  const injectOption = inject(getEchartsOptionKey(key), null);
  const unwrapInjectOption = computed(() => {
    return toValue(injectOption);
  });
  const innerOption = computed(() => {
    return defaultTo(toValue(value), unwrapInjectOption.value);
  });
  return {
    injectOption: unwrapInjectOption,
    innerOption
  };
}

const THEME_KEY = Symbol("UniEcharts.theme");
function provideEchartsTheme(value) {
  provide(THEME_KEY, value);
}
function useEchartsTheme(value) {
  const injectTheme = inject(THEME_KEY, null);
  const unwrapInjectTheme = computed(() => {
    return toValue(injectTheme);
  });
  const innerTheme = computed(() => {
    return defaultTo(toValue(value), unwrapInjectTheme.value, {});
  });
  return {
    injectTheme: unwrapInjectTheme,
    innerTheme
  };
}

function useEchartsTouch({
  vueThis,
  supportHover,
  isPc,
  canvasId,
  chart,
  canvasRect,
  getTouch
}) {
  const touching = shallowRef(false);
  const state = {
    x: 0,
    y: 0,
    t: 0
  };
  let timer = 0;
  function destroyTimer() {
    if (timer === 0) {
      return;
    }
    clearTimeout(timer);
    timer = 0;
  }
  function normalizeTouches(touches) {
    if (Array.isArray(touches)) {
      return touches;
    }
    if (typeof touches === "object" && touches != null) {
      return Object.values(touches);
    }
    return touches;
  }
  function transformTouchesEvent(event) {
    for (let i = 0; i < event.touches.length; i += 1) {
      const item = event.touches[i];
      item.offsetX = item.x;
      item.offsetY = item.y;
    }
    return event;
  }
  function onStart(event) {
    touching.value = true;
    const next = () => {
      if (chart.value == null) {
        return;
      }
      const touch = getTouch(event, normalizeTouches(event.touches));
      state.x = touch.x;
      state.y = touch.y;
      state.t = Date.now();
      const { handler } = chart.value.getZr();
      UniCanvas.dispatch(handler, "mousedown", touch);
      UniCanvas.dispatch(handler, "mousemove", touch);
      handler.processGesture(transformTouchesEvent(event), "start");
      destroyTimer();
    };
    if (isPc) {
      querySelect(vueThis, `#${canvasId}`, {
        rect: true
      }).then(({ top, left }) => {
        canvasRect.top = top;
        canvasRect.left = left;
        next();
      });
      return;
    }
    next();
  }
  function onMove(event) {
    if (isPc && toValue(supportHover) && !touching.value) {
      touching.value = true;
    }
    if (chart.value == null || !touching.value) {
      return;
    }
    const { handler } = chart.value.getZr();
    UniCanvas.dispatch(handler, "mousemove", getTouch(event, normalizeTouches(event.touches)));
    handler.processGesture(transformTouchesEvent(event), "change");
  }
  function onEnd(event) {
    touching.value = false;
    if (chart.value == null) {
      return;
    }
    const touch = getTouch(event, normalizeTouches(event.changedTouches));
    const { handler } = chart.value.getZr();
    UniCanvas.dispatch(handler, "mouseup", touch);
    handler.processGesture(transformTouchesEvent(event), "end");
    const isClick = Math.abs(touch.x - state.x) < 10 && Date.now() - state.t < 200;
    if (isClick) {
      UniCanvas.dispatch(handler, "click", touch);
    } else {
      if (timer > 0) {
        destroyTimer();
      }
      timer = setTimeout(() => {
        UniCanvas.dispatch(handler, "mousemove", { x: 999999999, y: 999999999 });
        UniCanvas.dispatch(handler, "mouseup", { x: 999999999, y: 999999999 });
      }, 50);
    }
  }
  return {
    onStart,
    onMove,
    onEnd
  };
}

const UPDATE_OPTIONS_KEY = Symbol("UniEcharts.updateOptions");
function provideEchartsUpdateOptions(value) {
  provide(UPDATE_OPTIONS_KEY, value);
}
function useEchartsUpdateOptions(value) {
  const injectUpdateOptions = inject(UPDATE_OPTIONS_KEY, null);
  const unwrapInjectUpdateOptions = computed(() => {
    return toValue(injectUpdateOptions);
  });
  const innerUpdateOptions = computed(() => {
    return defaultTo(toValue(value), unwrapInjectUpdateOptions.value, {});
  });
  return {
    injectUpdateOptions: unwrapInjectUpdateOptions,
    innerUpdateOptions
  };
}

const LOADING_OPTIONS_KEY = Symbol("UniEcharts.loadingOptions");
function provideEchartsLoadingOptions(value) {
  provide(LOADING_OPTIONS_KEY, value);
}
function useLoading(chart, {
  loading,
  loadingOptions
}) {
  const injectLoadingOptions = inject(LOADING_OPTIONS_KEY, null);
  const unwrapInjectLoadingOptions = computed(() => {
    return toValue(injectLoadingOptions);
  });
  const innerLoadingOptions = computed(() => {
    return {
      ...defaultTo(unwrapInjectLoadingOptions.value, {}),
      ...defaultTo(toValue(loadingOptions), {})
    };
  });
  watchEffect(() => {
    const instance = chart.value;
    if (instance == null) {
      return;
    }
    if (toValue(loading)) {
      instance.showLoading(innerLoadingOptions.value);
    } else {
      instance.hideLoading();
    }
  });
}

const ECHARTS_APIS = [
  "getWidth",
  "getHeight",
  "getDom",
  "getOption",
  "dispatchAction",
  "convertToPixel",
  "convertFromPixel",
  "containPixel",
  "getDataURL",
  "getConnectedDataURL",
  "appendData",
  "clear",
  "isDisposed",
  "dispose"
];
function usePublicApi(chart) {
  function makePublicMethod(name) {
    return (...args) => {
      if (chart.value == null) {
        throw new Error("ECharts is not initialized yet.");
      }
      return chart.value[name].apply(chart.value, args);
    };
  }
  function makePublicMethods() {
    const methods = /* @__PURE__ */ Object.create(null);
    for (const name of ECHARTS_APIS) {
      methods[name] = makePublicMethod(name);
    }
    return methods;
  }
  return makePublicMethods();
}

let uid = 0;
function useUid() {
  uid += 1;
  return uid;
}

function useVueThis() {
  const vm = getCurrentInstance();
  return vm.proxy;
}

export { ECHARTS_KEY, INIT_OPTIONS_KEY, LOADING_OPTIONS_KEY, OPTION_KEY, Platform, THEME_KEY, UPDATE_OPTIONS_KEY, UniCanvas, UniImage, canIUseCanvas2d, compareVersion, defaultTo, getAppBaseInfo, getDeviceInfo, getEchartsOptionKey, getIsPc, getPlatform, getVersion, getWindowInfo, isApp, isAppAndroid, isAppHarmony, isAppIos, isEmpty, isMp, isMp360, isMpAlipay, isMpBaidu, isMpHarmony, isMpJd, isMpKuaishou, isMpLark, isMpQq, isMpToutiao, isMpWeixin, isMpXhs, isOtherPlatform, isQuickappWebview, isQuickappWebviewHuawei, isQuickappWebviewUnion, isWeb, lowerFirst, mitt, platform, provideEcharts, provideEchartsInitOptions, provideEchartsLoadingOptions, provideEchartsOption, provideEchartsTheme, provideEchartsUpdateOptions, querySelect, setupEchartsCanvas, sleep, upperFirst, useAutoresize, useEcharts, useEchartsInitOptions, useEchartsMouseWheel, useEchartsOption, useEchartsTheme, useEchartsTouch, useEchartsUpdateOptions, useLoading, usePublicApi, useUid, useVueThis };
