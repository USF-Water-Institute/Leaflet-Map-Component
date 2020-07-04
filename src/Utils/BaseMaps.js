import { basemapLayer } from 'esri-leaflet';
import {
    layerGroup,
} from 'leaflet';

export const getBaseMaps = () => {
    const imageryLabels = basemapLayer('ImageryLabels');
    const imagery = basemapLayer('ImageryFirefly');
    const streets = basemapLayer('Streets');
    const topo = basemapLayer('Topographic');

    const baseLayers = {
        Streets: streets,
        Aerials: imagery,
        'Aerial with labels': layerGroup([imagery, imageryLabels]),
        Topographic: topo
    };

    return baseLayers;
};

export default { getBaseMaps };