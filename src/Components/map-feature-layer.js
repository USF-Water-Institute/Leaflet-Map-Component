import MapLayer from './map-layer';

import defineElement from '../utils/CustomElemensDefine';
import { GetFeatureLayer } from '../utils/SetupFeatureLayer';

/**
 * Adds a new feature layer to the map. Extends the map layer class
 * url attribute is required
 */
class MapFeatureLayer extends MapLayer {
    static get observedAttributes() {
        return ['data-hover', 'url', 'name'];
    }

    setupLayer() {
        const featureLayerUrl = this.getAttribute('url');
        if (featureLayerUrl == null || featureLayerUrl === '') {
            throw new Error('URL is a required property');
        }
        this.Layer = GetFeatureLayer(
            this.getAttribute('url'),
            this.markerIcons,
            this.getAttribute('data-hover')
        );
        this.Layer.addTo(this.mapContext);
    }
}

defineElement('map-feature-layer', MapFeatureLayer);

export default MapFeatureLayer;
