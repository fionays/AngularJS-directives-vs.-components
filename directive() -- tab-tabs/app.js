
/**
 * custom tabs directive
 */
function Tabs () {

  let directive = {
    restrict: 'E',  // type of directive
    scope: {},      // isolate directive
    transclude: true, // use trasclusion to pass each tab through
    controller: tabsController,
    controllerAs : '$ctrl',
    bindToController: true,
    link: link,
    template: `
      <div class="tabs">
        <ul class="tabs_list">
          <li ng-repeat="tab in $ctrl.tabs" ng-class="{'active' : tab.active, 'disabled' : tab.disabled}">
            <a href="" ng-bind="tab.lable" ng-click="$ctrl.selectTab($index)"></a>
          </li>
        </ul>
        <div class="tabs_content" ng-transclude></div>
      </div>
    `
  };

  return directive;
  function link (scope, elements, attrs, tabsCtrl) {
    // the $scope is the directive's scope, similar to the $scope of controller
    // $tabsCtrl is the current controller in the directive
    $tabsCtrl.selectTab(parseInt(attrs.active) || 0);
  }
}

// controller is outside the directive's closure -- eleminate issues where injection
// gets created as unreachable code after return statements.
//
// It can be put inside the directive closure, before the return statement.
// But put it outside make it tastable.
function tabsController () {

    let self = this;
    self.tabs = [];

    // Register tab, want each tab directive can access this function
    // and register itself
    self.addTab = function addTab(tab) {
      self.tabs.push(tab);
    };

    self.selectTab = function selectTab(index) {
      // disabled tab are not selectable
      if (self.tabs[index].disabled) {return}

      for (var i = 0 ; i < self.tabs.length; i ++) {
        self.tabs[i].selected = false;
      }

      self.tabs[index].selected = true;
    }
}

 /**
  * custom tab directive
  */
function Tab () {
  let directive = {
    restrict: 'E',
    scope: {
      lable : '@'
    },
    trasclude: true, // to transclude the tab body
    require: '^^tabs', // search for the parent controller and inject to the link function
    template: `
      <div class="tabs_content">
        <div ng-transclude></div>
      </div>
    `,
    link: link
  };

  return directive;
  function link(scope, element, attrs, tabsCtrl) {
    // this is the direcitve's scope
    scope.tab = {
      lable : scope.lable,
      selected: false,
      disabled: false
    };

    // if disable attrs exists, check the atrribute value.
    // set the disabled value to false if the value of 'disable' attrs is false,
    // otherwise, set the disabled value to true.
    if (attrs.disable) {
      attrs.$observe('disable', function(value) {
        scope.tab.disabled = (value !== 'fasle');
      });
    }

    tabsCtrl.addTab(scope.tab);
  }

}

angular
.module('app', [])
.directive('tabs', Tabs)
.directive('tab', Tab);
