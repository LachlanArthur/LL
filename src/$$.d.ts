export declare function $$<K extends keyof HTMLElementTagNameMap>(selectors: K, parent?: HTMLElement | Document): Array<HTMLElementTagNameMap[K]>;
export declare function $$<K extends keyof SVGElementTagNameMap>(selectors: K, parent?: SVGElement | Document): Array<SVGElementTagNameMap[K]>;
export declare function $$<E extends Element = HTMLElement>(selectors: string, parent?: Element | Document): Array<E>;
