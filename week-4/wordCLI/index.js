// const fs = require('fs');
// const path = require('path');
// console.log(__dirname);
// console.log(path.join(__dirname,"index1.js","project"))
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count_sentence')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let lines = 0 ;
        for (let i = 0 ;i<data.length;i++){
          if (data[i] === "\n"){
            lines++;
          }
        }
        // const lines = data.split('\n').length;
        console.log(`There are ${lines+1} lines in ${file}`);
      }
    });
  });
program.parse();