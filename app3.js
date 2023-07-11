// npm install axios http-proxy-agent https-proxy-agent
const axios = require("axios");
const { HttpProxyAgent } = require("http-proxy-agent");
const { HttpsProxyAgent } = require("https-proxy-agent");

const url = "https://webservice.premierpluss.com/loteries/results";
const proxy = "http://d47967d65001dd23e948f4a9945840b6938492b0:@proxy.zenrows.com:8001";
const httpAgent = new HttpProxyAgent(proxy);
const httpsAgent = new HttpsProxyAgent(proxy);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

axios({
  url,
  httpAgent,
  httpsAgent,
  method: "GET",
})
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));
