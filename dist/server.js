"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import orderRoutes from './Handlers/orders';
// import productRoutes from './Handlers/products';
// import usersRoutes from './Handlers/users';
var routes_1 = __importDefault(require("./routes"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 5000;
var address = "http://localhost:5000";
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// app.use("/users", usersRoutes);
// app.use("/orders", orderRoutes);
// app.use("/products", productRoutes);
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.send('<h1>Hello World!<h1>');
});
app.listen(port, function () {
    console.log("Starting app on: ".concat(address));
});
exports.default = app;
