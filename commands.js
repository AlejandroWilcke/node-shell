var fs = require('fs');
var request = require('request');

function pwd() {
  process.stdout.write(process.env.PWD);
  process.stdout.write("\nprompt > ");
}

function date() {
  process.stdout.write(Date());
  process.stdout.write("\nprompt > ");
}

function ls() {
  fs.readdir('.', function(err, files) {
    files.forEach(function(file) {
      process.stdout.write(file.toString() + '\n');
    });
  });
}

function echo(cmd) {
  var arr = cmd.split('echo');
  process.stdout.write(arr[1].trim());
  process.stdout.write("\nprompt > ");
}

function cat(done, filename) {
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;
    process.stdout.write(files.toString());
  });
}

function head(done, filename) {
  var output = '';
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;
    var arr = files.toString().split('\n');
    for (var i = 0; i < 5; i++) {
      output += arr[i] + '\n';
    }
    done(output);
  });
}

function tail(done, filename) {
  var output = '';
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;
    var arr = files.toString().split('\n');
    for (var i = arr.length - 5; i < arr.length; i++) {
      output += arr[i] + '\n';
    }
    done(output);
  });
}

function sort(done, filename) {
  var output = '';
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;
    var arr = files
      .toString()
      .split('\n')
      .sort();

    output += arr.join('\n');
    done(output);
  });
}

function wc(done, filename) {
  var output = '';
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;
    var arr = files.toString().split('\n');
    output += arr.length.toString();
    done(output);
  });
}

function uniq(done, filename) {
  var output = '';
  fs.readFile('./' + filename, 'utf8', function(err, files) {
    if (err) throw err;

    var arr = files
      .toString()
      .split('\n')
      .sort();
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] === arr[i - 1]) {
        arr.splice(i, 1);
      }
    }
    output += arr.join('\n').toString();
    done(output);
  });
}

function curl(done, filename) {
  var output = '';
  request.get(filename, function(err, files, body) {
    output += body;
    done(output);
  });
}

function find(file){
  var splittedActualDir = process.env.PWD.split('/');
  var actualDir = splittedActualDir[splittedActualDir.length-1];
  var dir;
  fs.readdirSync('.', function(err, files) {
    files.forEach(function(file) {
      dir = actualDir + '/' + file.toString();
    });
    console.log(dir);
  });
  //process.stdout.write(dir.toString());
}

function list(file){
  var filesArr = [];
  fs.readdir('.', function(err, files){
    files.forEach(function(file){
      (function(p){console.log(p)})('hola');
    });
  });
  return filesArr;
}

module.exports = {pwd,date,ls,echo,cat,head,tail,sort,wc,uniq,curl,find};