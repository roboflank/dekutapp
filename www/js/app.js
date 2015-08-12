// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dekutapp', ['ngResource', 'dekutapp.account', 'dekutapp.dev', 'dekutapp.home', 'dekutapp.login', 'dekutapp.register', 'dekutapp.tweet', 'ionic', 'lbServices', 'bd.timedistance', 'ngCordova', 'ionic-material', 'ionMdInput', 'dekutapp.controller', 'rssappControllers', 'rssappServices', 'dekutapp.factory'])

/*.run(function ($ionicPlatform) {
 $ionicPlatform.ready(function () {
 // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
 // for form inputs)
 if (window.cordova && window.cordova.plugins.Keyboard) {
 cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
 }
 if (window.StatusBar) {
 StatusBar.styleDefault();
 }
 });
 })*/
.run(function(User, $ionicPlatform, $rootScope, $location) {
    //Check if User is authenticated
    if (User.getCachedCurrent() == null) {
        User.getCurrent();
    }
    // In Ionic the accessory bar is hidden by default. Do not hide the keyboard accessory bar for this app
    // so the drop-down form input can be used properly.
    if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }

    if (window.StatusBar) {
        StatusBar.styleLightContent(); //status bar will have white text and icons
    }

    //Replace $ionicPopup function with toast function
    /**
    if (window.Connection) {
           if (navigator.connection.type == Connection.NONE) {
               $ionicPopup.confirm({
                       title: 'No Internet Connection',
                       content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                   })
                   .then(function (result) {
                       if (!result) {
                           ionic.Platform.exitApp();
                       }
                   });
           }
       }
       **/

    //Go home func
    $rootScope.goHome = function() {
        $location.path('/entries');
    };

    $ionicPlatform.ready(function() {
//load cordova local notifications plugin with default settings
        window.plugin.notification.local.onadd = function(id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
         if(typeof analytics !== undefined) {
                analytics.startTrackerWithId("UA-54400853-2");
            } else {
                console.log("Google Analytics Unavailable");
            }
    });



})

.controller("FeedController", function($http, $scope) {

        $scope.init = function() {
            $http.get("http://ajax.googleapis.com/ajax/services/feed/load", {
                    params: {
                        "v": "1.0",
                        "q": "http://blog.nraboy.com/feed/"
                    }
                })
                .success(function(data) {
                    $scope.rssTitle = data.responseData.feed.title;
                    $scope.rssUrl = data.responseData.feed.feedUrl;
                    $scope.rssSiteUrl = data.responseData.feed.link;
                    $scope.entries = data.responseData.feed.entries;
                    window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);
                })
                .error(function(data) {
                    console.log("ERROR: " + data);
                    if (window.localStorage["entries"] !== undefined) {
                        $scope.entries = JSON.parse(window.localStorage["entries"]);
                    }
                });
        }
        $scope.browse = function(v) {
            window.open(v, "_system", "location=yes");
        }

    })
    .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
        $scope.showMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })


