// const puppeteer = require("puppeteer-core");
// const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer");

let cookies = [
  "ttwid=1%7Cwk9ImDsCBtJgmZ6S2gv3FYCSpjmZ1dsJFMlXLNg-…cc54de4db8dee7ab9b1a81c950ed2afebb22b0847e2c761e1",
  "MONITOR_WEB_ID=f5c8d8ff-6509-417a-aac1-3ad968271c15",
  "s_v_web_id=verify_kq9fllob_ZUhPH5Mf_4onq_4JVO_AMXM_sbbP2sau1paV",
  "passport_csrf_token_default=1bbd00e1e47a754b1435ae7da5e0acbe",
  "passport_csrf_token=1bbd00e1e47a754b1435ae7da5e0acbe",
  "n_mh=CL29uEgCmrcwicnEIDBv-DdCP2Yn0x2l72ezBXgt6MM",
  "sso_uid_tt=630a789620e6df275f47112488bee610",
  "sso_uid_tt_ss=630a789620e6df275f47112488bee610",
  "toutiao_sso_user=b429758898806abf7f70110f2e38ee35",
  "toutiao_sso_user_ss=b429758898806abf7f70110f2e38ee35",
  "odin_tt=f698b50cae648b57e570f21d34e97ebb2a75ec571f…f9636a0371d29bc9c5bbed688a51ea863791817c889be9c4e",
  "passport_auth_status_ss=4e514f67dbe53386429f444a468c539d%2C",
  "sid_guard=aa32353c06cb9c275db408a3a9331cc0%7C16245…8%7C5183999%7CMon%2C+23-Aug-2021+07%3A48%3A07+GMT",
  "uid_tt=cb0b460e65bdc1ee350e44c970366857",
  "uid_tt_ss=cb0b460e65bdc1ee350e44c970366857",
  "sid_tt=aa32353c06cb9c275db408a3a9331cc0",
  "sessionid=aa32353c06cb9c275db408a3a9331cc0",
  "sessionid_ss=aa32353c06cb9c275db408a3a9331cc0",
  "passport_auth_status=4e514f67dbe53386429f444a468c539d%2C",
];

async function getOptions() {
  const options = {
    // args: chrome.args,
    // executablePath: await chrome.executablePath,
    // headless: chrome.headless,
    executablePath: '/usr/bin/firefox'
  };
  return options;
}

async function getPage() {
  const options = await getOptions();
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  return page;
}

async function getVideoList(url) {
  const page = await getPage();
  cookies = cookies
    .filter((item) => item.includes("="))
    .map((item) => {
      let [name, value] = item.split("=");
      return { name, value };
    });
  await page.goto(url);
  await page.setCookie(...cookies);
  return new Promise((resolve) => {
    page.on("response", async function fun(response) {
      if (response.url().includes("/v1/web/channel/feed/")) {
        resolve(await response.json());
        page.off("response", fun);
      }
    });
  });
}

module.exports = async (ctx, next) => {
  const list = await getVideoList("https://www.douyin.com/");
  ctx.body = list;
  await next();
};
