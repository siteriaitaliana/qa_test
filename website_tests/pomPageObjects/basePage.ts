import { homePageUrl } from '../common/globals'
import { expect, type Locator, type Page } from '@playwright/test'

export class BasePage {
    page: Page
    infoBannerCloseBtn: Locator
    acceptCookieBtn: Locator

    constructor(page) {
        this.page = page
        this.infoBannerCloseBtn = page.locator(
            'css=[data-tracking-id="info-banner-close"]'
        )
        this.acceptCookieBtn = page.locator(
            'id=CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'
        )
    }

    async goto() {
        await this.page.goto(homePageUrl)
        await expect(this.page).toHaveTitle('Training Library - QA Platform')
    }

    async closeInfoBanner() {
        await this.infoBannerCloseBtn.click()
    }

    async acceptCookie() {
        await this.acceptCookieBtn.click()
    }
}
