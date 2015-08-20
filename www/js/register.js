angular.module('dekutapp.register', ['lbServices', 'ionic'])
    .controller('RegisterCtrl', function ($scope, User, Avatar, $ionicPopup, $location, $ionicLoading) {
       
     /*
         * Show loading while data is being processed
         * Then hide loading when feedback is gotten
         */

        $scope.show = function(message) {
            $ionicLoading.show({
                template: '<div class="ionic loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div> <div>Please Wait...</div>'
            });
        };

        $scope.hide = function() {
            $ionicLoading.hide();
        };
    /**
         * Currently you need to initialiate the variables
         * if you want to use them in the controller. This seems to be a bug with
         * ionic creating a child scope for the ion-content directive
         */
        $scope.registration = {};
        $scope.avatar = {};

        /**
         * Redirect user to the app if already logged in
         */
        if (User.getCachedCurrent()!==null) {
            $location.path('tab/home');
        }

        /**
         * @name register()
         * @desctiption
         * register a new user and login
         */
        $scope.register = function () {
                        $scope.show();

            $scope.registration.created = new Date().toJSON();
            $scope.registration.avatar = "img/avatar/" + $scope.avatar.id + ".png";
            $scope.avatar = {}; //Reset
            $scope.user = User.create($scope.registration)
                .$promise
                .then(function (res) {
                    console.log(res.avatar);
                    /**
                     * Save avatar
                     */
                    Avatar.create({url: res.avatar, ownerId: res.id})
                        .$promise
                        .then(function (res) {
                            /**
                             * Sign in new user
                             */
                            User.login({include: 'user', rememberMe: true}, $scope.registration)
                                .$promise
                                .then(function (res) {
                                    $location.path('tab/home')
                                                            $scope.hide();

                                }, function (err) {
                                                        $scope.hide();

                                    $scope.loginError = err;
                                    $scope.showAlert(err.statusText, err.data.error.message);
                                })
                        }, function (err) {
                            console.log(err);
                        })
                }, function (err) {
                    $scope.registerError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
                });
        };

        /**
         * @name showAlert()
         * @param {string} title
         * @param  {string} errorMsg
         * @desctiption
         * Show a popup with the given parameters
         */
        $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function () {
                console.log($scope.loginError);
            });
        };
    });
