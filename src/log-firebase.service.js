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
