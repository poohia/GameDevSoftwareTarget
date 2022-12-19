const path = require("path");
const fs = require("fs");

const { exec } = require("child_process");

const pathToPlatform = path.resolve(__dirname, "../../platforms/browser");
const pathToPublic = path.resolve(__dirname, "../../public");

const copyFiles = () => {
  fs.copyFileSync(
    `${pathToPlatform}/www/cordova.js`,
    `${pathToPublic}/cordova.js`
  );
  fs.copyFileSync(
    `${pathToPlatform}/www/cordova_plugins.js`,
    `${pathToPublic}/cordova_plugins.js`
  );
  fs.symlinkSync(`${pathToPlatform}/www/plugins`, `${pathToPublic}/plugins`);
};

const execCopy = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pathToPlatform)) {
      exec("cordova prepare browser", (error) => {
        if (error !== null) {
          reject();
          return;
        }
        try {
          copyFiles();
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    } else {
      exec("cordova platform add browser", (error) => {
        if (error) {
          reject();
        }
        execCopy().then(resolve).catch(reject);
      });
    }
  });
};

module.exports = execCopy;
