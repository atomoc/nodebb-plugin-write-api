'use strict';
/* globals module, require */

var Topics = require.main.require('./src/topics'),
	PostTools = require.main.require('./src/postTools'),
	apiMiddleware = require('../../middleware'),
	errorHandler = require('../../lib/errorHandler'),
	utils = require('./utils');


module.exports = function(middleware) {
	var app = require('express').Router();

	app.post('/', apiMiddleware.requireUser, function(req, res) {
		if (!utils.checkRequired(['cid', 'title', 'content'], req, res)) {
			return false;
		}

		var payload = {
				cid: req.body.cid,
				title: req.body.title,
				content:req.body.content,
				uid: req.user.uid
			};

		Topics.post(payload, function(err, data) {
			if (err) { return errorHandler.handle(err, res); }

			res.status(200).json({
				status: 'ok',
				data: {
					topic: data.topicData,
					post: data.postData
				}
			});
		});
	});

	app.put('/', apiMiddleware.requireUser, function(req, res) {
		if (!utils.checkRequired(['pid', 'content'], req, res)) {
			return false;
		}

		var payload = {
			uid: req.user.uid,
			pid: req.body.pid,
			content: req.body.content,
			options: {}
		};

		if (req.body.handle) { payload.handle = req.body.handle; }
		if (req.body.title) { payload.title = req.body.title; }
		if (req.body.topic_thumb) { payload.options.topic_thumb = req.body.topic_thumb; }
		if (req.body.tags) { payload.options.tags = req.body.tags; }

		PostTools.edit(payload, function(err) {
			errorHandler.handle(err, res);
		});
	});

	return app;
};