angular.module('app')
  .controller('ClaimPaymentInfo_Ctrlr', ['$scope','$http', '$state', '$window', '$document',
    function (            $scope, $http, $state, $window,   $document) {
      // add 'ie' classes to html
$scope.init = function () {

    $scope.getClaimPaymentInfoData();
    $scope.getAddClaimData();
};


$scope.getAddClaimData = function() {
$http({
    url: 'https://myclaimwebapi.crawco.com/users',
    method: 'GET',
   headers: {'Authorization': 'Bearer '+localStorage.getItem("access_token")},

}).success(function(response){

   $scope.response = response;
   $scope.userId = response.result.userId;
   $scope.userSSN = response.result.userSSN;
   $scope.userDOB = response.result.userDOB;
   $scope.zipCode = response.result.zipCode;

}).error(function(error){

    $window.alert(error.error_description);
});
}




//code to get claims data
$scope.getClaimPaymentInfoData = function(){

$http({
    url: 'https://myclaimwebapi.crawco.com/claims',
    method: 'GET',
   headers: {'Authorization': 'Bearer '+localStorage.getItem("access_token")},

}).success(function(response){

   $scope.response = response;
   localStorage.setItem("claimId",response.result.claims[0].claim_id);
   localStorage.setItem("claimNumber",response.result.claims[0].claim_number);

   $scope.claimNumber = response.result.claims[0].claim_number;
   $scope.claimStatus = response.result.claims[0].claim_status;

   $scope.myClaimInfoList = response.result.claims;
$scope.getPayments(0);
}).error(function(error){

    $window.alert(error.error_description);
});


}





$scope.getPayments = function(pageNumber) {

$http({
    url: 'https://myclaimwebapi.crawco.com/payments/?claim_id='+ localStorage.getItem("claimId")+'&pageNum='+pageNumber+'&pageSize=10',
    method: 'GET',
   headers: {'Authorization': 'Bearer '+localStorage.getItem("access_token"),'Content-Type': 'application/x-www-form-urlencoded'},

}).success(function(response){

   $scope.response = response;

$scope.claimPaymentInfoList = response.result.transactions;
 $scope.totalAmount = response.result.transactions[0].total_amount;


if(response.result.paging.totalPages == 0 || response.result.paging.totalPages == 1){

}
else {
var numbersList = [];
for(var i=1;i<=response.result.paging.totalPages;i++) {
    numbersList.push(i);
}
$scope.list = numbersList;
}
//$scope.noOfPages = response.result.paging.totalPages;


}).error(function(error){

    $window.alert(error.errorMessage);
});
}

$scope.paginationItemClicked = function($event) {
$scope.getPayments($event.currentTarget.text - 1);
}



$scope.clickedItemTransNumber = function(trans_id) {
localStorage.setItem("trans_id",trans_id);
$state.go('page.claiminfo_paymentdetails');
}






 }]);