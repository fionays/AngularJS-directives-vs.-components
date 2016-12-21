
/**
 * No $scope soup, bindToControler in AngularJS
 */


/**
 * bindToControler property in directive help to clean up DOM-Controller
 * namespacing, help keep code consistent.
 */


/**
 * case 1 -- without bindToController property
 */
 function fooDirective() {
   return {
     ...
     scope : {
       name : "="
     },
     controller : fooCtrl,
     controllerAs : '$ctrl'
     ...
   };
 }

 function fooController () {
   $scope.name = $scope.name + "!";
 }

 /**
  * case 2 -- with bindToController property
  */
  function fooDirective() {
    return {
      ...
      scope : {
        name : "="
      },
      bindToController : true,
      controller : fooCtrl,
      controllerAs : '$ctrl'
      ...
    };
  }

 // right now the controller can access the directives scope properties
  function fooController () {
    this.name = this.name + "!";
  }


  /**
   * Why we want to use this rather than $scope?
   */

   <div ng-controller="ParentCtrl">
    {{name}}
    <div ng-controller="ChildCtrl">
      {{$parent.name}} // Fiona
    </div>
   </div>

   function ParentCtrl($scope) {
     $scope.name = "Fiona";
   }

   function ChildCtrl($scope) {
     //$scope.name = "Song";
   }

   //////////////////////////////////
   <div ng-controller="ParentCtrl as parent">
    {{parent.name}}
    <div ng-controller="ChildCtrl as child">
      {{chile.name}}
      {{parent.name}}
      {{grant.name}}
    </div>
   </div>

   function ParentCtrl() {
     this.name = "Fiona";
   }

   function ChildCtrl() {
     this.name = "Song";
   }
