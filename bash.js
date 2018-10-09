var commands = require('./commands.js');

process.stdout.write('prompt > ');

// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function(data) {
  var input = data.toString().trim();
  var [cmd, args] = input.split(' ');
  commands[cmd](done, args);
});

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}