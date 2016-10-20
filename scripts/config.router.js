'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(
    [           '$rootScope', '$state', '$stateParams',
      function ( $rootScope,   $state,   $stateParams ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
        $urlRouterProvider
          .otherwise('/access/signin');
        $stateProvider
       
        .state('access', {
              abstract: true,
              url: '/access',
             template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
            })
            .state('access.signin', {
              url: '/signin',
              templateUrl: 'views/pages/signin.html'
            })
            .state('access.signup', {
              url: '/signup',
              templateUrl: 'views/pages/signup.html'
            })
            .state('access.forgot-password', {
              url: '/forgot-password',
              templateUrl: 'views/pages/forgot-password.html'
            })
            .state('access.lockme', {
              url: '/lockme',
              templateUrl: 'views/pages/lockme.html'
            })
    //  use of abstract true : : An abstract state will never be directly activated, but can provide inherited properties to its common children states.
          .state('ui', {
            url: '/ui',
            abstract: true,
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/aside.html'
              },
              'content': {
                templateUrl: 'views/content.html'
              }
            }
          })
           
            // material routers
            .state('ui.material', {
              url: '/material',
              template: '<div ui-view></div>',
              resolve: load('scripts/controllers/material.js')
            })
              
              .state('ui.material.card', {
                url: '/card',
                templateUrl: 'views/ui/material/card.html',
                data : { title: 'Card' }
              })
             
          .state('page', {
            url: '/page',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/aside.html'
              },
              'content': {
                templateUrl: 'views/content.html'
              }
            }
          })
            .state('page.profile', {
              url: '/profile',
              templateUrl: 'views/pages/profile.html',
              data : { title: 'Profile', theme: { primary: 'green'} }
            })
            .state('page.settings', {
              url: '/settings',
              templateUrl: 'views/pages/settings.html',
              data : { title: 'Settings' }
            })
             .state('page.claimpaymentinfo', {
                          url: '/claimpayment_info',
                          templateUrl: 'views/pages/claimpayment_info.html',
                        // templateUrl: 'views/pages/sliderbar.html',
                          data : { title: 'Claim/Payment Info'}
                        })
            .state('page.healthticket', {
                          url: '/healthTicket',
                          templateUrl: 'views/pages/healthTicket.html',
                        // templateUrl: 'views/pages/sliderbar.html',
                          data : { title: 'Health Ticket' }
                        })
            .state('page.healthticketPharmacyInfo', {
                          url: '/HealthTicketPharmacyInfo',
                          templateUrl: 'views/pages/HealthTicketPharmacyInfo.html',
                        // templateUrl: 'views/pages/sliderbar.html',
                          data : { title: 'Health Ticket' }
                        })
           .state('page.claiminfo_paymentdetails', {
                                    url: '/claiminfo_paymentdetails',
                                    templateUrl: 'views/pages/claiminfo_paymentdetails.html',
                                    data : { title: 'Settings' }
                                  })
            
          ;


          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );
