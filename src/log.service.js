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

        var errorMessage = exception.toString();

        var errorData = {
            url: $window.location.href,
            message: errorMessage,
            userAgent: navigator.userAgent,
            createdAt: new Date()
        };

        dgLogDbFirebase.add(errorData);
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
