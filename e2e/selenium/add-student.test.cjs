const { buildDriver } = require('./utils.cjs')
const { By, until } = require('selenium-webdriver')

describe('Add Student UI', function () {
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

  it('should add a student and show it in the list', async function () {
    await driver.get(baseUrl)

    const nameInput = await driver.wait(until.elementLocated(By.name('name')), 5000)
    const ageInput = await driver.findElement(By.name('age'))
    const addBtn = await driver.findElement(By.id('add-student'))

    await nameInput.sendKeys('Selenium Student')
    await ageInput.sendKeys('21')
  await addBtn.click()

  const list = await driver.wait(until.elementLocated(By.id('students-list')), 5000)
  // wait until the students list text contains the newly added student
  await driver.wait(until.elementTextContains(list, 'Selenium Student'), 8000)
  const text = await list.getText()
  if (!text.includes('Selenium Student')) throw new Error('Student not found in list')
  })
})
