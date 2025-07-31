import puppeteer from 'puppeteer';
import fs from 'fs';

const input_Email = 'breakingglassnoodles@gmail.com';
const input_Passwd='DiDitDehasheD1?';
const input_query='org.kh';
const n_count=50;

const run = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  // Go to login page
  await page.goto('https://app.dehashed.com/login');
  //await page.waitForNavigation();

  // Login
  await page.waitForSelector('input[type="email"]', { timeout: 5000 });
  await page.type('input[type="email"]', input_Email);
  await page.waitForSelector('input[type="password"]', { timeout: 5000 });
  await page.type('input[type="password"]', input_Passwd);
  await page.click('button.button-default.full-width');
  await page.waitForNavigation();



  //Click Domain Search
  await page.click('button.tab-button.active');

  // Navigate to search
  //await page.goto('https://app.dehashed.com/search', { waitUntil: 'networkidle0' });
  await page.type('input[type="text"]', input_query);

  // Click the search button
  await page.evaluate(() => {
    document.querySelector('button.search-button.desktop.flat-left')?.click();
  });
  
  
  //Click Downlaod
  await page.waitForSelector('button.csv-button', { visible: true });
await page.click('button.csv-button');
  
  
  
 
  
  
  
  
  //Download
for (let i = 2; i <= 30; i++) {
  const previousContent = await page.content();

  const clicked = await page.evaluate((pageNumber) => {
    const buttons = Array.from(document.querySelectorAll('.paginator-button'));
    const targetButton = buttons.find(btn => btn.textContent.trim() === String(pageNumber));
    if (targetButton) {
      targetButton.click();
      return true;
    }
    return false;
  }, i);

  if (clicked) {
    try {
      await page.waitForFunction(
        (oldContent) => document.body.innerHTML !== oldContent,
        {},
        previousContent
      );
       //Click Downlaod
  await page.waitForSelector('button.csv-button', { visible: true });
await page.click('button.csv-button');
      console.log(`โหลดหน้า ${i} สำเร็จ`);
    } catch (e) {
      console.warn(`รอหน้า ${i} ไม่สำเร็จ`);
    }
  } else {
    console.warn(`ไม่พบปุ่มหน้าที่ ${i}`);
    break;
  }
}





  

};

run();
