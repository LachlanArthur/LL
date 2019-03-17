import { $$ } from "../index";

afterEach( () => {
  for ( let node of document.body.childNodes ) {
    node.remove();
  }
} );

test( '$$ is defined', () => {
  expect( $$ ).toBeDefined();
} );

function createElement( tagName: string, id?: string, classes?: string ) {
  let element = document.createElement( tagName );

  if ( id ) element.id = id;
  if ( classes ) element.className = classes;

  document.body.appendChild( element );

  return element;
}

test( '$ returns an array', () => {
  expect( $$( 'unknown' ) ).toBeInstanceOf( Array );
} );

test( '$$ returns multiple elements', () => {
  let element1 = createElement( 'div' );
  let element2 = createElement( 'div' );
  let results = $$( 'div' );
  expect( results ).toHaveLength( 2 );
  expect( results ).toContain( element1 );
  expect( results ).toContain( element2 );
} );

test( '$ works with custom elements', () => {
  let element = createElement( 'foo-bar' );
  expect( $$( 'foo-bar' ) ).toContain( element );
} );
