import MapLayer from './map-layer';

import defineElement from '../utils/CustomElemensDefine';
import { GetGeoJSONLayer } from '../utils/SetupGeoJsonLayer';

/**
 * Adds a new geojson layer to the map. Extends the map layer class
 * url attribute is required
 */
class MapGeoJSONLayer extends MapLayer {
    static get observedAttributes() {
        return ['data-hover', 'url', 'name'];
    }

    connectedCallback() {
        // layer won't be ready untill we complet the async request
        // Defer attaching popup handler to the layer
        super.connectedCallback(true);
    }

    setupLayer() {
        const layerUrl = this.getAttribute('url');
        if (layerUrl == null || layerUrl === '') {
            throw new Error('URL is a required property');
        }
        this.Layer = GetGeoJSONLayer(
            this.getAttribute('url'),
            this.markerIcons,
            this.getAttribute('data-hover')
        ).then((layer) => {
            this.Layer = layer;
            this.Layer.addTo(this.mapContext);
            super.setupPopup();
        });
    }
}

defineElement('map-geojson-layer', MapGeoJSONLayer);

export default MapGeoJSONLayer;
