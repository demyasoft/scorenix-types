const ScorenixOptions = require('./options');
const Exception = require('./exception');
const Response = require('./response');
const Message = require('./message');

class BaseLogClient
{
    constructor()
    {
        if (!BaseLogClient.singleton)
        {
            /**
             * @type {ScorenixOptions}
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
             * @type {String}
             */
            this._user = null;
            /**
             * @private
             * @type {String}
             */
            this._user_version = null;
            /**
             * @private
             * @type {String}
             */
            this._client_id = null;

            BaseLogClient.singleton = this;
        }

        return BaseLogClient.singleton;
    }

    /**
     * @private
     * @param {Function} callback 
     */
    _createHttpRequest(callback)
    {
        let xhr = new XMLHttpRequest();
        let hasCORS = 'withCredentials' in xhr || typeof XDomainRequest !== undefined;
        if (!hasCORS) return;

        if ('withCredentials' in xhr)
        {
            xhr.onreadystatechange = callback;
        }
        else if (typeof XDomainRequest != undefined)
        {
            xhr = new XDomainRequest();
            xhr.onload = callback;
        }

        return xhr;
    }

    /**
     * @protected
     */
    _onreadystatechange ()
    {
        if (this._xhttp instanceof XMLHttpRequest)
        {
            if (this._xhttp.readyState === XMLHttpRequest.DONE && this._xhttp.status === 200)
            {
                let response = Object.assign(new Response, JSON.parse(this._xhttp.responseText));
            }
            else
            {
                console.log(this._xhttp.responseText);
            }
        }
    }

    /**
     * @protected
     * @param {Error} error
     * @returns {Exception}
     */
    _createException(error) {}

    /**
     * @protected
     * @param {Message} data 
     */
    _commit(data)
    {
        if (this._meta)
        {
            data.meta = this._meta;
        }
        if (this._user)
        {
            data.user = this._user;
        }
        if (this._user_version)
        {
            data.appVersion = this._user_version;
        }
        if (this._client_id)
        {
            data.clientId = this._client_id;
        }
        if (this._app_key)
        {
            data.secret = this._app_key;
        }
        if (this.options.environment)
        {
            data.environment = this.options.environment;
        }
        if (this._xhttp)
        {
            this._xhttp.open(this.options.method, `${this.options.protocol}:${this.options.uri}`, true);
            if (this._xhttp instanceof XMLHttpRequest)
            {
                this._xhttp.setRequestHeader('Content-Type', 'application/json');
            }        
            this._xhttp.send(JSON.stringify(data));
        }        
    }
    
    /**
    * Initializes the erronetic logging service.
    * @param {String} key - the client application api key
    * @param {ScorenixOptions} options - Lognetic options
    */
    init(key, options)
    {      
        options = options || {};   
        if (!key)
        {
            throw new Error('InvalidArgument: Application client id cannot be null');
        }
        if (typeof key != 'string')
        {
            throw new Error('InvalidArgument: Client id is expecting a string value');
        }
        Object.assign(options, ScorenixOptions);
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
        if (options.uri.indexOf(ScorenixOptions.uri) != -1)
        {
            options.uri = `${options.uri}/api/log`;
        }    
        options.method = options.method.toUpperCase();
        if (['POST','PUT','DELETE'].indexOf(options.method) == -1)
        {
            throw new Error('InvalidArgument: Client submit method must either POST, PUT or DELETE');
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
    * Captures a custom message.
    * @param {String} message the custom message to log
    */
    writeMessage(message) {}

    /**
    * Captures an event.
    * @param {String} id event id
    * @param {String} message event message
    * @param {String} action event action
    */
    writeEvent(id, message, action) {}

    /**
    * Captures a custom error exception.
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

module.exports = BaseLogClient;