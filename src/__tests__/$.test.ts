import { $ } from "../index";

afterEach( () => {
  for ( let node of document.body.childNodes ) {
    node.remove();
  }
} );

test( '$ is defined', () => {
  expect( $ ).toBeDefined();
} );

function createElement( tagName: string, id?: string, classes?: string ) {
  let element = document.createElement( tagName );

  if ( id ) element.id = id;
  if ( classes ) element.className = classes;

  document.body.appendChild( element );

  return element;
}

test( '$ works with css selectors', () => {
  let element = createElement( 'div', 'some-id', 'some-class-1 some-class-2' );
  expect( $( 'div#some-id.some-class-1.some-class-2' ) ).toEqual( element );
} );

test( '$ works with custom elements', () => {
  let element = createElement( 'foo-bar' );
  expect( $( 'foo-bar' ) ).toEqual( element );
} );

test( '$ only returns the first result', () => {
  let element1 = createElement( 'div' );
  createElement( 'div' );
  expect( $( 'div' ) ).toEqual( element1 );
} );
