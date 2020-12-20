function createFlag(name, defaultValue) {
    let nameArray = name.toLowerCase().split(' ');
    let [firstName, ...others] = nameArray;

    return {
        short: '-' + nameArray.map(n => n[0]).join(''),
        long: '--' + nameArray.join('-'),
        name: firstName + others.map(n => {
            let [first, ...otherLetters] = n;
            return first.toUpperCase() + otherLetters.join('');
        }).join(''),
        defaultValue
    };
}

module.exports = {
    flags: [
        createFlag('global', false),
        createFlag('install missing', false),
        createFlag('show flags', false),
        createFlag('quiet', false)
    ]
}