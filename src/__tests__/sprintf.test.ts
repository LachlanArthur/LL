import { sprintf } from "../index";

test( 'sprintf is defined', () => {
  expect( sprintf ).toBeDefined();
} );

test( 'Unset variables are blank strings', () => {
  expect( sprintf`a: ${0}; b: ${1};`( 'A' ) ).toEqual( 'a: A; b: ;' );
} );

test( 'Variables can be in any order', () => {
  expect( sprintf`b: ${1}; c: ${2}; a: ${0};`( 'A', 'B', 'C' ) ).toEqual( 'b: B; c: C; a: A;' );
} );

test( 'Variables can be repeated', () => {
  expect( sprintf`a: ${0}; a: ${0};`( 'A' ) ).toEqual( 'a: A; a: A;' );
} );
