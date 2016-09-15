/*
  Create a folder with the name of the package
  Write the translations files from the DB
  Write the package.json file
  Write the README.md file
  Login to NPM
  Publish to NPM
  Delete the folder
*/
import {Meteor} from 'meteor/meteor';
const fsPath = Npm.require("fs-path");
const fs = Npm.require('fs');
const childProcess = Npm.require('child_process');

import { Packs } from '../both/collections/packs.collection';

const scope = '@bastienmoulia/';

Meteor.startup(() => {
  Meteor.methods({
    publish: (packId) => {
      const pack = Packs.findOne(packId);
      console.log('publish', pack.name);
      const path = fs.realpathSync('.') + '/server/publish/';

      let readmeContent = '# ' + pack.name;
      fsPath.writeFile(path + pack.name + '/README.md', readmeContent, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('wrote README.md');
        }
      });

      let packageJson = {
        name: scope + pack.name,
        version: '0.0.1',
        private: false
      };
      let version = childProcess.execSync('npm view ' + packageJson.name + ' version').toString();
      console.log(version);
      if (version) {
        let semVer = version.split('.');
        semVer[semVer.length - 1] = parseInt(semVer[semVer.length - 1], 10) + 1;
        packageJson.version = semVer.join('.');
        console.log(packageJson.version);
      }

      let packageContent = JSON.stringify(packageJson);
      fsPath.writeFile(path + pack.name + '/package.json', packageContent, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('wrote package.json');
        }
      });

      pack.langs.forEach((lang) => {
        let translationsJson = {};
        pack.translations.forEach((translation) => {
          translationsJson[translation.key] = translation.langs[lang];
        });
        let translationsContent = JSON.stringify(translationsJson);
        fsPath.writeFile(path + pack.name + '/' + lang + '.json', translationsContent, (err) => {
          if (err) {
            throw err;
          } else {
            console.log('wrote translation JSON', lang);
          }
        });
      });

      let cmd = 'npm publish ' + path + pack.name + ' --access public';
      childProcess.exec(cmd, (error, stdout, stderr) => {
        // command output is in stdout
        console.log(error, stdout, stderr);
      });
      return 'ok';
    }
  });
});
