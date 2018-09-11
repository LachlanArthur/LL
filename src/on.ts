type MaybeArray<T> = T | Array<T>;

// Known HTML Events
export function on<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>,
  events: MaybeArray<K>,
  targetFilter?: string,
): (
    listener: MaybeArray<( this: E, ev: HTMLElementEventMap[ K ] ) => any>,
    options?: boolean | AddEventListenerOptions,
) => void;

// Known SVG Events
export function on<E extends SVGElement, K extends keyof SVGElementEventMap>(
  elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>,
  events: MaybeArray<K>,
  targetFilter?: string,
): (
    listener: MaybeArray<( this: E, ev: SVGElementEventMap[ K ] ) => any>,
    options?: boolean | AddEventListenerOptions,
  ) => void;

// Unknown Events
export function on<E extends Element>(
  elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>,
  events: MaybeArray<string>,
  targetFilter?: string,
): (
    listener: MaybeArray<( this: E, ev: Event ) => any>,
    options?: boolean | AddEventListenerOptions,
  ) => void;

export function on<E extends Element>(
  elements: MaybeArray<E | Document | null> | NodeListOf<E | Document>,
  events: MaybeArray<string>,
  targetFilter?: string,
) {
  let elementsArray: Array<E | Document>;
  let eventsArray: Array<string>;

  // Convert params to arrays
  if ( elements === null ) elementsArray = [];
  else if ( elements instanceof NodeList ) elementsArray = Array.from( elements );
  else if ( !Array.isArray( elements ) ) elementsArray = [ elements ];
  else elementsArray = elements.filter( ( e ): e is E | Document => e !== null );

  if ( !Array.isArray( events ) ) events = [ events ];

  // Ensure events can be attached to the elements
  elementsArray = elementsArray.filter( element => 'addEventListener' in element );

  return (
    listeners: MaybeArray<( this: E | Document, ev: Event ) => any>,
    options?: boolean | AddEventListenerOptions,
  ) => {
    let listenersArray: Array<( this: E | Document, ev: Event ) => any>;

    if ( !Array.isArray( listeners ) ) listenersArray = [ listeners ];
    else listenersArray = listeners;

    if ( typeof targetFilter !== 'undefined' ) {
      listenersArray = listenersArray.map( listener => ( ( f ) => function ( this: E | Document, event: Event ) {
        const target = ( event.target as E ).closest( targetFilter );
        if ( target ) f.call( target, event );
      } )( listener ) );
    }

    for ( let element of elementsArray ) {
      for ( let event of eventsArray ) {
        for ( let listener of listenersArray ) {
          element.addEventListener.call( element, event, listener, options );
        }
      }
    }
  };
}
