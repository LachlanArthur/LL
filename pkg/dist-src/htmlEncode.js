export function htmlEncode(value) {
    const div = document.createElement('div');
    const text = document.createTextNode(value);
    div.appendChild(text);
    return div.innerHTML;
}
//# sourceMappingURL=htmlEncode.js.map