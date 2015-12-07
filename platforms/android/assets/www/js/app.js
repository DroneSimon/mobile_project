
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.factory('myService',function(){
    objeto = {
        foto: "",
        latitud: "",
        longitud: "",
        altura: "",
        orientacion: "",
        velocidad: "",
        imei:"",
        phone:"",
    };
    return objeto;
})
.controller('DeviceController', function($ionicPlatform, $scope, $cordovaDevice, myService) {
    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            var device = $cordovaDevice.getDevice();
            myService.imei = device.uuid;
            $scope.uuid = device.uuid;
        });
    });
})
.controller("ExampleController", function ($scope, $cordovaCamera, myService) {
    $scope.takePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth:300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            myService.foto=imageData;
            $scope.fotos=imageData;
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    $scope.choosePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.base="data:image/base64;base64,";
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            var foto='dsfasdfjsjdfjasdjf';
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
})
.controller('GeolocationCtrl', function($scope, $cordovaGeolocation,myService) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          myService.latitud = position.coords.latitude;
          myService.longitud = position.coords.longitude;
          myService.altura = position.coords.altitude;
          $scope.lati=myService.latitud;
          $scope.longi=myService.longitud;
          $scope.alti=myService.altura;
      },function(err) {
        // error
    }
    );
})

.controller('envia',function($scope,$cordovaDeviceOrientation,$http,$cordovaGeolocation,myService,$cordovaDeviceMotion){
    document.addEventListener("deviceready", function () {
        $cordovaDeviceOrientation.getCurrentHeading().then(function(result) {
            myService.orientacion = result.magneticHeading;
            alert(myService.orientacion);
        }, function(err) {
            // An error occurred
        })
    });
    document.addEventListener("deviceready", function () {
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
            var X = result.x;
            var Y = result.y;
            var Z = result.z;
            myService.velocidad=X+Y+Z;
        }, function(err) {
            // An error occurred. Show a message to the user
        });
    }, false);
    $scope.enviarDatos=function(){
        console.log(typeof myService.latitud);
        objeto = {
            foto: myService.foto,
            latitud: myService.latitud,
            longitud: myService.longitud,
            altura: myService.altura,
            orientacion: myService.orientacion,
            velocidad: myService.velocidad,
            imei: myService.imei,
            number_phone:"phone",
            mensaje:"Mesaje de ayuda",
        };
        // objeto = {
        //     foto: "Foto",
        //     latitud: "latitud",
        //     longitud: "longitud",
        //     altura: "altura",
        //     orientacion: "orientacion",
        //     velocidad: "valocidad",
        //     imei: "emie",
        //     number_phone:"phone",
        //     mensaje:"Mesaje de ayuda",
        // };
        var url="http://190.11.71.71:8000/appmobile/services/?photo="+encodeURIComponent(objeto.foto)
            url+='&'+'latitude='+encodeURIComponent(objeto.latitud)
            url+='&'+'longitude='+encodeURIComponent(objeto.longitud)
            url+='&'+'altitude='+encodeURIComponent(objeto.altura)
            url+='&'+'orientation='+encodeURIComponent(objeto.orientacion)
            url+='&'+'speed='+encodeURIComponent(objeto.velocidad)
            url+='&'+'imei='+encodeURIComponent(objeto.imei)
            url+='&'+'number_phone='+encodeURIComponent(objeto.number_phone)
            url+='&'+'message='+encodeURIComponent(objeto.mensaje);
        $http.get(url)
            .then(function(data,error){
                window.tes=data;
                alert(data.data);
                alert(error);
                $scope.days=data.data;
            }, function(err) {
                alert(url);
            });
    }
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
            }
        }
    })
    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
            }
        }
    });
    $urlRouterProvider.otherwise('/tab/dash');
});
