define(["ojs/ojcore","knockout","ojs/ojmodule-element-utils","ojs/ojmodule-element","ojs/ojrouter","ojs/ojknockout","ojs/ojarraytabledatasource","ojs/ojoffcanvas"],function(e,o,t){return new function(){var a=this,n=e.ResponsiveUtils.getFrameworkQuery(e.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);a.smScreen=e.ResponsiveKnockoutUtils.createMediaQueryObservable(n);var i=e.ResponsiveUtils.getFrameworkQuery(e.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);function r(e,o,t){this.name=e,this.linkId=o,this.linkTarget=t}a.mdScreen=e.ResponsiveKnockoutUtils.createMediaQueryObservable(i),a.router=e.Router.rootInstance,a.router.configure({dashboard:{label:"Dashboard",isDefault:!0},incidents:{label:"Incidents"},customers:{label:"Customers"},about:{label:"About"}}),e.Router.defaults.urlAdapter=new e.Router.urlParamAdapter,a.moduleConfig=o.observable({view:[],viewModel:null}),o.computed(function(){var e=a.router.moduleConfig.name(),o="views/"+e+".html",n="viewModels/"+e;Promise.all([t.createView({viewPath:o}),t.createViewModel({viewModelPath:n})]).then(function(e){a.moduleConfig({view:e[0],viewModel:e[1]})},function(e){})}),a.navDataSource=new e.ArrayTableDataSource([{name:"Dashboard",id:"dashboard",iconClass:"oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24"},{name:"Incidents",id:"incidents",iconClass:"oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24"},{name:"Customers",id:"customers",iconClass:"oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24"},{name:"About",id:"about",iconClass:"oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24"}],{idAttribute:"id"}),a.mdScreen.subscribe(function(){e.OffcanvasUtils.close(a.drawerParams)}),a.drawerParams={displayMode:"push",selector:"#navDrawer",content:"#pageContent"},a.toggleDrawer=function(){return e.OffcanvasUtils.toggle(a.drawerParams)},$("#navDrawer").on("ojclose",function(){$("#drawerToggleButton").focus()}),a.appName=o.observable("App Name"),a.userLogin=o.observable("john.hancock@oracle.com"),a.footerLinks=o.observableArray([new r("About Oracle","aboutOracle","http://www.oracle.com/us/corporate/index.html#menu-about"),new r("Contact Us","contactUs","http://www.oracle.com/us/corporate/contact/index.html"),new r("Legal Notices","legalNotices","http://www.oracle.com/us/legal/index.html"),new r("Terms Of Use","termsOfUse","http://www.oracle.com/us/legal/terms/index.html"),new r("Your Privacy Rights","yourPrivacyRights","http://www.oracle.com/us/legal/privacy/index.html")])}});