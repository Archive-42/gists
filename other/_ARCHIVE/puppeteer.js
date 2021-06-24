"use strict";

const puppeteer = require("puppeteer");
const Push = require("pushover-notifications");

const p = new Push({
  user: "",
  token: "",
});

(async function main() {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const [page] = await browser.pages();

    await page.goto("https://www.razer.com/gb-en/comparisons/blade-15");

    let divselector =
      "#comparison > div > div > div:nth-child(4) > div > div.text-center.col-sm-3.col-xs-6.counter-3.col-hidden > div";

    const cart = await page.$eval(divselector, (el) =>
      el.textContent.trim().substr(0, 17)
    );
    console.log(cart);
    if (cart !== "AVAILABLE IN JULY") {
      p.send({
        message: "text has changed: " + cart, // required
        title: "puppeteer message",
        sound: "magic",
        device: "devicename",
        priority: 1,
      });
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
