export declare function $<K extends keyof HTMLElementTagNameMap>(selectors: K, parent?: HTMLElement | Document): HTMLElementTagNameMap[K] | null;
export declare function $<K extends keyof SVGElementTagNameMap>(selectors: K, parent?: SVGElement | Document): SVGElementTagNameMap[K] | null;
export declare function $<E extends Element = HTMLElement>(selectors: string, parent?: Element | Document): E | null;
