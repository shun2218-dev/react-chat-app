import {expect, test} from '@playwright/test'

test('test for sign in', async ({page}) => {
  await page.goto('https://chat-app-4a684.web.app/login')
  await page.waitForTimeout(1500)
  await page.screenshot({path: 'tests/images/signIn/screenshot-login.png'})

  await page.getByPlaceholder('Your Email').click()

  await page.getByPlaceholder('Your Email').fill('userA@gmail.com')
  await page.screenshot({
    path: 'tests/images/signIn/screenshot-afterInputEmail.png'
  })

  await page.getByPlaceholder('Password').click()

  await page.getByPlaceholder('Password').fill('aaaaaa')
  await page.screenshot({
    path: 'tests/images/signIn/screenshot-afterInputPassword.png'
  })

  await page.getByRole('button', {name: 'Sign In'}).click()
  await expect(page).toHaveURL(
    'https://chat-app-4a684.web.app/20HiRgDUfZPHidjxV5voW0oDDeA3/home'
  )
  await page.waitForTimeout(2500)
  await page.screenshot({
    path: 'tests/images/signIn/screenshot-afterSignIn.png'
  })

  await expect(page.getByRole('alert')).toHaveText('SuccessLogin succeeded.')
})
