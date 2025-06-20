"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_common_components_icon_jsx"],{

/***/ "./resources/js/components/common/components/icon.jsx":
/*!************************************************************!*\
  !*** ./resources/js/components/common/components/icon.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

var Icon = function Icon(_ref) {
  var name = _ref.name,
    size = _ref.size,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    className: className,
    width: size ? size : undefined,
    height: size ? size : undefined,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
      href: "/svg/spritemap.svg#icon-".concat(name)
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ })

}]);