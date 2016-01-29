/**
 * New node file
 */

var _this = this;

exports.purgeLongTX = function () {
	console.log('dao.purgeLongTX called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	mongoDBConn.LongTX.remove({}, function(err) {
        if (err) {
        	console.log('testPurgeLongTX err:' + err);
        	return;
        } else {
        	console.log('testPurgeLongTX success.');
        }		
	});
};

exports.fetchReportedIncident = function (req, res) {
	console.log('dao.fetchReportedIncident called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	mongoDBConn.Incident.find({}, function (err, data) {
		console.log('fetchReportedIncident: err: ' + err);
		console.log('find: ' + data.length);
		// document.write(data.length);
	    if (err) {
	    	console.log('find err:' + err);
	    	return;
	    } else {
	    	data.forEach(function(uri) {
	    		
	    		  // write(JSON.stringify(uri));
	    	      console.log(" Incidents:" + JSON.stringify(uri));
	    	   });	
	    	   console.log('returning json now...');        	
	    	res.json(data);	    	
	    }
	});
	//res.status(200).json(data);	
};

exports.reportIncident = function (req, res) {
	console.log('dao.reportIncident called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	var common = require(process.cwd() + '/service/common');
	console.log( req.body);
	//TODO:
		//Discuss cases around reportedUserID
	var reportedUserID = req.body.email;
	var reportedUserType = common.GUEST_USER_TYPE;//default as guest user
	if (reportedUserID && reportedUserID  != '') {
		//email id is given, consider as registered user
		reportedUserType = common.REGISTERED_USER_TYPE;
	}
	var alertType = '';
	
	//Persist in DB
	mongoDBConn.Incident.create({
		category:req.body.category,
		type: req.body.type,
		reportedDateTime:req.body.timestampp,
		emergency:req.body.emergency,
		desc:req.body.desc,
		photoURL:req.body.incidentImg,
		locationLong:req.body.longitudevalue,
		locationLatd:req.body.lattitudevalue,
		address:req.body.geoaddress,
		statusbar:req.body.statuss,
		reportedUserID:req.body.reportedUserID,
		userType:reportedUserType,
		alertType:alertType,
		affectedPeopleCount: req.body.affectedPeopleCount,
		reportsCount:1,
		// photoURL: req.body.incidentImgVal
	}, function(err, saved) {
			if( err || !saved ) console.log("Reported incident frm :" + reportedUserID + " is not saved with error:" + err);
			else {
				console.log("Reported incident frm :" + reportedUserID + " is saved.");
				if (req.body.email && req.body.email.length > 0) {
					_this.registerUser(req.body.email, req.body.name);
					res.status(200).json({ status: 'success' });
					console.log('Success...');
				}
			}
			
			//TODO: return response JSON
	});
};

exports.registerUser = function (email, name) {
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	//find if email exists in db 
	//if not then persist
	//otherwise user is already registered
	mongoDBConn.UserDetail.find({email : email}, function (err, data) {
	        if (err) {
	        	console.log('registerUser find err:' + err);
	        	return;
	        } else if (data && data.length){
	        	//Already exists
	        	console.log('User already exists:' + JSON.stringify(data));
	            return;
	        } else {
	        	console.log('register user:' + email + " , name:" + name);
	        	//Persist in DB
	        	mongoDBConn.UserDetail.create({
	        		email: email,
	        		firstName: name
	        	}, function(err) {
	        		if (err) {
		        		console.log("register user create error:" + err);
	        		} else {
	        			console.log("register user :" + email + " is created!!!!");
	        		}
	            });
	        }
	    });	
};

exports.addEmergencyContact = function (req, res) {
	console.log('dao.addEmergencyContact called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	var common = require(process.cwd() + '/service/common');
	console.log( req.body);
	var reportedUserID = req.body.emailid;
    	var reportedUserType = common.GUEST_USER_TYPE;//default as guest user
    	if (reportedUserID && reportedUserID  != '') {
    		//email id is given, consider as registered user
    		reportedUserType = common.REGISTERED_USER_TYPE;
    	}
//    	var alertType = '';
//	//TODO:
		//Discuss cases around reportedUserID
mongoDBConn.EmergencyContactDetail.create({

	 primaryname:req.body.pcontact_name,
	 primarymail:req.body.pcontact_emailid,
	 primarymobileno:req.body.pcontact_mobileno,
	 alternativename:req.body.altnative_name,
	 alternativemobileno:req.body.altnative_mobileno
	 
	 },
	 function(err, saved) {
 			if( err || !saved ) console.log("Emergency Contact :" + reportedUserID + " is not saved with error:" + err);
 			else {
 				console.log("Emergency Contact :" + reportedUserID + " is saved.");
 				if (req.body.email && req.body.email.length > 0) {
 					_this.registerUser( req.body.email,req.body.name);
 					res.status(200).json({ status: 'success' });
 					console.log('Success...');
 				}
 			}

 			//TODO: return response JSON
 	});
};


exports.fetchEmergencyContact = function (req, res) {
	console.log('dao.fetchEmergencyContact called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	mongoDBConn.EmergencyContactDetail.find({}, function (err, data) {
		// document.write("Hello World!");
	    // write(err);
	    // res.status(err);
		console.log('fetchEmergencyContact: err: ' + err);
        // document.write(err);
        // write(data.length);
        // res.status(data.length);
		console.log('find: ' + data.length);
		// document.write(data.length);
	    if (err) {
	    	console.log('find err:' + err);
	    	return;
	    } else {
	    	data.forEach(function(uri) {

	    		  // write(JSON.stringify(uri));
	    	      console.log(" Contacts:" + JSON.stringify(uri));
	    	   });
	    	   console.log('returning json now...');
	    	res.json(data);
	    }
	});
	//res.status(200).json(data);
};

exports.updateIncident = function (req, res,next) {
	console.log('dao.updateIncident called..');
	var mongoDBConn = require(process.cwd() + '/dao/mongoDBConnect');
	var common = require(process.cwd() + '/service/common');
	console.log( req.body);
	//TODO:
		//Discuss cases around reportedUserID
	var reportedUserID = req.body.email;
	var reportedUserType = common.GUEST_USER_TYPE;//default as guest user
	if (reportedUserID && reportedUserID  != '') {
		//email id is given, consider as registered user
		reportedUserType = common.REGISTERED_USER_TYPE;
	}
	var alertType = '';
	var id_id = req.body.__id;
	// var cate = req.body.category;
	// console.log(id_id);
 //    console.log(cate);
 //    console.log(req.body.reportedDateTime);
	// console.log('befrore update');

	mongoDBConn.Incident.findByIdAndUpdate(id_id,
		{
			// desc: 'bats',
			desc: req.body.desc,
			category: req.body.category,
			address: req.body.address,
            locationLong: req.body.longitudevalue,
            locationLatd: req.body.lattitudevalue,
			statusbar: req.body.statusbar,
			reportedDateTime: req.body.reportedDateTime,
		},
		function (err, Incident) {
			console.log('success');

			 if (err) throw err;
			 // console.log('error');
		});

	// console.log('outside after update');
};
