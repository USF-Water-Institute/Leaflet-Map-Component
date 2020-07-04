# Leaflet-Map-Component

A web-components based Leaflet & Esri Leaflet map app that supports adding Esri Feature layers, geo-json layers, custom markers, tooltips and legend.


## Using the library

### Builing the package
This package used `webpack` for build tasks. Two different build methods are available - Debug and production. Both these build tasks Publish to the Dist Folder.
Debug build task builds the library to an un-minified version with helpful debug messages. The production build task minifies the output file and removes all log statements.

#### Install dependencies 
```
    npm i
```

**Debug Build task**
```
    npm run build
```
**Production Build task**
```
    npm run build:prod
```

### Using Releases
Current release is [1.0.0](https://github.com/USF-Water-Institute/Leaflet-Map-Component/releases/tag/v1.0.0)


### NPM Package

*Coming Soon*


## Mockups

Basic mockup is found [here](./Mockups/webcomponentstest.html). More detailed mockup coming soon.

## Documentation

- **Map App** (`<map-app>`)
    - `lat`, `lng` and `zoom` attributes set the default center latitude, center longitude and zoom levels for the map
    - `basemap` attribute sets the default basemap layer for the map. Currently supported basemaps: `Topographic`, `Aerial with labels`, `Aerials`, `Streets`
    - `legend` sets the legend display position

- **Feature Layer**(`<map-feature-layer>`)
    - `url` attribute points to the URL for a GIS feature layer of a ESRI GIS service
    - `data-hover` attribute sets the Feature layter property to be displayed on hover over a marker
    - `name` attribute sets the name to be displayed on the legend

- **GeoJSON Layer**(`<map-geojson-layer>`)
    - Similar attributes to Feature layer. `url` attribute points to the URL for a resource that returns a valid GeoJSON.

- **Info Template** (`<map-info-templat>`)
    - This block style template sets the content for popups/info box on click. Uses `{PROPERTY}` syntax for templating.
    
- **Map Marker** (`<map-marker>`)
    - This tag is to define custom markers for points on the map
    - `iconUrl` attribute is used for the icon Image
    - `iconSize` attribute is a csv that sets the marker icon display size (`width, height`)
    - `targetProperty` and `targetValue` sets conditional display of certain marker icons. `targetProperty` refers to the GeoJSON/ Feature Layer property to target for the conditional check for the `targetValue` value. Currently only equal to conditional check is supported. No other conditional checks are supported at this time.

*More detailed documentation coming soon*


## Contributions

Currently this repository is not set up to accept contributions. 

## Issues

Currently this repository is not set up to receive and/or review Issues and bugs. 
