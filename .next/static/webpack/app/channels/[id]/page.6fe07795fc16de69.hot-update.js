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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ChannelPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_api_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/api/messages */ \"(app-pages-browser)/./src/lib/api/messages.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst FIXED_USERS = {\n    user2: {\n        id: \"123e4567-e89b-12d3-a456-426614174002\",\n        username: \"testuser2\"\n    },\n    user5: {\n        id: \"123e4567-e89b-12d3-a456-426614174005\",\n        username: \"testuser5\"\n    }\n};\nconst CHANNEL_ID = \"123e4567-e89b-12d3-a456-426614174000\";\nfunction ChannelPage() {\n    _s();\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [useUser2, setUseUser2] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Flag to alternate between users\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const loadMessages = async ()=>{\n            try {\n                const channelMessages = await (0,_lib_api_messages__WEBPACK_IMPORTED_MODULE_2__.getChannelMessages)(CHANNEL_ID);\n                setMessages(channelMessages);\n            } catch (error) {\n                console.error(\"Failed to load messages:\", error);\n            }\n        };\n        loadMessages();\n    }, []);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        if (message.trim()) {\n            const currentUser = useUser2 ? FIXED_USERS.user2 : FIXED_USERS.user5;\n            const newMessage = {\n                channelId: CHANNEL_ID,\n                userId: currentUser.id,\n                content: message.trim(),\n                type: \"text\"\n            };\n            try {\n                const createdMessage = await (0,_lib_api_messages__WEBPACK_IMPORTED_MODULE_2__.sendMessage)(newMessage);\n                const messageWithUser = {\n                    ...createdMessage,\n                    username: currentUser.username\n                };\n                setMessages((prev)=>[\n                        ...prev,\n                        messageWithUser\n                    ]);\n                setMessage(\"\");\n                setUseUser2((prev)=>!prev);\n                const updatedMessages = await (0,_lib_api_messages__WEBPACK_IMPORTED_MODULE_2__.getChannelMessages)(CHANNEL_ID);\n                setMessages(updatedMessages);\n            } catch (error) {\n                console.error(\"Failed to send message:\", error);\n            }\n        }\n    };\n    const formatTimestamp = (date)=>{\n        try {\n            const messageDate = new Date(date);\n            return messageDate.toLocaleTimeString(\"en-US\", {\n                hour: \"2-digit\",\n                minute: \"2-digit\",\n                hour12: true\n            });\n        } catch (error) {\n            console.error(\"Error formatting timestamp:\", error);\n            return \"\";\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-[calc(100vh-3.5rem)] flex flex-col relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-1 overflow-y-auto pt-5 px-4 pb-24\",\n                children: messages.map((msg)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"bg-secondary rounded-lg p-4 relative mb-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"absolute top-2 right-4 text-xs text-gray-400\",\n                                children: formatTimestamp(msg.createdAt)\n                            }, void 0, false, {\n                                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                lineNumber: 88,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex gap-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0 border border-black\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"text-sm text-white\",\n                                            children: msg.username || FIXED_USERS[useUser2 ? \"user2\" : \"user5\"].username\n                                        }, void 0, false, {\n                                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                            lineNumber: 93,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                        lineNumber: 92,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-1 mt-1\",\n                                        children: msg.content\n                                    }, void 0, false, {\n                                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                        lineNumber: 95,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                                lineNumber: 91,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, msg.id, true, {\n                        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                        lineNumber: 87,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                lineNumber: 85,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"fixed bottom-0 left-[200px] right-0 p-6 border-t border-secondary bg-primary\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    onSubmit: handleSubmit,\n                    className: \"flex gap-2 max-w-[1200px] mx-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: message,\n                            onChange: (e)=>setMessage(e.target.value),\n                            placeholder: \"Type a message...\",\n                            className: \"flex-1 bg-secondary rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500\"\n                        }, void 0, false, {\n                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                            lineNumber: 104,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: \"bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500\",\n                            children: \"Send\"\n                        }, void 0, false, {\n                            fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                            lineNumber: 111,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                    lineNumber: 103,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n                lineNumber: 102,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"J:\\\\chatgeniusv2 frontend\\\\src\\\\app\\\\channels\\\\[id]\\\\page.tsx\",\n        lineNumber: 84,\n        columnNumber: 5\n    }, this);\n}\n_s(ChannelPage, \"ud9ExNwrNkJMVYKBdcjYuxOGMd8=\");\n_c = ChannelPage;\nvar _c;\n$RefreshReg$(_c, \"ChannelPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY2hhbm5lbHMvW2lkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRTRDO0FBRXlCO0FBRXJFLE1BQU1JLGNBQWM7SUFDbEJDLE9BQU87UUFDTEMsSUFBSTtRQUNKQyxVQUFVO0lBQ1o7SUFDQUMsT0FBTztRQUNMRixJQUFJO1FBQ0pDLFVBQVU7SUFDWjtBQUNGO0FBRUEsTUFBTUUsYUFBYTtBQUVKLFNBQVNDOztJQUN0QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDYSxVQUFVQyxZQUFZLEdBQUdkLCtDQUFRQSxDQUFZLEVBQUU7SUFDdEQsTUFBTSxDQUFDZSxVQUFVQyxZQUFZLEdBQUdoQiwrQ0FBUUEsQ0FBQyxPQUFPLGtDQUFrQztJQUVsRkMsZ0RBQVNBLENBQUM7UUFDUixNQUFNZ0IsZUFBZTtZQUNuQixJQUFJO2dCQUNGLE1BQU1DLGtCQUFrQixNQUFNZixxRUFBa0JBLENBQUNNO2dCQUNqREssWUFBWUk7WUFDZCxFQUFFLE9BQU9DLE9BQU87Z0JBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1lBQzVDO1FBQ0Y7UUFFQUY7SUFDRixHQUFHLEVBQUU7SUFFTCxNQUFNSSxlQUFlLE9BQU9DO1FBQzFCQSxFQUFFQyxjQUFjO1FBRWhCLElBQUlaLFFBQVFhLElBQUksSUFBSTtZQUNsQixNQUFNQyxjQUFjVixXQUFXWCxZQUFZQyxLQUFLLEdBQUdELFlBQVlJLEtBQUs7WUFFcEUsTUFBTWtCLGFBQW1DO2dCQUN2Q0MsV0FBV2xCO2dCQUNYbUIsUUFBUUgsWUFBWW5CLEVBQUU7Z0JBQ3RCdUIsU0FBU2xCLFFBQVFhLElBQUk7Z0JBQ3JCTSxNQUFNO1lBQ1I7WUFFQSxJQUFJO2dCQUNGLE1BQU1DLGlCQUFpQixNQUFNN0IsOERBQVdBLENBQUN3QjtnQkFDekMsTUFBTU0sa0JBQWtCO29CQUN0QixHQUFHRCxjQUFjO29CQUNqQnhCLFVBQVVrQixZQUFZbEIsUUFBUTtnQkFDaEM7Z0JBQ0FPLFlBQVltQixDQUFBQSxPQUFROzJCQUFJQTt3QkFBTUQ7cUJBQWdCO2dCQUM5Q3BCLFdBQVc7Z0JBQ1hJLFlBQVlpQixDQUFBQSxPQUFRLENBQUNBO2dCQUVyQixNQUFNQyxrQkFBa0IsTUFBTS9CLHFFQUFrQkEsQ0FBQ007Z0JBQ2pESyxZQUFZb0I7WUFDZCxFQUFFLE9BQU9mLE9BQU87Z0JBQ2RDLFFBQVFELEtBQUssQ0FBQywyQkFBMkJBO1lBQzNDO1FBQ0Y7SUFDRjtJQUVBLE1BQU1nQixrQkFBa0IsQ0FBQ0M7UUFDdkIsSUFBSTtZQUNGLE1BQU1DLGNBQWMsSUFBSUMsS0FBS0Y7WUFDN0IsT0FBT0MsWUFBWUUsa0JBQWtCLENBQUMsU0FBUztnQkFDN0NDLE1BQU07Z0JBQ05DLFFBQVE7Z0JBQ1JDLFFBQVE7WUFDVjtRQUNGLEVBQUUsT0FBT3ZCLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLCtCQUErQkE7WUFDN0MsT0FBTztRQUNUO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ3dCO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDWi9CLFNBQVNnQyxHQUFHLENBQUMsQ0FBQ0Msb0JBQ2IsOERBQUNIO3dCQUFpQkMsV0FBVTs7MENBQzFCLDhEQUFDRDtnQ0FBSUMsV0FBVTswQ0FDWlQsZ0JBQWdCVyxJQUFJQyxTQUFTOzs7Ozs7MENBRWhDLDhEQUFDSjtnQ0FBSUMsV0FBVTs7a0RBQ2IsOERBQUNEO3dDQUFJQyxXQUFVO2tEQUNiLDRFQUFDSTs0Q0FBS0osV0FBVTtzREFBc0JFLElBQUl2QyxRQUFRLElBQUlILFdBQVcsQ0FBQ1csV0FBVyxVQUFVLFFBQVEsQ0FBQ1IsUUFBUTs7Ozs7Ozs7Ozs7a0RBRTFHLDhEQUFDb0M7d0NBQUlDLFdBQVU7a0RBQ1pFLElBQUlqQixPQUFPOzs7Ozs7Ozs7Ozs7O3VCQVRSaUIsSUFBSXhDLEVBQUU7Ozs7Ozs7Ozs7MEJBZXBCLDhEQUFDcUM7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNLO29CQUFLQyxVQUFVN0I7b0JBQWN1QixXQUFVOztzQ0FDdEMsOERBQUNPOzRCQUNDckIsTUFBSzs0QkFDTHNCLE9BQU96Qzs0QkFDUDBDLFVBQVUsQ0FBQy9CLElBQU1WLFdBQVdVLEVBQUVnQyxNQUFNLENBQUNGLEtBQUs7NEJBQzFDRyxhQUFZOzRCQUNaWCxXQUFVOzs7Ozs7c0NBRVosOERBQUNZOzRCQUNDMUIsTUFBSzs0QkFDTGMsV0FBVTtzQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDtHQXJHd0JsQztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2NoYW5uZWxzL1tpZF0vcGFnZS50c3g/MzM5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XHJcblxyXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNZXNzYWdlLCBVc2VyLCBDcmVhdGVNZXNzYWdlUmVxdWVzdCB9IGZyb20gJ0AvdHlwZXMvZGInO1xyXG5pbXBvcnQgeyBzZW5kTWVzc2FnZSwgZ2V0Q2hhbm5lbE1lc3NhZ2VzIH0gZnJvbSAnQC9saWIvYXBpL21lc3NhZ2VzJztcclxuXHJcbmNvbnN0IEZJWEVEX1VTRVJTID0ge1xyXG4gIHVzZXIyOiB7XHJcbiAgICBpZDogJzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMicsXHJcbiAgICB1c2VybmFtZTogJ3Rlc3R1c2VyMidcclxuICB9LFxyXG4gIHVzZXI1OiB7XHJcbiAgICBpZDogJzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwNScsXHJcbiAgICB1c2VybmFtZTogJ3Rlc3R1c2VyNSdcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBDSEFOTkVMX0lEID0gJzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGFubmVsUGFnZSgpIHtcclxuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxNZXNzYWdlW10+KFtdKTtcclxuICBjb25zdCBbdXNlVXNlcjIsIHNldFVzZVVzZXIyXSA9IHVzZVN0YXRlKHRydWUpOyAvLyBGbGFnIHRvIGFsdGVybmF0ZSBiZXR3ZWVuIHVzZXJzXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkTWVzc2FnZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbE1lc3NhZ2VzID0gYXdhaXQgZ2V0Q2hhbm5lbE1lc3NhZ2VzKENIQU5ORUxfSUQpO1xyXG4gICAgICAgIHNldE1lc3NhZ2VzKGNoYW5uZWxNZXNzYWdlcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgbWVzc2FnZXM6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvYWRNZXNzYWdlcygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBpZiAobWVzc2FnZS50cmltKCkpIHtcclxuICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VVc2VyMiA/IEZJWEVEX1VTRVJTLnVzZXIyIDogRklYRURfVVNFUlMudXNlcjU7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBuZXdNZXNzYWdlOiBDcmVhdGVNZXNzYWdlUmVxdWVzdCA9IHtcclxuICAgICAgICBjaGFubmVsSWQ6IENIQU5ORUxfSUQsXHJcbiAgICAgICAgdXNlcklkOiBjdXJyZW50VXNlci5pZCxcclxuICAgICAgICBjb250ZW50OiBtZXNzYWdlLnRyaW0oKSxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRNZXNzYWdlID0gYXdhaXQgc2VuZE1lc3NhZ2UobmV3TWVzc2FnZSk7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVdpdGhVc2VyID0ge1xyXG4gICAgICAgICAgLi4uY3JlYXRlZE1lc3NhZ2UsXHJcbiAgICAgICAgICB1c2VybmFtZTogY3VycmVudFVzZXIudXNlcm5hbWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldE1lc3NhZ2VzKHByZXYgPT4gWy4uLnByZXYsIG1lc3NhZ2VXaXRoVXNlcl0pO1xyXG4gICAgICAgIHNldE1lc3NhZ2UoJycpO1xyXG4gICAgICAgIHNldFVzZVVzZXIyKHByZXYgPT4gIXByZXYpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRNZXNzYWdlcyA9IGF3YWl0IGdldENoYW5uZWxNZXNzYWdlcyhDSEFOTkVMX0lEKTtcclxuICAgICAgICBzZXRNZXNzYWdlcyh1cGRhdGVkTWVzc2FnZXMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZW5kIG1lc3NhZ2U6JywgZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZm9ybWF0VGltZXN0YW1wID0gKGRhdGU6IERhdGUpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlRGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywge1xyXG4gICAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcclxuICAgICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcclxuICAgICAgICBob3VyMTI6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmb3JtYXR0aW5nIHRpbWVzdGFtcDonLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJoLVtjYWxjKDEwMHZoLTMuNXJlbSldIGZsZXggZmxleC1jb2wgcmVsYXRpdmVcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHB0LTUgcHgtNCBwYi0yNFwiPlxyXG4gICAgICAgIHttZXNzYWdlcy5tYXAoKG1zZykgPT4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e21zZy5pZH0gY2xhc3NOYW1lPVwiYmctc2Vjb25kYXJ5IHJvdW5kZWQtbGcgcC00IHJlbGF0aXZlIG1iLTRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC00IHRleHQteHMgdGV4dC1ncmF5LTQwMFwiPlxyXG4gICAgICAgICAgICAgIHtmb3JtYXRUaW1lc3RhbXAobXNnLmNyZWF0ZWRBdCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy1bIzFhMWExYV0gcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZsZXgtc2hyaW5rLTAgYm9yZGVyIGJvcmRlci1ibGFja1wiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXdoaXRlXCI+e21zZy51c2VybmFtZSB8fCBGSVhFRF9VU0VSU1t1c2VVc2VyMiA/ICd1c2VyMicgOiAndXNlcjUnXS51c2VybmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbXQtMVwiPlxyXG4gICAgICAgICAgICAgICAge21zZy5jb250ZW50fVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMCBsZWZ0LVsyMDBweF0gcmlnaHQtMCBwLTYgYm9yZGVyLXQgYm9yZGVyLXNlY29uZGFyeSBiZy1wcmltYXJ5XCI+XHJcbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtYXgtdy1bMTIwMHB4XSBteC1hdXRvXCI+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICB2YWx1ZT17bWVzc2FnZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNZXNzYWdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIGEgbWVzc2FnZS4uLlwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zZWNvbmRhcnkgcm91bmRlZC1sZyBweC00IHB5LTMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDBcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcHgtNiBweS0zIHJvdW5kZWQtbGcgaG92ZXI6YmctYmx1ZS02MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgU2VuZFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0gIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwic2VuZE1lc3NhZ2UiLCJnZXRDaGFubmVsTWVzc2FnZXMiLCJGSVhFRF9VU0VSUyIsInVzZXIyIiwiaWQiLCJ1c2VybmFtZSIsInVzZXI1IiwiQ0hBTk5FTF9JRCIsIkNoYW5uZWxQYWdlIiwibWVzc2FnZSIsInNldE1lc3NhZ2UiLCJtZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwidXNlVXNlcjIiLCJzZXRVc2VVc2VyMiIsImxvYWRNZXNzYWdlcyIsImNoYW5uZWxNZXNzYWdlcyIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRyaW0iLCJjdXJyZW50VXNlciIsIm5ld01lc3NhZ2UiLCJjaGFubmVsSWQiLCJ1c2VySWQiLCJjb250ZW50IiwidHlwZSIsImNyZWF0ZWRNZXNzYWdlIiwibWVzc2FnZVdpdGhVc2VyIiwicHJldiIsInVwZGF0ZWRNZXNzYWdlcyIsImZvcm1hdFRpbWVzdGFtcCIsImRhdGUiLCJtZXNzYWdlRGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJob3VyIiwibWludXRlIiwiaG91cjEyIiwiZGl2IiwiY2xhc3NOYW1lIiwibWFwIiwibXNnIiwiY3JlYXRlZEF0Iiwic3BhbiIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwiYnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/channels/[id]/page.tsx\n"));

/***/ })

});