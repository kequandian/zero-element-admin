// export const pageUrl = 'http://192.168.3.210:8089/forms'
// export const pageUrl = '/api/pageconfig/lowMainPage/lowMainPages/config'

"use strict";

const _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
const __window = require('zero-element/lib/utils/window');

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;

var _window = _interopRequireDefault(__window);

function get() {
    var winZEle = _window["default"].ZEle;

    if(winZEle){
        return winZEle.pageServer;
    }
}

function set(pageServer) {
    if(_window["default"].ZEle){
        _window["default"].ZEle.pageServer = pageServer;
    }
}

// export currentPageId 

exports.getid = getid;
exports.setid = setid;

function getid() {
    var winZEle = _window["default"].ZEle;

    if(winZEle){
        return winZEle.currentPageId;
    }
}
function setid(pageId) {
    if(_window["default"].ZEle){
        _window["default"].ZEle.currentPageId = pageId;
    }
}
