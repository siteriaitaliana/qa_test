import { type Locator, type Page } from '@playwright/test'

export class BasePage {
    protected page: Page
    protected infoBannerCloseBtn: Locator
    protected acceptCookieBtn: Locator

    constructor(page: Page) {
        this.page = page
    }

    async closeInfoBanner() {
        this.infoBannerCloseBtn = this.page.locator(
            'css=[data-tracking-id="info-banner-close"]'
        )
        if (await this.infoBannerCloseBtn.isVisible())
            await this.infoBannerCloseBtn.click()
    }

    async acceptCookie() {
        this.acceptCookieBtn = this.page.locator(
            'id=CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'
        )
        if (await this.acceptCookieBtn.isVisible())
            await this.acceptCookieBtn.click()
    }
}
