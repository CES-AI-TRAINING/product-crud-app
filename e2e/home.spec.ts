import { test, expect } from '@playwright/test'

test('homepage has title and root div', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page).toHaveTitle(/product-crud-app/i)
  await expect(page.locator('#root')).toBeVisible()
})
