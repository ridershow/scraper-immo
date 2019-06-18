const puppeteer = require('puppeteer');

let db;

// Set up scraper parameter
(async () => {

  //launch Puppeteer
  const browser = await puppeteer.launch({
    headless: false, // default is true
    defaultViewport: {
        width: 1100,
        height: 800
    },
    slowMo: 250 // slow down by 250ms
  });

  const page = await browser.newPage(); //Create a new page
  await page.goto('https://www.avendrealouer.fr/recherche.html?pageIndex=1&pageSize=25&sortPropertyName=Price&sortDirection=Ascending&searchTypeID=2&typeGroupCategoryID=6&transactionId=2&localityIds=101-30914&typeGroupIds=47,48,56&minimumPrice=200&maximumPrice=1200&hashSearch=null_null_null_null_1200_null_null_200_null_False__null_2_6_False_False______101-30914_____47,48,56_&UserSorted=true');
  await page.screenshot({path: 'test.png'}); //test screenshot

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log("dimensions:", dimensions)

  let avalAds = [];
  // Select the hrefs from the desired webpage
  let getAdsurl = await page.evaluate((sel) => {
    return Array.from(document.getElementsByClassName(sel)).map(node => node.href);
  }, 'picCtnr linkToFd');

    console.log('getAdsurl:', getAdsurl)

  await browser.close();
})();


