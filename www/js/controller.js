angular.module('dekutapp.controller', ['ionic', 'ngCordova', 'ngResource', 'dekutapp.factory' , 'ionic-toast'])


//Contoller for getting posts
.controller('ArticlesCtrl', function ($scope, Article) {
        $scope.articles = Article.query();
    })
    //Controller for Articles(plural)
    .controller('ArticleCtrl', function ($scope, $stateParams, Article) {
        $scope.article = Article.get({
            articleId: $stateParams.articleId
        });
    })

//Controller for items todo fb
.controller("ListCtrl", function ($scope, Items) {
    $scope.items = Items;
    $scope.addItem = function () {
        var name = prompt("Enter Your School To-Do's");
        if (name) {
            $scope.items.$add({
                "name": name
            });
        }
    };
    $scope.login = function () {
        Auth.$authWithOAuthRedirect("facebook");
    };
})

//Elibrary Controller
//start parse controller to send PastPapers request data
.controller('PastPapersListController', ['$scope', 'PastPapers', function ($scope, PastPapers) {

        PastPapers.getAll().success(function (data) {
            $scope.items = data.results;
        });

        $scope.onItemDelete = function (item) {
            PastPapers.delete(item.objectId);
            $scope.items.splice($scope.items.indexOf(item), 1);
        }

}])
    .controller('PastPapersController', ['$scope', 'PastPapers', '$state', function ($scope, PastPapers, $state) {

        $scope.pastpapers = {};

        $scope.create = function () {
            PastPapers.create({
                content: $scope.pastpapers.content,
                email: $scope.pastpapers.email,
                Names: $scope.pastpapers.Names,
                Number: $scope.pastpapers.Number
            }).success(function (data) {
                $state.go('tabs.home');
            });
        }


}])
    .controller('PastPapersEditController', ['$scope', 'PastPapers', '$state', '$stateParams', function ($scope, PastPapers, $state, $stateParams) {

        $scope.pastpapers = {
            id: $stateParams.id,
            content: $stateParams.content
        };

        $scope.edit = function () {
            PastPapers.edit($scope.pastpapers.id, {
                content: $scope.pastpapers.content
            }).success(function (data) {
                $state.go('tabs.home');
            });
        }

}])
    // End of parse controller

/* User sends text to the libary number from the app
 * Use this incase the online one is ineffective
 */
.controller('SMSController', function ($scope, $cordovaSms) {
    $scope.sms = {
        number: '0721112312',
        message: 'This is some dummy text',
        unitcode: '',
        unittitle: '',
        email: '',
        name: '',
        number: '',

    };

    document.addEventListener("deviceready", function () {

        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };

        $scope.sendSMS = function () {

            $cordovaSms
                .send('0721112312', 'Requesting pastpapers', options)
                .then(function () {
                    alert('Success');
                    $location.path('#/elibrary');

                    // Success! SMS was sent
                }, function (error) {
                    alert('Error');
                    // An error occurred
                });
        }
    });
})

//Controller For Submitting feedback via a form
.controller('FeedBackListController', ['$scope', 'FeedBack', function ($scope, FeedBack) {

        FeedBack.getAll().success(function (data) {
            $scope.items = data.results;
        });

        $scope.onItemDelete = function (item) {
            PastPapers.delete(item.objectId);
            $scope.items.splice($scope.items.indexOf(item), 1);
        }

}])
    .controller('FeedBackController', ['$scope', 'FeedBack', '$state', function ($scope, FeedBack, $state) {

        $scope.feedback = {};

        $scope.submit = function () {
            FeedBack.create({
                type: $scope.feedback.type,
                email: $scope.feedback.email,
                content: $scope.feedback.content,
            }).success(function (data) {
                $state.go('about.home');
            });
        }


}])
    .controller('FeedBackEditController', ['$scope', 'FeedBack', '$state', '$stateParams', function ($scope, FeedBack, $state, $stateParams) {

        $scope.feedback = {
            id: $stateParams.id,
            content: $stateParams.content
        };

        $scope.edit = function () {
            FeedBack.edit($scope.feedback.id, {
                content: $scope.feedback.content
            }).success(function (data) {
                $state.go('about.home');
            });
        }

}])

