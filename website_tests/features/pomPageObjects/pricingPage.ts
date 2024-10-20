import { PricingPageUrl } from '../../common/globals'
import { expect, Locator } from '@playwright/test'
import { BasePage } from './basePage'
import { page } from '../support/hooks'

export class PricingPage extends BasePage {
    protected businessPlanTarget: Locator
    constructor() {
        super(page)
        this.businessPlanTarget = this.page
            .getByRole('button', {
                name: 'For Business'
            })
            .locator('>div')
    }

    async goto() {
        await this.page.goto(PricingPageUrl)
        await expect(this.page).toHaveTitle('Pricing - QA Platform')
    }

    async verifyBusinessPlanTargetAreSelectedAndVisible() {
        await expect(this.businessPlanTarget).toHaveCSS(
            'background-color',
            'rgb(235, 247, 250)'
        )
        await expect(await this.page.getByText('Small Teams')).toBeVisible()
        await expect(
            await this.page.getByText('Enterprise', { exact: true })
        ).toBeVisible()
        await expect(await this.page.getByText('VILT')).toBeVisible()
    }

    async clicStartASubscription() {
        await this.page.getByRole('button', { name: 'Start Now' }).click()
    }
}
