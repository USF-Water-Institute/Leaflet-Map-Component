import defineElement from '../utils/CustomElemensDefine';
import MapLayer from './map-layer';

class MapMarker extends HTMLElement {
    constructor() {
        super();
        this.markerIcon = null;
    }

    connectedCallback() {
        const parent = this.parentElement;
        if (!(parent && parent instanceof MapLayer)) {
            throw new Error('Map marker not nested under a map layer will be ignored', this);
        }
    }
}

defineElement('map-marker', MapMarker);
