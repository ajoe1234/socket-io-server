// Global logging format
const fs = require('fs')
const util = require('util')
const path = require('path')

const logDir = './logs'
const relativePathLogET = path.join(__dirname, '/../logs/Everythings.log')
const relativePathLogH = path.join(__dirname, '/../logs/History.log')

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

var logFile = fs.createWriteStream(relativePathLogET, {flags: 'a'})
var logHistory = fs.createWriteStream(relativePathLogH, {flags: 'a'})
var logStdout = process.stdout

var getDateTime = () => {
  var date = new Date()
  var hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour
  var min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min
  var sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  month = (month < 10 ? '0' : '') + month
  var day = date.getDate()
  day = (day < 10 ? '0' : '') + day
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
}

console.log = function (d) {
  logFile.write(`[${getDateTime()}]  : ${util.format(d)} \n`)
  logStdout.write(`[${getDateTime()}]  : ${util.format(d)} \n`)
}

var log = function (d) {
  logHistory.write(`[${getDateTime()}]  : ${util.format(d)} \n`)
}

module.exports = {
  log
}
