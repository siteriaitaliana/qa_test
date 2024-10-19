import { test, expect } from '@playwright/test'
import { PricingPage } from '../pomPageObjects/pricingPage'

test(`Pricing page`, async ({ page }) => {
    const pricingPage = new PricingPage(page)
    await pricingPage.goto()
    await pricingPage.acceptCookie()

    await expect(
        await page.getByRole('button', { name: 'For Business' })
    ).toBeChecked()

    await expect(await page.getByText('Small Teams')).toBeVisible()
    await expect(
        await page.getByText('Enterprise', { exact: true })
    ).toBeVisible()
    await expect(await page.getByText('VILT')).toBeVisible()

    // TODO: Switch for individuals tab and assert plans

    await page.getByRole('button', { name: 'Start Now' }).click()

    // TODO: Make new page object for this
    await page.getByPlaceholder('First Name').fill('test')
    await expect(
        await page.getByRole('button', { name: 'Sign up with Email' })
    ).toHaveAttribute('cursor', 'not-allowed')

    await page.getByPlaceholder('Last Name').fill('test')
    await expect(
        await page.getByRole('button', { name: 'Sign up with Email' })
    ).toHaveAttribute('cursor', 'not-allowed')

    await page.getByPlaceholder('Your email address').fill('test@gmail.com')
    await expect(
        await page.getByRole('button', { name: 'Sign up with Email' })
    ).toHaveAttribute('cursor', 'not-allowed')

    await page.getByPlaceholder('Password').fill('Test12345678!=')
    await expect(
        await page.getByRole('button', { name: 'Sign up with Email' })
    ).toHaveAttribute('cursor', 'not-allowed')

    // TODO:
    // Use a service as CapSolver by providing it the captcha api key to be able to solve the captcha https://webseekerj.medium.com/how-to-solve-recaptcha-with-node-js-guide-in-2024-a249334a4606
    // After that re-enable the following lines
    // await expect(
    //     await page.getByRole('button', { name: 'Sign up with Email' })
    // ).toHaveAttribute('cursor', 'pointer')
})
