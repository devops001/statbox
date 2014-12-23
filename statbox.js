
Messages = new Mongo.Collection("messages");


/**************************
 * Client:
 **************************/

if (Meteor.isClient) {

  UI.registerHelper('formatTime', function(date, options) {
    if (date) {
      return moment(date).format('MM/DD hh:mm:ss')
    }
  });

  Accounts.ui.config({ passwordSignupFields: "USERNAME_ONLY" });

  Template.body.helpers({
    messages: function() {
      var list = [];
      var i    = 0;
      Messages.find().forEach(function(m) {
        m.position = i++;
        list.push(m);
      });
      return list;
    }
  });

  Template.message.helpers({
    even: function() {
      return (this.position % 2 === 0);
    },
    odd: function() {
      return !(this.position % 2 === 0);
    }
  });
}


/**************************
 * Server:
 **************************/

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
