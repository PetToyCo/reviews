/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/tests/indexServerTests.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test/tests/indexServerTests.jsx":
/*!*****************************************!*\
  !*** ./test/tests/indexServerTests.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var _chai = chai,\n    expect = _chai.expect;\ndescribe('Reviews Service Server tests', function () {\n  describe('The server\\'s /review/:itemId endpoint', function () {\n    it('correctly retrieves the hardcoded data for item 100', function (done) {\n      axios.get('/reviews/100').then(function (res) {\n        var _res$data = res.data,\n            reviewAverage = _res$data.reviewAverage,\n            numberOfReviews = _res$data.numberOfReviews,\n            allReviews = _res$data.allReviews;\n        expect(reviewAverage).to.equal('3.5');\n        expect(numberOfReviews).to.equal(19);\n        expect(allReviews.length).to.equal(19);\n      }).then(function () {\n        return done();\n      }, done)[\"catch\"](function (err) {\n        console.log(err);\n      });\n    });\n    it('correctly retrieves the hardcoded reviews data for item 100', function (done) {\n      axios.get('/reviews/100').then(function (res) {\n        var allReviews = res.data.allReviews;\n        var validUsernames = {\n          'ChonkyCat': 1,\n          'TummyScratcher': 1,\n          'NotACatLady': 1,\n          'CatButt': 1,\n          'Froggy': 1,\n          'PikaPika': 1,\n          'catdude': 1,\n          'CVCat': 1,\n          'Bob': 1,\n          'ElGatoSupreme': 1,\n          'Winifred': 1,\n          'Sarah': 1,\n          'Emily': 1,\n          'Mary': 1,\n          'Binx': 1,\n          'Billy': 1,\n          'Dani': 1,\n          'Max': 1,\n          'Allison': 1\n        };\n        allReviews.forEach(function (reviewObject) {\n          var username = reviewObject.username;\n          expect(validUsernames[username]).to.equal(1);\n          validUsernames[username]++;\n        });\n      }).then(function () {\n        return done();\n      }, done)[\"catch\"](function (err) {\n        console.log(err);\n      });\n    });\n    it('correctly retrieves data for an item other than item 100', function (done) {\n      var roll = Math.floor(Math.random() * 99 + 100);\n      axios.get(\"/reviews/\".concat(roll)).then(function (res) {\n        var _res$data2 = res.data,\n            reviewAverage = _res$data2.reviewAverage,\n            numberOfReviews = _res$data2.numberOfReviews,\n            allReviews = _res$data2.allReviews;\n        expect(reviewAverage).to.exist;\n        expect(numberOfReviews).to.not.equal(19);\n        expect(allReviews).to.exist;\n      }).then(function () {\n        return done();\n      }, done)[\"catch\"](function (err) {\n        console.log(err);\n      });\n    });\n  });\n  describe('The server\\'s /averageReviews/:itemId endpoint', function () {\n    it('correctly retrieves the hardcoded data for item 100', function (done) {\n      axios.get('/reviews/100').then(function (res) {\n        var _res$data3 = res.data,\n            reviewAverage = _res$data3.reviewAverage,\n            numberOfReviews = _res$data3.numberOfReviews;\n        expect(reviewAverage).to.equal('3.5');\n        expect(numberOfReviews).to.equal(19);\n      }).then(function () {\n        return done();\n      }, done)[\"catch\"](function (err) {\n        console.log(err);\n      });\n    });\n    it('correctly retrieves data for an item other than item 100', function (done) {\n      var roll = Math.floor(Math.random() * 99 + 100);\n      axios.get(\"/reviews/\".concat(roll)).then(function (res) {\n        var _res$data4 = res.data,\n            reviewAverage = _res$data4.reviewAverage,\n            numberOfReviews = _res$data4.numberOfReviews;\n        expect(reviewAverage).to.exist;\n        expect(numberOfReviews).to.not.equal(19);\n      }).then(function () {\n        return done();\n      }, done)[\"catch\"](function (err) {\n        console.log(err);\n      });\n    });\n  });\n});\n\n//# sourceURL=webpack:///./test/tests/indexServerTests.jsx?");

/***/ })

/******/ });