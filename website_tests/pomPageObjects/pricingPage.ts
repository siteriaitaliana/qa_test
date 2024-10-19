import { pricingPageUrl } from '../common/globals'
import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './basePage'

export class PricingPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page
        this.infoBannerCloseBtn = page.locator(
            'css=[data-tracking-id="info-banner-close"]'
        )
    }

    async goto() {
        await this.page.goto(pricingPageUrl, { timeout: 30_000 })
        await expect(this.page).toHaveTitle('Pricing - QA Platform')
    }
}
