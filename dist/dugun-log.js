/**
 * @ngdoc overview
 * @memberof dugun.log
 * @description
 * Logs the errors to console and server
 */
angular.module('dugun.log', [
    'firebase',
]);

/**
 * dgLog factory
 * @ngdoc factory
 * @memberof dugun.log
 * @name DgLog
 *
 * @requires $log
 * @requires $window
 * @requires dgLogDbFirebase
 */
function DgLog($log, $window, dgLogDbFirebase) {
    var service = {};

    /**
     * @ngdoc method
     * @memberof DgLog
     * @description
     * Logs the error into db
     */
    service.error = function(exception, cause) {
        $log.error.apply($log, arguments);

        var errorMessage = exception.toString(),
            errorStack = exception.stack.toString(),
            errorData;

        errorData = {
            url: $window.location.href,
            message: errorMessage,
            stack: errorStack,
            userAgent: navigator.userAgent,
            createdAt: (new Date()).toString()
        };

        return dgLogDbFirebase.add(errorData);
    };

    /**
     * @ngdoc method
     * @memberof DgLog
     * @param type {string} Type of log
     * @param message {object} Message to log
     * @description
     * Logs custom message
     */
    service.log = function(type, message) {
        return dgLogDbFirebase.add(message, type);
    };

    return service;
}

DgLog.$inject = [
    '$log',
    '$window',
    'dgLogDbFirebase',
];

angular.module('dugun.log')
    .factory('dgLog', DgLog);

/**
 * dgLogDbFirebase factory
 * @ngdoc factory
 * @memberof dugun.log
 * @name DgLogDbFirebase
 *
 * @requires firebase:$firebaseArray
 */
function DgLogDbFirebase($firebaseArray, dgLogConfig) {
    var service = {},
        firebase = new Firebase(dgLogConfig.firebaseUrl);

    /**
     * @ngdoc method
     * @memberof DgLogDbFirebase
     * @param data {object} Item to add
     * @param type {string='error'} Type of log to add.
     * @description
     * Adds a new line
     */
    service.add = function(data, type) {
        if(!type) type = 'error';
        return $firebaseArray(firebase.child(type)).$add(data);
    };

    return service;
}

DgLogDbFirebase.$inject = [
    '$firebaseArray',
    'dgLogConfig',
];

angular.module('dugun.log')
    .factory('dgLogDbFirebase', DgLogDbFirebase);
