const { execSync } = require('child_process')
const { removeSync, moveSync, emptyDirSync } = require('fs-extra')
const chalk = require('chalk')
const {status: statusRoot, add: addRoot, commit: commitRoot, push: pushRoot } = require('simple-git/promise')()
const {add: addPublic, commit: commitPublic, push: pushPublic } = require('simple-git/promise')('public')
const log = (str) => console.log(chalk.bgMagenta(str))
const logNewLine = () => console.log('\n')

async function main() {
  log('💾 Checking git status')
  const modifiedFiles = (await statusRoot()).modified
  if (modifiedFiles.length) {
    log('The working directory is dirty. Please commit any pending changes:')
    console.log(modifiedFiles)
  }
    
  logNewLine()
  log('💾 Clean old publication')
  moveSync('./public/.git', './temp-public-git')
  emptyDirSync('./public')
  moveSync('./temp-public-git', './public/.git')

  logNewLine()
  log('💾 Generating and commit lunr.json')
  execSync('yarn run build:search')
  await addRoot('./*')
  await commitRoot('Update search content in lunr.json')
  await pushRoot('origin', 'master')

  logNewLine()
  log('💾 Generating site')
  execSync('hugo')

  logNewLine()
  log('💾 Updating gh-pages branch...')
  await addPublic('./*')
  await commitPublic('Publishing to gh-pages')
  await pushPublic('origin', 'master')
  log('Done')
}

main()