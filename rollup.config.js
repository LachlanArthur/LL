import typescript from "rollup-plugin-typescript2";

export default {
  input: './ll.ts',

  output: {
    file: './ll.js',
    format: 'esm',
  },

  plugins: [
    typescript( {
      typescript: require( 'typescript' ),
    } ),
  ],
}
