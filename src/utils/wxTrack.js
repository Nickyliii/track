var __assign = function() {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

var ObjectToString = Object.prototype.toString;
function getTag(type) {
  return function (value) {
    return ObjectToString.call(value) === "[object ".concat(type, "]");
  };
}
var variableTypeDetection = {
  isNumber: getTag("Number"),
  isString: getTag("String"),
  isBoolean: getTag("Boolean"),
  isNull: getTag("Null"),
  isUndefined: getTag("Undefined"),
  isSymbol: getTag("Symbol"),
  isFunction: getTag("Function"),
  isObject: getTag("Object"),
  isArray: getTag("Array"),
  isProcess: getTag("process"),
  isWindow: getTag("Window"),
};
function isInstanceOf(value, baseObj) {
  try {
    return value instanceof baseObj;
  }
  catch (_e) {
    return false;
  }
}
function isError(value) {
  switch (toString.call(value)) {
    case "[object Error]":
      return true;
    case "[object Exception]":
      return true;
    case "[object DOMException]":
      return true;
    default:
      return isInstanceOf(value, Error);
  }
}
function isEmpty(value) {
  return ((variableTypeDetection.isString(value) && value.trim() === "") ||
    value === undefined ||
    value === null);
}
function isEmptyObject(value) {
  return (variableTypeDetection.isObject(value) && Object.keys(value).length === 0);
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== "undefined" ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== "undefined" ? wx : 0) &&
  variableTypeDetection.isFunction(typeof App !== "undefined" ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== "undefined" ? window : 0);
function getGlobal() {
  if (isBrowserEnv)
    return window;
  if (isWxMiniEnv)
    return wx;
  if (isNodeEnv)
    return process;
}
function getGlobalMonitorSupport() {
  _global.__MONITOR__ = _global.__MONITOR__ || {};
  return _global.__MONITOR__;
}
var _global = getGlobal();
var _support = getGlobalMonitorSupport();

var PREFIX = "MONITOR Logger";
var Logger = (function () {
  function Logger() {
    var _this = this;
    this.enabled = false;
    this._console = {};
    _global.console = console || _global.console;
    if (console || _global.console) {
      var logType = ["log", "debug", "info", "warn", "error", "assert"];
      logType.map(function (item) {
        if (!(item in _global.console))
          return;
        _this._console[item] = _global.console[item];
      });
    }
  }
  Logger.prototype.enable = function () {
    this.enabled = true;
  };
  Logger.prototype.disable = function () {
    this.enabled = false;
  };
  Logger.prototype.bindOptions = function (debug) {
    this.enabled = debug;
  };
  Logger.prototype.getEnable = function () {
    return this.enabled;
  };
  Logger.prototype.log = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!this.enabled) {
      return;
    }
    (_a = this._console).log.apply(_a, __spreadArray(["".concat(PREFIX, "[Log]")], args, false));
  };
  Logger.prototype.warn = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!this.enabled) {
      return;
    }
    (_a = this._console).warn.apply(_a, __spreadArray(["".concat(PREFIX, "[Log]")], args, false));
  };
  Logger.prototype.error = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    (_a = this._console).error.apply(_a, __spreadArray(["".concat(PREFIX, "[Error]:")], args, false));
  };
  return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

function nativeTryCatch(fn, errorFn) {
  try {
    fn();
  }
  catch (err) {
    console.error("err", err);
    if (errorFn) {
      errorFn(err);
    }
  }
}

var version = "1.0.0";

var SDK_NAME = 'monitor';
var SDK_VERSION = version;

var MonitorLog = 'Monitor.log';
var MonitorLogEmptyMsg = 'empty.msg';
var MonitorLogEmptyTag = 'empty.tag';

var defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
  if (!fn || typeof fn !== "function") {
    return defaultFunctionName;
  }
  return fn.name || defaultFunctionName;
}
function toStringAny(target, type) {
  return ObjectToString.call(target) === type;
}
function toStringValidateOption(target, targetName, expectType) {
  if (toStringAny(target, expectType))
    return true;
  typeof target !== 'undefined' && logger.error("".concat(targetName, "\u671F\u671B\u4F20\u5165").concat(expectType, "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F").concat(ObjectToString.call(target), "\u7C7B\u578B"));
  return false;
}
function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
function silentConsoleScope(callback) {
  callback();
}
function getTimestamp() {
  return Date.now();
}
function setUrlQuery(url, query) {
  var queryArr = [];
  Object.keys(query).forEach(function (k) {
    queryArr.push("".concat(k, "=").concat(query[k]));
  });
  if (url.indexOf("?") !== -1) {
    url = "".concat(url, "&").concat(queryArr.join("&"));
  }
  else {
    url = "".concat(url, "?").concat(queryArr.join("&"));
  }
  return url;
}
function getCurrentRoute() {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return "";
  }
  var pages = getCurrentPages();
  if (!pages.length) {
    return "App";
  }
  var currentPage = pages.pop();
  return setUrlQuery(currentPage.route, currentPage.options);
}
function getLocationHref() {
  if (typeof document === "undefined" || document.location == null)
    return "";
  return document.location.href;
}
function getUrlWithEnv() {
  if (isWxMiniEnv)
    return getCurrentRoute();
  if (isBrowserEnv)
    return getLocationHref();
  return "";
}
function unknownToString(target) {
  if (variableTypeDetection.isString(target)) {
    return target;
  }
  if (variableTypeDetection.isUndefined(target)) {
    return "undefined";
  }
  return JSON.stringify(target);
}
function replaceOld(source, name, replacement, isForced) {
  if (isForced === void 0) { isForced = false; }
  if (source === undefined)
    return;
  if (name in source || isForced) {
    var original = source[name];
    var wrapped = replacement(original);
    if (typeof wrapped === "function") {
      source[name] = wrapped;
    }
  }
}
function throttle(fn, delay) {
  var canRun = true;
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!canRun)
      return;
    fn.apply(this, args);
    canRun = false;
    setTimeout(function () {
      canRun = true;
    }, delay);
  };
}
function typeofAny(target, type) {
  return typeof target === type;
}
function validateOption(target, targetName, expectType) {
  if (typeofAny(target, expectType))
    return true;
  typeof target !== 'undefined' && logger.error("".concat(targetName, "\u671F\u671B\u4F20\u5165").concat(expectType, "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F").concat(typeof target, "\u7C7B\u578B"));
  return false;
}

var Queue = (function () {
  function Queue() {
    this.stack = [];
    this.isFlushing = false;
    if (!("Promise" in _global))
      return;
    this.micro = Promise.resolve();
  }
  Queue.prototype.getStack = function () {
    return this.stack;
  };
  Queue.prototype.clear = function () {
    this.stack = [];
  };
  Queue.prototype.flushStack = function () {
    var temp = this.stack.slice(0);
    this.stack.length = 0;
    this.isFlushing = false;
    for (var i = 0; i < temp.length; i++) {
      temp[i]();
    }
  };
  Queue.prototype.addTask = function (fn) {
    var _this = this;
    if (typeof fn !== "function")
      return;
    if (!("Promise" in _global)) {
      fn();
      return;
    }
    this.stack.push(fn);
    if (!this.isFlushing) {
      this.isFlushing = true;
      this.micro.then(function () { return _this.flushStack(); });
    }
  };
  return Queue;
}());

function getBehaviorCategoryInBrowser(type) {
  switch (type) {
    case "Xhr":
    case "Fetch":
      return "http";
    case "Click":
    case "Route":
      return "user";
    case "Customer":
    case "Console":
      return "debug";
    case "Unhandledrejection":
    case "Code Error":
    case "Resource":
    default:
      return "exception";
  }
}
function extractErrorStack(ex, level) {
  var normal = {
    time: getTimestamp(),
    url: getUrlWithEnv(),
    name: ex.name,
    level: level,
    message: ex.message
  };
  if (typeof ex.stack === 'undefined' || !ex.stack) {
    return normal;
  }
  var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
  var submatch, parts, element;
  for (var i = 0, j = lines.length; i < j; ++i) {
    if ((parts = chrome.exec(lines[i]))) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0;
      var isEval = parts[2] && parts[2].indexOf('eval') === 0;
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        parts[2] = submatch[1];
        parts[3] = submatch[2];
        parts[4] = submatch[3];
      }
      element = {
        url: !isNative ? parts[2] : null,
        func: parts[1] || "UNKNOWN_FUNCTION",
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    }
    else if ((parts = winjs.exec(lines[i]))) {
      element = {
        url: parts[2],
        func: parts[1] || "UNKNOWN_FUNCTION",
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    }
    else if ((parts = gecko.exec(lines[i]))) {
      var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null;
      }
      else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
        stack[0].column = ex.columnNumber + 1;
      }
      element = {
        url: parts[3],
        func: parts[1] || "UNKNOWN_FUNCTION",
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    }
    else {
      continue;
    }
    if (!element.func && element.line) {
      element.func = "UNKNOWN_FUNCTION";
    }
    stack.push(element);
  }
  if (!stack.length) {
    return null;
  }
  return __assign(__assign({}, normal), { stack: stack });
}

