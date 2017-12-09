define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List'
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
        function Home(router, users, auth) {
            _classCallCheck(this, Home);

            this.router = router;
            this.auth = auth;
            this.loginError = '';
            this.users = users;
            this.message = 'Home';
            this.showLogin = true;
        }

        Home.prototype.showRegister = function showRegister() {
            this.user = {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            };
            this.registerError = "";

            this.showLogin = false;
        };

        Home.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(this.user);
                                _context.next = 3;
                                return this.users.save(this.user);

                            case 3:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.showLogin = true;
                                } else {
                                    this.registerError = "There was a problem registering the user.";
                                }

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save() {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        Home.prototype.login = function login() {
            var _this = this;

            return this.auth.login(this.email, this.password).then(function (response) {
                sessionStorage.setItem("user", JSON.stringify(response.user));
                _this.loginError = "";
                _this.router.navigate('list');
            }).catch(function (error) {
                console.log(error);
                _this.loginError = "Invalid credentials.";
            });
        };

        return Home;
    }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/mypics', '../resources/data/photos', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _mypics, _photos, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _mypics.MyPics, _photos.Photos), _dec(_class = function () {
        function List(router, auth, mypics, photos) {
            _classCallCheck(this, List);

            this.router = router;
            this.mypics = mypics;
            this.photos = photos;
            this.auth = auth;
            this.message = 'List';
            this.user = JSON.parse(sessionStorage.getItem('user'));

            this.showList = 'mypicList';
        }

        List.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.mypics.getUserMypics(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        List.prototype.createMypic = function createMypic() {
            this.mypicObj = {
                mypics: "",
                description: "",
                dateCreated: new Date(),
                userId: this.user._id
            };

            this.showList = 'mypicForm';
        };

        List.prototype.createPhotos = function createPhotos() {
            this.mypicObj = {
                userId: this.user._id,
                Id: this.selectedphoto
            };
            this.showList = 'photosForm';
        };

        List.prototype.editMypic = function editMypic(mypic) {
            this.mypicObj = mypic;

            this.showList = 'mypicForm';
        };

        List.prototype.editPhotos = function editPhotos(mypic) {
            this.mypicObj = mypic;
            this.showList = 'photosForm';
        };

        List.prototype.deleteMypic = function deleteMypic(mypic) {
            this.mypics.deleteMypic(mypic._id);
        };

        List.prototype.deletePhotos = function deletePhotos(mypic) {
            this.photos.deletePhoto(mypic._id);
        };

        List.prototype.changeFiles = function changeFiles() {
            this.filesToUpload = new Array();
            this.filesToUpload.push(this.files[0]);
        };

        List.prototype.removeFile = function removeFile(index) {
            this.filesToUpload.splice(index, 1);
        };

        List.prototype.saveMypic = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response, mypicId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.mypicObj) {
                                    _context2.next = 14;
                                    break;
                                }

                                _context2.next = 3;
                                return this.mypics.save(this.mypicObj);

                            case 3:
                                response = _context2.sent;

                                if (!response.error) {
                                    _context2.next = 8;
                                    break;
                                }

                                alert("There was an error creating the MyPics");
                                _context2.next = 13;
                                break;

                            case 8:
                                mypicId = response._id;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.next = 12;
                                return this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);

                            case 12:
                                this.filesToUpload = [];

                            case 13:
                                this.showList = 'mypicList';

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveMypic() {
                return _ref2.apply(this, arguments);
            }

            return saveMypic;
        }();

        List.prototype.savePhotos = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var response, mypicId;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!this.mypicObj) {
                                    _context3.next = 14;
                                    break;
                                }

                                _context3.next = 3;
                                return this.photos.save(this.mypicObj);

                            case 3:
                                response = _context3.sent;

                                if (!response.error) {
                                    _context3.next = 8;
                                    break;
                                }

                                alert("There was an error creating the MyPics");
                                _context3.next = 13;
                                break;

                            case 8:
                                mypicId = response._id;

                                if (!(this.filesToUpload && this.filesToUpload.length)) {
                                    _context3.next = 13;
                                    break;
                                }

                                _context3.next = 12;
                                return this.photos.uploadFile(this.filesToUpload, this.user._id, mypicId);

                            case 12:
                                this.filesToUpload = [];

                            case 13:
                                this.showList = 'photosList';

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function savePhotos() {
                return _ref3.apply(this, arguments);
            }

            return savePhotos;
        }();

        List.prototype.showPhotos = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(mypic) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                this.selectedphoto = mypic._id;
                                _context4.next = 3;
                                return this.photos.getPhotos(mypic._id);

                            case 3:
                                this.showList = 'photosList';

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function showPhotos(_x) {
                return _ref4.apply(this, arguments);
            }

            return showPhotos;
        }();

        List.prototype.back = function back() {
            this.showList = 'mypicList';
        };

        List.prototype.backPhotos = function backPhotos() {
            this.showList = 'photosList';
        };

        List.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        return List;
    }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";

			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {

						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);

						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MyPics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MyPics = exports.MyPics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function MyPics(data) {
            _classCallCheck(this, MyPics);

            this.data = data;
            this.MYPIC_SERVICE = 'mypics';
            this.mypicsArray = new Array();
        }

        MyPics.prototype.getUserMypics = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.MYPIC_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserMypics(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserMypics;
        }();

        MyPics.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mypic) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!mypic) {
                                    _context2.next = 14;
                                    break;
                                }

                                if (mypic._id) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 4;
                                return this.data.post(mypic, this.MYPIC_SERVICE);

                            case 4:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.mypicsArray.push(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 9:
                                _context2.next = 11;
                                return this.data.put(mypic, this.MYPIC_SERVICE + "/" + mypic._id);

                            case 11:
                                _serverResponse = _context2.sent;

                                if (!_serverResponse.error) {}
                                return _context2.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        MyPics.prototype.deleteMypic = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.delete(this.MYPIC_SERVICE + "/" + id);

                            case 2:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteMypic(_x3) {
                return _ref3.apply(this, arguments);
            }

            return deleteMypic;
        }();

        MyPics.prototype.uploadFile = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(files, userId, mypicId) {
                var formData, serverResponse;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });
                                _context4.next = 4;
                                return this.data.uploadFiles(formData, this.MYPIC_SERVICE + "/upload/" + userId + "/" + mypicId);

                            case 4:
                                serverResponse = _context4.sent;
                                return _context4.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function uploadFile(_x4, _x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return uploadFile;
        }();

        return MyPics;
    }()) || _class);
});
define('resources/data/photos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Photos = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Photos = exports.Photos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Photos(data) {
            _classCallCheck(this, Photos);

            this.data = data;
            this.PHOTO_SERVICE = 'photos';
            this.photoArray = [];
        }

        Photos.prototype.getPhotos = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.PHOTO_SERVICE + "/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.photoArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getPhotos(_x) {
                return _ref.apply(this, arguments);
            }

            return getPhotos;
        }();

        Photos.prototype.getUserPhoto = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.get(this.PHOTO_SERVICE + "/user/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error && !response.message) {
                                    this.photoArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUserPhoto(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUserPhoto;
        }();

        Photos.prototype.save = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(photo) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!photo) {
                                    _context3.next = 14;
                                    break;
                                }

                                if (photo._id) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 4;
                                return this.data.post(photo, this.PHOTO_SERVICE);

                            case 4:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    this.photoArray.push(serverResponse);
                                }
                                return _context3.abrupt('return', serverResponse);

                            case 9:
                                _context3.next = 11;
                                return this.data.put(photo, this.PHOTO_SERVICE + "/" + photo._id);

                            case 11:
                                _serverResponse = _context3.sent;

                                if (!_serverResponse.error) {}
                                return _context3.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x3) {
                return _ref3.apply(this, arguments);
            }

            return save;
        }();

        Photos.prototype.deletePhoto = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.delete(this.PHOTO_SERVICE + "/" + id);

                            case 2:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.photoArray.length; i++) {
                                        if (this.photoArray[i]._id === id) {
                                            this.photoArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function deletePhoto(_x4) {
                return _ref4.apply(this, arguments);
            }

            return deletePhoto;
        }();

        Photos.prototype.uploadFile = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(files, userId, photoId) {
                var formData, serverResponse;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });
                                _context5.next = 4;
                                return this.data.uploadFiles(formData, this.PHOTO_SERVICE + "/upload/" + userId + "/" + photoId);

                            case 4:
                                serverResponse = _context5.sent;
                                return _context5.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function uploadFile(_x5, _x6, _x7) {
                return _ref5.apply(this, arguments);
            }

            return uploadFile;
        }();

        return Photos;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.DateFormatValueConverter = undefined;

        var _moment2 = _interopRequireDefault(_moment);

        function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                        default: obj
                };
        }

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
                function DateFormatValueConverter() {
                        _classCallCheck(this, DateFormatValueConverter);
                }

                DateFormatValueConverter.prototype.toView = function toView(value) {
                        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM DD YYYY';

                        if (value === undefined || value === null) {
                                return;
                        }

                        return (0, _moment2.default)(value).format(format);
                };

                return DateFormatValueConverter;
        }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n    }\r\n\r\n    .leftMargin {\r\n        margin-left: 10px;\r\n    }\r\n\r\n    .topMargin {\r\n        margin-top: 10px;\r\n    }\r\n    .img{\r\n        border: 1px solid #ddd; /* Gray border */\r\n        border-radius: 4px;  /* Rounded border */\r\n        padding: 5px; /* Some padding */\r\n        width: 150px; /* Set a small width */\r\n    }"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><head><style type=\"text/css\">body{background-color:#99dfd5}</style></head> <h1 class=\"leftMargin\">My Pictures</h1>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><head><style type=\"text/css\">body{background-color:#99dfd5}</style></head><compose show.bind=\"showList== 'mypicList'\" view=\"./components/mypicList.html\"></compose><compose show.bind=\"showList== 'mypicForm'\" view=\"./components/mypicForm.html\"></compose><compose show.bind=\"showList== 'photosList'\" view=\"./components/photosList.html\"></compose><compose show.bind=\"showList== 'photosForm'\" view=\"./components/photosForm.html\"></compose></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><form><div class=\"col-md-3\"><div class=\"border\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><div class=\"form group\"><label for=\"email\"><b>Email</b></label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"form group\"><label for=\"password\"><b>Password</b></label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div>    <button click.trigger=\"login()\">Login</button>       <button class=\"registerLink\" click.trigger=\"showRegister()\">Register</button></div></div></form></template>"; });
define('text!modules/components/mypicForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"mypicInput\">Gallery Name *</label><input value.bind=\"mypicObj.mypic\" type=\"text\" class=\"form-control\" id=\"mypicInput\" aria-describedby=\"mypicHelp\" placeholder=\"Enter Gallery Name\"> <small id=\"mypicHelp\" class=\"form-text text-muted\">A short name for the gallery.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"mypicObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"createDateInput\">Date Created *</label><flat-picker value.bind=\"mypicObj.dateCreate\"></flat-picker><small id=\"createDateHelp\" class=\"form-text text-muted\">The date to gallery is created.</small></div></form></div><button click.trigger=\"saveMypic()\" class=\"btn btn-primary topMargin\">Save</button></template>"; });
define('text!modules/components/mypicList.html', ['module'], function(module) { module.exports = "<template><h1 class=\"leftMargin\">Galleries</h1><div class=\"container\"></div><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createMypic()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"mypics.mypicsArray.length\"><table class=\"table\"><thead><tr><th>Gallery Name</th><th>Date Created</th><th>Description</th><th>Edit</th></tr></thead><tbody><tr repeat.for=\"mypic of mypics.mypicsArray\"><td click.trigger=\"showPhotos(mypic)\">${mypic.mypic}</td><td>${mypic.dateCreated|dateFormat}</td><td>${mypic.description}</td><td><i click.trigger=\"editMypic(mypic)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteMypic(mypic)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!mypics.mypicsArray.length\"><h2>Apparently, you don't have anything in gallery!</h2></div></div></div></template>"; });
define('text!modules/components/photosForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"backPhotos()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for photos&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any photos.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"savePhotos()\" class=\"btn btn-primary topMargin\">Save</button></div></template>"; });
define('text!modules/components/photosList.html', ['module'], function(module) { module.exports = "<template><h1 class=\"leftMargin\">Photos</h1><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createPhotos()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"photos.photoArray.length\"><table class=\"table\"><thead><tr><th>Photo</th><th>Edit</th></tr></thead><tbody><tr repeat.for=\"photo of photos.photoArray\"><td><a href=\"uploads/${user._id}/${photo.file.fileName}\" target=\"_blank\"><img src=\"uploads/${user._id}/${photo.file.fileName}\" alt=\"${photo.file.originalName} \" class=\"img-thumbnail\" style=\"width:150px\"></a></td><td><i click.trigger=\"editPhotos(photo)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deletePhotos(photo)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!photos.photoArray.length\"><h2>Apparently, you don't have any photos!</h2></div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-4\">  <form><div class=\"form-group\"><label for=\"InputFirstName\"><b>First Name</b></label><input type=\"text\" class=\"form-control\" id=\"InputFirstName\" aria-describedby=\"firstNameHelp\" placeholder=\"Enter first name\" value.bind=\"user.firstName\"></div><div class=\"form-group\"><label for=\"InputLastName\"><b>Last Name</b></label><input type=\"text\" class=\"form-control\" id=\"InputLastName\" aria-describedby=\"lastNameHelp\" placeholder=\"Enter last name\" value.bind=\"user.lastName\"></div><div class=\"form-group\"><label for=\"InputEmail\"><b>Email</b></label><input type=\"email\" class=\"form-control\" id=\"InputEmail\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\" value.bind=\"user.email\"></div><div class=\"form-group\"><label for=\"InputPassword\"><b>Password</b></label><input type=\"text\" class=\"form-control\" id=\"InputPassword\" aria-describedby=\"passwordHelp\" placeholder=\"Enter password\" value.bind=\"user.password\"></div><span>${registerError}</span> <button click.trigger=\"save()\">Save</button></form></div></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map