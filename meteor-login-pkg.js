// start the application by using the following command
// meteor run --settings server/settings.json

if (Meteor.isClient) {

  Meteor.call("getNewData", function(error, results) {

      // var myCount = 0;
      // myList.forEach(function(myCount){
      //   myCount++;
      // })
      var myLists = results;
      console.log('results', results)
  });

  Template.body.helpers({
    listStats: myLists
  });

}

if (Meteor.isServer) {

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
        var responseContent;

        var myLists = [
                  {'name': 'unresponsive', 'id': '1234'},
                  {'name': 'declined', 'id': '1233'},
                  {'name': 'completed', 'id': '1232'},
                  {'name': 'inProcess', 'id': '1231'},
                  {'name': 'beingScheduled', 'id': '1230'},
                  {'name': 'newSignup', 'id': '1229'},
                  {'name': 'signupEvent', 'id': '1088'},
                  {'name': 'questionForm', 'id': '1087'}
                ];
        var responseContent = [];
        for (var i = 0; i < myLists.length; i++) {
          console.log(myLists[i].id);
          try {
              // Request an access token
              responseContent[i] = HTTP.get(
                  "https://console.cloud-elements.com:443/elements/api-v2/hubs/marketing/lists/" + myLists[i].id + "/contacts", {
                      headers: {
                          Authorization:  'User ' + Meteor.settings.secret_stuff.CE_USER_SECRET + ', Organization ' + Meteor.settings.secret_stuff.CE_ORG_SECRET + ', Element +DXBgHkVLTGhTfWNS3DrFjJheV5tVg9TidL7wjzIzRg='
                      }
                  });

          } catch (err) {
              throw _.extend(new Error("Failed to complete OAuth handshake with Cloud Elements. " + err.message),
                  {response: err.response});
          }
          myLists[i].count = responseContent[i].data.length
        // console.log('responseContent', responseContent[i].data.length, 'this', );
        }
        console.log('myLists', myLists)
        return myLists;
    }

  });
}

