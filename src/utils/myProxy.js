// myProxy.js
module.exports = (function () {
  let OriginPage = Page;
  let OriginComponent = Component;

  return (Page = function (conf) {
    console.log(conf, "11111111111111");
    Object.entries(conf).forEach(function (e) {
      let [methodName, methodFn] = e;

      if (typeof methodFn === "function") {
        conf[methodName] = function (...args) {
          // 做你想做的事，如改写 conf 等
          console.log(args)
          methodFn.call(this, ...args);
        };
      }
    });
    return OriginPage(conf);
  })(
    (Component = function (conf) {
     /* const methods = conf.methods;
      console.log(methods, '1111111111111111111111')
      methods.forEach(function (e) {
        // 做你想做的事，如改写 conf 等
      });*/

      return OriginComponent(conf);
    })
  );
})();
