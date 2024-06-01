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
exports.authenticate = exports.deleteUser = exports.updateUser = exports.getSpecificUser = exports.getAllUsers = exports.createAdmin = exports.createUser = void 0;
var express_1 = __importDefault(require("express"));
var users_1 = require("../Models/users");
var dotenv_1 = __importDefault(require("dotenv"));
var database_1 = __importDefault(require("../database"));
var jwt_auth_1 = __importDefault(require("../Middleware/jwt_auth"));
dotenv_1.default.config();
var user = new users_1.userModel();
var create = function (req, res, role, isEmailVerified) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, password, myConn, emailCheckQuery, existingUser, result, tokens, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password;
                if (!firstName || firstName.length < 3) {
                    throw new Error("First name should be at least 3 character long");
                }
                if (!lastName || lastName.length < 3) {
                    throw new Error("First name should be at least 3 character long");
                }
                if (!password || password.length < 8) {
                    throw new Error("Password Not valid please enter password with 8 character long");
                }
                return [4 /*yield*/, database_1.default.connect()];
            case 1:
                myConn = _b.sent();
                emailCheckQuery = "SELECT id FROM users WHERE email = $1";
                return [4 /*yield*/, myConn.query(emailCheckQuery, [
                        email.toLowerCase(),
                    ])];
            case 2:
                existingUser = _b.sent();
                if (existingUser.rows.length > 0) {
                    myConn.release();
                    throw new Error("Email ".concat(email, " is already in use. Please choose another email or log in."));
                }
                return [4 /*yield*/, user.create({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        role: role,
                        isEmailVerified: isEmailVerified,
                    })];
            case 3:
                result = _b.sent();
                tokens = jwt_auth_1.default.issueTokens(result);
                res.cookie("REFRESH-TOKEN", tokens.refreshToken, { httpOnly: true });
                res.cookie("ACCESS-TOKEN", tokens.accessToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 15 * 60 * 1000),
                });
                res.json({
                    status: 200,
                    userData: result,
                    tokens: tokens,
                    message: "User has been created successfully",
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(400).json("".concat(err_1));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, create(req, res, "USER", false)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var createAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, create(req, res, "ADMIN", true)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createAdmin = createAdmin;
var getAllUsers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getAllUsers()];
            case 1:
                result = _a.sent();
                res.json({
                    status: 200,
                    data: result,
                    message: "Here it is all users data",
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json("".concat(err_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getSpecificUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getSpecificUser(req.params.id)];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, res.status(404).json({ error: "requested user doesn't exist" })];
                res.json({
                    status: 200,
                    data: result,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json("".concat(err_3));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSpecificUser = getSpecificUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, password, role, updatedAt, id, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, role = _a.role, updatedAt = _a.updatedAt;
                id = req.params.id;
                return [4 /*yield*/, user.updateUser({
                        id: id,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        role: role,
                        updatedAt: updatedAt,
                    })];
            case 1:
                result = _b.sent();
                res.json({
                    status: 200,
                    data: result,
                    message: "User has been updated just now",
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(400).json("".concat(err_4));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.deleteUser(req.params.id)];
            case 1:
                result = _a.sent();
                res.json({
                    status: 200,
                    data: result,
                    message: "The user has been DELETED successfully",
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userData, tokens, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user.authenticate(email, password)];
            case 1:
                userData = _b.sent();
                tokens = jwt_auth_1.default.issueTokens(userData);
                if (!userData) {
                    return [2 /*return*/, res.status(400).json("the email and password do not match")];
                }
                res.cookie("REFRESH-TOKEN", tokens.refreshToken, { httpOnly: true });
                res.cookie("ACCESS-TOKEN", tokens.accessToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 15 * 60 * 1000),
                });
                res.status(200).json({ userData: userData, tokens: tokens });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                res.status(400).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
var usersRouts = express_1.default.Router();
usersRouts.post("/register", exports.createUser);
usersRouts.post("/register/admin", exports.createAdmin);
usersRouts.post("/login", exports.authenticate);
// usersRouts.post("/verify-email", verifyEmailRoute);
// usersRouts.post("/get-otp", getOtp);
usersRouts.get("/", exports.getAllUsers);
usersRouts.patch("/my-profile/update/:id", exports.updateUser);
usersRouts.get("/:id", jwt_auth_1.default.verifyAccessToken, exports.getSpecificUser);
usersRouts.delete("/delete/:id", exports.deleteUser);
exports.default = usersRouts;
