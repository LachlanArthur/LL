/**
 * Simple string injection using tagged template literals.
 *
 * Indices can be in any order, repeated, or omitted.
 *
 * Undefined indices output a blank string.
 *
 * @param strings Array of template strings
 * @param indices The indices used in the template
 *
 * @example let template = sprintf`How many ${1} do I have? I have ${0}.`;
 * template( '10', 'dinosaurs' ); // How many dinosaurs do I have? I have 10.
 * template( 'zero', 'cars' ); // How many cars do I have? I have zero.
 */
export function sprintf(strings, ...indices) {
    return (...values) => strings.reduce((total, part, index) => total + part + (values[indices[index]] || ''), '');
}
//# sourceMappingURL=sprintf.js.map