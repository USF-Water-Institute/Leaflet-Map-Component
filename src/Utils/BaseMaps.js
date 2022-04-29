import { basemapLayer } from 'esri-leaflet';
import {
    layerGroup,
} from 'leaflet';

export const getBaseMaps = () => {
    const imageryLabels = basemapLayer('ImageryLabels');
    const imagery = basemapLayer('ImageryFirefly');
    const gray = basemapLayer('Gray');
    const grayLabels = basemapLayer('GrayLabels');
    const streets = basemapLayer('Streets');
    const topo = basemapLayer('Topographic');

    const baseLayers = {
        Streets: streets,
        Aerials: imagery,
        'Aerial with labels': layerGroup([imagery, imageryLabels]),
        'Gray': layerGroup([gray, grayLabels]),
        Topographic: topo
    };

    return baseLayers;
};

export default { getBaseMaps };
