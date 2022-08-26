let config = require('./configureFlags');

let flags = config.reduce((p, c) => ({
    ...p,
    [c.name]: c.defaultValue,
}), {});

let inputs = [];

function parseArguments() {
    process.argv.slice(2).forEach((a, i) => {

        if(a.startsWith('-')) {
            parseFlag(a);
            return;
        }
    
        inputs.push(a);
    });
    
    function parseFlag(flag) {
        config.forEach(f => {
            if([f.short, f.long].includes(flag)) flags[f.name] = !f.defaultValue;
        });
    }
}

parseArguments();

if (flags.showFlags) console.log(flags);

function showHelp() {
    /* let columns = config.map(f => {
        return {
            first: `${f.short}, ${f.long}`,
            second: f.description
        };
    }); */
    //let numOfSpaces = Math.max(...columns.map(c => c.first.length));
    //let help = columns.map(c => `${c.first.padEnd(numOfSpaces)}   ${c.second}`).join('\n');
    //console.log(help);
    let columns = config.map(f => {
        return [
            f.short,
            f.long,
            f.description
        ];
    });

    console.log(organizeAsColumns(columns));

    function organizeAsColumns(rows) {
        return rows.map(r => {
            return r.map((c, i) => c.padEnd(getMaxColumnLength(i))).join('   ');
        }).join('\n');

        function getMaxColumnLength(columnIndex) {
            return Math.max(...rows.map(r => r[columnIndex].length))
        }
    }
}

module.exports = {
    flags,
    arguments: inputs,
    showHelp
};