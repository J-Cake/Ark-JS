const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const awaitProc = cli => new Promise(function(resolve, reject) {
    const proc = childProcess.exec(cli);

    proc.stdout.on("data", function (data) {
        process.stdout.write(data.split("\n").map(i => `\t${i}`).join("\n"));
    });

    proc.stderr.on("data", function (data) {
        process.stderr.write(data.split("\n").map(i => `\t${i}`).join("\n"));
    });

    proc.on('exit', function (code) {
        if (code === 0)
            resolve();
        else
            reject(code);
    });
});

const start = new Date();
awaitProc("pnpm install").then(() => awaitProc("pnpx tsc").then(() => console.log(`Build Succeeded in ${new Date(new Date().getTime() - start).getTime()}ms`))).catch(() => console.error("Build Failed"));
