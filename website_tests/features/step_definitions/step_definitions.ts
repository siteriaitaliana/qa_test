import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { HomePage } from '../pomPageObjects/homePage'
import { CheckoutBetaPage } from '../pomPageObjects/checkoutBetaPage'
import { PricingPage } from '../pomPageObjects/pricingPage'

setDefaultTimeout(60 * 1000)

/* GIVEN STEPS */
Given('User Navigate to {string}', async function (pageName) {
    switch (pageName) {
        case 'homepage':
            this.homePage = new HomePage()
            await this.homePage.goto()
            await this.homePage.acceptCookie()
            break
        case 'pricingpage':
            this.pricingPage = new PricingPage()
            await this.pricingPage.goto()
            await this.pricingPage.acceptCookie()
            break
    }
})

Given('he check the pricing plans are correctly displayed', async function () {
    await this.pricingPage.verifyBusinessPlanTargetAreSelectedAndVisible()
})

/* WHEN STEPS */
When('he searches for', async function (dataTable) {
    await this.homePage.search(dataTable.hashes()[0].searchQuery)
    await this.homePage.clickFirstSuggestion()
})

When('he click to start a subscription', async function () {
    await this.pricingPage.clicStartASubscription()
})

/* THEN STEPS */
Then(
    'the page displays the correct search results',
    async function (dataTable) {
        await expect(await this.homePage.showResultsCounter).toBeVisible()
        await expect(await this.homePage.queryResults).toContainText(
            dataTable.hashes()[0].prettyName
        )
    }
)

Then('the form require the correct fields', async function () {
    const checkoutPage = new CheckoutBetaPage()
    await checkoutPage.fillAndVerifyForm()
})
