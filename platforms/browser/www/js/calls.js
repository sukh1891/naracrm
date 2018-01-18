.factory('CallLogService', ['$q', function($q) {
    return {

        list : function(days) {
            var q = $q.defer();
            // days is how many days back to go
            window.plugins.calllog.list(days, function (response) {
                q.resolve(response.rows);
            }, function (error) {
                q.reject(error)
            });
            return q.promise;
        },

        contact : function(phoneNumber) {
            var q = $q.defer();
            window.plugins.calllog.contact(phoneNumber, function (response) {
                q.resolve(response);
            }, function (error) {
                q.reject(error)
            });
            return q.promise;
        },

        show : function(phoneNumber) {
            var q = $q.defer();
            window.plugins.calllog.show(phoneNumber, function (response) {
                q.resolve(response);
            }, function (error) {
                q.reject(error)
            });
            return q.promise;
        }

        delete : function(phoneNumber) {
            var q = $q.defer();
            window.plugins.calllog.delete(id, function (response) {
                q.resolve(response);
            }, function (error) {
                q.reject(error)
            });
            return q.promise;
        }
    }
}])
.controller('DebugCtrl', ['$scope', 'CallLogService', 'LocalStorage',
    function ($scope, CallLogService, LocalStorage) {
        $scope.data = {};
        $scope.callTypeDisplay = function(type) {
            switch(type) {
                case 1:
                    return 'Incoming';
                case 2:
                    return 'Outgoing';
                case 3:
                    return 'Missed';
                default:
                    return 'Unknown';
            }
        };
        CallLogService.list(1).then(
            function(callLog) {
                console.log(callLog);
                $scope.data.lastCall = callLog[0];
            },
            function(error) {
                console.error(error);
            });
    }]);