require("dotenv").config();
const puppeteer = require('puppeteer');

// cheerio를 가져온다.
const cheerio = require('cheerio');
const connect = require("./schemas/index.js");
const mongoose = require("mongoose");
const Item = require("./schemas/item.js");
const mealkitUrl = "https://www.kurly.com/shop/goods/goods_list.php?category=912"
const bakeryUrl = "https://www.kurly.com/shop/goods/goods_list.php?category=915"
const vegetableUrl = "https://www.kurly.com/shop/goods/goods_list.php?category=907"
const maindishUrl = "https://www.kurly.com/shop/goods/goods_list.php?category=911"


connect();

(async() => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto(maindishUrl);
  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const lists = $("#goodsList > div.list_goods > div > ul > li");
  // 모든 리스트를 순환한다.
  lists.each(async(index, list) => {
    let vegitableLs = []
    // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
    const imgurl = $(list).find("div > div > a > img").attr("src")
    const name = $(list).find("div > a > span.name").text().trim();
    const price = $(list).find("div > a > span.cost > span.price").text();
    const dc = $(list).find("div > a > span.cost > span.dc").text()
    const original = $(list).find("div > a > span.cost > span.original").text();
    const category = "maindish"
    const info = $(list).find("div > a > span.desc").text();
    // 인덱스와 함께 로그를 찍는다.
    // console.log(imgurl)
    // console.log({
    //   index, name, price, category, info
    // });
    let vegetable = {
        itemImg:imgurl,
        itemName:name,
        itemPrice:price,
        itemCategory:category,
        itemInfo:info,
        cartCount:0,
        itemDc : dc,
        itemOriginal: original

    }
    vegitableLs.push(vegetable);
    console.log(vegitableLs)
    await Item.create(vegetable);
    

  });
  // 브라우저를 종료한다.
  browser.close();
})();































// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//       headless:false
//   });
//   const page = await browser.newPage();
//   await page.setViewport({
//     width: 1366,
//     height: 768
//   });
//   await page.goto('https://www.kurly.com/shop/goods/goods_list.php?category=907');
// //   await page.screenshot({ path: 'example.png' });

// //   await browser.close();
// const cheerio = require('cheerio');

// (async() => {
//   //... 생략

//   // 페이지의 HTML을 가져온다.
//   const content = await page.content();
//   // $에 cheerio를 로드한다.
//   const $ = cheerio.load(content);
//   // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
//   const lists = $(".list > li");
//   // 모든 리스트를 순환한다.
//   lists.each((index, list) => {
//     console.log(index);
//   });
//   // 브라우저를 종료한다.
//   browser.close();
// })();
  
  
  
  
  
  
  
  
  
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
//   const n = await page.$("#txt")
//   const t = await (await n.getProperty('textContent')).jsonValue()
//   const imgSelector = await page.$(".list > li > .thumb > .img")
//   console.log(imgSelector)
//   const imgContent = await (await imgSelector.getProperty('textContent')).jsonValue()
//   console.log(imgContent)
//   const lists = $(".list > li");
//   // 모든 리스트를 순환한다.



//   lists.each(async(index, list) => {
//     const imgSelector = await page.$(".thumb > .img")
//     console.log(imgSelector)
//     // const imgContent = await (await imgSelector.getProperty('textContent')).jsonValue()
//     // console.log(imgContent)
//     console.log(index);
//   });
// //   브라우저를 종료한다.
//   browser.close();  
// })();
// })();

// const cheerio = require('cheerio');

// (async() => {
//   //... 생략

//   // 페이지의 HTML을 가져온다.
//   const content = await page.content();
//   // $에 cheerio를 로드한다.
//   const $ = cheerio.load(content);
//   // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
//   const lists = $(".list > li");
//   // 모든 리스트를 순환한다.
//   lists.each((index, list) => {
//     console.log(index);
//   });
//   // 브라우저를 종료한다.
//   browser.close();
// })();