//Email Controller
.controller('EmailCtrl', function($scope) {
    $scope.sendEmail = function() {
        // 1
        var bodyText = "<h2>Look at the ScreenShot!</h2>";
        if (null != $scope.images) {
            var images = [];
            var savedImages = $scope.images;
            for (var i = 0; i < savedImages.length; i++) {
                // 2
                images.push("" + $scope.urlForImage(savedImages[i]));
                // 3
                images[i] = images[i].replace('file://', '');
            }

            // 4
            window.plugin.email.open({
                    to: ["denzjoseph@gmail.com"], // email addresses for TO field
                    cc: Array, // email addresses for CC field
                    bcc: Array, // email addresses for BCC field
                    attachments: images, // file paths or base64 data streams
                    subject: "DekutApp FeedBack", // subject of the email
                    body: bodyText, // email body (for HTML, set isHtml to true)
                    isHtml: true, // indicats if the body is HTML or plain text
                }, function() {
                    console.log('email view dismissed');
                },
                this);
        }
    }
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('feedback', {
            url: '/feedback',
            templateUrl: 'templates/feedback.html',
            controller: 'EmailCtrl'
        })
        .state('news', {
            url: '/news',
            controller: 'FeedController',
            templateUrl: 'templates/news.html'
        })


    .state('intro', {
            url: '/intro',
            templateUrl: 'templates/intro.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })


    //Academics Logics
    .state('academics', {
            url: "/academics",
            abstract: true,
            templateUrl: "templates/academics.html"
        })
        .state('academics.home', {
            url: '',
            views: {
                'academics-home': {
                    templateUrl: 'templates/academics-home.html'

                }
            }
        })
        .state('academics.notes', {
            url: '/notes',
            views: {
                'academics-notes': {
                    templateUrl: 'templates/academics-notes.html',
                    controller: 'ExtensionsCtrl'

                }
            }
        })
        .state('academics.reminders', {
            url: '/reminders',
            views: {
                'academics-reminders': {
                    templateUrl: 'templates/academics-reminders.html'
                }
            }
        })

    // Timetable and Academic Logics
    .state('timetables', {
            url: '/timetables',
            templateUrl: 'templates/academics-timetables.html',
            controller: 'TimetableNotificationCtrl'
        })
        .state('resources', {
            url: '/resources',
            templateUrl: 'templates/academics-resources.html'
        })
        //Eservices Route
        .state('eservices', {
            url: '/eservices',
            templateUrl: 'templates/eservices.html'
        })
        //Notice Board Logics
        .state('notices', {
            url: '/notices',
            templateUrl: 'templates/notices.html',
            controller: 'NoticeCtrl'
        })
        .state('notice', {
            url: '/notices/:noticeId',
            templateUrl: 'templates/notice.html',
            controller: 'NoticeCtrl'
        })

    //news article logics
.state('articles', {
    url: '/articles',
        templateUrl: 'templates/allnews.html',
        controller: 'ArticlesCtrl'
  })
     .state('article', {
    url: '/articles/:articleId',
        templateUrl: 'templates/newsitem.html',
        controller: 'ArticleCtrl'
  })

    //Tour Logics
    .state('tour', {
            url: '/tour',
            abstract: true,
            templateUrl: "templates/tour.html"
        })
        .state('tour.home', {
            url: '',
            views: {
                'tour-home': {
                    templateUrl: 'templates/tour-home.html'

                }
            }
        })
        .state('tour.about', {
            url: '/about',
            views: {
                'tour-about': {
                    templateUrl: 'templates/tour-about.html'

                }
            }
        })
        .state('tour.map', {
            url: '/map',
            views: {
                'tour-map': {
                    templateUrl: 'templates/tour-map.html'


                }
            }
        })
        .state('tour.facilities', {
            url: '/facilities',
            views: {
                'tour-facilities': {
                    templateUrl: 'templates/tour-facilities.html'

                }
            }
        })

    .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.tweet', {
            url: '/tweet/:id',
            views: {
                'home-tab': {
                    templateUrl: 'templates/tweet.html',
                    controller: 'TweetCtrl'
                }
            }
        })
        .state('tabs.dev', {
            url: '/dev',
            views: {
                'dev-tab': {
                    templateUrl: 'templates/dev.html',
                    controller: 'DevCtrl'
                }
            }
        })
        .state('tabs.account', {
            url: '/account',
            views: {
                'account-tab': {
                    templateUrl: 'templates/account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        //Rss Routes
        .state('Home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'templates/rsshome.html'
        })
        .state('Entries', {
            url: '/entries',
            controller: 'EntriesCtrl',
            templateUrl: 'templates/entries.html',
        })
        .state('Entry', {
            url: '/entry/:index',
            controller: 'EntryCtrl',
            templateUrl: 'templates/entry.html',
        })
        .state('Offline', {
            url: '/offline',
            templateUrl: 'templates/offline.html'
        });

    $urlRouterProvider.otherwise('/intro');

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            responseError: function(rejection) {
                console.log("Redirect");
                if (rejection.status == 401 && $location.path() !== '/login' && $location.path() !== '/register') {
                    $location.nextAfterLogin = $location.path();
                    $location.path('#/tab/home');
                }
                return $q.reject(rejection);
            }
        };
    });
});
