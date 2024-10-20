import { PricingPageUrl } from '../common/globals'
import { expect, Locator } from '@playwright/test'
import { BasePage } from './basePage'

export class PricingPage extends BasePage {
    businessPlanTarget: Locator
    constructor(page) {
        super(page)
        this.page = page
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

    async verifyBusinessPlanTargetIsSelected() {
        await expect(this.businessPlanTarget).toHaveCSS(
            'background-color',
            'rgb(235, 247, 250)'
        )
    }
}
