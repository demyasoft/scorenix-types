
const API_URI = '//scorenix.azurewebsites.net';

const ScorenixOptions = {
    /**
     * @type {Boolean}
     * @default false
     */
    debug: false,
    /**
     * @type {String}
     */
    uri: `${API_URI}`,
    /**
     * @type {String}
     * @default POST
     */
    method: 'POST',
    /**
     * @type {String}
     * @default https
     */
    protocol: 'https',
    /**
     * @type {String}
     */
    environment: null
};

export default ScorenixOptions;