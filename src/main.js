// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jsbase64 from 'js-base64'
import Diagram from './diagram.js'

Vue.config.productionTip = false

var Base64 = jsbase64.Base64;

//转码base64
window.base64Encode = function(v) {
  return Base64.encodeURI(JSON.stringify(v));
};

//解码base64
window.base64Decode = function(v) {
  return JSON.parse(Base64.decode(v));
};

//HTML转义
window.HTMLEncode = function(html) {
  var temp = document.createElement("div");
  (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
}

//HTML反转义
window.HTMLDecode = function(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}

//卦数据
window.Diagram = Diagram;

//neb Call 查询
window.nebCall = function(options){
  if(typeof options.onBeforeSend === 'function'){
    options.onBeforeSend();
  }

  neb.api.call(options.from, options.dappAddress, options.value, options.nonce, options.gas_price, options.gas_limit, {'function': options.callFunctionName, 'args': options.callFunctionArgs}).then(function (resp) {
    var result = JSON.parse(resp.result);
    if(result.success){
      if(typeof options.onSuccess === 'function'){
        options.onSuccess(result);
      }
    }else{
      if(typeof options.onFailed === 'function'){
        options.onFailed(result);
      }
    }
  }).catch(function (err) {
    if(typeof options.onError=== 'function'){
      options.onError(err);
    }
  });
};

//nebPay Call 谷歌插件
window.nebPayCall = function(options){
  var serialNumber = null;
  var intervalQueryId = 0;
  var count = 0;
  var queryResultInfo = function() {
    count++;
    nebPay.queryPayInfo(serialNumber, {callback: options.payCallbackUrl}).then(function(resp) {
      var respObject = JSON.parse(resp)
      //code==0交易发送成功, status==1交易已被打包上链
      if(respObject.code === 0 && respObject.data.status === 1) {
        clearInterval(intervalQueryId);
        if(typeof options.onSuccess === 'function'){
          options.onSuccess(respObject);
        }  
      }else{
        if(count > 3){
          clearInterval(intervalQueryId);
          if(typeof options.onFailed === 'function'){
            options.onFailed(respObject);
          }
        } 
      }
    }).catch(function (err) {
      if(typeof options.onError=== 'function'){
        options.onError(err);
      }
    });
  };
  
  if(typeof options.onBeforeSend === 'function'){
    options.onBeforeSend();
  }

  serialNumber = nebPay.call(options.dappAddress, "0", options.callFunctionName, options.callFunctionArgs, {
    callback: options.payCallbackUrl, 
    listener: function(resp) {
      intervalQueryId = setInterval(function() {
        queryResultInfo();
      }, 10000);
    }
  });
};

//请求方法
window.query = function(options){
  if(options.payCallbackUrl){
    nebPayCall(options);
  }else{
    nebCall(options);
  }
};

//时间转换如：20分钟前，1天前
window.transferHappendTime = function (time) {
  time = typeof time === 'string' ? time.replace(/-/g, "/") : time;
  var timestamp = new Date(time);
  var minusTime = new Date().getTime() - timestamp;

  var years = Math.floor(minusTime / (365 * 24 * 3600 * 1000));
  var months = Math.floor(minusTime / (30 * 24 * 3600 * 1000));
  var days = Math.floor(minusTime / (24 * 3600 * 1000));
  var hours = Math.floor(minusTime / (3600 * 1000));
  var minutes = Math.floor(minusTime / (60 * 1000));
  var seconds = Math.floor(minusTime / 1000) > 1 ? Math.floor(minusTime / 1000) : 1;

  return years >= 1 ? years + '年' : months >= 1 ? months + '月' : days >= 1 ? days + '天' : hours >= 1 ? hours + '小时' : minutes >= 1 ? minutes + '分钟' : seconds + '秒';
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})