import {expect, test} from '@playwright/test'

test('test for routing before sign in', async ({page}) => {
  await page.goto('https://chat-app-4a684.web.app/')
  await page.waitForTimeout(1500)
  await page.screenshot({path: 'tests/images/routing/screenshot-start.png'})

  await page.getByRole('button', {name: 'Get Started'}).hover()
  await page.waitForTimeout(1000)
  await page.getByRole('button', {name: 'Get Started'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/regist')
  await page.waitForTimeout(2000)
  await page.screenshot({path: 'tests/images/routing/screenshot-regist.png'})

  await page.getByRole('button', {name: 'Sign In'}).hover()
  await page.waitForTimeout(1000)
  await page.getByRole('button', {name: 'Sign In'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/login')
  await page.waitForTimeout(2000)
  await page.screenshot({path: 'tests/images/routing/screenshot-login.png'})

  await page.getByRole('button', {name: 'Forgot Password'}).hover()
  await page.waitForTimeout(1000)
  await page.getByRole('button', {name: 'Forgot Password'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/reset')
  await page.waitForTimeout(2000)
  await page.screenshot({path: 'tests/images/routing/screenshot-reset.png'})

  await page.getByRole('img', {name: 'logo'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/')
  await page.waitForTimeout(2000)
  await page.screenshot({
    path: 'tests/images/routing/screenshot-backToStart.png'
  })

  await page.getByRole('button', {name: 'Sign In >'}).hover()
  await page.waitForTimeout(1000)
  await page.getByRole('button', {name: 'Sign In >'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/login')
  await page.waitForTimeout(2000)
  await page.screenshot({
    path: 'tests/images/routing/screenshot-loginFromStart.png'
  })
})
