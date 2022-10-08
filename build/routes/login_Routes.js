"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.getRoot = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("\n      <div>\n        <div>You are logged in!!</div>\n        <a href='/logout'>Logout</a>\n      </div>\n      ");
        }
        else {
            res.send("\n      <div>\n        <div>Oops..You are not logged in</div>\n        <a href='/login'>Login</a>\n      </div>\n      ");
        }
    };
    __decorate([
        get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Controller.prototype, "getRoot", null);
    return Controller;
}());
function get(routePath) {
    return function (target, key, desc) {
        Reflect.defineMetadata;
    };
}
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send('Not permitted');
}
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email: </label>\n        <input type=\"email\" name=\"email\"/>\n      </div>\n      <div>\n        <label>Password: </label>\n        <input type=\"password\" name=\"password\"/>\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'test@test.com' && password === '123') {
        //mark this person as logged in
        req.session = { loggedIn: true };
        //redirect this person to root route
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n      <div>You are logged in!!</div>\n      <a href='/logout'>Logout</a>\n    </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>Oops..You are not logged in</div>\n      <a href='/login'>Login</a>\n    </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
