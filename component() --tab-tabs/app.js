// module init
angular.module('app', []);

function tabsCtrl() {

  let self = this;
  self.$onInit = function() {
    self. tabs = [];
  }

  // Want each tab can register itself, so we want the tab can access to the parent controller
  self.addTab = function addTab(tab) {
    self.tabs.push(tab);
  };

  self.selectTab = function selectTab(index) {
    for (var i = 0; i < self.tabs.length; i++) {
      self.tabs[i].selected = false;
    }
    self.tabs[index].selected = true;
  };

  // select the default tab, put it in the $postLink lifecycle hook
  self.$postLink = function() {
    self.selectTab(parseInt(self.active) || 0);
  }

}

function tabCtrl() {
  let self = this;

  self.$onInit = function() {
    self.tab = {
      label : self.label,
      selected : false
    };
  }

  self.tabs.addTab(tab);
}


let tabs = {
  //resctrict: 'E',
  // scope : {},
  // controllerAs : '$ctrl',
  // bindToController : true,
  // link
  bindings: {
    active : '@'
  },
  controller: tabsCtrl,
  transclude: true, // embedded the content into the directive
  template : `
  <div class="tabs">
    <ul class="tabs_list">
      <li ng-repeat="tab in $ctrl.tabs">
        <a href=""
           ng-bind="tab.label"
           ng-click="$ctrl.selectTab($index)"></a>
      </li>
    </ul>

    <div class="tabs_content" ng-transclude></div>
  </div>
  `
};

let tab = {
  bindings : {
    label : '@'
  },
  require: {
    tabs : '^^tabs'
  },
  controller : tabCtrl,
  transclude: true,
  template: `
    <div class="tab_content">
      <div ng-transclude ng-if="$ctrl.tab.selected"></div>
    </div>
  `
};
