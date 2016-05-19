#!/usr/bin/node env

if(!process.argv[2]) {
  console.log("Please provide the source code file as an argument.");
  process.exit();
}

const fs = require("fs");
const readline = require('readline');

const base = {
  "Type" : "AWS::Lambda::Function",
  "Properties" : {
    "Code" : {},
    "Description" : "String",
    "FunctionName" : "Name",
    "Handler" : "index.handler",
    "MemorySize" : 128,
    "Role" : "String",
    "Runtime" : "nodejs",
    "Timeout" : 30
  }
}

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  base.Properties.Code = { "ZipFile": { "Fn::Join": ["", lines] } }
  console.log(JSON.stringify(base, null, 2));
})
