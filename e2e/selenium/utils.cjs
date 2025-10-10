const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

// Try to use the chromedriver binary installed by the chromedriver package
let chromedriverPath = null
try {
  // the chromedriver package exposes the path when required
  // eslint-disable-next-line global-require
  const chromedriver = require('chromedriver')
  chromedriverPath = chromedriver.path || chromedriver
} catch (err) {
  // chromedriver not installed or not resolvable; we'll rely on PATH
  chromedriverPath = null
}

async function buildDriver(headless = true) {
  const options = new chrome.Options()
  if (headless) {
    options.addArguments(
      '--headless=new',
      '--disable-gpu',
      '--window-size=1280,800',
      '--no-sandbox',
      '--disable-dev-shm-usage'
    )
  }

  const builder = new Builder().forBrowser('chrome').setChromeOptions(options)

  if (chromedriverPath) {
    const serviceBuilder = new chrome.ServiceBuilder(chromedriverPath)
    builder.setChromeService(serviceBuilder)
  }

  const driver = await builder.build()
  // give the browser a small moment to start
  await new Promise((r) => setTimeout(r, 500))
  return driver
}

module.exports = { buildDriver }

async function waitForApp(url, timeout = 15000) {
  const { request } = require('http')
  const { request: requestHttps } = require('https')
  const { URL } = require('url')

  const parsed = new URL(url)
  const isHttps = parsed.protocol === 'https:'
  const reqLib = isHttps ? requestHttps : request

  const start = Date.now()
  while (Date.now() - start < timeout) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await new Promise((resolve) => {
      const r = reqLib({ method: 'GET', hostname: parsed.hostname, port: parsed.port, path: '/' }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 500)
      })
      r.on('error', () => resolve(false))
      r.setTimeout(2000, () => {
        r.destroy()
        resolve(false)
      })
      r.end()
    })
    if (ok) return true
    // wait a bit before retrying
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

module.exports = { buildDriver, waitForApp }
