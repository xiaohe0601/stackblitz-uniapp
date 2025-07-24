import { MaybeRefOrGetter, StyleValue, InjectionKey, Ref, ComponentPublicInstance, ComputedRef, Reactive } from 'vue';
import * as Echarts from 'echarts/core';
import { init, SetOptionOpts } from 'echarts/core';

type OptionalValue<T> = T | undefined;
type NullableValue<T> = T | null;
type ExtractValue<T> = T[keyof T];

interface AllowedComponentProps {
    class?: any;
    style?: StyleValue;
}
type Injection<T> = MaybeRefOrGetter<NullableValue<T>>;

type InitType = typeof init;
type InitParameters = Parameters<InitType>;
type ChartTheme = NonNullable<InitParameters[1]>;
type ChartThemeInjection = Injection<ChartTheme>;
type InitOptions = NonNullable<InitParameters[2]>;
type InitOptionsInjection = Injection<InitOptions>;
type UpdateOptions = SetOptionOpts;
type UpdateOptionsInjection = Injection<UpdateOptions>;
type EChartsType = ReturnType<InitType>;
type ZRenderType = ReturnType<EChartsType["getZr"]>;
type ZRenderHandler = ZRenderType["handler"];
type SetOptionType = EChartsType["setOption"];
type ChartOption = Parameters<SetOptionType>[0];
type ChartOptionInjection = Injection<ChartOption>;
interface LoadingOptions {
    text?: string;
    textColor?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    fontStyle?: string;
    fontFamily?: string;
    maskColor?: string;
    showSpinner?: boolean;
    color?: string;
    spinnerRadius?: number;
    lineWidth?: number;
    zlevel?: number;
}
type LoadingOptionsInjection = Injection<LoadingOptions>;

type MinifyEcharts = Pick<typeof Echarts, "init" | "registerPreprocessor" | "setPlatformAPI" | "throttle" | "use">;
declare const ECHARTS_KEY: InjectionKey<MinifyEcharts>;
declare function provideEcharts(echarts: MinifyEcharts): void;
declare function useEcharts(): MinifyEcharts;

type AutoResize = boolean | {
    throttle?: number;
    onResize?: () => void;
};
declare function useAutoresize(chart: Ref<NullableValue<EChartsType>>, { echarts, autoresize, root }: {
    echarts: MinifyEcharts;
    autoresize: MaybeRefOrGetter<AutoResize>;
    root: Ref<NullableValue<ComponentPublicInstance>>;
}): void;

declare const INIT_OPTIONS_KEY: InjectionKey<InitOptionsInjection>;
declare function provideEchartsInitOptions(value: InitOptionsInjection): void;
declare function useEchartsInitOptions(value: MaybeRefOrGetter<OptionalValue<InitOptions>>): {
    injectInitOptions: ComputedRef<NullableValue<InitOptions>>;
    innerInitOptions: ComputedRef<InitOptions>;
};

type VueThis = ComponentPublicInstance;
declare function useVueThis(): VueThis;

