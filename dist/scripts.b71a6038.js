// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var searchInput = document.querySelector('.weather__search');
var cityName = document.querySelector('.weather__city');
var day = document.querySelector('.weather__day');
var humidity = document.querySelector('.weather__indicators--humidity>.value');
var wind = document.querySelector('.weather__indicators--wind>.value');
var pressure = document.querySelector('.weather__indicators--pressure>.value');
var image = document.querySelector('.weather__image');
var temprature = document.querySelector('.weather__temp>.value');
var forecastBock = document.querySelector('.weahter__forecast');
var forecastIcon = document.querySelector('.weather__forecast__icon');
var forecastDay = document.querySelector('.weather__forecast__day');
var forecasttemp = document.querySelector('.weather__forecast__temprature');
var suggestions = document.querySelector('.suggestion');
var APIKey = 'f999dc164b9448e80899d77c2d3c6a56';
var endpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + APIKey;
var forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + APIKey;
var cityBaseEndpoint = 'https://api.teleport.org/api/cities/?search=';
var englishAl = [{
  alph: 'a'
}, {
  alph: 'b'
}, {
  alph: 'c'
}, {
  alph: 'd'
}, {
  alph: 'e'
}, {
  alph: 'f'
}, {
  alph: 'g'
}, {
  alph: 'h'
}, {
  alph: 'i'
}, {
  alph: 'j'
}, {
  alph: 'k'
}, {
  alph: 'l'
}, {
  alph: 'm'
}, {
  alph: 'n'
}, {
  alph: 'o'
}, {
  alph: 'p'
}, {
  alph: 'q'
}, {
  alph: 'r'
}, {
  alph: 's'
}, {
  alph: 't'
}, {
  alph: 'u'
}, {
  alph: 'v'
}, {
  alph: 'w'
}, {
  alph: 'x'
}, {
  alph: 'y'
}, {
  alph: 'z'
}];
var images = [{
  url: 'images/lightning2.png',
  id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
}, {
  url: 'images/rain2.png',
  id: [500, 501, 502, 503, 504]
}, {
  url: 'images/shower-rain2.png',
  id: [520, 521, 522, 531]
}, {
  url: 'images/mist2.png',
  id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
}, {
  url: 'images/sunny2.png',
  id: [800]
}, {
  url: 'images/snowy2.png',
  id: [600, 601, 602, 611, 612, 613, 614, 615, 616, 620, 621, 622]
}, {
  url: 'images/partly-cloudy2.png',
  id: [801]
}, {
  url: 'images/scatter-clouds2.png',
  id: [802]
}, {
  url: 'images/broken-clouds2.png',
  id: [803, 804]
}];

