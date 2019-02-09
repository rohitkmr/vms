var twilio = require('twilio');


// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC5dabe402352ad3b7eadad650dccd3c8c', '4ffa6f3ff6fb7f461996e4a992e24b93');


exports.sendPassword = function (phoneNumber, msg, fn) {

    console.log("the phone numbers is " + phoneNumber)
    client.sms.messages.create({
        to: phoneNumber,
        from: '+17746332190',
        body: msg
    }, function (error, message) {

        if (!error) {
            /// to do save this message to the DB
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
            fn(message.sid, message.sid);//correct this late
        } else {
            console.log('Oops! There was an error.' + error);
            fn(null, null);
        }
    });
};

exports.sendSMS = function (phoneNumber, msg, fn) {
    var msgs = {};
    client.sms.messages.create({
        to: phoneNumber,
        from: '+17746332190',
        body: msg
    }, function (error, message) {

        if (!error) {
            msgs.Details = message;
            msgs.Status = 1;
            fn(msgs);//correct this late
        } else {
            msgs.Error = error;
            msgs.Status = 0;
            fn(msgs);
        }
    });
};



exports.userWelcomeSMS = function (user, fn) {
    var message = "Hi " + user.names + " Welcome to dwarpal You Have Registered as User."
    var msg = {};
    client.sms.messages.create({
        to: user.contact,
        from: '+17746332190',
        body: message
    }, function (error, message) {
        if (!error) {
            msg.Details = message;
            msg.Status = 1;
            fn(msg);
        } else {
            msg.Error = error;
            msg.To = user.contact;
            msg.Messsage = msg;
            msg.Status = 0;
            fn(msg);
        }
    });
};