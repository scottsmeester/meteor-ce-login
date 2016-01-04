// start the application by using the following command
// meteor run --settings server/settings.json
Contacts = {}

if (Meteor.isClient) {
  Meteor.subscribe("contacts");


  Meteor.call("ceContacts", function(error, results) {
      console.log(results); //results.data should be a JSON object
  });
}

if (Meteor.isServer) {

  Meteor.publish("contacts", function () {
    return Contacts.find();
  });

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
      ceContacts: function () {
        // var config = Accounts.loginServiceConfiguration.findOne({service: 'cloudelements'});
        // console.log('config', config);
        // if (!config) {
        //     throw new ServiceConfiguration.ConfigError("Service not configured");
        //   // this.unblock();
        //   // return Meteor.http.call("GET", "https://console.cloud-elements.com:443/elements/api-v2/hubs/finance/customers");
        // }
        var responseContent;

        try {
            // Request an access token
            responseContent = HTTP.get(
                "https://console.cloud-elements.com/elements/api-v2/hubs/crm/accounts", {
                    headers: {
                        Authorization:  'User ' + Meteor.settings.secret_stuff.CE_USER_SECRET + ', Organization ' + Meteor.settings.secret_stuff.CE_ORG_SECRET + ', Element GyiNJi1HQFNZFAy/bTJA6/Psd9wbXXgNXit6qvloVxc'
                    }
                }).content;

        } catch (err) {
            throw _.extend(new Error("Failed to complete OAuth handshake with stripe. " + err.message),
                {response: err.response});
        }

        console.log('responseContent', responseContent)
    }
  });
}

