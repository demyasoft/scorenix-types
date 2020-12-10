import config from './config';
import Message from './message';

export default class Event extends Message
{
    /**
     * @param {String} id
     * @param {String} message
     * @param {String} action
     */
    constructor(id, message, action)
    {
        super(message);
        this.name = config.LOG_TRIGGER.EVENT;
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