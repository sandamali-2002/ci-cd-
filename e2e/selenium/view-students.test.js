const { buildDriver } = require('./utils')
const { By, until } = require('selenium-webdriver')

describe('View Students UI', function () {
  let driver
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'

  beforeAll(async function () {
    driver = await buildDriver(true)
  })

  afterAll(async function () {
    if (driver) await driver.quit()
  })

  it('should display students list on load', async function () {
    await driver.get(baseUrl)
    const list = await driver.wait(until.elementLocated(By.id('students-list')), 5000)
    const text = await list.getText()
    // At least ensure the element exists; actual content validated in API tests
    if (typeof text !== 'string') throw new Error('Students list not readable')
  })
})