var getWeatherByCityName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
    var baseEndpoint, responce, results, request;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseEndpoint = endpoint + '&q=' + name;
            _context.next = 3;
            return fetch(baseEndpoint);

          case 3:
            responce = _context.sent;

            if (!(responce.status !== 200)) {
              _context.next = 7;
              break;
            }

            alert('city not found');
            return _context.abrupt("return");

          case 7:
            _context.next = 9;
            return responce.json();

          case 9:
            results = _context.sent;
            request = new XMLHttpRequest();
            request.open('GET', './cities.json');

            request.onload = function () {
              details = request.response;
              cities = JSON.parse(details);

              var _iterator = _createForOfIteratorHelper(cities),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var city = _step.value;

                  if (city.name === name) {
                    cityName.textContent = city.name;
                    break;
                  } else {
                    cityName.textContent = results.name;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              ;
            };

            request.send();
            return _context.abrupt("return", results);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWeatherByCityName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getForecastbyCityId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var baseEndpoint, results, forecast, forecastList, daily;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseEndpoint = forecastEndpoint + '&id=' + id;
            _context2.next = 3;
            return fetch(baseEndpoint);

          case 3:
            results = _context2.sent;
            _context2.next = 6;
            return results.json();

          case 6:
            forecast = _context2.sent;
            forecastList = forecast.list;
            daily = [];
            forecastList.forEach(function (day) {
              var date = new Date(day.dt_txt);
              var hour = date.getHours();

              if (hour === 12) {
                daily.push(day);
              }
            });
            return _context2.abrupt("return", daily);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getForecastbyCityId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updateCurrentWeather = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(city) {
    var deriection, deg, weather;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            day.textContent = dayOfWeek();
            humidity.textContent = city.main.humidity;
            pressure.textContent = city.main.pressure;
            deg = city.wind.deg;

            if (deg > 45 && deg <= 135) {
              deriection = 'شرق';
            } else if (deg > 135 && deg <= 225) {
              deriection = 'جنوب';
            } else if (deg > 225 && deg <= 315) {
              deriection = 'غرب';
            } else if (deg > 315 && deg <= 45) {
              deriection = 'شمال';
            }

            wind.textContent = deriection + ' _ ' + city.wind.speed.toFixed(0);
            temprature.textContent = Math.floor(city.main.temp) > 0 ? '+' + Math.floor(city.main.temp) : Math.floor(city.main.temp);
            weather = city.weather[0].id;
            images.forEach(function (obj) {
              if (obj.id.includes(weather)) {
                image.setAttribute('src', obj.url);
              }
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateCurrentWeather(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var updateForecast = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(forecast) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            forecastBock.innerHTML = '';
            forecast.forEach(function (day) {
              var iconURL = 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
              var weekday = dayOfWeek(day.dt * 1000);
              var temp = Math.floor(day.main.temp) > 0 ? '+' + Math.floor(day.main.temp) : Math.floor(day.main.temp);
              var forecastItem = "\n    <article class=\"weather__forecast__item\">\n      <img src=".concat(iconURL, " alt=\"\" class=\"weather__forecast__icon\">\n      <h3 class=\"weather__forecast__day\">").concat(weekday, "</h3>\n      <p dir=\"ltr\" class=\"weather__forecast__temprature\"><span class=\"value\">").concat(temp, "</span>&deg;c</p>\n    </article>");
              forecastBock.insertAdjacentHTML('afterbegin', forecastItem);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateForecast(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var dayOfWeek = function dayOfWeek() {
  var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
  return new Date(dt).toLocaleDateString('fa-IR', {
    'weekday': 'long'
  });
};

var weatherForCity = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(city) {
    var weather, cityId, dailyInfo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getWeatherByCityName(city);

          case 2:
            weather = _context5.sent;

            if (weather) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return");

          case 5:
            updateCurrentWeather(weather);
            cityId = weather.id;
            _context5.next = 9;
            return getForecastbyCityId(cityId);

          case 9:
            dailyInfo = _context5.sent;
            updateForecast(dailyInfo);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function weatherForCity(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var init = function init() {
  weatherForCity('تهران').then(function () {
    return document.body.style.filter = 'blur(0)';
  });
};

init();
searchInput.addEventListener('keydown', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(e) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            englishAl.forEach(function (alph) {
              if (alph.alph === e.key) {
                searchInput.style.textAlign = 'left';
                searchInput.getAttribute('dir', 'ltr');
                searchInput.setAttribute('placeholder', "city's name");
                searchInput.style.color = '#3b6a7e';
              }
            });

            if (e.keyCode === 13) {
              weatherForCity(searchInput.value);
            }

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}());
searchInput.addEventListener('input', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(e) {
    var endpoint, results, cities, length, i, option;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            endpoint = cityBaseEndpoint + searchInput.value;
            _context7.next = 3;
            return fetch(endpoint);

          case 3:
            _context7.next = 5;
            return _context7.sent.json();

          case 5:
            results = _context7.sent;
            console.log(results);
            cities = results._embedded['city:search-results'];
            suggestions.innerHTML = '';
            console.log(cities);
            length = cities.length > 8 ? 8 : cities.length;

            for (i = 0; i <= length; i++) {
              option = document.createElement('option');
              option.value = cities[i].matching_alternate_names[0].name;
              suggestions.appendChild(option);
            }

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}());
},{}],"C:/Users/hamidreza/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61203" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/hamidreza/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map