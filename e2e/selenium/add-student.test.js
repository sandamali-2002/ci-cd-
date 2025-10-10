const { buildDriver } = require('./utils')
const { By, until } = require('selenium-webdriver')

describe('Add Student UI', function () {
  let driver
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'

  beforeAll(async function () {
    driver = await buildDriver(true)
  })

  afterAll(async function () {
    if (driver) await driver.quit()
  })

  it('should add a student and show it in the list', async function () {
    await driver.get(baseUrl)

    // Wait for Add Student form elements
    const nameInput = await driver.wait(until.elementLocated(By.name('name')), 5000)
    const ageInput = await driver.findElement(By.name('age'))
    const addBtn = await driver.findElement(By.id('add-student'))

    await nameInput.sendKeys('Selenium Student')
    await ageInput.sendKeys('21')
    await addBtn.click()

    // Wait for the student to appear in the list
    const list = await driver.wait(until.elementLocated(By.id('students-list')), 5000)
    const text = await list.getText()
    if (!text.includes('Selenium Student')) throw new Error('Student not found in list')
  })
})
