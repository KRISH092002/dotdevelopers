"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_common_components_dividerComponent_jsx"],{

/***/ "./resources/js/components/common/components/dividerComponent.jsx":
/*!************************************************************************!*\
  !*** ./resources/js/components/common/components/dividerComponent.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Divider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

function Divider(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "w-full flex justify-center items-center gap-5 ".concat(props.classArr && props.classArr.map(function (el) {
      return el;
    }).join('  ')),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "block w-full  border  border-gray-900/10\r "
    }), props.content && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "block text-gray-900 ",
        children: [" ", props.content, " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "block w-full  border  border-gray-900/10"
      })]
    })]
  });
}

/***/ })

}]);