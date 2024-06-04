import puppeteer from 'puppeteer';
import fs from "fs"
import path from "path"
import os from "os"

(async () => {
  const desktopPath = path.join(os.homedir(), 'Desktop')
  const filePath = path.join(desktopPath, 'output.txt')
  //   fs.writeFile(filePath, "test", 'utf8', (err) => {
  //     if (err) {
  //         console.error('Error writing to file:', err);
  //         return;
  //     }
  //     console.log('File has been written successfully on the Desktop.');
  // })

  // Đọc nội dung của tệp example.txt
  const listAcc = [
    {
      // email: "0385598756",
    },
    {
      // email: "0385598756",
    }
  ]
  for (let acc of listAcc) {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/');
    await page.setViewport({ width: 1080, height: 600 });
    try {
      // await page.$eval('input[name=email]', el => el.value = acc.email)
      // await page.$eval('input[name=pass]', el => el.value = acc.pass)
      await page.click("input[name=email]")
      await page.keyboard.sendCharacter(acc.email)
      await page.click("input[name=pass]")
      await page.keyboard.sendCharacter(acc.pass)
    }
    catch (e) { }
    await page.click("button[name=login]")
    setTimeout(async () => {
      let listUrl
      (async () => {
        await new Promise(r => {
          fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
            listUrl = data.trim().split('\n');
          });
          setTimeout(r, 5000)
        })
        if (!listUrl) return
        for (let item of listUrl) {
          await page.goto(item, { waitUntil: "networkidle2" });
          await page.click(".x1uvtmcs")
          await page.click("div[data-lexical-editor=true]")
          // await page.keyboard.sendCharacter("hay qua")
          // await page.click(".x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.x1qughib.x6s0dn4.xozqiw3.x1q0g3np.xcud41i.x139jcc6.x4cne27.xifccgj")
          await new Promise(r => setTimeout(r, 5000));
        }
      })()
    }, 5000)
    await new Promise(r => setTimeout(r, 30000));
    await page.close()
  }
})();