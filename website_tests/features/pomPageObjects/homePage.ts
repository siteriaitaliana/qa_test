import { HomePageUrl } from '../../common/globals'
import { expect, type Locator } from '@playwright/test'
import { BasePage } from './basePage'
import { page } from '../support/hooks'

export class HomePage extends BasePage {
    protected searchInput: Locator
    protected searchSuggestions: Locator
    protected showResultsCounter: Locator
    protected queryResults: Locator

    constructor() {
        super(page)
        this.searchInput = this.page.locator('css=.react-autosuggest__input')
        this.searchSuggestions = this.page.locator(
            `css=[data-cy='search-result-suggestion']`
        )
        this.queryResults = this.page.locator(`css=[data-cy='query-text']`)
        this.showResultsCounter = this.page.locator(
            `css=[data-cy='search-showing-results-counter']`
        )
    }

    async goto() {
        await this.page.goto(HomePageUrl)
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
}
