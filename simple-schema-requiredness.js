TheCollection = new Meteor.Collection('thecollection');

TheCollectionSchema = new SimpleSchema({
  foo: {
    type: String,
    optional: true,
    custom: function() {
      console.log("Custom function executed! This: ");
      console.dir(this);
      if (!this.isSet) {
        return 'required';
      }
    }
  }
});

TheCollection.attachSchema(TheCollectionSchema);


if (Meteor.isClient) {

  Template.updateTemplate.helpers({
    'editingDoc': function() {
      return TheCollection.findOne();
    }
  });

  Template.updateTemplate.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    TheCollection.insert({
      "foo": "bar"
    });
  });
}
