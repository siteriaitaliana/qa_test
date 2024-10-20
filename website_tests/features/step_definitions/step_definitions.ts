import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { HomePage } from '../pomPageObjects/homePage'
import { CheckoutBetaPage } from '../pomPageObjects/checkoutBetaPage'
import { PricingPage } from '../pomPageObjects/pricingPage'

Given('User Navigate to the homepage', async function () {
    this.homePage = new HomePage()
    await this.homePage.goto()
    await this.homePage.acceptCookie()
})

When('he searches for {string}', async function (queryString) {
    await this.homePage.search(queryString)
    await this.homePage.clickFirstSuggestion()
})

Then(
    'the page displays the correct {string} search results',
    async function (queryString) {
        await expect(await this.homePage.showResultsCounter).toBeVisible()
        await expect(await this.homePage.queryResults).toContainText(
            queryString
        )
    }
)

Given('User Navigate to the pricingpage', async function () {
    this.pricingPage = new PricingPage()
    await this.pricingPage.goto()
    await this.pricingPage.acceptCookie()
})

Given('he check the pricing plans are correctly displayed', async function () {
    await this.pricingPage.verifyBusinessPlanTargetAreSelectedAndVisible()
})

When('he click to start a subscription', async function () {
    await this.pricingPage.clicStartASubscription()
})

Then('the form require the correct fields', async function () {
    const checkoutPage = new CheckoutBetaPage()
    await checkoutPage.fillAndVerifyForm()
})
