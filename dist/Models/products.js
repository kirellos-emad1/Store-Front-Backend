"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
var database_1 = __importDefault(require("../database"));
var productModel = /** @class */ (function () {
    function productModel() {
    }
    productModel.prototype.showAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT * FROM products";
                        return [4 /*yield*/, myConn.query(sql)];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("There no products found ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productModel.prototype.myProducts = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT * FROM products WHERE user_id=($1)";
                        return [4 /*yield*/, myConn.query(sql, [user_id])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Can't get this product ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productModel.prototype.showSpecificProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT * FROM products WHERE id=($1)";
                        return [4 /*yield*/, myConn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("There is no products for this id ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productModel.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql1, result1, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql1 = "SELECT role FROM users WHERE id=($1)";
                        return [4 /*yield*/, myConn.query(sql1, [product.user_id])];
                    case 2:
                        result1 = _a.sent();
                        console.log(result1.rows[0].role);
                        if (!(result1.rows[0].role === 'ADMIN')) return [3 /*break*/, 4];
                        sql = "INSERT INTO products (name, price, category, quantity, description, images, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
                        return [4 /*yield*/, myConn.query(sql, [
                                product.name,
                                product.price,
                                product.category,
                                product.quantity,
                                product.description,
                                product.images,
                                product.user_id
                            ])];
                    case 3:
                        result = _a.sent();
                        result.rows[0];
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4: throw new Error('Must to ba admin to create user');
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        throw new Error("Can't create the product ".concat(err_4));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    productModel.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "DELETE FROM products WHERE id=($1) RETURNING name, price, category, quantity, description, images";
                        return [4 /*yield*/, myConn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Unable to delete this product ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productModel.prototype.updateProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "UPDATE products SET name=$1,price=$2,category=$3,quantity=$4,description=$5,images=$6 WHERE id=$7 RETURNING name, price, category, id, quantity, description ,images";
                        return [4 /*yield*/, myConn.query(sql, [
                                product.name,
                                product.price,
                                product.category,
                                product.quantity,
                                product.description,
                                product.images,
                                product.id
                            ])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Can't update");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return productModel;
}());
exports.productModel = productModel;
