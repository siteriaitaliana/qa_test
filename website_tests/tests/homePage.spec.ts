import { test, expect } from '@playwright/test'
import { HomePage } from '../pomPageObjects/homePage'

const queries = [
    { name: 'aws', prettyName: 'aws' },
    { name: 'gcp', prettyName: 'gcp' },
    { name: 'azure', prettyName: 'azure' }
]

for (const query of queries) {
    test(`Querying page for '${query.name}'`, async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()

        // await homePage.closeInfoBanner()
        await homePage.acceptCookie()

        await homePage.search(query.name)

        // await page.pause()
        await homePage.clickFirstSuggestion()

        // TODO: Fix this
        // let results = await homePage.getqueryResultsPlaceHolderValue()
        // await expect(results).toContain(query.prettyName)

        // TODO: Assert number of results
        await expect(await homePage.showResultsCounter).toBeVisible()
        await expect(await homePage.queryResults).toContainText(
            query.prettyName
        )
    })
}