interface CanvasRect {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface NormalizedTouch {
    x: number;
    y: number;
    wheelDelta: number;
}
interface GetTouchFuc {
    (event: TouchEvent, touches: Touch[]): NormalizedTouch;
    (event: MouseEvent): NormalizedTouch;
    (event: TouchEvent | MouseEvent, touches?: Touch[]): NormalizedTouch;
}
declare function useEchartsTouch({ vueThis, supportHover, isPc, canvasId, chart, canvasRect, getTouch }: {
    vueThis: VueThis;
    supportHover: MaybeRefOrGetter<boolean>;
    isPc: boolean;
    canvasId: string;
    chart: Ref<NullableValue<EChartsType>>;
    canvasRect: Reactive<CanvasRect>;
    getTouch: GetTouchFuc;
}): {
    onStart: (event: TouchEvent) => void;
    onMove: (event: TouchEvent) => void;
    onEnd: (event: TouchEvent) => void;
};

declare function useEchartsMouseWheel({ isPc, chart, getTouch }: {
    isPc: boolean;
    chart: Ref<NullableValue<EChartsType>>;
    getTouch: GetTouchFuc;
}): void;

declare const OPTION_KEY = "UniEcharts.option";
declare function getEchartsOptionKey(key?: string): string;
declare function provideEchartsOption(value: ChartOptionInjection): void;
declare function provideEchartsOption(key: string, value: ChartOptionInjection): void;
declare function useEchartsOption(key: OptionalValue<string>, value: MaybeRefOrGetter<OptionalValue<ChartOption>>): {
    injectOption: ComputedRef<NullableValue<ChartOption>>;
    innerOption: ComputedRef<NullableValue<ChartOption>>;
};

declare const THEME_KEY: InjectionKey<ChartThemeInjection>;
declare function provideEchartsTheme(value: ChartThemeInjection): void;
declare function useEchartsTheme(value: MaybeRefOrGetter<OptionalValue<ChartTheme>>): {
    injectTheme: ComputedRef<NullableValue<ChartTheme>>;
    innerTheme: ComputedRef<ChartTheme>;
};

declare const UPDATE_OPTIONS_KEY: InjectionKey<UpdateOptionsInjection>;
declare function provideEchartsUpdateOptions(value: UpdateOptionsInjection): void;
declare function useEchartsUpdateOptions(value: MaybeRefOrGetter<OptionalValue<UpdateOptions>>): {
    injectUpdateOptions: ComputedRef<NullableValue<UpdateOptions>>;
    innerUpdateOptions: ComputedRef<UpdateOptions>;
};

declare const LOADING_OPTIONS_KEY: InjectionKey<LoadingOptionsInjection>;
declare function provideEchartsLoadingOptions(value: LoadingOptionsInjection): void;
declare function useLoading(chart: Ref<NullableValue<EChartsType>>, { loading, loadingOptions }: {
    loading: MaybeRefOrGetter<boolean>;
    loadingOptions: MaybeRefOrGetter<OptionalValue<LoadingOptions>>;
}): void;

declare const ECHARTS_APIS: readonly ["getWidth", "getHeight", "getDom", "getOption", "dispatchAction", "convertToPixel", "convertFromPixel", "containPixel", "getDataURL", "getConnectedDataURL", "appendData", "clear", "isDisposed", "dispose"];
type EChartsApi = (typeof ECHARTS_APIS)[number];
type PublicApi = Pick<EChartsType, EChartsApi>;
declare function usePublicApi(chart: Ref<NullableValue<EChartsType>>): PublicApi;

declare function useUid(): number;

type CanvasNode = UniApp.NodeCallbackResult["node"];
type CanvasContext = UniApp.CanvasContext;
declare class UniCanvas {
    tagName: "canvas";
    attrs: Record<string, any>;
    canvasId: string;
    context: CanvasContext;
    canvasNode: NullableValue<CanvasNode>;
    private _emitter;
    constructor(canvasId: string, context: CanvasContext, canvasNode: NullableValue<CanvasNode>);
    private _setupContext;
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    getContext(type: "2d"): OptionalValue<CanvasContext>;
    setAttribute(key: string, value: any): void;
    getAttribute(key: string): any;
    addEventListener(type: string, listener: (event: Event) => void): void;
    removeEventListener(type: string, listener: (event: Event) => void): void;
    dispatchEvent(type: string | Event, event?: Event): boolean;
    attachEvent(): void;
    detachEvent(): void;
    toTempFilePath(options?: Omit<UniApp.CanvasToTempFilePathOptions, "canvasId" | "canvas">): Promise<UniApp.CanvasToTempFilePathRes>;
    static parseFontSize(font: string): number;
    static normalizeColor(context: CanvasContext, color: string | object): string | object;
    static dispatch(handler: ZRenderHandler, event: Parameters<ZRenderHandler["dispatch"]>[0], touch: Parameters<ZRenderHandler["dispatch"]>[1]): void;
}
declare class UniImage {
    tagName: "img";
    width: number;
    height: number;
    onload?: (res: UniApp.GetImageInfoSuccessData) => void;
    onerror?: (err: any) => void;
    private _src;
    constructor();
    get src(): NullableValue<string>;
    set src(value: string);
}
declare function setupEchartsCanvas(echarts: MinifyEcharts, { canvas, node }: {
    canvas: UniCanvas;
    node: NullableValue<CanvasNode>;
}): void;

declare function getIsPc(): boolean;

declare const Platform: {
    readonly APP: "APP";
    readonly APP_ANDROID: "APP-ANDROID";
    readonly APP_IOS: "APP-IOS";
    readonly APP_HARMONY: "APP-HARMONY";
    readonly WEB: "WEB";
    readonly MP: "MP";
    readonly MP_WEIXIN: "MP-WEIXIN";
    readonly MP_ALIPAY: "MP-ALIPAY";
    readonly MP_BAIDU: "MP-BAIDU";
    readonly MP_TOUTIAO: "MP-TOUTIAO";
    readonly MP_LARK: "MP-LARK";
    readonly MP_QQ: "MP-QQ";
    readonly MP_KUAISHOU: "MP-KUAISHOU";
    readonly MP_JD: "MP-JD";
    readonly MP_360: "MP-360";
    readonly MP_XHS: "MP-XHS";
    readonly MP_HARMONY: "MP-HARMONY";
    readonly QUICKAPP_WEBVIEW: "QUICKAPP-WEBVIEW";
    readonly QUICKAPP_WEBVIEW_UNION: "QUICKAPP-WEBVIEW-UNION";
    readonly QUICKAPP_WEBVIEW_HUAWEI: "QUICKAPP-WEBVIEW-HUAWEI";
    readonly OTHER: "OTHER";
};
type PlatformType = ExtractValue<typeof Platform>;
declare function getPlatform(): PlatformType;
declare const platform: ExtractValue<{
    readonly APP: "APP";
    readonly APP_ANDROID: "APP-ANDROID";
    readonly APP_IOS: "APP-IOS";
    readonly APP_HARMONY: "APP-HARMONY";
    readonly WEB: "WEB";
    readonly MP: "MP";
    readonly MP_WEIXIN: "MP-WEIXIN";
    readonly MP_ALIPAY: "MP-ALIPAY";
    readonly MP_BAIDU: "MP-BAIDU";
    readonly MP_TOUTIAO: "MP-TOUTIAO";
    readonly MP_LARK: "MP-LARK";
    readonly MP_QQ: "MP-QQ";
    readonly MP_KUAISHOU: "MP-KUAISHOU";
    readonly MP_JD: "MP-JD";
    readonly MP_360: "MP-360";
    readonly MP_XHS: "MP-XHS";
    readonly MP_HARMONY: "MP-HARMONY";
    readonly QUICKAPP_WEBVIEW: "QUICKAPP-WEBVIEW";
    readonly QUICKAPP_WEBVIEW_UNION: "QUICKAPP-WEBVIEW-UNION";
    readonly QUICKAPP_WEBVIEW_HUAWEI: "QUICKAPP-WEBVIEW-HUAWEI";
    readonly OTHER: "OTHER";
}>;
/** App */
declare const isApp: boolean;
/** App Android */
declare const isAppAndroid: boolean;
/** App iOS */
declare const isAppIos: boolean;
/** App HarmonyOS Next */
declare const isAppHarmony: boolean;
/** Web */
declare const isWeb: boolean;
/** 小程序 */
declare const isMp: boolean;
/** 微信小程序 */
declare const isMpWeixin: boolean;
/** 支付宝小程序 */
declare const isMpAlipay: boolean;
/** 百度小程序 */
declare const isMpBaidu: boolean;
/** 头条小程序 */
declare const isMpToutiao: boolean;
/** 飞书小程序 */
declare const isMpLark: boolean;
/** QQ小程序 */
declare const isMpQq: boolean;
/** 快手小程序 */
declare const isMpKuaishou: boolean;
/** 京东小程序 */
declare const isMpJd: boolean;
/** 360小程序 */
declare const isMp360: boolean;
/** 小红书小程序 */
declare const isMpXhs: boolean;
/** 鸿蒙元服务 */
declare const isMpHarmony: boolean;
/** 快应用 */
declare const isQuickappWebview: boolean;
/** 快应用联盟 */
declare const isQuickappWebviewUnion: boolean;
/** 快应用华为 */
declare const isQuickappWebviewHuawei: boolean;
/** 其他平台 */
declare const isOtherPlatform: boolean;

declare function isEmpty(value: unknown): boolean;
declare function defaultTo<T = any>(value: unknown, ...defaultValues: unknown[]): T;
declare function sleep(timeout?: number): Promise<void>;
declare function upperFirst(value: string): string;
declare function lowerFirst(value: string): string;

type EventType = string | symbol;
type Handler<T = unknown> = (event: T) => void;
type WildcardHandler<T = Record<string, unknown>> = (topic: keyof T, event: T[keyof T]) => void;
type EventHandlerList<T = unknown> = Array<Handler<T>>;
type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;
type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<keyof Events | "*", EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>>;
interface Emitter<Events extends Record<EventType, unknown>> {
    events: EventHandlerMap<Events>;
    on<Topic extends keyof Events>(topic: Topic, handler: Handler<Events[Topic]>): void;
    on(topic: "*", handler: WildcardHandler<Events>): void;
    off<Topic extends keyof Events>(topic: Topic, handler?: Handler<Events[Topic]>): void;
    off(topic: "*", handler: WildcardHandler<Events>): void;
    emit<Topic extends keyof Events>(topic: Topic, event: Events[Topic]): void;
    emit<Topic extends keyof Events>(topic: undefined extends Events[Topic] ? Topic : never): void;
}
declare function mitt<Events extends Record<EventType, unknown>>(events?: EventHandlerMap<Events>): Emitter<Events>;

declare function getDeviceInfo(): UniApp.GetDeviceInfoResult | UniApp.GetSystemInfoResult;
declare function getWindowInfo(): UniApp.GetWindowInfoResult | UniApp.GetSystemInfoResult;
declare function getAppBaseInfo(): UniApp.GetAppBaseInfoResult | UniApp.GetSystemInfoResult;
declare function getVersion(): string;
declare function compareVersion(v1: string, v2: string): 0 | 1 | -1;
declare function canIUseCanvas2d(): boolean;
declare function querySelect(component: VueThis, selector: string, fields: UniApp.NodeField): Promise<UniApp.NodeInfo>;

export { ECHARTS_KEY, INIT_OPTIONS_KEY, LOADING_OPTIONS_KEY, OPTION_KEY, Platform, THEME_KEY, UPDATE_OPTIONS_KEY, UniCanvas, UniImage, canIUseCanvas2d, compareVersion, defaultTo, getAppBaseInfo, getDeviceInfo, getEchartsOptionKey, getIsPc, getPlatform, getVersion, getWindowInfo, isApp, isAppAndroid, isAppHarmony, isAppIos, isEmpty, isMp, isMp360, isMpAlipay, isMpBaidu, isMpHarmony, isMpJd, isMpKuaishou, isMpLark, isMpQq, isMpToutiao, isMpWeixin, isMpXhs, isOtherPlatform, isQuickappWebview, isQuickappWebviewHuawei, isQuickappWebviewUnion, isWeb, lowerFirst, mitt, platform, provideEcharts, provideEchartsInitOptions, provideEchartsLoadingOptions, provideEchartsOption, provideEchartsTheme, provideEchartsUpdateOptions, querySelect, setupEchartsCanvas, sleep, upperFirst, useAutoresize, useEcharts, useEchartsInitOptions, useEchartsMouseWheel, useEchartsOption, useEchartsTheme, useEchartsTouch, useEchartsUpdateOptions, useLoading, usePublicApi, useUid, useVueThis };
export type { AllowedComponentProps, AutoResize, CanvasContext, CanvasNode, CanvasRect, ChartOption, ChartOptionInjection, ChartTheme, ChartThemeInjection, EChartsType, Emitter, EventHandlerList, EventHandlerMap, EventType, ExtractValue, GetTouchFuc, Handler, InitOptions, InitOptionsInjection, InitParameters, Injection, LoadingOptions, LoadingOptionsInjection, MinifyEcharts, NormalizedTouch, NullableValue, OptionalValue, PlatformType, PublicApi, UpdateOptions, UpdateOptionsInjection, VueThis, WildCardEventHandlerList, WildcardHandler, ZRenderHandler, ZRenderType };