var Severity;
(function (Severity) {
  Severity["Else"] = "else";
  Severity["Error"] = "error";
  Severity["Warning"] = "warning";
  Severity["Info"] = "info";
  Severity["Debug"] = "debug";
  Severity["Low"] = "low";
  Severity["Normal"] = "normal";
  Severity["High"] = "high";
  Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
(function (Severity) {
  function fromString(level) {
    switch (level) {
      case 'debug':
        return Severity.Debug;
      case 'info':
      case 'log':
      case 'assert':
        return Severity.Info;
      case 'warn':
      case 'warning':
        return Severity.Warning;
      case Severity.Low:
      case Severity.Normal:
      case Severity.High:
      case Severity.Critical:
      case 'error':
        return Severity.Error;
      default:
        return Severity.Else;
    }
  }
  Severity.fromString = fromString;
})(Severity || (Severity = {}));

var Subscribe = (function () {
  function Subscribe() {
    this.dep = new Map();
  }
  Subscribe.prototype.watch = function (eventName, callback) {
    var fns = this.dep.get(eventName);
    if (fns) {
      this.dep.set(eventName, fns.concat(callback));
      return;
    }
    this.dep.set(eventName, [callback]);
  };
  Subscribe.prototype.notify = function (eventName, data) {
    var fns = this.dep.get(eventName);
    if (!eventName || !fns)
      return;
    fns.map(function (fn) {
      nativeTryCatch(function () {
        fn(data);
      }, function (e) {
        logger.error("Subscribe.notify\uFF1A\u76D1\u542C\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\neventName:".concat(eventName, "\nName: ").concat(getFunctionName(fn), "\nError: ").concat(e));
      });
    });
  };
  return Subscribe;
}());

function isReportDataType(data) {
  return data.actionType === undefined && !data.isTrackData;
}

var BaseBehavior = (function () {
  function BaseBehavior() {
    this.maxBehavior = 10;
    this.beforePushBehavior = null;
    this.stack = [];
  }
  BaseBehavior.prototype.push = function (data) {
    var _this = this;
    if (typeof this.beforePushBehavior === "function") {
      var result_1 = null;
      var beforePushBehavior_1 = this.beforePushBehavior;
      silentConsoleScope(function () {
        result_1 = beforePushBehavior_1(_this, data);
      });
      if (!result_1)
        return;
      this.immediatePush(result_1);
      return;
    }
    this.immediatePush(data);
  };
  BaseBehavior.prototype.immediatePush = function (data) {
    data.time || (data.time = getTimestamp());
    if (this.stack.length >= this.maxBehavior) {
      this.shift();
    }
    this.stack.push(data);
    this.stack.sort(function (a, b) { return a.time - b.time; });
    logger.log(this.stack);
  };
  BaseBehavior.prototype.shift = function () {
    return this.stack.shift() !== undefined;
  };
  BaseBehavior.prototype.clear = function () {
    this.stack = [];
  };
  BaseBehavior.prototype.getStack = function () {
    return this.stack;
  };
  BaseBehavior.prototype.getCategory = function (type) {
    switch (type) {
      case "Xhr":
      case "Fetch":
        return "http";
      case "UI.Click":
      case "Route":
      case "UI.Tap":
      case "UI.Touchmove":
        return "user";
      case "Customer":
      case "Console":
        return "debug";
      case "App On Launch":
      case "App On Show":
      case "App On Hide":
      case "Page On Show":
      case "Page On Hide":
      case "Page On Share App Message":
      case "Page On Share Timeline":
      case "Page On Tab Item Tap":
        return "lifecycle";
      case "Unhandledrejection":
      case "Code Error":
      case "Resource":
      case "Vue":
      case "React":
      default:
        return "exception";
    }
  };
  BaseBehavior.prototype.bindOptions = function (options) {
    var maxBehavior = options.maxBehavior, beforePushBehavior = options.beforePushBehavior;
    validateOption(maxBehavior, "maxBehavior", "number") &&
    (this.maxBehavior = maxBehavior);
    validateOption(beforePushBehavior, "beforePushBehavior", "function") &&
    (this.beforePushBehavior = beforePushBehavior);
  };
  return BaseBehavior;
}());
var behavior = _support.behavior || (_support.behavior = new BaseBehavior());

var TransportData = (function () {
  function TransportData() {
    this.beforeDataReport = null;
    this.backTrackerId = null;
    this.configReportXhr = null;
    this.configReportUrl = null;
    this.configReportWxRequest = null;
    this.useImgUpload = false;
    this.apikey = "";
    this.trackKey = "";
    this.errorDsn = "";
    this.trackDsn = "";
    this.queue = new Queue();
  }
  TransportData.prototype.imgRequest = function (data, url) {
    var requestFun = function () {
      var img = new Image();
      var spliceStr = url.indexOf("?") === -1 ? "?" : "&";
      img.src = "".concat(url).concat(spliceStr, "data=").concat(encodeURIComponent(JSON.stringify(data)));
      img = null;
    };
    this.queue.addTask(requestFun);
  };
  TransportData.prototype.getRecord = function () {
    var recordData = _support.record;
    if (recordData &&
      variableTypeDetection.isArray(recordData) &&
      recordData.length > 2) {
      return recordData;
    }
    return [];
  };
  TransportData.prototype.getDeviceInfo = function () {
    return _support.deviceInfo || {};
  };
  TransportData.prototype.beforePost = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var errorId, transportData;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (isReportDataType(data)) {
              errorId = createErrorId(data, this.apikey);
              if (!errorId)
                return [2, false];
              data.errorId = errorId;
            }
            transportData = this.getTransportData(data);
            if (!(typeof this.beforeDataReport === "function")) return [3, 2];
            return [4, this.beforeDataReport(transportData)];
          case 1:
            transportData = _a.sent();
            if (!transportData)
              return [2, false];
            _a.label = 2;
          case 2: return [2, transportData];
        }
      });
    });
  };
  TransportData.prototype.xhrPost = function (data, url) {
    return __awaiter(this, void 0, void 0, function () {
      var requestFun;
      var _this = this;
      return __generator(this, function (_a) {
        requestFun = function () {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.withCredentials = true;
          if (typeof _this.configReportXhr === "function") {
            _this.configReportXhr(xhr, data);
          }
          xhr.send(JSON.stringify(data));
        };
        this.queue.addTask(requestFun);
        return [2];
      });
    });
  };
  TransportData.prototype.wxPost = function (data, url) {
    return __awaiter(this, void 0, void 0, function () {
      var requestFun;
      var _this = this;
      return __generator(this, function (_a) {
        requestFun = function () {
          var requestOptions = {
            method: "POST",
          };
          if (typeof _this.configReportWxRequest === "function") {
            var params = _this.configReportWxRequest(data);
            requestOptions = __assign(__assign({}, requestOptions), params);
          }
          requestOptions = __assign(__assign({}, requestOptions), { data: JSON.stringify(data), url: url });
          wx.request(requestOptions);
        };
        this.queue.addTask(requestFun);
        return [2];
      });
    });
  };
  TransportData.prototype.getAuthInfo = function () {
    var trackerId = this.getTrackerId();
    var result = {
      trackerId: String(trackerId),
      sdkVersion: SDK_VERSION,
      sdkName: SDK_NAME,
    };
    this.apikey && (result.apikey = this.apikey);
    this.trackKey && (result.trackKey = this.trackKey);
    return result;
  };
  TransportData.prototype.getApikey = function () {
    return this.apikey;
  };
  TransportData.prototype.getTrackKey = function () {
    return this.trackKey;
  };
  TransportData.prototype.getTrackerId = function () {
    if (typeof this.backTrackerId === "function") {
      var trackerId = this.backTrackerId();
      if (typeof trackerId === "string" || typeof trackerId === "number") {
        return trackerId;
      }
      else {
        logger.error("trackerId:".concat(trackerId, " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 ").concat(typeof trackerId));
      }
    }
    return "";
  };
  TransportData.prototype.getTransportData = function (data) {
    return {
      authInfo: this.getAuthInfo(),
      breadcrumb: behavior.getStack(),
      data: data,
      record: this.getRecord(),
      deviceInfo: this.getDeviceInfo(),
    };
  };
  TransportData.prototype.isSdkTransportUrl = function (targetUrl) {
    var isSdkDsn = false;
    if (this.errorDsn && targetUrl.indexOf(this.errorDsn) !== -1) {
      isSdkDsn = true;
    }
    if (this.trackDsn && targetUrl.indexOf(this.trackDsn) !== -1) {
      isSdkDsn = true;
    }
    return isSdkDsn;
  };
  TransportData.prototype.bindOptions = function (options) {
    var dsn = options.dsn, beforeDataReport = options.beforeDataReport, apikey = options.apikey, configReportXhr = options.configReportXhr, backTrackerId = options.backTrackerId, trackDsn = options.trackDsn, trackKey = options.trackKey, configReportUrl = options.configReportUrl, useImgUpload = options.useImgUpload, configReportWxRequest = options.configReportWxRequest;
    validateOption(apikey, "apikey", "string") && (this.apikey = apikey);
    validateOption(trackKey, "trackKey", "string") &&
    (this.trackKey = trackKey);
    validateOption(dsn, "dsn", "string") && (this.errorDsn = dsn);
    validateOption(trackDsn, "trackDsn", "string") &&
    (this.trackDsn = trackDsn);
    validateOption(useImgUpload, "useImgUpload", "boolean") &&
    (this.useImgUpload = useImgUpload);
    validateOption(beforeDataReport, "beforeDataReport", "function") &&
    (this.beforeDataReport = beforeDataReport);
    validateOption(configReportXhr, "configReportXhr", "function") &&
    (this.configReportXhr = configReportXhr);
    validateOption(backTrackerId, "backTrackerId", "function") &&
    (this.backTrackerId = backTrackerId);
    validateOption(configReportUrl, "configReportUrl", "function") &&
    (this.configReportUrl = configReportUrl);
    validateOption(configReportWxRequest, "configReportWxRequest", "function") && (this.configReportWxRequest = configReportWxRequest);
  };
  TransportData.prototype.send = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var dsn, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            dsn = "";
            if (isReportDataType(data)) {
              dsn = this.errorDsn;
              if (isEmpty(dsn)) {
                logger.error("dsn为空，没有传入监控错误上报的dsn地址，请在init中传入");
                return [2];
              }
            }
            else {
              dsn = this.trackDsn;
              if (isEmpty(dsn)) {
                logger.error("trackDsn为空，没有传入埋点上报的dsn地址，请在init中传入");
                return [2];
              }
            }
            return [4, this.beforePost(data)];
          case 1:
            result = _a.sent();
            if (!result)
              return [2];
            if (typeof this.configReportUrl === "function") {
              dsn = this.configReportUrl(result, dsn);
              if (!dsn)
                return [2];
            }
            if (isBrowserEnv) {
              return [2, this.useImgUpload
                ? this.imgRequest(result, dsn)
                : this.xhrPost(result, dsn)];
            }
            if (isWxMiniEnv) {
              return [2, this.wxPost(result, dsn)];
            }
            return [2];
        }
      });
    });
  };
  return TransportData;
}());
var transportData = _support.transportData || (_support.transportData = new TransportData());

