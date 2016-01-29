/**
 * New node file
*/

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost');

var IncidentSchema = new mongoose.Schema({
	category:String,
	type: String,
	reportedDateTime:String,
	emergency:Boolean,
	desc:String,
	locationLong:String,
	locationLatd:String,
	reportedUserID:String,
	address:String,
	userType:String,
	alertType:String,
	statusbar:String,
	affectedPeopleCount: Number,
	reportsCount:Number,
	photoURL: String
});

var Incident = mongoose.model('Incident', IncidentSchema);
 ObjectId = Incident.ObjectId;

var LocationDetailSchema = new mongoose.Schema({
	incidentId:String,
	timezone: String,
	titleOwnername: String,
	propertyName: String,
	houseNo: String,
	streetDetails: String,
	town: String,
	city: String,
	district: String,
	country: String,
	pincode: String
});

var LocationDetail = mongoose.model('LocationDetail', LocationDetailSchema);

var UserDetailSchema = new mongoose.Schema({
	email: String,
	cellPhone: String,
	altPhone: String,
	password: String,
	socialAuth: String,
	firstName: String,
	lastName: String,
	title: String,
	dateOfBirth: Date
});

var UserDetail = mongoose.model('UserDetail', UserDetailSchema);

var EmergencyContactDetailSchema = new mongoose.Schema({
	primaryname:String,
	primarymail:String,
	primarymobileno:String,
	alternativename:String,
	alternativemobileno:String
});

var EmergencyContactDetail = mongoose.model('EmergencyContactDetail', EmergencyContactDetailSchema);
var EcontactSchema=new mongoose.Schema({
primaryname:String,
primarymail:String,
primarymobileno:String,
alternativename:String,
alternativemobileno:String
});
var Econtact=mongoose.model('Econtact',EcontactSchema);

exports.Incident = Incident;
exports.LocationDetail = LocationDetail;
exports.UserDetail = UserDetail;
exports.EmergencyContactDetail = EmergencyContactDetail;
exports.Econtact=Econtact;