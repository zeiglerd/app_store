const argv = require('yargs').argv;
const git = require('gulp-git');
const gulp = require('gulp');
const jsonfile = require('jsonfile');
const utilTool = require('utility-tool');

gulp.task('gitAdd', () => {
  console.log();

  return gulp.src('./*')
    .pipe(git.add());
});

gulp.task('gitCommit', () => {
  console.log();
  let message = 'No commit message was provided... =(';
  if (argv.m) {
    message = argv.m;
  }
  return gulp.src('./*')
    .pipe(git.commit(message));
});

gulp.task('version', () => {
  jsonfile.readFile('package.json', (err, obj) => {
    if (err) {
      utilTool.debug('Failed to read the current version from package.json.');
    } else if (!argv.major && !argv.minor && !argv.patch) {
      utilTool.debug('Cannot use this script without --major, --minor or --patch.');
    } else {
      let type;

      if (argv.major) {
        type = 'major';
      } else if (argv.minor) {
        type = 'minor';
      } else if (argv.patch) {
        type = 'patch';
      }

      const newObj = obj;
      newObj.version = utilTool.vni(newObj.version, type);

      jsonfile.writeFile('package.json', newObj, (err) => {
        if (err) {
          utilTool.debug('Could not update the version in package.json.');
        } else {
          utilTool.debug('Upated the version in package.json.');
        }
      });
    }
  });
});

gulp.task('commitAll', ['version', 'gitAdd', 'gitCommit']);
