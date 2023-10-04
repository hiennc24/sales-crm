/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object: any, keys: string[], searhField = 'search'): any => {
  return keys.concat(searhField).reduce((obj: any, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      if (!!searhField && searhField == key) {
        obj["$text"] = { $search: object[key] }
      } else {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
    }
    return obj;
  }, {});
};
