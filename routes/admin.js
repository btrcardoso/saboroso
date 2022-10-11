var conn = require("./../inc/db");
var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('admin/index');
});

router.get('/login', function(res, res, next){
    res.render('admin/login');
});

router.get('/contacts', function(res, res, next){
    res.render('admin/contacts');
});

router.get('/emails', function(res, res, next){
    res.render('admin/emails');
});

router.get('/menus', function(res, res, next){
    res.render('admin/menus');
});

router.get('/reservations', function(res, res, next){
    res.render('admin/reservations', {
        date: {}
    });
});

router.get('/users', function(res, res, next){
    res.render('admin/users');
});

module.exports = router;