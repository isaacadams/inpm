function createFlag(name, defaultValue, description) {
    let nameArray = name.toLowerCase().trim().split(' ').filter(v => !!v);
    let printName = nameArray.join(' ');
    let [firstName, ...others] = nameArray;

    return {
        short: '-' + nameArray.map(n => n[0]).join(''),
        long: '--' + nameArray.join('-'),
        printName,
        name: firstName + others.map(n => {
            let [first, ...otherLetters] = n;
            return first.toUpperCase() + otherLetters.join('');
        }).join(''),
        defaultValue,
        description
    };
}

module.exports = [
    createFlag('global', false, 'indicates that the global node_modules should be inspected, defaults to parsing local node_modules'),
    createFlag('install missing', false, 'will automatically install missing packages'),
    createFlag('show flags', false, 'show the flags that were passed into the program'),
    createFlag('quiet', false, 'suppress logging'),
    createFlag('help', false, 'show help'),
];