import {expect, test} from '@playwright/test'

test('Test for sign up and first set up profile', async ({page}) => {
  await page.goto('https://chat-app-4a684.web.app/regist')
  await page.waitForTimeout(1500)
  await page.screenshot({path: 'tests/images/signUp/screenshot-regist.png'})

  await page.getByPlaceholder('Your Email').click()
  await page.getByPlaceholder('Your Email').fill('sheep@gmail.com')
  await page.screenshot({
    path: 'tests/images/signUp/screenshot-afterInputEmail.png'
  })

  await page.getByRole('textbox', {name: 'Password'}).click()
  await page.getByRole('textbox', {name: 'Password'}).fill('sheepByPlaywright')
  await page.screenshot({
    path: 'tests/images/signUp/screenshot-afterInputPassword.png'
  })

  await page.getByPlaceholder('Password Confirmation').click()
  await page.getByPlaceholder('Password Confirmation').fill('sheepByPlaywright')
  await page.screenshot({
    path: 'tests/images/signUp/screenshot-afterInputConfirmation.png'
  })

  await page.getByRole('button', {name: 'Sign Up'}).click()
  await page.waitForTimeout(3000)
  await page.screenshot({
    path: 'tests/images/signUp/screenshot-afterSignUp.png'
  })
  await page.waitForTimeout(3000)
  await expect(page.locator('header').locator('button')).toHaveText('Sign Out')
  await expect(page.getByRole('alert')).toHaveText('Information')
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByLabel('avatar').click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('account/sheep.jpg')
  await page.getByPlaceholder('Your Name').fill('Sheep')
  await page.locator("button[type='submit']").click()
  await page.waitForTimeout(2000)
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/*/home')
  // expect(page.getByText("Setting Profile"))
})
