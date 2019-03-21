export function $$<K extends keyof HTMLElementTagNameMap>( selectors: K, parent?: HTMLElement | Document ): Array<HTMLElementTagNameMap[ K ]>;
export function $$<K extends keyof SVGElementTagNameMap>( selectors: K, parent?: SVGElement | Document ): Array<SVGElementTagNameMap[ K ]>;
export function $$<E extends Element = HTMLElement>( selectors: string, parent?: Element | Document ): Array<E>;

export function $$<E extends Element = HTMLElement>( selectors: string, parent: Element | Document = document ): Array<E> {
  return Array
    .from( parent.querySelectorAll<E>( selectors ) )
    .filter( element => element !== null );
}
