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

.controller('UtilmosEventosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, URL) {
    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    var serialize = $.param({
						k: 'BL117974797479747963AC'
					});
    // $scope.default = URL;
    var config = {
        method: 'POST',
        url: URL.root+URL.conteudo,
        headers: {
            'Content-Type': undefined
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
        // data: {
        //     "channel": "teste"
        // }
    };
    $http(config).success(function(data) {
        var registros = [];
        $.each(data, function( key, values ){
            $.each(values, function( index, val ){
                if( val.categoria_id == "31" ){
                    registros.push(val);
                }
            });
        });
        $scope.registros = registros;

        // // Set Motion
        // $timeout(function() {
        //     ionicMaterialMotion.slideUp({
        //         selector: '.slide-up'
        //     });
        // }, 900);
        //
        // $timeout(function() {
        //     ionicMaterialMotion.fadeSlideInRight({
        //         startVelocity: 3000
        //     });
        // }, 1400);
        // // Set Ink
        // ionicMaterialInk.displayEffect();
    }).error(function(response) {
        console.log('erro');
        console.log(response);
    });
    // $http({
    //     url: URL.root+URL.conteudo,
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     // data: serialize
    // }).
    //     success(function(data) {
    //         var registros = [];
    //         $.each(data, function( key, values ){
    //             $.each(values, function( index, val ){
    //                 if( val.categoria_id == "31" ){
    //                     registros.push(val);
    //                 }
    //             });
    //         });
    //         $scope.registros = registros;
    //     }).
    //     error(function(data) {
    //         console.log('erro');
    //         console.log(data);
    //     }
    // );


    // // Set Motion
    // $timeout(function() {
    //     ionicMaterialMotion.slideUp({
    //         selector: '.slide-up'
    //     });
    // }, 900);
    //
    // $timeout(function() {
    //     ionicMaterialMotion.fadeSlideInRight({
    //         startVelocity: 3000
    //     });
    // }, 1400);

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
})
.controller('EventoCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, URL) {
    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    var config = {
        method: 'POST',
        url: URL.root+URL.conteudo,
        headers: {
            'Content-Type': undefined
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
        // data: {
        //     "channel": "teste"
        // }
    };
    $http(config).success(function(data) {
        $.each(data, function( key, values ){
            $.each(values, function( index, val ){
                if( (val.categoria_id == $stateParams.cat_id) && (val.id == $stateParams.evento_id) ){
                    $scope.registro = val;
                }
            });
        });



    }).error(function(response) {
        console.log('erro');
        console.log(response);
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

    // $http({
    //     url: URL.root+URL.conteudo,
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     // data: serialize
    // }).
    //     success(function(data) {
    //         $.each(data, function( key, values ){
    //             $.each(values, function( index, val ){
    //                 if( (val.categoria_id == $stateParams.cat_id) && (val.id == $stateParams.evento_id) ){
    //                     $scope.registro = val;
    //                 }
    //             });
    //         });
    //     }).
    //     error(function(data) {
    //         console.log('erro');
    //         console.log(data);
    //     }
    // );



    // // Set Motion
    // $timeout(function() {
    //     ionicMaterialMotion.slideUp({
    //         selector: '.slide-up'
    //     });
    // }, 900);
    //
    // $timeout(function() {
    //     ionicMaterialMotion.fadeSlideInRight({
    //         startVelocity: 3000
    //     });
    // }, 1400);
    //
    // // Set Ink
    // ionicMaterialInk.displayEffect();
})

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

    var config = {
        method: 'POST',
        url: URL.root+URL.conteudo,
        headers: {
            'Content-Type': undefined
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
        // data: {
        //     "channel": "teste"
        // }
    };
    $http(config).success(function(data) {
        var registros = [];
        $.each(data, function( key, values ){
            $.each(values, function( index, val ){
                if( (val.id == $stateParams.evento_id) ){
                    registros.push(val.galeria);
                }
            });
        });
        $scope.registros = registros[0];
    }).error(function(response) {
        console.log('erro');
        console.log(response);
    });

    // $http({
    //     url: URL.root+URL.conteudo,
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //     // data: serialize
    // }).
    //     success(function(data) {
    //         // console.log(data);
    //         var registros = [];
    //         $.each(data, function( key, values ){
    //             $.each(values, function( index, val ){
    //                 if( (val.id == $stateParams.evento_id) ){
    //                     registros.push(val.galeria);
    //                 }
    //             });
    //         });
    //         $scope.registros = registros[0];
    //     }).
    //     error(function(data) {
    //         console.log('erro');
    //         console.log(data);
    //     }
    // );

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
    }, 10000);
})

;
