import { After, AfterAll, BeforeAll, Status, World } from '@cucumber/cucumber'
import { chromium, Browser, Page } from 'playwright'

export let browser: Browser
export let page: Page

BeforeAll({ timeout: 5 * 1000 }, async function (this: World) {
    browser = await chromium.launch({
        headless: true
    })
    page = await browser.newPage()
    return page
})

AfterAll(async function (this: World) {
    return browser.close()
})

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const attach = this.attach
        const screenshot = await this.page.screenshot()
        return attach(screenshot, 'image/png')
    }
})
