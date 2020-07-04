
const defineElement = (tag, opt) => {
    if (typeof customElements !== 'undefined') {
        customElements.define(tag, opt);
    } else {
        document.registerElement(tag, opt);
    }
};


export default defineElement;