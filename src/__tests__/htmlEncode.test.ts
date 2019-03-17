import { htmlEncode } from "../index";

test( 'htmlEncode is defined', () => {
  expect( htmlEncode ).toBeDefined();
} );

test( 'HTML encodes correctly', () => {
  expect( htmlEncode( 'A<B>C A&B' ) ).toEqual( 'A&lt;B&gt;C A&amp;B' );
} );
