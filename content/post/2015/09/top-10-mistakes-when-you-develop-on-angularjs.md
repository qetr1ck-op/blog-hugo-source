+++
title = "TOP 10 mistakes when you develop on AngularJS"
date = "2015-09-23 18:40:03"
categories = [
    "AngularJS",
    "Architecture",
    "Javascript",
    "CSS"
]
+++

The top 10 mistakes when beginners start to develop on AngularJS.

<!--more-->

# MVC directory structure

When you work with MVC / MVW frameworks it's convenience to structure code by `MVC components` using the following template:

```bash
templates/
├───login.html
└───feed.html
app/
├───app.js
└───controllers/
    ├───LoginController.js
    └───FeedController.js
    directives/
    └───FeedEntryDirective.js
    services/
    ├───LoginService.js
    └───FeedService.js
    filters/
    └───CapitalizeFilter.js
```

But when project will rise it's hard to use such structure of folders. You always need to open a few folder at the same time. It isn't depend what IDE or tool you use (Sublime, VS, Vim with NerdTree) - it's uncomfortable.

To avoid this this developers often use grouping by `functionality type`:

```bash
app/
├───app.js
└───Feed/
    ├───feed.html
    ├───FeedController.js
    ├───FeedEntryDirective.js
    └───FeedService.js
    Login/
    ├───_login.html
    ├───LoginController.js
    └───LoginService.js
    Shared/
    └───CapitalizeFilter.js
```

The structure allows more faster search for files which are related to the same feature. It may puzzled at the beginning to share js with html or even with test files. But it saves a lot of time, because it's more natural.

#  Not scalable Modules

At the beginning of development all functionalities include in a **single module**. But manage a such type of code is inconvenient:

```js
let app = angular.module('app',[]);
app.service('MyService', function(){
    //service code
});

app.controller('MyCtrl', function($scope, MyService){
    //controller code
});
```

The next most common approach is grouping objects **by type**:

```js
let services = angular.module('services',[]);
services.service('MyService', function(){
    //service code
});

let controllers = angular.module('controllers', ['services']);
controllers.controller('MyCtrl', function($scope, MyService){
    //controller code
});

let app = angular.module('app', ['controllers', 'services']);
```

For better scalability and future re-usability - split code **by feature**:

```js
let sharedServicesModule = angular.module('sharedServices',[]);
sharedServices.service('NetworkService', function($http){});

let loginModule = angular.module('login', ['sharedServices']);
loginModule.service('loginService', function(NetworkService){});
loginModule.controller('loginCtrl', function($scope, loginService){});

let app = angular.module('app', ['sharedServices', 'login']);
```

# Minification with Dependency Injection

Pattern DI in AngularJS uses out of box. DI helps to keep code clean and helps with testing process.

```js
let app = angular.module('app',[]);
app.controller('MainCtrl', function($scope, $timeout) { //MainCtrl has dependency on $scope and $timeout
    $timeout(function(){
        console.log($scope);
    }, );
});

//And code after minification:

let app=angular.module("app",[]);app.controller("MainCtrl",function(e,t){t(function(){console.log(e)})})
```

Now AngularJS can't resolve minificated variables. Easiest solution is:

```js
app.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $timeout(function() {
        console.log($scope);
    });
}]);

//another best practice approach with $inject

app.controller('MainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout'];

function mainCtrl($scope, $timeout) {
     $timeout(function() {
        console.log($scope);
    });
}
```

Now Angular can resolve dependency.

