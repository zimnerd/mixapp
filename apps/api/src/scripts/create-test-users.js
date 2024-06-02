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
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var db_1 = require("../config/db");
var User_1 = require("../models/User");
var createTestData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user, salt, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                _b.sent();
                users = [
                    {
                        username: "eddy",
                        email: "edganz@icloud.com",
                        password: "password",
                        profilePicture: "https://example.com/profile.jpg",
                        bio: "This is a test user.",
                        age: 30,
                        gender: "other",
                        location: {
                            type: "Point",
                            coordinates: [18.4232, -33.918861]
                        },
                        searchRadius: 50,
                        preferences: null,
                        phone: "+2760311583"
                    },
                    {
                        username: "john",
                        email: "john@example.com",
                        password: "password123",
                        profilePicture: "https://example.com/profile2.jpg",
                        bio: "Another test user.",
                        age: 25,
                        gender: "male",
                        location: {
                            type: "Point",
                            coordinates: [-122.084, 37.422]
                        },
                        searchRadius: 100,
                        preferences: null,
                        phone: "+1234567890"
                    },
                    {
                        username: "jane",
                        email: "jane@example.com",
                        password: "password123",
                        profilePicture: "https://example.com/profile3.jpg",
                        bio: "Yet another test user.",
                        age: 28,
                        gender: "female",
                        location: {
                            type: "Point",
                            coordinates: [-0.127758, 51.507351]
                        },
                        searchRadius: 75,
                        preferences: null,
                        phone: "+9876543210"
                    },
                    // Add more test users as needed
                ];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, , 10]);
                _i = 0, users_1 = users;
                _b.label = 3;
            case 3:
                if (!(_i < users_1.length)) return [3 /*break*/, 7];
                user = users_1[_i];
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 4:
                salt = _b.sent();
                _a = user;
                return [4 /*yield*/, bcryptjs_1.default.hash(user.password, salt)];
            case 5:
                _a.password = _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, User_1.default.insertMany(users)];
            case 8:
                _b.sent();
                console.log('Test data inserted successfully');
                process.exit(0);
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error('Error inserting test data:', error_1);
                process.exit(1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
createTestData();
