import { featureLayer } from 'esri-leaflet';
import { marker } from 'leaflet';
/**
 * Creates and returns a feature layer
 * @param {string} url URL for the feature layer rest service
 * @param {[{icon:L.Icon}]} markerIcons Marker Icons
 * @param {string} hoverProperty Proprty to display on Hover
 */
export const GetFeatureLayer = (url, markerIcons, hoverProperty = '') => {
    if (markerIcons.length < 1) {
        throw new Error('No Marker defined for layer');
    }
    if (markerIcons.length === 1) {
        return featureLayer({
            url,
            pointToLayer(feature, latlng) {
                const { icon } = markerIcons[0];
                return marker(latlng, {
                    icon,
                    title: feature.properties[hoverProperty]
                });
            }
        });
    }
    return featureLayer({
        url,
        pointToLayer(feature, latlng) {
            // eslint-disable-next-line prefer-destructuring

            // eslint-disable-next-line no-restricted-syntax
            for (const markerIcon of markerIcons) {
                const { targetProperty, targetValue, icon } = markerIcon;

                if (targetProperty && targetValue) {
                   const targetPropertyValue = `${feature.properties[targetProperty.value]}`.trim();
                   const requiredTargetValue = `${targetValue.value}`.trim();
                    if (targetPropertyValue === requiredTargetValue) {
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
};

export default { GetFeatureLayer };
