// npm install axios   (redaxios in browser is smaller)
const axios = require("axios");

(async () => {
  const params = new URLSearchParams();
  params.append("APIKey", "1234");
  params.append("Query", "select sysdate from dual");

  let res = await axios.post("http://127.0.0.1:8000", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(res.status);
  console.log(res.headers);
  console.log(res.data);
})();
