/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('UtilmosEventosCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, JSON) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // var serialize = $.param({
    // 					k: 'BL117974797479747963AC'
    // 				});


    var jsonResult = JSON.conteudo().then(
        function(data) {     // On success
            $scope.registros = data;

            // Set Motion
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 700);

            // Set Ink
            ionicMaterialInk.displayEffect();
        },
        function(data) {   // On failure
            console.log('parte 2 ====>');
            console.log(data);
        });


})
// .controller('EventoCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, JSON) {
//     // Set Header
//     // $scope.$parent.showHeader();
//     // $scope.$parent.clearFabs();
//     // $scope.isExpanded = false;
//     // $scope.$parent.setExpanded(false);
//     // $scope.$parent.setHeaderFab(false);
//
//     var jsonResult = JSON.conteudoEvento($stateParams.cat_id, $stateParams.evento_id).then(
//         function(data) {     // On success
//             $scope.registro = data[0];
//         },
//         function(data) {   // On failure
//             console.log('erro');
//             console.log(data);
//         });
//
//     // // Set Motion
//     // $timeout(function() {
//     //     ionicMaterialMotion.slideUp({
//     //         selector: '.slide-up'
//     //     });
//     // }, 300);
//     //
//     // $timeout(function() {
//     //     ionicMaterialMotion.fadeSlideInRight({
//     //         startVelocity: 3000
//     //     });
//     // }, 10000);
//     //
//     // // Set Ink
//     // ionicMaterialInk.displayEffect();
// })

.controller('EventoCtrl', ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$ionicModal', '$ionicSlideBoxDelegate', 'JSON', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicModal, $ionicSlideBoxDelegate, JSON) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    var jsonResult = JSON.conteudoEvento($stateParams.cat_id, $stateParams.evento_id).then(
        function(data) {     // On success
            // console.log(data);
            $scope.registro = data[0];
            $scope.aImages = data[0].galeria;

            /*
            *
            * modal de imagem >>>
            */
            $ionicModal.fromTemplateUrl('image-modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function(modal) {
              $scope.modal = modal;
            });

            $scope.openModal = function() {
              $ionicSlideBoxDelegate.slide(0);
              $scope.modal.show();
            };

            $scope.closeModal = function() {
              $scope.modal.hide();
            };

            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
              $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hide', function() {
              // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
              // Execute action
            });
            $scope.$on('modal.shown', function() {
            });

            // Call this functions if you need to manually control the slides
            $scope.next = function() {
              $ionicSlideBoxDelegate.next();
            };

            $scope.previous = function() {
              $ionicSlideBoxDelegate.previous();
            };

          	$scope.goToSlide = function(index) {
              $scope.modal.show();
              $ionicSlideBoxDelegate.slide(index);
            }

            // Called each time the slide changes
            $scope.slideChanged = function(index) {
              $scope.slideIndex = index;
            };
            /*
            *
            * <<< modal de imagem
            */
            // Set Motion
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);

            // Set Ink
            ionicMaterialInk.displayEffect();
        },
        function(data) {   // On failure
            console.log('erro');
            console.log(data);
        });




    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 10000);

    // Set Ink
    ionicMaterialInk.displayEffect();


  }
])





.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, URL) {
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    // $scope.$parent.setHeaderFab(false);
    var req = {
        method: 'POST',
        url: URL.root+URL.conteudo,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // data: { test: 'test' }
    }

    $http(req)
        .then(function(res){
            var registros = [];
            $.each(res.data, function( key, values ){
                $.each(values, function( index, val ){
                    if( (val.id == $stateParams.evento_id) ){
                        registros.push(val.galeria);
                    }
                });
            });
            console.log(registros);
            $scope.registros = registros[0];
        }, function(data){
            console.log("error");
            console.log(data);

        });

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    $timeout(function() {
        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
    }, 300);
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
    }, 20000);
})

;
