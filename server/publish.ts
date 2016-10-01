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
const fsPath = Npm.require('fs-path');
const fs = Npm.require('fs');
const childProcess = Npm.require('child_process');

import { Packs } from '../both/collections/packs.collection';
import { IPack } from '../both/interfaces/pack.interface';

const scope: string = '@bastienmoulia/';

Meteor.startup(() => {
  Meteor.methods({
    publish: (packId) => {
      const pack: IPack = Packs.findOne(packId);
      console.log('publish', pack._id);
      const path: string = fs.realpathSync('.') + '/server/publish/';

      let readmeContent: string = '# ' + pack._id;
      fsPath.writeFile(path + pack._id + '/README.md', readmeContent, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('wrote README.md');
        }
      });

      let packageJson: any = {
        name: scope + pack._id,
        version: '0.0.1',
        private: false
      };
      let version: string = childProcess.execSync('npm view ' + packageJson.name + ' version').toString();
      console.log(version);
      if (version) {
        let semVer: number[] = version.split('.').map((version) => parseInt(version, 10));
        semVer[semVer.length - 1] = semVer[semVer.length - 1] + 1;
        packageJson.version = semVer.join('.');
        console.log(packageJson.version);
      }

      let packageContent: string = JSON.stringify(packageJson);
      fsPath.writeFile(path + pack._id + '/package.json', packageContent, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('wrote package.json');
        }
      });

      pack.langs.forEach((lang) => {
        let translationsJson: any = {};
        pack.translations.forEach((translation) => {
          translationsJson[translation.key] = translation.langs[lang];
        });
        let translationsContent: string = JSON.stringify(translationsJson);
        fsPath.writeFile(path + pack._id + '/' + lang + '.json', translationsContent, (err) => {
          if (err) {
            throw err;
          } else {
            console.log('wrote translation JSON', lang);
          }
        });
      });

      let cmd = 'npm publish ' + path + pack._id + ' --access public';
      childProcess.exec(cmd, (error, stdout, stderr) => {
        // command output is in stdout
        console.log(error, stdout, stderr);
      });
      return 'ok';
    }
  });
});