//Eservices controllers
//Controller For Submitting eservice request via a form
.controller('EserviceListController', ['$scope', 'Eservice', 'ionic-toast', function ($scope, Eservice, ionicToast) {

        Eservice.getAll().success(function (data) {
            $scope.items = data.results;
        });

        $scope.onItemDelete = function (item) {
            Eservice.delete(item.objectId);
            $scope.items.splice($scope.items.indexOf(item), 1);
        }

}])
    .controller('EserviceController', ['$scope', 'Eservice', '$state', 'ionic-toast', function ($scope, Eservice, $state, ionicToast) {

        $scope.showToast = function(){
        // ionicToast.show(message, position, stick, time);
          ionicToast.show('This is a toast at the top.', 'top', true, 2500);
        };
        $scope.eservice = {};

        $scope.request = function () {
            Eservice.create({
                type: $scope.eservice.type,
                email: $scope.eservice.email,
                content: $scope.eservice.content,
                Number: $scope.eservice.Number,
                names: $scope.eservice.names,
           
            }).success(function (data) {
                $state.go('eservices');
            });
        }


}])
    .controller('EserviceEditController', ['$scope', 'Eservice', '$state', '$stateParams', function ($scope, Eservice, $state, $stateParams) {

        $scope.eservice = {
            id: $stateParams.id,
            content: $stateParams.content
        };

        $scope.edit = function () {
            Eservice.edit($scope.eservice.id, {
                content: $scope.eserv.content
            }).success(function (data) {
                $state.go('eservices');
            });
        }

}])

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
            title: 'DISCLAIMER',
            template: 'The School does not like us. Therefore we do not own any content displayed in the App. <br/>All credits are provided below.<br><p><strong>CREDITS</strong><p>Timothy Maina<p>Sam Kairu'
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

.controller('LibraryCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicModal) {
    //Library modal
    $ionicModal.fromTemplateUrl('library.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openLibrary = function () {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });




})

//Controller for labs
.controller('LabsCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicModal) {
    $ionicModal.fromTemplateUrl('lab.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openLab = function () {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

})

//controller for farm
.controller('FarmCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicModal) {
    //Farm modal
    $ionicModal.fromTemplateUrl('farm.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openFarm = function () {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

})

//controller for conservancy
//controller for farm
.controller('ConservancyCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $ionicModal) {
    $ionicModal.fromTemplateUrl('conservancy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openConservancy = function () {
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 2000);
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
})


//Map Controller
.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, function (error) {
        console.log("Could not get location");
    });
    //After Map has Loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

    });

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


//Contoller for getting notices
.controller('NoticesCtrl', function ($scope, Notice) {
        $scope.notices = Notice.query();
    })
    //Controller for Sessions(plural)
    .controller('NoticeCtrl', function ($scope, $stateParams, Notice, $cordovaSocialSharing) {
        $scope.notice = Notice.get({
            noticeId: $stateParams.noticeId
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

    })

//TimeTable Local Notifications
.controller("TimetableNotificationCtrl", function ($scope, $cordovaLocalNotification) {

    $scope.add = function () {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $scope.isScheduled = function () {
            $cordovaLocalNotification.isScheduled("1234").then(function (isScheduled) {
                alert("Notification 1234 Scheduled: " + isScheduled);
            });
        }
        //Prompt for permission in iOS 8 only
    $ionicPlatform.ready(function () {
        if (device.platform === "iOS") {
            window.plugin.notification.local.promptForPermission();
        }
    });
    //Add Event Listener for notification added
    $scope.$on("$cordovaLocalNotification:added", function (id, state, json) {
        alert("Added a notification");
    });

});
