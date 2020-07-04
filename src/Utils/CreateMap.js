import { map, control } from 'leaflet';
import 'leaflet-fullscreen';

import { getBaseMaps } from './BaseMaps';

/**
 * Creates and returns a Map
 * @param {HTMLElement} containerElement The container where map needs to be drawn
 * @param {{lat:Number, lng:Number, zoom: Number, basemap:string}} param1 Map Options
 */
export const createMap = (
    containerElement,
    {
        lat = 27.39116946,
        lng = -82.60948475,
        zoom = 10,
        basemap: selectedbaseMapLayer
    } = {}
) => {
    // eslint-disable-next-line prefer-destructuring
    const mapContext = map(containerElement, {
        minZoom: 5,
        maxZoom: 21,
        fullscreenControl: true
    }).setView([lat, lng], zoom);

    const basemaps = getBaseMaps();

    const selectedbaseMap = basemaps[selectedbaseMapLayer] || basemaps['Aerial with labels'];
    selectedbaseMap.addTo(mapContext);

    const basemapControl = control.layers(basemaps);
    basemapControl.addTo(mapContext);

    return mapContext;
};

export default { createMap };
