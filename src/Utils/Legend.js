import { Control, DomUtil } from 'leaflet';



class LegendControl extends Control {
    constructor(options) {
        super(options);
        this.options = options;
        this.controlContainer = null;
        this.container = null;
    }


    onAdd(map) {
        // super.onAdd(map);
        //  map.legend = this;
        this.controlContainer = DomUtil.create('div', 'legend-container leaflet-bar');
        this.controlContainer.setAttribute('title', 'Legend');
        this.container = DomUtil.create('div', 'legend-inner', this.controlContainer);
        if (this.options.content) {
            this.container.innerHTML = this.options.content;
        } else {
            this.container.innerHTML = '<h4> Legend </h4>';
        }
        this.controlContainer.onclick = () => this.controlContainer.classList.toggle('open');
        this.controlContainer.onmouseenter = () => map.scrollWheelZoom.disable();
        this.controlContainer.onmouseleave = () => map.scrollWheelZoom.enable();
        return this.controlContainer;
    }

    setContent(contentString) {
        this.container.innerHTML = contentString;
    }

    appendContent(content) {
        const exisitngContent = this.container.innerHTML;
        this.container.innerHTML = `${exisitngContent} <div> ${content} </div>`;
    }
}

export default LegendControl;
