angular.module('app')
  .controller('ClaimPaymentInfo_PaymentDetails_Ctrlr', ['$scope','$http', '$state', '$window', '$document',
    function (            $scope, $http, $state, $window,   $document) {
      // add 'ie' classes to html
$scope.init = function () {

    $scope.clickedItemTransNumber2(localStorage.getItem("trans_id"));
};


$scope.clickedItemTransNumber2 = function(trans_id) {

$http({
    url: 'https://myclaimwebapi.crawco.com/payment/detail?trans_id='+ trans_id,
    method: 'GET',
   headers: {'Authorization': 'Bearer '+localStorage.getItem("access_token")},

}).success(function(response){

$scope.claimNumber = localStorage.getItem("claimNumber");
$scope.response = response;

$scope.checkNumber = response.result.transaction[0].trans_number;
$scope.paymentAmount = response.result.transaction[0].amount;
$scope.paidTo = response.result.transaction[0].pay_to_the_order;
$scope.checkDate = response.result.transaction[0].date_of_check;
$scope.address1 = response.result.transaction[0].addr1;
$scope.address2 = response.result.transaction[0].addr2;
//$scope.city = response.result.transaction[0].city;
//$scope.state = response.result.transaction[0].state;
//$scope.zip_code = response.result.transaction[0].zip_code;

$scope.cityStateZip = response.result.transaction[0].city+", "+response.result.transaction[0].state+" "+response.result.transaction[0].zip_code;



}).error(function(error){

    $window.alert(error.errorMessage);
});



}






      }]);