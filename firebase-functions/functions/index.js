'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

async function handler(change) {
  const internship = await functions.database.ref('/internship').once('value');
  return await functions.database.ref('/internship2').set(internship);
}

// Keeps track of the length of the 'likes' child list in a separate property.
exports.internshipCharts = functions.database.ref('/internship').onWrite(handler);
