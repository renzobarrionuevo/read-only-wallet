"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/walletButtons.tsx":
/*!******************************************!*\
  !*** ./src/components/walletButtons.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _public_assets_metamask_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../public/assets/metamask-logo.png */ \"./public/assets/metamask-logo.png\");\n/* harmony import */ var _public_assets_kepler_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../public/assets/kepler-logo.png */ \"./public/assets/kepler-logo.png\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst WalletButtons = ()=>{\n    _s();\n    const [metamaskConnected, setMetamaskConnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [keplerConnected, setKeplerConnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleMetamaskClick = ()=>{\n        setMetamaskConnected(!metamaskConnected);\n        setKeplerConnected(false);\n    };\n    const handleKeplerClick = ()=>{\n        setKeplerConnected(!keplerConnected);\n        setMetamaskConnected(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-end space-x-4 w-2/3 mx-auto m-3\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"rounded-full text-white p-1 border-white border-2 focus:outline-none transform transition-all \".concat(metamaskConnected ? \"w-50\" : \"w-10\"),\n                onClick: handleMetamaskClick,\n                children: metamaskConnected ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"hidden md:inline-block\",\n                    children: \"Metamask connected\"\n                }, void 0, false, {\n                    fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                    lineNumber: 29,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: _public_assets_metamask_logo_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n                        alt: \"Metamask\",\n                        className: \"w-full h-full object-cover\"\n                    }, void 0, false, {\n                        fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"rounded-full border-white border-x-2 text-white p-1 focus:outline-none transform transition-all \".concat(keplerConnected ? \"w-50\" : \"w-10\"),\n                onClick: handleKeplerClick,\n                children: keplerConnected ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"hidden md:inline-block\",\n                    children: \"Kepler connected\"\n                }, void 0, false, {\n                    fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                    lineNumber: 43,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: _public_assets_kepler_logo_png__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n                        alt: \"Kepler\",\n                        className: \"w-full h-full object-cover\"\n                    }, void 0, false, {\n                        fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/renzo/evmos/read-only-wallet/src/components/walletButtons.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, undefined);\n};\n_s(WalletButtons, \"jQNL8mEMs+/ux3kI3XBLm8kesHE=\");\n_c = WalletButtons;\n/* harmony default export */ __webpack_exports__[\"default\"] = (WalletButtons);\nvar _c;\n$RefreshReg$(_c, \"WalletButtons\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy93YWxsZXRCdXR0b25zLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF3QztBQUNUO0FBQ2tDO0FBQ0o7QUFFN0QsTUFBTUssZ0JBQWdCOztJQUNwQixNQUFNLENBQUNDLG1CQUFtQkMscUJBQXFCLEdBQUdOLCtDQUFRQSxDQUFDO0lBQzNELE1BQU0sQ0FBQ08saUJBQWlCQyxtQkFBbUIsR0FBR1IsK0NBQVFBLENBQUM7SUFFdkQsTUFBTVMsc0JBQXNCO1FBQzFCSCxxQkFBcUIsQ0FBQ0Q7UUFDdEJHLG1CQUFtQjtJQUNyQjtJQUVBLE1BQU1FLG9CQUFvQjtRQUN4QkYsbUJBQW1CLENBQUNEO1FBQ3BCRCxxQkFBcUI7SUFDdkI7SUFFQSxxQkFDRSw4REFBQ0s7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUNDRCxXQUFXLGlHQUVWLE9BRENQLG9CQUFvQixTQUFTO2dCQUUvQlMsU0FBU0w7MEJBRVJKLGtDQUNDLDhEQUFDVTtvQkFBS0gsV0FBVTs4QkFBeUI7Ozs7OzhDQUV6Qyw4REFBQ0Q7b0JBQUlDLFdBQVU7OEJBQ2IsNEVBQUNYLG1EQUFLQTt3QkFBQ2UsS0FBS2Qsd0VBQVlBO3dCQUFFZSxLQUFJO3dCQUFXTCxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUl6RCw4REFBQ0M7Z0JBQ0NELFdBQVcsbUdBRVYsT0FEQ0wsa0JBQWtCLFNBQVM7Z0JBRTdCTyxTQUFTSjswQkFFUkgsZ0NBQ0MsOERBQUNRO29CQUFLSCxXQUFVOzhCQUF5Qjs7Ozs7OENBRXpDLDhEQUFDRDtvQkFBSUMsV0FBVTs4QkFDYiw0RUFBQ1gsbURBQUtBO3dCQUFDZSxLQUFLYixzRUFBVUE7d0JBQUVjLEtBQUk7d0JBQVNMLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNM0Q7R0E5Q01SO0tBQUFBO0FBZ0ROLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3dhbGxldEJ1dHRvbnMudHN4P2E3ZTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IG1ldGFtYXNrTG9nbyBmcm9tICcuLi8uLi9wdWJsaWMvYXNzZXRzL21ldGFtYXNrLWxvZ28ucG5nJztcbmltcG9ydCBrZXBsZXJMb2dvIGZyb20gJy4uLy4uL3B1YmxpYy9hc3NldHMva2VwbGVyLWxvZ28ucG5nJztcblxuY29uc3QgV2FsbGV0QnV0dG9ucyA9ICgpID0+IHtcbiAgY29uc3QgW21ldGFtYXNrQ29ubmVjdGVkLCBzZXRNZXRhbWFza0Nvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtrZXBsZXJDb25uZWN0ZWQsIHNldEtlcGxlckNvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlTWV0YW1hc2tDbGljayA9ICgpID0+IHtcbiAgICBzZXRNZXRhbWFza0Nvbm5lY3RlZCghbWV0YW1hc2tDb25uZWN0ZWQpO1xuICAgIHNldEtlcGxlckNvbm5lY3RlZChmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2VwbGVyQ2xpY2sgPSAoKSA9PiB7XG4gICAgc2V0S2VwbGVyQ29ubmVjdGVkKCFrZXBsZXJDb25uZWN0ZWQpO1xuICAgIHNldE1ldGFtYXNrQ29ubmVjdGVkKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTQgdy0yLzMgbXgtYXV0byBtLTNcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC1mdWxsIHRleHQtd2hpdGUgcC0xIGJvcmRlci13aGl0ZSBib3JkZXItMiBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNmb3JtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgbWV0YW1hc2tDb25uZWN0ZWQgPyAndy01MCcgOiAndy0xMCdcbiAgICAgICAgfWB9XG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1ldGFtYXNrQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIHttZXRhbWFza0Nvbm5lY3RlZCA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6aW5saW5lLWJsb2NrXCI+TWV0YW1hc2sgY29ubmVjdGVkPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e21ldGFtYXNrTG9nb30gYWx0PVwiTWV0YW1hc2tcIiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC1mdWxsIGJvcmRlci13aGl0ZSBib3JkZXIteC0yIHRleHQtd2hpdGUgcC0xIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2Zvcm0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICBrZXBsZXJDb25uZWN0ZWQgPyAndy01MCcgOiAndy0xMCdcbiAgICAgICAgfWB9XG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZUtlcGxlckNsaWNrfVxuICAgICAgPlxuICAgICAgICB7a2VwbGVyQ29ubmVjdGVkID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBtZDppbmxpbmUtYmxvY2tcIj5LZXBsZXIgY29ubmVjdGVkPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e2tlcGxlckxvZ299IGFsdD1cIktlcGxlclwiIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgV2FsbGV0QnV0dG9uczsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkltYWdlIiwibWV0YW1hc2tMb2dvIiwia2VwbGVyTG9nbyIsIldhbGxldEJ1dHRvbnMiLCJtZXRhbWFza0Nvbm5lY3RlZCIsInNldE1ldGFtYXNrQ29ubmVjdGVkIiwia2VwbGVyQ29ubmVjdGVkIiwic2V0S2VwbGVyQ29ubmVjdGVkIiwiaGFuZGxlTWV0YW1hc2tDbGljayIsImhhbmRsZUtlcGxlckNsaWNrIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayIsInNwYW4iLCJzcmMiLCJhbHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/walletButtons.tsx\n"));

/***/ })

});