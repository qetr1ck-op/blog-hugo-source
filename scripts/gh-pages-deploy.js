const { execSync } = require('child_process')
const { removeSync, moveSync, emptyDirSync } = require('fs-extra')
const chalk = require('chalk')
const log = (str) => console.log(chalk.bgMagenta(str))
const logNewLine = () => console.log('\n')

log('💾 Checking git status')
const gitStatus = execSync('git status -s')

if (gitStatus.length) {
   log('The working directory is dirty. Please commit any pending changes:')
   console.log(gitStatus.toString())
   return;
}

logNewLine()
log('💾 Clean old publication')
moveSync('./public/.git', './temp-public-git')
emptyDirSync('./public')
moveSync('./temp-public-git', './public/.git')

/* logNewLine()
log('💾 Generating and commit lunr.json')
execSync('yarn run build:search')
execSync('git add --all && git commit -m "Update search content in lunr.json"')
execSync('git push origin master') */

logNewLine()
log('💾 Generating site')
execSync('hugo')

log('💾 Updating gh-pages branch')
logNewLine()
execSync('cd public') 
execSync('git add --all && git commit -m "Publishing to gh-pages"') 
execSync('git push origin master') 