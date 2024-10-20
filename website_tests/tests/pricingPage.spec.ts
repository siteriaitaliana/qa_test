import { test, expect } from '@playwright/test'
import { PricingPage } from '../pomPageObjects/pricingPage'
import { CheckoutBetaPage } from '../pomPageObjects/checkoutBetaPage'

test(`Pricing page`, async ({ page }) => {
    const pricingPage = new PricingPage(page)
    await pricingPage.goto()
    await pricingPage.acceptCookie()
    await pricingPage.verifyBusinessPlanTargetIsSelected()

    // Business plans verification
    await expect(await page.getByText('Small Teams')).toBeVisible()
    await expect(
        await page.getByText('Enterprise', { exact: true })
    ).toBeVisible()
    await expect(await page.getByText('VILT')).toBeVisible()

    // TODO: Switch the individuals tab and assert plans there
    await page.getByRole('button', { name: 'Start Now' }).click()

    const checkoutPage = new CheckoutBetaPage(page)
    await checkoutPage.fillAndVerifyForm()
})
