
var hsListArray = [
              {'name': 'Unresponsive', 'id': '1234'},
              {'name': 'Declined', 'id': '1233'},
              {'name': 'Completed', 'id': '1232'},
              {'name': 'In Process', 'id': '1231'},
              {'name': 'Being Scheduled', 'id': '1230'},
              {'name': 'New Signup', 'id': '1229'},
              {'name': 'Signup Event', 'id': '1088'},
              {'name': 'Question Form', 'id': '1087'}
            ]


Meteor.startup(function () {

  Accounts.loginServiceConfiguration.remove({
    service: 'cloudelements'
  });

  Accounts.loginServiceConfiguration.insert({
    service: 'cloudelements',
    org_secret: Meteor.settings.secret_stuff.CE_ORG_SECRET,
    user_secret: Meteor.settings.secret_stuff.CE_USER_SECRET
  });

});


Meteor.methods({

  getNewData: function () {

    var myList = hsListArray;

    var responseContent = [];
    for (var i = 0; i < myList.length; i++) {
      console.log(myList[i].id);
      try {
          // Request an access token
          responseContent[i] = HTTP.get(
              "https://console.cloud-elements.com:443/elements/api-v2/hubs/marketing/lists/" + myList[i].id + "/contacts", {
                  headers: {
                      Authorization:  'User ' + Meteor.settings.secret_stuff.CE_USER_SECRET + ', Organization ' + Meteor.settings.secret_stuff.CE_ORG_SECRET + ', Element +DXBgHkVLTGhTfWNS3DrFjJheV5tVg9TidL7wjzIzRg='
                  }
              });

      } catch (err) {
          throw _.extend(new Error("Failed to complete OAuth handshake with Cloud Elements. " + err.message),
              {response: err.response});
      }
      myList[i].count = responseContent[i].data.length
    }
    return myList;
}

});