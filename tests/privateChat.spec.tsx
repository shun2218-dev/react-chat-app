import {expect, test} from '@playwright/test'

test('Test for send a message in private-chat', async ({page}) => {
  await page.goto('https://chat-app-4a684.web.app/')
  await page.getByRole('button', {name: 'Sign In >'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/login')
  await page.getByPlaceholder('Your Email').click()
  await page.getByPlaceholder('Your Email').fill('userB@gmail.com')
  await page.getByPlaceholder('Your Email').press('Tab')
  await page.getByPlaceholder('Password').fill('bbbbbb')
  await page.getByPlaceholder('Password').press('Enter')
  await expect(page).toHaveURL(
    'https://chat-app-4a684.web.app/i6NSNsgSxIM57zTvHqo8iLUb4bh2/home'
  )
  await page.getByText('Private Chat').click()
  await expect(page).toHaveURL(
    'https://chat-app-4a684.web.app/i6NSNsgSxIM57zTvHqo8iLUb4bh2/private'
  )
  await page.locator('li:has-text("react-testAccount")').click()
  await expect(page).toHaveURL(
    'https://chat-app-4a684.web.app/i6NSNsgSxIM57zTvHqo8iLUb4bh2/private/e2ZcFnBYqNRi7VQKhH2jS0AWtXx1'
  )
  const messageCountsBeforeSending = await page
    .getByTestId('private-messages')
    .locator('li')
    .count()
  await page.locator('input[type="text"]').click()
  await page.locator('input[type="text"]').fill('Test Submit From Playwright')
  await page.locator('form').getByRole('button').click()
  await page.waitForTimeout(1500)
  await expect(
    page.locator("ul[data-testid='private-messages'] > li")
  ).toHaveCount(messageCountsBeforeSending + 1)
  await page.getByRole('button', {name: 'Sign Out'}).click()
  await expect(page).toHaveURL('https://chat-app-4a684.web.app/login')
})
