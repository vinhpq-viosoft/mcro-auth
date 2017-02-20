const restify = require('restify');
const path = require('path');

const utils = require('../utils');
const db = require('../db');
const roleService = require('../service/role.service');

/************************************
 ** CONTROLLER:   roleController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/6/2017, 2:46:21 PM
 *************************************/

server.get('/role', utils.jsonHandler(), utils.auth('plugin.oauthv2>role', 'FIND'), async(req, res, next) => {
	try {
		let where = {
			project_id: req.auth.projectId
		};
		const rs = await roleService.find({
			where
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

server.get('/role/:_id', utils.jsonHandler(), utils.auth('plugin.oauthv2>role', 'GET'), async(req, res, next) => {
	try {
		const rs = await roleService.get({
			where: { 
				_id: db.uuid(req.params._id),
				project_id: req.auth.projectId
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

server.post('/role', utils.jsonHandler(), utils.auth('plugin.oauthv2>role', 'ADD'), async(req, res, next) => {
	try {
		let body = {};
		body.project_id = req.auth.projectId;
		if (utils.has(req.body.name)) body.name = req.body.name;
		if (utils.has(req.body.api)) body.api = utils.object(req.body.api);
		if (utils.has(req.body.web)) body.web = utils.object(req.body.web);
		if (utils.has(req.body.mob)) body.mob = utils.object(req.body.mob);

		const rs = await roleService.insert(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

server.put('/role/:_id', utils.jsonHandler(), utils.auth('plugin.oauthv2>role', 'UPDATE'), async(req, res, next) => {
	try {
		let body = {};
		body._id = db.uuid(req.params._id);
		body.project_id = req.auth.projectId;
		if (utils.has(req.body.name)) body.name = req.body.name;
		if (utils.has(req.body.api)) body.api = utils.object(req.body.api);
		if (utils.has(req.body.web)) body.web = utils.object(req.body.web);
		if (utils.has(req.body.mob)) body.mob = utils.object(req.body.mob);

		const rs = await roleService.update(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

server.del('/role/:_id', utils.jsonHandler(), utils.auth('plugin.oauthv2>role', 'DELETE'), async(req, res, next) => {
	try {
		const rs = await roleService.delete({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
})