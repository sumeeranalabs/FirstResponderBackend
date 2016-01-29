
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , incidentMgmtService = require('./service/incidentMgmt');

var app = express();

global.appRoot = path.resolve(__dirname);
global.fileUploadPath = appRoot + '/uploadFiles/';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/rest/reportIncident', incidentMgmtService.reportIncident);
app.get('/rest/fetchReportedIncident', incidentMgmtService.fetchReportedIncident);
app.post('/rest/updateIncident', incidentMgmtService.updateIncident);
app.post('/rest/uploadImage', incidentMgmtService.uploadImage);
app.post('/rest/addEmergencyContact', incidentMgmtService.addEmergencyContact);
app.get('/rest/fetchEmergencyContact', incidentMgmtService.fetchEmergencyContact);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
