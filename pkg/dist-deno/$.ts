export function $<K extends keyof HTMLElementTagNameMap>( selectors: K, parent?: HTMLElement | Document ): HTMLElementTagNameMap[ K ] | null;
export function $<K extends keyof SVGElementTagNameMap>( selectors: K, parent?: SVGElement | Document ): SVGElementTagNameMap[ K ] | null;
export function $<E extends Element = HTMLElement>( selectors: string, parent?: Element | Document ): E | null;

export function $<E extends Element = HTMLElement>( selectors: string, parent: Element | Document = document ): E | null {
  return parent.querySelector( selectors );
}
