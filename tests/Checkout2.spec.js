import { test, expect, chromium } from "@playwright/test";
import { Checkout } from "../pages/Checkout";
import dataUser from "../fixture/dataUser.json";
import selectorCart from "../fixture/Cart/slectorCart.json";
import dataCheckout from "../fixture/Checkout/dataCheckout.json";
import selectorCheckout from "../fixture/Checkout/selectorCheckout.json";
import { Register } from "../pages/Register";
import { homePage } from "../pages/homePage";
import { Cart } from "../pages/Cart";
import { Login } from "../pages/Login"
import { TIMEOUT } from "dns";

test.describe("Place Order: Register and Checkout", async () => {
    test.describe.configure({ mode: 'serial' })
    let browser;
    let context;
    let page;
    let CheckoutInstance;
    let registerInstance;
    let homePageInstance;
    let CartInstance;
    let loginInstance;

    test.beforeEach(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        CheckoutInstance = new Checkout(page);
        registerInstance = new Register(page);
        homePageInstance = new homePage(page);
        loginInstance = new Login(page);
        CartInstance = new Cart(page);
        await homePageInstance.goto();
        await homePageInstance.checkHompage();
    });
    test.afterEach(async () => {
        await browser.close();
    })

    test("register while Checkout", async () => {

        await CheckoutInstance.addProduct();
        await CartInstance.navigateToCartPage();
        await page.getByText(selectorCheckout.proceedToCheckout).click();
        await page.getByRole(selectorCheckout.registerBt.locator,
            selectorCheckout.registerBt.option).click();
        await registerInstance.sign(dataUser.user.name);
        await registerInstance.createAccount(
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
        );
        await page.getByRole(selectorCart.viewCartBtLocator.locator,
            selectorCart.viewCartBtLocator.option2).click();
        await page.getByText(selectorCheckout.proceedToCheckout).click();
        await CheckoutInstance.VerifyAdressDetails();
        await CheckoutInstance.ReviewOrderProducts();
        await CheckoutInstance.verifyPriceQuantityTotal();
        await CheckoutInstance.commentTextArea();
        await CheckoutInstance.paymentDetails(
            dataCheckout.nameInput, dataCheckout.card_numberInput, dataCheckout.CVC,
            dataCheckout.expirationDate, dataCheckout.expirationYears);
        await registerInstance.delete();
    });

    test("Register before Checkout", async () => {
        await registerInstance.navigateToLoginPage();
        await registerInstance.sign(dataUser.user.name);
        await registerInstance.createAccount(
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
        );
        await CheckoutInstance.addProduct();
        await CartInstance.navigateToCartPage();
        await page.getByText(selectorCheckout.proceedToCheckout).click();
        await CheckoutInstance.VerifyAdressDetails();
        await CheckoutInstance.ReviewOrderProducts();
        await CheckoutInstance.verifyPriceQuantityTotal();
        await CheckoutInstance.commentTextArea();
        await CheckoutInstance.paymentDetails(
            dataCheckout.nameInput, dataCheckout.card_numberInput, dataCheckout.CVC,
            dataCheckout.expirationDate, dataCheckout.expirationYears);
        await registerInstance.delete();


    });
    test("Login before Checkout", async () => {
        await registerInstance.navigateToLoginPage();
        await loginInstance.login(dataUser.correctDataUSer.emailLogin,
            dataUser.correctDataUSer.passwordLogin,
            dataUser.correctDataUSer.namelogin);
        await CheckoutInstance.addProduct();
        await CartInstance.navigateToCartPage();
        await page.getByText(selectorCheckout.proceedToCheckout).click();
        await CheckoutInstance.VerifyAdressDetails();
        await CheckoutInstance.ReviewOrderProducts();
        await CheckoutInstance.verifyPriceQuantityTotal();
        await CheckoutInstance.commentTextArea();
        await CheckoutInstance.paymentDetails(
            dataCheckout.nameInput, dataCheckout.card_numberInput, dataCheckout.CVC,
            dataCheckout.expirationDate, dataCheckout.expirationYears);
        await loginInstance.logout()
    })
})