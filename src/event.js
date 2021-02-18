const LoggingConfig = require('./config');
const Message = require('./message');

class Event extends Message
{
    /**
     * @param {String} id
     * @param {String} message
     * @param {String} action
     */
    constructor(id, message, action)
    {
        super(message);
        this.name = LoggingConfig.LOG_TRIGGER.EVENT;
        /**
         * @type {String}
         */
        this.eventId = id;
        /**
         * @type {String}
         */
        this.action = action;
    }
}

module.exports = Event;