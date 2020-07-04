import { Map, Util, marker } from 'leaflet';
import { GetMarkerIcon, GetIconForMarkerElem } from '../utils/MarkerIcon';
import LegendControl from '../utils/Legend';
import defaultMarkerIconUrl from '../utils/defaultMarkerIconUrl';
/**
 * Base class for all map layers
 * url attribute is required
 */
class MapLayer extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'attribution'];
    }

    constructor() {
        super();
        this.name = this.getAttribute('name');
        this.mapContext = null;
        this.Layer = null;
        this.markerIcons = [];
        this.name = this.getAttribute('name');
    }

    /**
     * Hides the feature layer from the map
     */
    hide() {
        this.mapContext.removeLayer(this.Layer);
    }

    /**
     * Shows the feature layer on the map
     */
    show() {
        this.mapContext.addLayer(this.Layer);
    }

    /**
     * Does the necessary steps reuired to add the map layer to the
     * Called each time the element is added to the DOM
     * Can be overridden by derived classes, but should call super.connectedCallback()
     * @param {boolean} deferPopupSetup Defer setup of popups if waiting fro an async load.
     *  Derived classes must call setupPopup when the layer is ready.
     */
    connectedCallback(deferPopupSetup = false) {
        // called
        const parent = this.parentElement;
        if (
            parent
            && typeof parent.MapContext === 'object'
            && parent.MapContext instanceof Map
        ) {
            this.mapContext = parent.MapContext;
        } else {
            console.error(
                'Map layer cannot infer map context from the structure, make sure the parent element provides a mapContext'
            );
        }
        this.setupMarkers();
        this.setupLayer();
        if (!deferPopupSetup) {
            this.setupPopup();
        }
        if (
            parent.LegendControl != null
            && parent.LegendControl instanceof LegendControl
        ) {
            this.setupLegend(parent.LegendControl);
        }
        const attribution = this.getAttribute('attribution');
        if (attribution) {
            // console.log(attribution);
            this.mapContext.attributionControl.addAttribution(attribution);
        }
    }

    /**
     * Sets up the layer and adds the layer
     * To be implemented by derived classes
     * It is not necessary for derived classes to call super.setupLayer()
     */
    setupLayer() {
        this.Layer = null;
    }

    /**
     * Sets Up the markers for the layer
     * Can be overridden by derived classes
     * it is suggested that derived classes call super.setupMarkers()
     */
    setupMarkers() {
        const markerElems = this.querySelectorAll('map-marker');
        if (markerElems == null || markerElems.length <= 0) {
            // Set default  icon
            this.markerIcons = [
                {
                    targetProperty: null,
                    targetValue: null,
                    image: defaultMarkerIconUrl,
                    icon: GetMarkerIcon()
                }
            ];
        } else {
            this.markerIcons = Array.from(markerElems).map((markerElem) => {
                const { targetProperty, targetValue } = markerElem.attributes;

                return {
                    targetProperty,
                    targetValue,
                    image: markerElem.attributes.iconUrl.value,
                    icon: GetIconForMarkerElem(markerElem)
                };
            });
        }
    }

    /**
     * Defines popup behavior for the layer
     * Can be overridden by derived classes.
     * It is suggested that derived classes call super.setupPopup()
     */
    setupPopup() {
        const template = this.querySelector('map-info-template');
        if (template != null) {
            if (this.Layer != null) {
                // eslint-disable-next-line max-len
                this.Layer.bindPopup(layer => Util.template(template.innerHTML, layer.feature.properties));
            }
        }
    }

    /**
     * Adds markers to legend
     * @param {LegendControl} legendControl Control to which legend content is to be appended
     */
    setupLegend(legendControl) {
        const markerList = this.markerIcons.map(a => `
          <li>
          <img src="${a.image}" class="legend-marker-icon"/>
                ${(a.targetValue && a.targetValue.value) || ''}
                </li>
        `);
        const content = `
        <div class="legend-layer"> 
            <h5> ${this.name} </h5> 
            <ul class="legend-marker-list">
             ${markerList.join('')}
            </ul>
        </div>`;
        legendControl.appendContent(content);
    }
}

export default MapLayer;
