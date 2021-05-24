import { marker, geoJSON } from 'leaflet';


const goObjTest = {
    type: 'Feature',
    properties: {
        name: 'Coors Field',
        amenity: 'Baseball Stadium',
        popupContent: 'This is where the Rockies play!'
    },
    geometry: {
        type: 'Point',
        coordinates: [-104.99404, 39.75621]
    }
};

const FetchGeoJsonFromUrl = (url) => {
    const jsondata = fetch(url, {
        Accept: 'application/json',
        Authorization: null
    })
        .catch(err => console.error('Water Quality Details Fetch Error:', err))
        .then(res => res.json())
        .catch(err => console.error('Water Quality Details Serialization Error:', err));
    return jsondata;
};

/**
 * Creates and returns a feature layer
 * @param {string} url URL for the feature layer rest service
 * @param {[{icon:L.Icon}]} markerIcons Marker Icons
 * @param {string} hoverProperty Proprty to display on Hover
 */
export const GetGeoJSONLayer = (url, markerIcons, hoverProperty = '') => {
    if (markerIcons.length < 1) {
        throw new Error('No Marker defined for layer');
    }

    return FetchGeoJsonFromUrl(url).then((geoJsonObject) => {
            if (markerIcons.length === 1) {
                return geoJSON(geoJsonObject, {
                    pointToLayer(feature, latlng) {
                        const { icon } = markerIcons[0];
                        return marker(latlng, {
                            icon,
                            title:
                                feature.properties[
                                    hoverProperty
                                ]
                        });
                    }
                });
            }
            return geoJSON(
                geoJsonObject,{
                pointToLayer(feature, latlng) {
                    // eslint-disable-next-line prefer-destructuring

                    // eslint-disable-next-line no-restricted-syntax
                    for (const markerIcon of markerIcons) {
                        const {
                            targetProperty,
                            targetValue,
                            icon
                        } = markerIcon;

                        if (targetProperty && targetValue) {
                            const targetPropertyValue = `${
                                feature.properties[
                                    targetProperty.value
                                ]
                            }`.trim();
                            const requiredTargetValue = `${
                                targetValue.value
                            }`.trim();
                            if (
                                targetPropertyValue
                                === requiredTargetValue
                            ) {
                                return marker(latlng, {
                                    icon,
                                    title:
                                        feature.properties[
                                            hoverProperty
                                        ]
                                });
                            }
                        }
                    }
                    return marker(latlng, {
                        icon: markerIcons[0].icon,
                        title: feature.properties[hoverProperty]
                    });
                }
            });
    });
};

export default { GetGeoJSONLayer };
