#!/usr/bin/env node

const extractAadhaarNumber = require('./index');
const path = require('path');

const imagePath = process.argv[2];
 

if (!imagePath) {
    console.error('Please provide the path to the Aadhaar image.');
    process.exit(1);
}

extractAadhaarNumber(path.resolve(imagePath))
    .then(aadhaarNumber => {
        console.log('Extracted Aadhaar Number:', aadhaarNumber);
    })
    .catch(error => {
        console.error('Failed to extract Aadhaar number:', error.message);
    });
