import ClientOptions from './options';

export default class BaseClient
{
    constructor()
    {
        if (!BaseClient.singleton)
        {
            /**
             * @type {ClientOptions}
             */
            this.options = null;
            /**
             * @private
             * @type {String}
             */
            this._app_key = null;
            /**
             * @private
             * @type {XMLHttpRequest}
             */
            this._xhttp = null;
            /**
             * @private
             */
            this._meta = null;
            /**
             * @private
             */
            this._user = null;
            /**
             * @private
             */
            this._user_version = null;
            /**
             * @private
             * @type {String}
             */
            this._client_id = null;

            BaseClient.singleton = this;
        }

        return BaseClient.singleton;
    }
    
    /**
    * Initializes the erronetic logging service.
    * @param {String} key - the client application api key
    * @param {ClientOptions} options - Lognetic options
    */
    init(key, options)
    {         
        if (!key)
        {
            throw new Error('InvalidArgumentError: Application client id cannot be null');
        }
        if (typeof key != 'string')
        {
            throw new Error('InvalidArgumentError: Client id is expecting a string value');
        }
        options = Object.assign(ClientOptions, options);
        if (options.uri.indexOf('https:')!=-1)
        {
            options.uri = options.uri.replace('https:', '');
            options.protocol = 'https';
        }
        else if (options.uri.indexOf('http:')!=-1)
        {
            options.uri = options.uri.replace('http:', '');
            options.protocol = 'http';
        }        
        options.method = options.method.toUpperCase();
        if (['POST','PUT','DELETE'].indexOf(options.method) == -1)
        {
            throw new Error('InvalidArgumentError: Client submit method must either POST, PUT or DELETE');
        }
        this._app_key = key;
        this.options = options;
        this.generateClientId();
    }

    /**
     * @description Generate and set a unique client Id
     */
    generateClientId() {}

    /**
    * Sends a custom info-level message.
    * @param {String} message the custom message to log
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeMessage(message, data) {}

    /**
    * Sends a custom error exception.
    * @param {Error} error Error object to log.
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeException(error, data) {}

    /**
    * Assigns custom meta data that will be sent along with each exception.
    * @param {Object|Array} data custom meta data, can be user to store user details
    */
    setMetaContext(data) {}

    /**
    * Allows you to set your application version.
    * @param {String} version App version info
    */
    setAppVersion(version) {}

    /**
    * Allows you to set your the current user.
    * @param {String} username Username of the currently logged on user
    */
    setAppUser(username) {}
}