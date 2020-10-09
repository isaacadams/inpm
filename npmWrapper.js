const npm = require('npm'),
fs = require('fs'),
path = require('path'),
args = require('./args');

module.exports = function() {
    return new Promise((res, rej) => {
        try {
            npm.load({global: args.flags.global}, function(err, config) {
                if(err) rej(err);
                res(new PackageManager(config));
            });
        }
        catch(e) {
            rej(e);
        }
    });
}

class PackageManager {
    constructor(config) {
        this.dir = config.global ? npm.globalDir : npm.dir;
    }

    gatherPackages() {
        let packages = fs.readdirSync(this.dir);
        packages.unshift({});
        return packages.reduce(function (mods, name) {
            mods[name] = true;
            return mods;
        });
    }

    loadPackage(specs) {
        return new Promise((res, rej) => {
            let {name, version} = parsePackageSpecs(specs);

            let pkgJson = path.join(this.dir, name, 'package.json');
            if(!fs.existsSync(pkgJson)) rej({name, version});

            let packageJSON = JSON.parse(fs.readFileSync(pkgJson));
            res({
                name: `${name}@${packageJSON.version}`,
                specVersion: version,
                packageJSON
            });
        });
    }

    installPackages(packageNames) {
        if(!packageNames || !Array.isArray(packageNames)) return;

        npm.commands.install(packageNames, function() {});
    }
}

function parsePackageSpecs(name) {
    let parts = name.split("@");
    if (parts.length < 2) return {name};

    return {name: parts[0], version: parts[1]};
}