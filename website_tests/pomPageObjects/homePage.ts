import { homePageUrl } from '../common/globals'
import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './basePage'

export class HomePage extends BasePage {
    searchInput: Locator
    searchSuggestions: Locator
    showResultsCounter: Locator
    queryResults: Locator
    queryResultsPlaceHolder: Locator

    constructor(page) {
        super(page)
        this.page = page
        this.searchInput = page.locator('css=.react-autosuggest__input')
        this.searchSuggestions = page.locator(
            `css=[data-cy='search-result-suggestion']`
        )
        this.queryResults = page.locator(`css=[data-cy='query-text']`)
        this.showResultsCounter = page.locator(
            `css=[data-cy='search-showing-results-counter']`
        )
        this.queryResultsPlaceHolder = page.getByPlaceholder(
            `Search in our library...`
        )
    }

    async goto() {
        await this.page.goto(homePageUrl)
        await expect(this.page).toHaveTitle('Training Library - QA Platform')
    }

    async search(queryText: string) {
        await this.searchInput.type(queryText)
        await expect(await this.searchSuggestions.nth(0)).toBeVisible()
    }

    async clickFirstSuggestion() {
        await this.searchSuggestions.first().click()
    }

    async getQueryResults() {
        await this.queryResults.textContent()
    }

    async getqueryResultsPlaceHolderValue() {
        const element = await this.queryResultsPlaceHolder
        return await element.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('value')
        })
    }
}
