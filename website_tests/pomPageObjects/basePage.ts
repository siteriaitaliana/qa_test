import { type Locator, type Page } from '@playwright/test'

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

    async closeInfoBanner() {
        if (this.infoBannerCloseBtn.isVisible())
            await this.infoBannerCloseBtn.click()
    }

    async acceptCookie() {
        if (this.acceptCookieBtn.isVisible()) await this.acceptCookieBtn.click()
    }
}
