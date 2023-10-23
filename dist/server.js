"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = __importDefault(require("./Handlers/orders"));
var products_1 = __importDefault(require("./Handlers/products"));
var users_1 = __importDefault(require("./Handlers/users"));
var app = (0, express_1["default"])();
var port = 5000;
var address = "http://localhost:5000";
app.use(body_parser_1["default"].json());
app.use("/users", users_1["default"]);
app.use("/orders", orders_1["default"]);
app.use("/products", products_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
