import defineElement from '../utils/CustomElemensDefine';
import MapLayer from './map-layer';

class MapInfoTemplate extends HTMLElement {
    constructor() {
        super();
        this.template = null;
    }

    connectedCallback() {
        const parent = this.parentElement;
        if (!(parent && parent instanceof MapLayer)) {
            throw new Error(
                'Map info template not nested under a map layer will be ignored'
            );
        }
    }
}

defineElement('map-info-template', MapInfoTemplate);
