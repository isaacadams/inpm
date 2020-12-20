let config = require('./configureFlags');

let flags = config.flags.reduce((p, c) => ({
    ...p,
    [c.name]: c.defaultValue,
}), {});

let inputs = [];
process.argv.slice(2).forEach((a, i) => {

    if(a.startsWith('-')) {
        parseFlag(a);
        return;
    }

    inputs.push(a);
});

function parseFlag(flag) {
    config.flags.forEach(f => {
        if([f.short, f.long].includes(flag)) flags[f.name] = !f.defaultValue;
    });
}

if (flags.showFlags) console.log(flags);

module.exports = {
    flags,
    arguments: inputs
};