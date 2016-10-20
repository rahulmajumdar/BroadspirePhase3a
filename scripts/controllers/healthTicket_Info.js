angular.module('app')
  .controller('HealthTicket_Ctrlr', ['$scope','$http', '$state', '$window', '$document',
    function (            $scope, $http, $state, $window,   $document) {
      // add 'ie' classes to html
$scope.prescriptionDrugIDInfo = function() {

}
$scope.PharmacyInfo = function() {
 // alert('here');
//alert(localStorage.getItem('PharmacyInfoCheck'));
if(localStorage.getItem('PharmacyInfoCheck')=='null'){
alert('Pharmacy Information is not available');
//$state.go('page.healthticketPharmacyInfo');
//if(localStorage.getItem('SecondaryPharmacyInfoCheck') == 'null'){
//$scope.secondaryCard = false;
//}
}
else{
$state.go('page.healthticketPharmacyInfo');
if(localStorage.getItem('SecondaryPharmacyInfoCheck') == 'null'){
$scope.secondaryCard = false;
}
}
}


      }]);