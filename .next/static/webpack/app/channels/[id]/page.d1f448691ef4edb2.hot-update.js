"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/channels/[id]/page",{

/***/ "(app-pages-browser)/./src/app/channels/[id]/page.tsx":
/*!****************************************!*\
  !*** ./src/app/channels/[id]/page.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ChannelPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_api_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api/messages */ \"(app-pages-browser)/./src/lib/api/messages.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst FIXED_USERS = {\n    user2: {\n        id: \"123e4567-e89b-12d3-a456-426614174002\",\n        username: \"testuser2\"\n    },\n    user5: {\n        id: \"123e4567-e89b-12d3-a456-426614174005\",\n        username: \"testuser5\"\n    }\n};\nconst CHANNEL_ID = \"123e4567-e89b-12d3-a456-426614174000\";\nfunction ChannelPage() {\n    _s();\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [useUser2, setUseUser2] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Flag to alternate between users\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const loadMessages = async ()=>{\n            try {\n                const channelMessages = await (0,_lib_api_messages__WEBPACK_IMPORTED_MODULE_2__.getChannelMessages)(CHANNEL_ID);\n                setMessages(channelMessages);\n            } catch (error) {\n                console.error(\"Failed to load messages:\", error);\n            }\n        };\n        loadMessages();\n    }, []);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        if (message.trim()) {\n            const currentUser = useUser2 ? FIXED_USERS.user2 : FIXED_USERS.user5;\n            const newMessage = {\n                channelId: CHANNEL_ID,\n                userId: currentUser.id,\n                content: message.trim(),\n                type: \"text\"\n            };\n            try {\n                const createdMessage = await (0,_lib_api_messages__WEBPACK_IMPORTED_MODULE_2__.sendMessage)(newMessage);\n                setMessages((prev)=>[\n                        ...prev,\n                        {\n                            ...createdMessage,\n                            username: currentUser.username\n                        }\n                    ]);\n                setMessage(\"\");\n                setUseUser2(!useUser2); // Toggle the flag\n            } catch (error) {\n                console.error(\"Failed to send message:\", error);\n            }\n        }\n    };\n    const formatTimestamp = (date)=>{\n        return new Date(date).toLocaleTimeString(\"en-US\", {\n            hour: \"2-digit\",\n            minute: \"2-digit\"\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-[calc(100vh-3.5rem)] flex flex-col\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-1 overflow-y-auto p-4 space-y-4\",\n                children: messages.map((msg)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"bg-secondary rounded-lg p-4 relative\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"absolute top-2 right-4 text-xs text-gray-400\",\n                                children: formatTimestamp(msg.createdAt)\n                            }, void 0, false, {\n                                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                lineNumber: 77,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex gap-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0 border border-black\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"text-sm text-white\",\n                                            children: msg.username || \"#\".concat(msg.userId)\n                                        }, void 0, false, {\n                                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                            lineNumber: 82,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                        lineNumber: 81,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-1 mt-1\",\n                                        children: msg.content\n                                    }, void 0, false, {\n                                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                        lineNumber: 84,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, msg.id, true, {\n                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                lineNumber: 74,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sticky bottom-0 p-6 border-t border-secondary bg-primary\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    onSubmit: handleSubmit,\n                    className: \"flex gap-2 max-w-[1200px] mx-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: message,\n                            onChange: (e)=>setMessage(e.target.value),\n                            placeholder: \"Type a message...\",\n                            className: \"flex-1 bg-secondary rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500\"\n                        }, void 0, false, {\n                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                            lineNumber: 93,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: \"bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500\",\n                            children: \"Send\"\n                        }, void 0, false, {\n                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                            lineNumber: 100,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                    lineNumber: 92,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n        lineNumber: 73,\n        columnNumber: 5\n    }, this);\n}\n_s(ChannelPage, \"ud9ExNwrNkJMVYKBdcjYuxOGMd8=\");\n_c = ChannelPage;\nvar _c;\n$RefreshReg$(_c, \"ChannelPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY2hhbm5lbHMvW2lkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRTRDO0FBRXlCO0FBRXJFLE1BQU1JLGNBQWM7SUFDbEJDLE9BQU87UUFDTEMsSUFBSTtRQUNKQyxVQUFVO0lBQ1o7SUFDQUMsT0FBTztRQUNMRixJQUFJO1FBQ0pDLFVBQVU7SUFDWjtBQUNGO0FBRUEsTUFBTUUsYUFBYTtBQUVKLFNBQVNDOztJQUN0QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDYSxVQUFVQyxZQUFZLEdBQUdkLCtDQUFRQSxDQUFZLEVBQUU7SUFDdEQsTUFBTSxDQUFDZSxVQUFVQyxZQUFZLEdBQUdoQiwrQ0FBUUEsQ0FBQyxPQUFPLGtDQUFrQztJQUVsRkMsZ0RBQVNBLENBQUM7UUFDUixNQUFNZ0IsZUFBZTtZQUNuQixJQUFJO2dCQUNGLE1BQU1DLGtCQUFrQixNQUFNZixxRUFBa0JBLENBQUNNO2dCQUNqREssWUFBWUk7WUFDZCxFQUFFLE9BQU9DLE9BQU87Z0JBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1lBQzVDO1FBQ0Y7UUFFQUY7SUFDRixHQUFHLEVBQUU7SUFFTCxNQUFNSSxlQUFlLE9BQU9DO1FBQzFCQSxFQUFFQyxjQUFjO1FBRWhCLElBQUlaLFFBQVFhLElBQUksSUFBSTtZQUNsQixNQUFNQyxjQUFjVixXQUFXWCxZQUFZQyxLQUFLLEdBQUdELFlBQVlJLEtBQUs7WUFFcEUsTUFBTWtCLGFBQW1DO2dCQUN2Q0MsV0FBV2xCO2dCQUNYbUIsUUFBUUgsWUFBWW5CLEVBQUU7Z0JBQ3RCdUIsU0FBU2xCLFFBQVFhLElBQUk7Z0JBQ3JCTSxNQUFNO1lBQ1I7WUFFQSxJQUFJO2dCQUNGLE1BQU1DLGlCQUFpQixNQUFNN0IsOERBQVdBLENBQUN3QjtnQkFDekNaLFlBQVlrQixDQUFBQSxPQUFROzJCQUFJQTt3QkFBTTs0QkFDNUIsR0FBR0QsY0FBYzs0QkFDakJ4QixVQUFVa0IsWUFBWWxCLFFBQVE7d0JBQ2hDO3FCQUFFO2dCQUNGSyxXQUFXO2dCQUNYSSxZQUFZLENBQUNELFdBQVcsa0JBQWtCO1lBQzVDLEVBQUUsT0FBT0ksT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLDJCQUEyQkE7WUFDM0M7UUFDRjtJQUNGO0lBRUEsTUFBTWMsa0JBQWtCLENBQUNDO1FBQ3ZCLE9BQU8sSUFBSUMsS0FBS0QsTUFBTUUsa0JBQWtCLENBQUMsU0FBUztZQUNoREMsTUFBTTtZQUNOQyxRQUFRO1FBQ1Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1ozQixTQUFTNEIsR0FBRyxDQUFDLENBQUNDLG9CQUNiLDhEQUFDSDt3QkFBaUJDLFdBQVU7OzBDQUMxQiw4REFBQ0Q7Z0NBQUlDLFdBQVU7MENBQ1pQLGdCQUFnQlMsSUFBSUMsU0FBUzs7Ozs7OzBDQUVoQyw4REFBQ0o7Z0NBQUlDLFdBQVU7O2tEQUNiLDhEQUFDRDt3Q0FBSUMsV0FBVTtrREFDYiw0RUFBQ0k7NENBQUtKLFdBQVU7c0RBQXNCRSxJQUFJbkMsUUFBUSxJQUFJLElBQWUsT0FBWG1DLElBQUlkLE1BQU07Ozs7Ozs7Ozs7O2tEQUV0RSw4REFBQ1c7d0NBQUlDLFdBQVU7a0RBQ1pFLElBQUliLE9BQU87Ozs7Ozs7Ozs7Ozs7dUJBVFJhLElBQUlwQyxFQUFFOzs7Ozs7Ozs7OzBCQWVwQiw4REFBQ2lDO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDSztvQkFBS0MsVUFBVXpCO29CQUFjbUIsV0FBVTs7c0NBQ3RDLDhEQUFDTzs0QkFDQ2pCLE1BQUs7NEJBQ0xrQixPQUFPckM7NEJBQ1BzQyxVQUFVLENBQUMzQixJQUFNVixXQUFXVSxFQUFFNEIsTUFBTSxDQUFDRixLQUFLOzRCQUMxQ0csYUFBWTs0QkFDWlgsV0FBVTs7Ozs7O3NDQUVaLDhEQUFDWTs0QkFDQ3RCLE1BQUs7NEJBQ0xVLFdBQVU7c0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT1g7R0ExRndCOUI7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jaGFubmVscy9baWRdL3BhZ2UudHN4PzMzOWQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5cclxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgQ3JlYXRlTWVzc2FnZVJlcXVlc3QgfSBmcm9tICdAL3R5cGVzL2RiJztcclxuaW1wb3J0IHsgc2VuZE1lc3NhZ2UsIGdldENoYW5uZWxNZXNzYWdlcyB9IGZyb20gJ0AvbGliL2FwaS9tZXNzYWdlcyc7XHJcblxyXG5jb25zdCBGSVhFRF9VU0VSUyA9IHtcclxuICB1c2VyMjoge1xyXG4gICAgaWQ6ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDInLFxyXG4gICAgdXNlcm5hbWU6ICd0ZXN0dXNlcjInXHJcbiAgfSxcclxuICB1c2VyNToge1xyXG4gICAgaWQ6ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDUnLFxyXG4gICAgdXNlcm5hbWU6ICd0ZXN0dXNlcjUnXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgQ0hBTk5FTF9JRCA9ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hhbm5lbFBhZ2UoKSB7XHJcbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGU8TWVzc2FnZVtdPihbXSk7XHJcbiAgY29uc3QgW3VzZVVzZXIyLCBzZXRVc2VVc2VyMl0gPSB1c2VTdGF0ZSh0cnVlKTsgLy8gRmxhZyB0byBhbHRlcm5hdGUgYmV0d2VlbiB1c2Vyc1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZE1lc3NhZ2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNoYW5uZWxNZXNzYWdlcyA9IGF3YWl0IGdldENoYW5uZWxNZXNzYWdlcyhDSEFOTkVMX0lEKTtcclxuICAgICAgICBzZXRNZXNzYWdlcyhjaGFubmVsTWVzc2FnZXMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIG1lc3NhZ2VzOicsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb2FkTWVzc2FnZXMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgaWYgKG1lc3NhZ2UudHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlVXNlcjIgPyBGSVhFRF9VU0VSUy51c2VyMiA6IEZJWEVEX1VTRVJTLnVzZXI1O1xyXG4gICAgICBcclxuICAgICAgY29uc3QgbmV3TWVzc2FnZTogQ3JlYXRlTWVzc2FnZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgY2hhbm5lbElkOiBDSEFOTkVMX0lELFxyXG4gICAgICAgIHVzZXJJZDogY3VycmVudFVzZXIuaWQsXHJcbiAgICAgICAgY29udGVudDogbWVzc2FnZS50cmltKCksXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjcmVhdGVkTWVzc2FnZSA9IGF3YWl0IHNlbmRNZXNzYWdlKG5ld01lc3NhZ2UpO1xyXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXYgPT4gWy4uLnByZXYsIHtcclxuICAgICAgICAgIC4uLmNyZWF0ZWRNZXNzYWdlLFxyXG4gICAgICAgICAgdXNlcm5hbWU6IGN1cnJlbnRVc2VyLnVzZXJuYW1lXHJcbiAgICAgICAgfV0pO1xyXG4gICAgICAgIHNldE1lc3NhZ2UoJycpO1xyXG4gICAgICAgIHNldFVzZVVzZXIyKCF1c2VVc2VyMik7IC8vIFRvZ2dsZSB0aGUgZmxhZ1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZW5kIG1lc3NhZ2U6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZm9ybWF0VGltZXN0YW1wID0gKGRhdGU6IERhdGUpID0+IHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywge1xyXG4gICAgICBob3VyOiAnMi1kaWdpdCcsXHJcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1bY2FsYygxMDB2aC0zLjVyZW0pXSBmbGV4IGZsZXgtY29sXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTQgc3BhY2UteS00XCI+XHJcbiAgICAgICAge21lc3NhZ2VzLm1hcCgobXNnKSA9PiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17bXNnLmlkfSBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnkgcm91bmRlZC1sZyBwLTQgcmVsYXRpdmVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC00IHRleHQteHMgdGV4dC1ncmF5LTQwMFwiPlxyXG4gICAgICAgICAgICAgIHtmb3JtYXRUaW1lc3RhbXAobXNnLmNyZWF0ZWRBdCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy1bIzFhMWExYV0gcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZsZXgtc2hyaW5rLTAgYm9yZGVyIGJvcmRlci1ibGFja1wiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXdoaXRlXCI+e21zZy51c2VybmFtZSB8fCBgIyR7bXNnLnVzZXJJZH1gfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtdC0xXCI+XHJcbiAgICAgICAgICAgICAgICB7bXNnLmNvbnRlbnR9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20tMCBwLTYgYm9yZGVyLXQgYm9yZGVyLXNlY29uZGFyeSBiZy1wcmltYXJ5XCI+XHJcbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtYXgtdy1bMTIwMHB4XSBteC1hdXRvXCI+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bWVzc2FnZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNZXNzYWdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIGEgbWVzc2FnZS4uLlwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zZWNvbmRhcnkgcm91bmRlZC1sZyBweC00IHB5LTMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDBcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcHgtNiBweS0zIHJvdW5kZWQtbGcgaG92ZXI6YmctYmx1ZS02MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgU2VuZFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0gIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwic2VuZE1lc3NhZ2UiLCJnZXRDaGFubmVsTWVzc2FnZXMiLCJGSVhFRF9VU0VSUyIsInVzZXIyIiwiaWQiLCJ1c2VybmFtZSIsInVzZXI1IiwiQ0hBTk5FTF9JRCIsIkNoYW5uZWxQYWdlIiwibWVzc2FnZSIsInNldE1lc3NhZ2UiLCJtZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwidXNlVXNlcjIiLCJzZXRVc2VVc2VyMiIsImxvYWRNZXNzYWdlcyIsImNoYW5uZWxNZXNzYWdlcyIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRyaW0iLCJjdXJyZW50VXNlciIsIm5ld01lc3NhZ2UiLCJjaGFubmVsSWQiLCJ1c2VySWQiLCJjb250ZW50IiwidHlwZSIsImNyZWF0ZWRNZXNzYWdlIiwicHJldiIsImZvcm1hdFRpbWVzdGFtcCIsImRhdGUiLCJEYXRlIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiaG91ciIsIm1pbnV0ZSIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsIm1zZyIsImNyZWF0ZWRBdCIsInNwYW4iLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/channels/[id]/page.tsx\n"));

/***/ })

});