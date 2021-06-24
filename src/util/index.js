const crypto = require("crypto");
const iconv = require("iconv-lite");

let getHash = (obj) => {
  if (typeof obj == "object") {
    obj = JSON.stringify(obj);
  }
  var sha1 = crypto.createHash("sha1");
  sha1.update(obj);
  return sha1.digest("hex");
};

let encryptAES = (data, key) => {
  const cipher = crypto.createCipher("aes192", key);
  let crypted = cipher.update(data, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

let decryptAES = (encrypted, key) => {
  const decipher = crypto.createDecipher("aes192", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

let getIp = (req) => {
  let ip = req.headers["x-forwarded-for"];
  if (!ip || ip == "unknown") {
    ip = req.headers["x-real-ip"];
  }
  if (!ip || ip == "unknown") {
    ip = req.headers["proxy-client-ip"];
  }
  if (!ip || ip == "unknown") {
    ip = req.headers["wl-proxy-client-ip"];
  }
  if (!ip || ip == "unknown") {
    ip = req.headers["http_client_ip"];
  }
  if (!ip || ip == "unknown") {
    ip = req.headers["http_x_forwarded_for"];
  }
  if (!ip || ip == "unknown") {
    ip = req.ip;
  }
  let ips = new Map();
  ips.set("x-forwarded-for", req.headers["x-forwarded-for"]);
  ips.set("x-real-ip", req.headers["x-real-ip"]);
  ips.set("proxy-client-ip", req.headers["proxy-client-ip"]);
  ips.set("wl-proxy-client-ip", req.headers["wl-proxy-client-ip"]);
  ips.set("http_client_ip", req.headers["http_client_ip"]);
  ips.set("http_x_forwarded_for", req.headers["http_x_forwarded_for"]);
  ips.set("getRemoteAddr", req.headers["remote_addr"]);
  return ip;
};

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let UTF8ToGBK = (str, encoding) => {
  let from = iconv.encode(str, encoding);
  var rt = "";
  for (var i = 0; i < from.length; i++) {
    var c = from.readUInt8(i);
    if (c > 127) {
      i++;
      var c2 = from.readUInt8(i);
      rt +=
        "%" +
        c.toString(16).toUpperCase() +
        "%" +
        c2.toString(16).toUpperCase();
    } else {
      rt += String.fromCharCode(c);
    }
  }
  return rt;
};

let getProcessEnv = (key) => {
  let value = null;
  if (process.env[key]) {
    value = process.env[key];
  } else {
    let argvs = process.argv.slice(2);
    argvs.forEach((argv) => {
      if (argv.startsWith(key + "=")) {
        value = argv.split("=")[1];
      }
    });
  }
  return value;
};

exports = module.exports = {
  getHash,
  getIp,
  random,
  getProcessEnv,
  UTF8ToGBK,
  encryptAES,
  decryptAES,
};
