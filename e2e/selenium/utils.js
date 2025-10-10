const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

async function buildDriver(headless = true) {
  const options = new chrome.Options()
  if (headless) options.addArguments('--headless=new', '--disable-gpu', '--window-size=1280,800')
  return new Builder().forBrowser('chrome').setChromeOptions(options).build()
}

module.exports = { buildDriver }
