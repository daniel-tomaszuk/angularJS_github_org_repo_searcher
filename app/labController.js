app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        $scope.model = {
            number: 0,
            result: 'Ready',
        };
        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function loadDetail(name, org) {
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail({ id: name, org: org });
        };
        
        function getRepos(org) {            
            $scope.model.detail = null;
            gitHub.getAll({ org: org }).$promise.then(function(result) {
                $scope.model.repos = {"my_message": "OK",
                                      "result": result};
            }, function(result) {
                $scope.model.repos = {"my_message": "Error",
                                      "result": result};
            });
        };

        function checkOddNumber(input) {
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function (result) {
                $scope.model.result = 'Success: ' + result;
            }, function (result) {
                $scope.model.result = 'Error: ' + result;
            })
        };

        function checkOddNumberHandler(input) {
            var defer = $q.defer();
    
            $timeout(function () {
                if (isNumberOdd(input)) {
                    defer.resolve('Yes, an odd number');
                } else {
                    defer.reject('Not an odd number');
                }
            }, 3000);
    
            return defer.promise;
        };

        function isNumberOdd(input) {
            return !isNaN(input) && input % 2 == 1;
        };

    }
]);