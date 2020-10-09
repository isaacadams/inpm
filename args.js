let flags = {
    global: false,
    installMissing: false,
    verbose: true,
    showFlags: false,
};

let inputs = [];
process.argv.slice(2).forEach((a, i) => {

    if(a.startsWith('-')) {
        parseFlag(a);
        return;
    }

    inputs.push(a);
});

function parseFlag(flag) {
    if(['-g', '--global'].includes(flag)) flags.global = true;
    if(['-im', '--install-missing'].includes(flag)) flags.installMissing = true;
    if(['-sf', '--show-flags'].includes(flag)) flags.showFlags = true;
    if(['-q', '--quiet'].includes(flag)) flags.verbose = false;
}

if (flags.showFlags) console.log(flags);

module.exports = {
    flags,
    arguments: inputs
};