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


.controller('DeviceController', function($ionicPlatform, $scope, $cordovaDevice) {
    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            // sometimes binding does not work! :/
            // getting device infor from $cordovaDevice

            var device = $cordovaDevice.getDevice();
            $scope.manufacturer = device.manufacturer;
            $scope.model = device.model;
            $scope.platform = device.platform;

            var imei=device.uuid;

            $scope.uuid = device.uuid;
        });
    });
})


.controller("ExampleController", function ($scope, $cordovaCamera) {

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

.controller('GeolocationCtrl', function($scope, $cordovaGeolocation) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          var alt  = position.coords.altitude
         // alert(lat + " --- " + long + "----" + alt);
          $scope.lati=lat;
          $scope.longi=long;
          $scope.alti=alt;

      },function(err) {
        // error
    }
    );





})


.controller('envia',function($scope,$http,$cordovaDevice){

    $scope.enviarDatos=function(){
        var device = $cordovaDevice.getDevice();
        var orientacion=166876;
        var velocidad=46843;
        var cel=4635;
        var prueba='asdfasdfasdfmensaje';

        //var url="http://190.11.74.178:8000/appmobile/services/?photo="+encodeURIComponent(foto)
        var url="http://hades.scesi.org/appmobile/services/?photo="+encodeURIComponent(foto)
            url+='&'+'latitude='+encodeURIComponent(lat)
            url+='&'+'longitude='+encodeURIComponent(long)
            url+='&'+'altitude='+encodeURIComponent(alt)
            url+='&'+'orientation='+encodeURIComponent(orientacion)
            url+='&'+'speed='+encodeURIComponent(velocidad)
            url+='&'+'imei='+encodeURIComponent(imei)
            url+='&'+'number='+encodeURIComponent(cel)
            url+='&'+'message='+encodeURIComponent(prueba);

        //$http.get('http://192.168.0.100:8000/appmobile/services/?photo="22asdf22"&latitude=12324.23423&longitude=123.2123&altitude=123.2342&orientation=234.234&speed=34.343&imei=1231231233453434&number=76453423')
        console.log(url);
        $http.get(url)
            .then(function(data,error){
                window.tes=data;
                alert(data.data);
                alert(error);
                $scope.days=data.data;
            });

    }

})
//position.coords.altitude

.controller('acelerometro',function($scope,$cordovaAcelerometro){
    var watchID = null;

          // Wait for Cordova to load
          //
          document.addEventListener("deviceready", onDeviceReady, false);

          // Cordova is ready
          //
          function onDeviceReady() {
              startWatch();
          }

          // Start watching the acceleration
          //
          function startWatch() {

              // Update acceleration every 3 seconds
              var options = { frequency: 2000 };

              watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
          }

          // Stop watching the acceleration
          //
          function stopWatch() {
              if (watchID) {
                  navigator.accelerometer.clearWatch(watchID);
                  watchID = null;
              }
          }

          // onSuccess: Get a snapshot of the current acceleration
          //
          function onSuccess(acceleration) {
              var element = document.getElementById('accelerometer');
              //element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                //                  'Acceleration Y: ' + acceleration.y + '<br />' +
                //                  'Acceleration Z: ' + acceleration.z + '<br />' + 
                //                  'Timestamp: '      + acceleration.timestamp + '<br />';

                var acex = navigator.accelerometer.watchAcceleration.acceleration.x
                var acexx=acceleration.x;
                $scope.xx=element.acceleration.x;
                $scope.yy=element.acceleration.y;
                $scope.zz=element.acceleration.zz;
                $scope.tt=element.acceleration.timestamp;
                $scope.abc=acceleration.x;
                $scope.abcd=acex;
                $scope.abcde=acexx;
          }

          // onError: Failed to get the acceleration
          //
          function onError() {
              alert('onError!');
          }
}


)
