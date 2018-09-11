export function htmlEncode( value: string ) {
  const div = document.createElement( 'div' );
  const text = document.createTextNode( value );
  div.appendChild( text );
  return div.innerHTML;
}
