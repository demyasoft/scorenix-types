const LoggingConfig = require('./config');

class Message
{
    /**
     * @param {String} message 
     */
    constructor(message)
    {
        /**
         * @type {String}
         */
        this.name = LoggingConfig.LOG_TRIGGER.MESSAGE;
        /**
         * @type {String}
         */
        this.message = message || '';
        /**
         * @type {Object}
         */
        this.device = null;
        /**
         * @type {Object}
         */
        this.engine = null;
        /**
         * @type {Object}
         */
        this.os = null;
        /**
         * @type {Number}
         */
        this.timestamp = Date.now();
        /**
         * @type {String}
         */      
        this.secret = null;
        /**
         * @type {String}
         */
        this.appVersion = null;
        /**
         * @type {String}
         */
        this.page = null;
        /**
         * @type {String}
         */
        this.clientId = null;
        /**
         * @type {String}
         */
        this.environment = null;
        /**
         * @type {String}
         */
        this.runtime = 'javascript';
        /**
         * @type {String}
         */
        this.user = 'anonymous';
        /**
         * @type {Object}
         */
        this.meta = {};
        /**
         * @type {String}
         */
        this.version = __VERSION__;
    }
}

module.exports = Message;