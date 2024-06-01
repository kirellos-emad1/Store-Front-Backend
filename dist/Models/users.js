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
exports.userModel = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var hashPassword = function (pass) {
    var salt = parseInt(process.env.SALT_ROUND);
    return bcrypt_1.default.hashSync("".concat(pass).concat(process.env.BCRYPT_PASSWORD), salt);
};
var userModel = /** @class */ (function () {
    function userModel() {
    }
    userModel.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT id, firstName, lastName, email, role, createdAt, updatedAt, isEmailVerified FROM users";
                        return [4 /*yield*/, myConn.query(sql)];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("no user is found".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.getSpecificUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT id, firstName, lastName, email, role, createdAt, updatedAt FROM users WHERE id=($1)";
                        return [4 /*yield*/, myConn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("no user found with this id ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.create = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "INSERT INTO users (email, firstName, lastName, password, role, isEmailVerified) VALUES($1, $2, $3, $4, $5,$6) RETURNING id, firstName, lastName, email, role, isEmailVerified";
                        info.role = info.role || "USER";
                        return [4 /*yield*/, myConn.query(sql, [
                                info.email.toLowerCase(),
                                info.firstName[0].toUpperCase() + info.firstName.slice(1).toLowerCase(),
                                info.lastName[0].toUpperCase() + info.lastName.slice(1).toLowerCase(),
                                hashPassword(info.password),
                                info.role,
                                info.isEmailVerified
                            ])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error("can't create user ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.updateUser = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, id, firstName, lastName, email, password, role, updateFields, values, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        id = info.id, firstName = info.firstName, lastName = info.lastName, email = info.email, password = info.password, role = info.role;
                        updateFields = [];
                        values = [id];
                        if (firstName) {
                            updateFields.push("firstName=$".concat(values.length + 1));
                            values.push(firstName[0].toUpperCase() + firstName.slice(1).toLowerCase());
                        }
                        if (lastName) {
                            updateFields.push("lastName=$".concat(values.length + 1));
                            values.push(lastName[0].toUpperCase() + lastName.slice(1).toLowerCase());
                        }
                        if (email) {
                            updateFields.push("email=$".concat(values.length + 1));
                            values.push(email.toLowerCase());
                        }
                        if (password) {
                            updateFields.push("password=$".concat(values.length + 1));
                            values.push(hashPassword(password));
                        }
                        if (role) {
                            updateFields.push("role=$".concat(values.length + 1));
                            values.push(role);
                        }
                        if (updateFields.length === 0) {
                            throw new Error("No fields to update specified.");
                        }
                        updateFields.push("updatedAt=$".concat(values.length + 1));
                        values.push(new Date());
                        sql = "UPDATE users SET ".concat(updateFields.join(", "), " WHERE id=$1 RETURNING id, firstName, lastName, email, password, role, createdAt, updatedAt");
                        return [4 /*yield*/, myConn.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Unable to update user: ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.userVerified = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, email, isEmailVerified, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        email = info.email, isEmailVerified = info.isEmailVerified;
                        sql = "UPDATE users SET isEmailVerified=$2 WHERE email=$1 RETURNING id, firstName, lastName, email, password, role, createdAt, updatedAt, isEmailVerified";
                        return [4 /*yield*/, myConn.query(sql, [email, isEmailVerified])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Unable to verify user: ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "DELETE FROM users WHERE id=($1) RETURNING id, firstName, lastName, email, role";
                        return [4 /*yield*/, myConn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        myConn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Unable to delete user: ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var myConn, sql, result, hashPassword_1, isPasswordValid, sql_1, userInfo, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        myConn = _a.sent();
                        sql = "SELECT password FROM users WHERE email=$1";
                        return [4 /*yield*/, myConn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        hashPassword_1 = result.rows[0].password;
                        isPasswordValid = bcrypt_1.default.compareSync("".concat(password).concat(process.env.BCRYPT_PASSWORD), hashPassword_1);
                        if (!isPasswordValid) return [3 /*break*/, 4];
                        sql_1 = "SELECT email, firstName, lastName, id, role,isEmailVerified  FROM users WHERE email=($1)";
                        return [4 /*yield*/, myConn.query(sql_1, [email])];
                    case 3:
                        userInfo = _a.sent();
                        myConn.release();
                        return [2 /*return*/, userInfo.rows[0]];
                    case 4: throw new Error("password don't match");
                    case 5:
                        err_7 = _a.sent();
                        throw new Error("Unable to authenticate user ".concat(err_7));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return userModel;
}());
exports.userModel = userModel;
