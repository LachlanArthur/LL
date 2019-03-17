export function $$(selectors, parent = document) {
    return Array
        .from(parent.querySelectorAll(selectors))
        .filter(element => element !== null);
}
//# sourceMappingURL=$$.js.map