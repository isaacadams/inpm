#!/usr/bin/env node

const args = require('./args'),
    npmWrapper = require('./npmWrapper'),
    logger = require('./logger');

npmWrapper()
    .then(pm => checkIfPackageExists(pm))
    .catch(console.log);

function checkIfPackageExists(pm) {
    let names = args.arguments;
    if(!names) return;

    let promises = names.map(n => {
        return pm.loadPackage(n)
            .then(pkg => {
                let message = pkg.name;
                let color = logger.colors.FgGreen;

                let installedDiffersFromSpecifiedVersion = pkg.specVersion && pkg.specVersion !== pkg.packageJSON.version;
                if(installedDiffersFromSpecifiedVersion) {
                    message = `${pkg.name} :: asked for v${pkg.specVersion}`;
                    color = logger.colors.FgYellow;
                }

                logger.createLog(color, message);
            })
            .catch(({name, version})=> {
                logger.createLog(logger.colors.FgRed, `${name}: missing`);

                return !version ? name : `${name}@${version}`;
            });
    });

    Promise.all(promises)
        .then(r => {
            logger.log();

            let missingPackages = r.filter(p => !!p);
            if(args.flags.installMissing && !!missingPackages && Array.isArray(missingPackages) && missingPackages.length > 0) {
                pm.installPackages(missingPackages);
            }
        });
}
