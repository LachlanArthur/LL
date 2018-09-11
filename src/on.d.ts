declare type MaybeArray<T> = T | Array<T>;
export declare function on<E extends HTMLElement, K extends keyof HTMLElementEventMap>(elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>, events: MaybeArray<K>, targetFilter?: string): (listener: MaybeArray<(this: E, ev: HTMLElementEventMap[K]) => any>, options?: boolean | AddEventListenerOptions) => void;
export declare function on<E extends SVGElement, K extends keyof SVGElementEventMap>(elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>, events: MaybeArray<K>, targetFilter?: string): (listener: MaybeArray<(this: E, ev: SVGElementEventMap[K]) => any>, options?: boolean | AddEventListenerOptions) => void;
export declare function on<E extends Element>(elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>, events: MaybeArray<string>, targetFilter?: string): (listener: MaybeArray<(this: E, ev: Event) => any>, options?: boolean | AddEventListenerOptions) => void;
export {};
