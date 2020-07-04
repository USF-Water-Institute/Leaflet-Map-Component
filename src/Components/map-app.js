import { createMap } from '../utils/CreateMap';
import '../Styles/mapstyles.less';
import defineElement from '../utils/CustomElemensDefine';
import LegendControl from '../utils/Legend';
import legendStyles from '../styles/legend-styles.less';
console.log(legendStyles);
/**
 * Defines a custom Html element <map-app>
 */
class MapApp extends HTMLElement {
    //
    static get observedAttributes() {
        return ['lat', 'lng', 'zoom', 'basemap', 'legend'];
    }

    get mapContext() {
        return this.MapContext;
    }

    constructor() {
        // Always call parent's constructor
        super();
        this.MapContext = null;
        this.LegendControl = null;
        const shadow = this.attachShadow({
            mode: 'open'
        });

        // Add custom stylesheets here
        const leafletCss = document.createElement('link');
        leafletCss.setAttribute(
            'href',
            'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'
        );
        leafletCss.setAttribute('rel', 'stylesheet');
        leafletCss.setAttribute('crossorigin', '');
        shadow.appendChild(leafletCss);

        const leafletFullscreenCss = document.createElement('link');
        leafletFullscreenCss.setAttribute(
            'href',
            'https://cdn.wateratlas.org/libs/leaflet/plugins/leaflet.fullscreen/1.0.1/leaflet.fullscreen.css'
        );
        leafletFullscreenCss.setAttribute('rel', 'stylesheet');
        leafletFullscreenCss.setAttribute('crossorigin', '');
        shadow.appendChild(leafletFullscreenCss);
        const customStyles = document.createElement('style');
        customStyles.textContent = `
            #mapContainer {
            height:100%;
            }
            ${legendStyles}
        `;
        shadow.appendChild(customStyles);

        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapContainer');
        shadow.appendChild(mapContainer);
    }

    connectedCallback() {
        // called  each time the element is added to the DOM
        console.log('Map App Added to the page');
        const mapContainer = this.shadowRoot.querySelector('#mapContainer');
        const configOptions = {
            lat: this.getAttribute('lat'),
            lng: this.getAttribute('lng'),
            zoom: this.getAttribute('zoom'),
            basemap: this.getAttribute('basemap')
        };
        console.log(configOptions);
        this.MapContext = createMap(mapContainer, configOptions);
        const legendAttr = this.getAttribute('legend');
        // legendAttr has position
        if (legendAttr != null || legendAttr !== 'off' || legendAttr !== '') {
            // Create legend here
            this.LegendControl = new LegendControl({
                position: legendAttr || 'topleft'
            });
            this.MapContext.addControl(this.LegendControl);
        }
    }
}

// Line needed to register the new component with dom
defineElement('map-app', MapApp);

export default MapApp;
