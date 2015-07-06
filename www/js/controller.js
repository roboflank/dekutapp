angular.module('dekutapp.controller', [])
    //Custom Material Effects in The App
    .controller('ExtensionsCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicLoading, $ionicModal, $ionicPopup, ionicMaterialInk, $ionicPopover) {


        // Triggered on a button click, or some other target
        $scope.actionSheet = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: '<b>Share</b> This'
            }, {
                    text: 'Move'
            }],
                destructiveText: 'Delete',
                titleText: 'Modify your album',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 2000);

        };


        $scope.loading = function () {
            $ionicLoading.show({
                template: '<div class="ionic loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                $ionicLoading.hide();
            }, 2000);
        };

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
            $timeout(function () {
                $scope.modal.hide();
            }, 2000);
        };
        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        // Popover
        $scope.popover = function () {
            $scope.$parent.popover.show();
            $timeout(function () {
                $scope.$parent.popover.hide();
            }, 2000);
        };


        // Confirm
        $scope.showPopup = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'You are now my subscribed to Cat Facts',
                template: 'You will meow receive fun daily facts about CATS!'
            });


            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);
        };

        // Toggle Code Wrapper
        var code = document.getElementsByClassName('code-wrapper');
        for (var i = 0; i < code.length; i++) {
            code[i].addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }
    })

.controller("InviteCtrl", function ($scope, $cordovaSocialSharing) {

    $scope.shareAnywhere = function () {
        $cordovaSocialSharing.share("Download DekutApp", "Checkout DekutApp", "www/img/resources/icons/96.png", "http://dekutapp.github.io");
    }

    $scope.shareViaTwitter = function (message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function (result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function (error) {
            alert("Cannot share on Twitter");
        });
    }

})

.factory('Sessions', function ($resource) {
        return $resource('http://localhost:5000/sessions/:sessionId');
    })
    //Contoller for getting posts
    .controller('SessionsCtrl', function ($scope, Sessions) {
        $scope.sessions = Sessions.query();
    })
    //Controller for Sessions(plural)
    .controller('SessionCtrl', function ($scope, $stateParams, Sessions, $cordovaSocialSharing) {
        $scope.session = Sessions.get({
            sessionId: $stateParams.sessionId
        });

        //Added Share Function/Feature in Sessions Controller
        // check if  $cordovaSocialSharing module is a must
        $scope.shareNative = function () {
                if (window.plugins && window.plugins.socialsharing) {
                    window.plugins.socialsharing.share("Just Read This Notice on DekutApp " + $scope.session.title + ".",
                        'Dekut Notices', null, "http://dekutapp.github.io",
                        function () {
                            console.log("Success")
                        },
                        function (error) {
                            console.log("Share fail " + error)
                        });
                } else console.log("Share plugin not available");
            } //End of native sharing


        //Add To Calender Event
        $scope.addToCalendar = function () {
            if (window.plugins && window.plugins.calendar) {
                var hour = $scope.session.time.substring(0, $scope.session.time.indexOf(':'));
                if ($scope.session.time.indexOf("pm") > -1)
                    hour = parseInt(hour) + 12;
                var today = new Date();
                console.log("Date year" + today.getFullYear() + " mo " + today.getMonth() + " day " + today.getDate());
                var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 00, 00);
                var endDate = new Date();
                endDate.setTime(startDate.getTime() + 3600000); //one hour

                window.plugins.calendar.createEvent($scope.session.title, $scope.session.room, $scope.session.description, startDate, endDate,
                    function () {
                        alert($scope.session.title + " has been added to your calendar.");
                    },
                    function (error) {
                        console.log("Calendar fail " + error);
                    });
            } else console.log("Calendar plugin not available.");
        }

    });
