// start the application by using the following command
// meteor run --settings server/settings.json

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      // code to run on server at startup
      // Accounts.loginServiceConfiguration.remove({
      //   service: 'cloud-elements'
      // });

      // Accounts.loginServiceConfiguration.insert({
      //   service: 'cloud-elements',
      //   clientId: Meteor.settings.secret_stuff.CE_ORG_SECRET,
      //   secret: Meteor.settings.secret_stuff.CE_USER_SECRET
      // });

      console.log('Meteor.settings.secret_stuff.CE_ORG_SECRET', Meteor.settings.secret_stuff.CE_ORG_SECRET);
  });
}
