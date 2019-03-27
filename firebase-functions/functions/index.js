'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

async function handler(change) {
  const root = change.after.ref.parent.parent;
  const internship_snapshot = await root.child('internship').once('value');
  const internship = company_snapshot.val();
  return root.child('/internship').set(internship);
}

// Keeps track of the length of the 'likes' child list in a separate property.
exports.internshipCharts = functions.database.ref('/internship/updated').onWrite(handler);
