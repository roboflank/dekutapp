.factory('Session', function ($resource) {
  return $resource('http://localhost:5000/sessions/:sessionId');
})
//Contoller for getting posts
.controller('SessionsCtrl', function($scope, Sessions) {
    $scope.sessions = Sessions.query();
})
//Controller for Sessions(plural)
.controller('SessionCtrl', function($scope, $stateParams, Sessions) {
    $scope.session = Sessions.get({sessionId: $stateParams.sessionId});
})
