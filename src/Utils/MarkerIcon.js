import { icon } from 'leaflet';
import defaultMarkerIconUrl from './defaultMarkerIconUrl';
/**
 * Creates a Leaflet Icon
 * @param {String} iconUrl Url for the icon
 * @param {String} iconSize Comma seperated width and height for icon Size
 * @param {String} shadowUrl Url for shadow (optional)
 * @param {String} shadowSize Comma seperated width and height for shadow Size (optional)
 */
export const GetMarkerIcon = (iconUrl = defaultMarkerIconUrl, iconSize = '16, 28', shadowUrl = '', shadowSize = '') => {
           const iconSizeArray = iconSize
               .split(',')
               .map(a => parseFloat(a));
           if (iconSizeArray.length !== 2) {
               throw new Error('Icon Size not a CSV with two numbers');
           }
           if (shadowUrl === '' || shadowUrl == null) {
               return icon({ iconUrl, iconSize: iconSizeArray });
           }
           const shadowSizeArray = shadowSize
               .split(',')
               .map(a => parseFloat(a));
           if (shadowSize !== '' && shadowSizeArray.length !== 2) {
               throw new Error('Shadow Size not a CSV with two numbers');
           }
           return icon({
               iconUrl,
               iconSize: iconSizeArray,
               shadowUrl,
               shadowSize: shadowSizeArray
           });
       };


export const GetIconForMarkerElem = (markerElem) => {
        const {
            iconurl,
            iconsize,
            shadowurl,
            shadowsize
        } = markerElem.attributes;
        if (!shadowurl || !shadowsize) {
            return GetMarkerIcon(iconurl.value, iconsize.value);
        }
        return GetMarkerIcon(
            iconurl.value,
            iconsize.value,
            (shadowurl && shadowurl.value) || '',
            (shadowsize && shadowsize.value) || ''
        );
    };

export default { GetMarkerIcon, GetIconForMarkerElem };
