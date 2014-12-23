
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
  UI.registerHelper('truncate', function(text, length, options) {
    if (text.length <= length) {
      return text;
    } else {
      return text.substring(text, length) + "...";
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
    },
    selectedMessage: function() {
      return Session.get("selectedMessage");
    }
  });

  Template.body.events({
    "submit .new-message": function(event) {
      var msg = event.target.message.value;
      Messages.insert({
        createdAt:  new Date(),
        text:       msg,
        sentFrom:   Meteor.user().username,
        status:     "open",
        assignedTo: "nobody"
      });
      event.target.message.value = "";
      return false;
    },
    "click .delete": function(event) {
      Messages.remove(this._id);
      return false;
    },
    "click .message": function(event) {
      Session.set("selectedMessage", Messages.findOne(this._id));
      return false;
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

  Template.message.events({
  });

}


/**************************
 * Server:
 **************************/

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}







