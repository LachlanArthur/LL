import { $, on } from "../index";

test( 'on is defined', () => {
  expect( on ).toBeDefined();
} );

beforeAll( () => {

  let target = document.createElement( 'div' );
  target.id = 'target';
  document.body.appendChild( target );

} );

test( 'events can be added to elements', () => {
  const el = document.getElementById( 'target' )!;
  const handler = jest.fn();

  on( el, 'click' )( handler );
  el.dispatchEvent( new MouseEvent( 'click' ) );

  expect( handler ).toHaveBeenCalled();
} );
