import { expect, type Locator } from '@playwright/test'
import { BasePage } from './basePage'
import { page } from '../support/hooks'

export class CheckoutBetaPage extends BasePage {
    protected nameInput: Locator
    protected lastNameInput: Locator
    protected emailInput: Locator
    protected pwInput: Locator
    constructor() {
        super(page)
        this.nameInput = this.page.getByPlaceholder('First Name')
        this.lastNameInput = this.page.getByPlaceholder('Last Name')
        this.emailInput = this.page.getByPlaceholder('Your email address')
        this.pwInput = this.page.getByPlaceholder('Password')
    }

    async fillAndVerifyForm() {
        await this.nameInput.fill('test')
        await expect(
            await this.page.getByRole('button', { name: 'Sign up with Email' })
        ).toHaveAttribute('data-cy', 'button disabled')

        this.lastNameInput.fill('test')
        await expect(
            await this.page.getByRole('button', { name: 'Sign up with Email' })
        ).toHaveAttribute('data-cy', 'button disabled')

        this.emailInput.fill('test@gmail.com')
        await expect(
            await this.page.getByRole('button', { name: 'Sign up with Email' })
        ).toHaveAttribute('data-cy', 'button disabled')

        await this.pwInput.fill('Test12345678!=')
        await expect(
            await this.page.getByRole('button', { name: 'Sign up with Email' })
        ).toHaveAttribute('data-cy', 'button disabled')

        // TODO:
        // Use a service as CapSolver by providing it the captcha api key and be able to solve the captcha https://webseekerj.medium.com/how-to-solve-recaptcha-with-node-js-guide-in-2024-a249334a4606
        // After that re-enable the following lines to finally verify the form is correctly filled
        // await expect(
        //     await page.getByRole('button', { name: 'Sign up with Email' })
        // ).toHaveAttribute('data-cy', 'button enabled')
    }
}
