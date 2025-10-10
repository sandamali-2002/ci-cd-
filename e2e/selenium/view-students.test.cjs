const { buildDriver } = require('./utils.cjs')
const { By, until } = require('selenium-webdriver')

describe('View Students UI', function () {
  let driver
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'

  before(async function () {
    const { waitForApp } = require('./utils.cjs')
    const appUrl = process.env.APP_URL || 'http://localhost:5173'
    const ready = await waitForApp(appUrl, 20000)
    if (!ready) throw new Error(`App not reachable at ${appUrl}`)
    driver = await buildDriver(true)
  })

  after(async function () {
    if (driver) await driver.quit()
  })

  it('should display students list on load', async function () {
    await driver.get(baseUrl)
    const list = await driver.wait(until.elementLocated(By.id('students-list')), 5000)
    const text = await list.getText()
    if (typeof text !== 'string') throw new Error('Students list not readable')
  })
})
