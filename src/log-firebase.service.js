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
     * @description
     * Adds a new line
     */
    service.add = function(data) {
        return $firebaseArray(firebase).$add(data);
    };

    return service;
}

DgLogDbFirebase.$inject = [
    '$firebaseArray',
    'dgLogConfig',
];

angular.module('dugun.log')
    .factory('dgLogDbFirebase', DgLogDbFirebase);
