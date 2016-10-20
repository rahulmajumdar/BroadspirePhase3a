'use strict';

/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('AppCtrl', ['$scope','$http', '$state','$translate', '$localStorage', '$window', '$document', '$location', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette', '$anchorScroll',
    function (            $scope, $http, $state, $translate,   $localStorage,   $window,   $document,   $location,   $rootScope,   $timeout,   $mdSidenav,   $mdColorPalette,   $anchorScroll ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      // config
      $scope.app = {
        name: 'Broadspire',
        version: '1.0.2',
        // for chart colors
        color: {
          primary: '#3f51b5',
          broadspireheadercolor: '#007934',
          info:    '#2196f3',
          success: '#4caf50',
          warning: '#ffc107',
          danger:  '#f44336',
          accent:  '#7e57c2',
          white:   '#ffffff',
          light:   '#f1f2f3',
          dark:    '#475069'
        },
        setting: {
          theme: {
          broadspireheader: '007934',
            primary: 'indigo',
            accent: 'purple',
            warn: 'amber'
          },
          asideFolded: false
        },
        search: {
          content: '',
          show: false
        }
      }

      $scope.setTheme = function(theme){
        $scope.app.setting.theme = theme;
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.appSetting) ) {
        $scope.app.setting = $localStorage.appSetting;
      } else {
        $localStorage.appSetting = $scope.app.setting;
      }
      $scope.$watch('app.setting', function(){
        $localStorage.appSetting = $scope.app.setting;
      }, true);

      // angular translate
      $scope.langs = {en:'English', zh_CN:'中文'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
      };

      function isSmartDevice( $window ) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      };

      $scope.getColor = function(color, hue){
        if(color == "bg-dark" || color == "bg-white") return $scope.app.color[ color.substr(3, color.length) ];
        return rgb2hex($mdColorPalette[color][hue]['value']);
      }

      //Function to convert hex format to a rgb color
      function rgb2hex(rgb) {
        return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
      }

      function hex(x) {
        var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
      }

      $rootScope.$on('$stateChangeSuccess', openPage);

      function openPage() {
        $scope.app.search.content = '';
        $scope.app.search.show = false;
        $scope.closeAside();
        // goto top
        $location.hash('view');
        $anchorScroll();
        $location.hash('');
      }

      $scope.goBack = function () {
        $window.history.back();
      }

      $scope.openAside = function () {

$mdSidenav('aside').open();
      //  $timeout(function() { $mdSidenav('aside').open(); });
      }
      $scope.closeAside = function () {
        $timeout(function() { $document.find('#aside').length && $mdSidenav('aside').close(); });
      }

$scope.user = "tko456test@gmail.com";
$scope.pass = "sep$$Day1";
//$scope.user = "testingbroadspireapp@gmail.com";
//$scope.pass = "Claimant123";

/////Comment added by Rahul////////
$scope.getClaims = function() {


$http({
    url: 'https://myclaimwebapi.crawco.com/claims',
    method: 'GET',
   headers: {'Authorization': 'Bearer '+localStorage.getItem("access_token"),'Content-Type': 'application/x-www-form-urlencoded'},

}).success(function(response){

   $scope.response = response;

$scope.HealthTicketclaimNumber = localStorage.getItem("claimNumber");
$scope.PatientName = response.result.claims[0].employee_full_name;
$scope.DateOfInjury = response.result.claims[0].event_date;
$scope.Employer = response.result.claims[0].employer_name;
$scope.Employer = response.result.claims[0].employer_name;
$scope.StateOfJurisdiction = response.result.claims[0].juris_state;
$scope.BodyPart = response.result.claims[0].body_part;

localStorage.setItem('PharmacyInfoCheck',response.result.claims[0].primary_pharm_name);

$scope.Bin = response.result.claims[0].primary_pharm_bin;
$scope.PCN = response.result.claims[0].primary_pharm_pcn;
$scope.GroupNumber = response.result.claims[0].primary_pharm_group_num;
$scope.PharmacyName = response.result.claims[0].primary_pharm_name;
$scope.PharmacyPhoneNumber = response.result.claims[0].primary_pharm_phone_num;

localStorage.setItem('SecondaryPharmacyInfoCheck',response.result.claims[0].ancillary_pharm_name);

$scope.SecPharmacyName = response.result.claims[0].ancillary_pharm_name;
$scope.SecBin = response.result.claims[0].ancillary_pharm_bin;
$scope.SecPCN = response.result.claims[0].ancillary_pharm_pcn;
$scope.SecGroupNumber = response.result.claims[0].ancillary_pharm_group_num;
$scope.SecPharmacyPhoneNumber = response.result.claims[0].ancillary_pharm_phone_num;


}).error(function(error){

    $window.alert(error.errorMessage);
});
}
/////Code for getClaims i.e. Health ticket service/////


// code to login user
$scope.loginUser = function (user,pass) {

$http({
    url: 'https://myclaimwebapi.crawco.com/authenticate',
    method: 'POST',
   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
     data: {grant_type: "password", username: user, password: pass}
}).success(function(response){
localStorage.setItem("access_token",response.access_token);

    $scope.response = response;
    $state.go('page.claimpaymentinfo')

}).error(function(error){

    $window.alert(error);
});

}






    }
  ]);
