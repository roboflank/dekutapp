angular.module('dekutapp.factory', ['ngResource', 'dekutapp.controller'])

//Factory for Articles
//http://104.131.160.166:3000
.factory('Article', function ($resource) {
    return $resource('http://localhost:3000/api/articles/:articleId');
})

//Factory for Notices
.factory('Notice', function ($resource) {
        return $resource('http://localhost:3000/api/notices/:noticeId');
    })

//Factory for saving data to firebase
    .factory("Items", function($firebaseArray) {
      var itemsRef = new Firebase("https://dekutapp.firebaseio.com/items");
      return $firebaseArray(itemsRef);
    })
//factory for feedbackform
  .factory("Feedbacks", function($firebaseArray) {
      var feedbacksRef = new Firebase("https://dekutapp.firebaseio.com/feedbacks");
      return $firebaseArray(feedbacksRef);
    })
//FaceBook auth in firebase
    .factory("Auth", function($firebaseAuth) {
      var usersRef = new Firebase("https//dekutapp.firebaseio.com/users");
      return $firebaseAuth(usersRef);
    })
//Factory for Elibrary :Pick the data from firebase:
.factory("Elibrary", function($firebaseArray) {
  var elibraryRef = new Firebase("https://dekutapp.firebaseio.com/elibrary");
  return $firebaseArray(elibraryRef);
})

//Network Info factory
.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){

  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    ifOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){

          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("Connection On");
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("Please Enable Your Internet Connectivity then Proceed");
          });

        }
        else {

          window.addEventListener("online", function(e) {
            console.log("Connection On");
          }, false);

          window.addEventListener("offline", function(e) {
            console.log("Please Enable Your Internet Connectivity then Proceed");
          }, false);
        }
    }
  }
});