var BaseClient = (function () {
  function BaseClient() {
    this.beforeAppAjaxSend = function () { };
    this.traceIdFieldName = "Trace-Id";
    this.throttleDelayTime = 0;
    this.maxDuplicateCount = 2;
    this.appOnLaunch = function () { };
    this.appOnShow = function () { };
    this.onPageNotFound = function () { };
    this.appOnHide = function () { };
    this.pageOnReady = function () { };
    this.pageOnLoad = function () { };
    this.pageOnUnload = function () { };
    this.pageOnShow = function () { };
    this.pageOnHide = function () { };
    this.onShareAppMessage = function () { };
    this.onShareTimeline = function () { };
    this.onTabItemTap = function () { };
    this.triggerWxEvent = function () { };
    this.enableTraceId = false;
  }
  BaseClient.prototype.bindOptions = function (options) {
    if (options === void 0) { options = {}; }
    var beforeAppAjaxSend = options.beforeAppAjaxSend, disabled = options.disabled, enableTraceId = options.enableTraceId, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, throttleDelayTime = options.throttleDelayTime, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp, appOnLaunch = options.appOnLaunch, appOnShow = options.appOnShow, appOnHide = options.appOnHide, pageOnLoad = options.pageOnLoad, pageOnReady = options.pageOnReady, pageOnUnload = options.pageOnUnload, pageOnShow = options.pageOnShow, pageOnHide = options.pageOnHide, onPageNotFound = options.onPageNotFound, onShareAppMessage = options.onShareAppMessage, onShareTimeline = options.onShareTimeline, onTabItemTap = options.onTabItemTap, wxNavigateToMiniProgram = options.wxNavigateToMiniProgram, triggerWxEvent = options.triggerWxEvent, maxDuplicateCount = options.maxDuplicateCount, onRouteChange = options.onRouteChange;
    validateOption(beforeAppAjaxSend, "beforeAppAjaxSend", "function") &&
    (this.beforeAppAjaxSend = beforeAppAjaxSend);
    validateOption(appOnLaunch, "appOnLaunch", "function") &&
    (this.appOnLaunch = appOnLaunch);
    validateOption(appOnShow, "appOnShow", "function") &&
    (this.appOnShow = appOnShow);
    validateOption(appOnHide, "appOnHide", "function") &&
    (this.appOnHide = appOnHide);
    validateOption(pageOnReady, "pageOnReady", "function") &&
    (this.pageOnReady = pageOnReady);
    validateOption(pageOnUnload, "pageOnload", "function") &&
    (this.pageOnLoad = pageOnLoad);
    validateOption(pageOnUnload, "pageOnUnload", "function") &&
    (this.pageOnUnload = pageOnUnload);
    validateOption(pageOnShow, "pageOnShow", "function") &&
    (this.pageOnShow = pageOnShow);
    validateOption(pageOnHide, "pageOnHide", "function") &&
    (this.pageOnHide = pageOnHide);
    validateOption(onPageNotFound, "onPageNotFound", "function") &&
    (this.onPageNotFound = onPageNotFound);
    validateOption(onShareAppMessage, "onShareAppMessage", "function") &&
    (this.onShareAppMessage = onShareAppMessage);
    validateOption(onShareTimeline, "onShareTimeline", "function") &&
    (this.onShareTimeline = onShareTimeline);
    validateOption(onTabItemTap, "onTabItemTap", "function") &&
    (this.onTabItemTap = onTabItemTap);
    validateOption(wxNavigateToMiniProgram, "wxNavigateToMiniProgram", "function") && (this.wxNavigateToMiniProgram = wxNavigateToMiniProgram);
    validateOption(triggerWxEvent, "triggerWxEvent", "function") &&
    (this.triggerWxEvent = triggerWxEvent);
    validateOption(onRouteChange, "onRouteChange", "function") &&
    (this.onRouteChange = onRouteChange);
    validateOption(disabled, "disabled", "boolean") &&
    (this.disabled = disabled);
    validateOption(enableTraceId, "enableTraceId", "boolean") &&
    (this.enableTraceId = enableTraceId);
    validateOption(traceIdFieldName, "traceIdFieldName", "string") &&
    (this.traceIdFieldName = traceIdFieldName);
    validateOption(throttleDelayTime, "throttleDelayTime", "number") &&
    (this.throttleDelayTime = throttleDelayTime);
    validateOption(maxDuplicateCount, "maxDuplicateCount", "number") &&
    (this.maxDuplicateCount = maxDuplicateCount);
    toStringValidateOption(filterXhrUrlRegExp, "filterXhrUrlRegExp", "[object RegExp]") && (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
    toStringValidateOption(includeHttpUrlTraceIdRegExp, "includeHttpUrlTraceIdRegExp", "[object RegExp]") && (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp);
  };
  BaseClient.prototype.use = function (plugins) {
    var _this = this;
    var subscribe = new Subscribe();
    plugins.map(function (item) {
      item.monitor.call(_this, subscribe.notify.bind(subscribe));
      var wrapperTransform = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var res = item.transform.apply(_this, args);
        item.consumer.call(_this, res);
      };
      subscribe.watch(item.name, wrapperTransform);
    });
  };
  BaseClient.prototype.log = function (data) {
    var _a = data.message, message = _a === void 0 ? MonitorLogEmptyMsg : _a, _b = data.tag, tag = _b === void 0 ? MonitorLogEmptyTag : _b, _c = data.level, level = _c === void 0 ? Severity.Critical : _c, _d = data.ex, ex = _d === void 0 ? "" : _d;
    var errorInfo = {};
    if (isError(ex)) {
      errorInfo = extractErrorStack(ex, level);
    }
    var error = __assign({ type: "LOG", level: level, message: unknownToString(message), name: MonitorLog, customTag: unknownToString(tag), time: getTimestamp(), url: getLocationHref() }, errorInfo);
    var breadcrumbStack = behavior.push({
      type: "Customer",
      category: getBehaviorCategoryInBrowser("Customer"),
      data: message,
      level: Severity.fromString(level.toString()),
    });
    transportData.send(error, breadcrumbStack);
  };
  BaseClient.prototype.sendTrackData = function (data) {
    var id = generateUUID();
    var trackTime = getTimestamp();
    transportData.send(__assign({ id: id, trackTime: trackTime }, data));
  };
  BaseClient.prototype.track = function (actionType, params) {
    var data = __assign(__assign({}, params), { actionType: actionType });
    this.sendTrackData(data);
    return data;
  };
  return BaseClient;
}());
var baseClient = _support.baseClient || (_support.baseClient = new BaseClient());

