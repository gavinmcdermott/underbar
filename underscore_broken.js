(function() {
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if(Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        iterator(obj[i], i, obj);
      };
    } else {
      for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(objectCollection, target) {
    var result;
    each(objectCollection, function(object, key, objectCollection) {
      if (object === target) {
        result = true;
      };
    });
    return result;
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, callback) {
    var result = [];
    if (array === null) { return result };
    each(array, function(object, key, array) {
      result.push(callback(object))
    });
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(objectCollection, property) {
    var result = [];
    each(objectCollection, function(object, key, objectCollection){
      if(object.hasOwnProperty(property)){
        result.push(object[property]);
      }
    });
    return result;
  };

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  var last = function(array, n) {
    var result = [];
    if (array === null) { return undefined };
    if (n === undefined) { n = 1; };
    if (n > array.length) { n = array.length; };
    var start = array.length - n;
    for (start; start < array.length; start++) {
      result.push(array[start]);
    }
    return result;
  };

  // Like last, but for the first elements
  var first = function(array, n) {
    var result = [];
    if (array === null) { return undefined };
    if (n === undefined) { n = 1; };
    if (n > array.length) { n = array.length; };
    for (var i = 0; i < n; i++) { result.push(array[i]) };
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  //take an input object
  //grab the first element and apply a callback to it with an initial value
  //set the initialvalue to that result and apply the callback to the next item
  //in the object
  var reduce = function(obj, callback, initialValue) {
    var result = initialValue || 0;
    map(obj, function(value){
      result = callback(result, value);
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    result = [];
    each(array, function(value){
      if (iterator(value)){
        result.push(value);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    result = [];
    each(array, function(value){
      if (!iterator(value)){
        result.push(value);
      }
    });
    return result;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    var result = true;
    each(obj, function(value){
      if (!iterator && !value || iterator && !iterator(value)) {
        result = false;
      }
    });
    return result;
  };


// jon's example
  // every([0,2,4], odd);
  // every([0,2,4], function{
  //   // !odd
  // });



  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    // return every(obj, function(){
    //   iterator
    // })
    var result = false;
    each(obj, function(value) {
      if(!iterator && value || iterator && iterator(value)){
        result = true;
      }
    })
    return result;
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var result = {};
    var result1 = [];
    each(array, function(value, key, array) {
      result[value] += 1;
    });
    for(var num in result){
      result1.push(num);
    }
    return result1;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.


  var once = function(func) {
  // return a function that calls the callback
  // the function calls the callback only once
  // always returns the callback's original return value
    var result;
    var wasRun = false;
    return function() {
      if(!wasRun){
        result = func();
        wasRun = true;
      }
      else{
        return result;
      }
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    var results = {};
    return function(n){
      if(!results.hasOwnProperty(n)){
        results[n] = func(n);
      }
      return results[n];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    var args = [];
    each(arguments, function(value){
      args.push(value);
    });
    return setTimeout(function(){
      func(args)
    }, wait, args)
    // return function(){
    //   return setTimeout(func.apply(this, arguments), wait, args);
    // }
  };

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    var args = arguments;
    //
    for (var i = 1; i < args.length; i++) {
      for(key in args[i]) {
        obj[key] = args[i][key];
      }
    };
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for(var key in arguments[i]) {
   
      }
    };
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(array, result) {
    return reduce()
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(obj, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
  };

  // Shuffle an array.
  var shuffle = function(obj) {
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle
  };


}).call(this);