Another way to handle DI with minification is [ng-annotate](https://github.com/olov/ng-annotate) module. More information on official [AngularJS docs](https://docs.angularjs.org/tutorial/step_05#a-note-on-minification)

# Global Dependencies

Often when writing AngularJS apps there will be a dependency on an object that binds itself to the global scope. This means it's available in any AngularJS code, but this breaks the dependency injection model.

AngularJS makes it simple to encapsulate these globals into modules so they can be injected like standard AngularJS modules:

```js
let underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; //Underscore must already be loaded on the page
});

let app = angular.module('app', ['underscore']);

app.controller('MainCtrl', ['$scope', '_', function($scope, _) {
    init = function() {
        _.keys($scope);
    }

    init();
}]);
```

# Fat controllers

It's easy, especially when starting out, to put to much logic in the controller. Controller should **never** do a DOM manipulation. That's work for directives! Likewise business logic should live in services.

App data should be also stored and fetched in services, except when we need bound to the `$scope`. Services are singletons that persist throughout the lifetime of the application, while controllers are transient between application states. If data is stored in the controller then it will need to be fetched from somewhere when it is instantiate.

AngularJS works best when following the Single Responsibility Principle (SRP). If the controller is a coordinator between the view and the model, then the amount of logic it has should be minimal. This will also make testing much simpler.

# Service vs Factory vs Provider

What is service:

1.  It provides methods to keep, share and organize data across the lifetime of the Angular app
2.  Lazy loads, Angular only creates instance of a service when an application component depends on it
3.  Singleton object, application component dependent on the service work with the single instance

An Angular service can be created in five different ways:

1.  service
2.  factory
3.  provider
4.  value
5.  constant

The most verbose, but also the most comprehensive one is a **Provider** recipe. The remaining four recipe types — Value, Factory, Service and Constant — are just syntactic sugar on top of a provider recipe.

Here is a great examples by Misko:

```js
module.value('a', 123);
module.constant('A', 321); //can't modify with a decorator

function Controller(a, A) {
    expect(a).toEqual(123);
    expect(A).toEqual(231);
}
```

In this case the injectors simply return the value. But what if you want to compute the value?

```js
module.factory('b', function(a) {
    return a*2;
});

function Controller(b) {
    expect(b).toEqual(246);
}
```

So **factory** is a function which responsible to creating or/and modifying the value. Notice that the the factory function can ask for other **dependencies**

If you want to be more OO and have a class?

```js
module.factory('greeterFactory', function(a) {
    function Greeter(a) {
        this.greet = function() {
            return 'Hello ' + a;
        }
    }
    
    return new Greeter(a);
});

//or with service
module.service('greeterService', function(a) {
    this.greet = function() {
        return 'Hello ' + a;
    }
});

function Controller(greeterFactory, greeterService) {
    expect(greeter instanceof Greeter).toBe(true);
    expect(greeter.greet()).toEqual('Hello 123');
    
    const greeter2 = new greeter2;
    expect(greeter2 instanceof greeterFactory).toBe(true);
    expect(greeter2.greet()).toEqual('Hello 123');
}
```

But if we want to configure service function before injection? Use **provider**:

```js
module.provider('greeter3', function() {
    var salutation = 'Hello';
    this.setSalutation = function(s) {
        salutation = s;
    }

    function Greeter(a) {
        this.greet = function() {
            return `${salutation} ${a}`;
        }
    }

    this.$get = function(a) {
        return new Greeter(a);
    };
});

// configuration in config phase
module('abc', []).config(function(greeter3Provider) {
    greeter3Provider.setSalutation('Halo');
});

function Controller(greeter2) {
    expect(greeter2.greet()).toEqual('Halo 123');
}
```

As a side note, **service**, **factory**, and **value** are all derived from provider:

```js
module.service = function(name, Class) {
    provider.provide(name, function() {
        this.$get = function($injector) {
            return $injector.instantiate(Class);
        };
    });
}

module.factory = function(name, factory) {
    provider.provide(name, function() {
        this.$get = function($injector) {
            return $injector.invoke(factory);
        };
    });
}

module.value = function(name, value) {
    provider.factory(name, function() {
        return value;
    });
};
```

# Always dot in VM $scope's

In AngularJS every `$scope` prototypical inherits from its parent `$scope` till the highest level `$rootScope`.

```html
<div ng-controller="navCtrl">
   <span>{{user}}</span> <!-- won't be updating -->
   <div ng-controller="loginCtrl">
      <span>{{user}}</span>
      <input ng-model="user"></input> <!-- changes update only loginCtrl scope -->
   </div>
</div>
```

When looking up for `primitive` value, the prototype chain is not consulted. If `navCtrl` updated simultaneously then a prototype chain lookup is required, this won't happen when the value is an **object**:

```html
<div ng-controller="navCtrl">
   <span>{{user.name}}</span>
   <div ng-controller="loginCtrl">
      <span>{{user.name}}</span>
      <input ng-model="user.name"></input>
   </div>
</div>
```

# Unit testing AngularJS apps

JavaScript is a dynamically typed language which comes with great power of expression, but it also comes with almost no help from the compiler.
For this reason we feel very strongly that any code written in JavaScript needs to come with a strong [set of tests](https://docs.angularjs.org/guide/unit-testing).

# Not to do an end-to-end testing with Protractor

[Protractor](https://github.com/angular/protractor) uses the [Jasmine](http://jasmine.github.io/1.3/introduction.html) test framework for defining tests. Protractor has a very robust API for different page interactions.
There are other end to end test tools, but Protractor has the advantage of understanding how to work with AngularJS code, especially when it comes to `$digest` cycles and more.

# Full-Spectrum Testing with Karma

[Awesome post](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html) about testing AngularJS with `Karma`, passage from the post:

Karma is an amazing testing tool which is designed to take all the frustration out of setting up a working test runner when testing JavaScript code.
Karma works by spawning up each browser that is specified within its configuration file and then running JavaScript code against those browsers to see if they pass certain tests.
Communication between Karma and each of the browsers is handled with the karma service running in the terminal using socket.io.
Each time a test is run, Karma records its status and then tallies up which browsers have failed for each test and which ones passed and timed out.
This makes each test work 100% natively in each browser without the need to test individually.
Also, since the Karma service runs on a port and keeps track of browsers by itself, you can easily hook up other browsers and devices to it just by visiting its broadcasting port.
Oh and did I mention that Karma is fast? Yeah it's really fast...

#  Using jQuery

AngularJS is a framework for building scalable apps. jQuery is a famous library for simplifying DOM manipulation, event handling, AJAX operation.

AngularJS is about architecture of app, not augmenting HTML pages.

Try to stop using jQuery and imperative paradigm, just let your code to extend HTML syntax in declarative style.

DOM manipulation should only be done in directives, but this doesn't mean they have to be jQuery wrappers. Always consider what features AngularJS already provides before reaching for jQuery.

Save my day:

*	[Original post](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make)