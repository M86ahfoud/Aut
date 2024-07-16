import { test, expect, chromium, selectors } from "@playwright/test"
import { Register } from "../pages/Register";
import dataUser from "../fixture/dataUser.json";
import selectore from "../fixture/selectore.json";
import {Login} from "../pages/Login"
import { afterEach } from "node:test";

test.describe('sign and login tests', ()=> {

    let browser;
    let page;
    let registerInstance;
    let loginInstance

    test.beforeAll( async () => {
        browser = await chromium.launch();  
        const context = await browser.newContext();
        page = await context.newPage();
        registerInstance = new Register(page)
        loginInstance = new Login(page)
    })
    test.beforeEach(async() => {

        await registerInstance.goto()
        await registerInstance.checkHompage();
        await registerInstance.navigateToLoginPage();
    })

    test.afterEach(async () => {
        await page.close();
    })
    test.afterAll(async () => {
        await browser.close();
    } )
    
    test('Register user', async () => {
        await registerInstance.sign(
            dataUser.user.name,
            dataUser.user.email,
        );
        await registerInstance.create(
            dataUser.user.password,
            dataUser.user.dayBirth,
            dataUser.user.monthBirth,
            dataUser.user.yearBirth,
            dataUser.user.firstName,
            dataUser.user.lastName,
            dataUser.user.streetAdress,
            dataUser.user.country,
            dataUser.user.stat,
            dataUser.user.city,
            dataUser.user.zipcode,
            dataUser.user.phone,
            dataUser.user.name
        )
        await registerInstance.delete();  
        
    });
    test('Register User with existing email', async() => {
        // await registerInstance.navigateToLoginPage();
        await registerInstance.sign(
            dataUser.user.name,
            dataUser.correctDataUSer.emailLogin,
        );
        await page.pause();
        await expect(page.getByText(selectore.emailAdressExist)).toBeVisible(); 

    })
    test('Login with correct mail and password', async() => {
        // await registerInstance.navigateToLoginPage();
        await loginInstance.login(dataUser.correctDataUSer.emailLogin, dataUser.correctDataUSer.passwordLogin);
        await loginInstance.logout()
        
    });
    test('Login with an incorrect mail and password', async() => {
        // await registerInstance.navigateToLoginPage();
        
        await loginInstance.login(dataUser.incorrectDataUser.emailLogin, 
                                dataUser.incorrectDataUser.passwordLogin);
        await loginInstance.checkLogin()
        // await page.pause();
    });

    
})
