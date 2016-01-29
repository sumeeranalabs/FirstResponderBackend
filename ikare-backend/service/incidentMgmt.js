/**
 * New node file
 */
var path = require('path'),
    fs = require('fs');

var util = require('util');


exports.reportIncident = function (req, res) {
	var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	console.log('reportIncident called: ' + req);
	incidentMgmtDao.reportIncident(req, res);
};

exports.fetchReportedIncident = function (req, res) {
	var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	console.log('fetchReportedIncident called: ' + req);
	incidentMgmtDao.fetchReportedIncident(req, res);
};

exports.updateIncident = function (req, res) {
	var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	//console.log('updateIncident called: ' + req);
	incidentMgmtDao.updateIncident(req, res);
};
exports.addEmergencyContact = function (req, res) {
	var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	console.log('addEmergencyContact called: ' + req);
	incidentMgmtDao.addEmergencyContact(req, res);
};

exports.fetchEmergencyContact = function (req, res) {
	var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	console.log('fetchEmergencyContact called: ' + req);
	incidentMgmtDao.fetchEmergencyContact(req, res);
};

exports.uploadImage = function (req, res) {
	//var incidentMgmtDao = require(process.cwd() + '/dao/incidentMgmtDao');
	console.log('uploadImage called: ' + req);
	console.log('target base path:' + appRoot);
	var tempPath = req.files.file.path;
	var reqFileName = req.files.file.name;
    targetPath = path.resolve(fileUploadPath + req.files.file.name);
	
	var readStream = fs.createReadStream(tempPath)
	var writeStream = fs.createWriteStream(targetPath);

	util.pump(readStream, writeStream, function() {
	    fs.unlinkSync(tempPath);
	});
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.status(200).json({ status: 'success', path: reqFileName });
	console.log("Upload completed!");
};
