import {test, expect, chromium} from "@playwright/test"
import {testCase} from "../pages/testCase"

test.describe('test access to testcase page', async () => {

    let browser;
    let context;
    let page;
    let testCaseInstance;

    test.beforeAll(async() => {
        browser = await chromium.launch();
    });
    test.beforeEach(async() => {
        context = await browser.newContext();
        page = await context.newPage();
        testCaseInstance = new testCase(page);
    
        await testCaseInstance.goto();
    });
    
    test.afterEach(async() => {
        await page.close();
        await context.close()
    });
    
    test.afterAll(async () => {
        await browser.close()
    });
    
    test('test case page', async() => {
        
        await testCaseInstance.checkHompage();
        
        await testCaseInstance.accessToTestCasePage()
                         
    })
})