var allErrorNumber = {};
function hashCode(str) {
  var hash = 0;
  if (str.length == 0)
    return hash;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
function sortObjByKey(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (total, key) {
      if (variableTypeDetection.isObject(obj[key])) {
        total[key] = sortObjByKey(obj[key]);
      }
      else {
        total[key] = obj[key];
      }
      return total;
    }, {});
}
function stringToObjAndOrder(reason) {
  try {
    if (/\{.*\}/.test(reason)) {
      var obj = JSON.parse(reason);
      obj = sortObjByKey(obj);
      return JSON.stringify(obj);
    }
    return reason;
  }
  catch (error) {
    return reason;
  }
}
function getRealPath(url) {
  return url.replace(/[\?#].*$/, "").replace(/\/\d+([\/]*$)/, "{param}$1");
}
function generatePromiseErrorId(data, apikey) {
  var locationUrl = getRealPath(data.url);
  if (data.name === "unhandledrejection") {
    return data.type + stringToObjAndOrder(data.message) + apikey;
  }
  return (data.type + data.name + stringToObjAndOrder(data.message) + locationUrl);
}
function createErrorId(data, apikey) {
  var id;
  switch (data.type) {
    case "HTTP":
      id =
        data.type +
        data.request.method +
        data.response.status +
        getRealPath(data.request.url) +
        apikey;
      break;
    case "JAVASCRIPT":
    case "VUE":
    case "REACT":
      id = data.type + data.name + data.message + apikey;
      break;
    case "LOG":
      id = data.customTag + data.type + data.name + apikey;
      break;
    case "PROMISE":
      id = generatePromiseErrorId(data, apikey);
      break;
    default:
      id = data.type + data.message + apikey;
      break;
  }
  id = hashCode(id);
  if (allErrorNumber[id] >= behavior.maxDuplicateCount) {
    return null;
  }
  if (typeof allErrorNumber[id] === "number") {
    allErrorNumber[id]++;
  }
  else {
    allErrorNumber[id] = 1;
  }
  return id;
}

function getBehaviorCategoryInWx(type) {
  switch (type) {
    case "Xhr":
      return "http";
    case "Route":
    case "UI.Tap":
    case "UI.Touchmove":
      return "user";
    case "Customer":
    case "Console":
      return "debug";
    case "App On Launch":
    case "App On Show":
    case "App On Hide":
    case "Page On Load":
    case "Page On Show":
    case "Page On Ready":
    case "Page On Hide":
    case "Page On Share App Message":
    case "Page On Share Timeline":
    case "Page On Tab Item Tap":
      return "lifecycle";
    case "Unhandledrejection":
    case "Code Error":
    case "Resource":
    case "Vue":
    case "React":
    default:
      return "exception";
  }
}

function targetAsString(e) {
  var _a, _b;
  var id = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.id) ? " id=\"".concat((_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id, "\"") : "";
  var dataSets = Object.keys(e.currentTarget.dataset).map(function (key) {
    return "data-".concat(key, "=").concat(e.currentTarget.dataset[key]);
  });
  return "<element ".concat(id, " ").concat(dataSets.join(" "), "/>");
}
function invokeCallbackInReplacePage(callback) {
  var originPage = Page;
  Page = function (pageOptions) {
    callback(pageOptions);
    return originPage(pageOptions);
  };
}
function invokeCallbackInReplaceComponent(callback) {
  if (!Component) {
    return;
  }
  var originComponent = Component;
  Component = function (componentOptions) {
    if (!isEmptyObject(componentOptions.methods)) {
      callback(componentOptions.methods);
    }
    return originComponent.call(this, componentOptions);
  };
}
function invokeCallbackInReplaceBehavior(callback) {
  if (!Behavior) {
    return;
  }
  var originBehavior = Behavior;
  Behavior = function (behaviorOptions) {
    if (!isEmptyObject(behaviorOptions.methods)) {
      callback(behaviorOptions.methods);
    }
    return originBehavior.call(this, behaviorOptions);
  };
}
function addBehaviorInWx(data, type, level, params) {
  if (level === void 0) { level = Severity.Info; }
  if (params === void 0) { params = {}; }
  return behavior.push(__assign({ type: type, data: data, category: getBehaviorCategoryInWx(type), level: level }, params));
}

var wxDomPlugin = {
  name: "dom",
  monitor: function (notify) {
    function monitorDomWithOption(options) {
      function gestureTrigger(e) {
        e.mitoWorked = true;
        notify("dom", e);
      }
      var throttleGestureTrigger = throttle(gestureTrigger, baseClient.throttleDelayTime);
      var listenerTypes = ["touchmove", "tap"];
      if (options) {
        Object.keys(options).forEach(function (m) {
          if ("function" !== typeof options[m]) {
            return;
          }
          replaceOld(options, m, function (originMethod) {
            return function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var e = args[0];
              if (e && e.type && e.currentTarget && !e.mitoWorked) {
                // 这里处理数据
                baseClient.triggerWxEvent(e);
                if (listenerTypes.indexOf(e.type) > -1) {
                  throttleGestureTrigger(e);
                }
              }
              return originMethod.apply(this, args);
            };
          }, true);
        });
      }
    }
    invokeCallbackInReplacePage(function (pageOptions) {
      monitorDomWithOption(pageOptions);
    });
    invokeCallbackInReplaceBehavior(function (options) {
      monitorDomWithOption(options);
    });
    invokeCallbackInReplaceComponent(function (componentOptions) {
      monitorDomWithOption(componentOptions);
    });
  },
  transform: function (e) {
    var type = "UI.Touchmove";
    if (e.type === "tap") {
      type = "UI.Tap";
    }
    var data = targetAsString(e);
    return { data: data, type: type };
  },
  consumer: function (_a) {
    var data = _a.data, type = _a.type;
    addBehaviorInWx(data, type);
  },
};

function createWxInstance(options, plugins) {
  if (plugins === void 0) { plugins = []; }
  if (!isWxMiniEnv || options.disabled)
    return;
  var wxPlugins = [
    wxDomPlugin,
  ];
  behavior.bindOptions(options);
  transportData.bindOptions(options);
  logger.bindOptions(options.debug);
  baseClient.bindOptions(options);
  baseClient.use(__spreadArray(__spreadArray([], wxPlugins, true), plugins, true));
}
var init = createWxInstance;

export { init };
