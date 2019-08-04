const axios = require("axios");
const uuidv4 = require("uuid/v4");
require("dotenv").config();

class Welsh {
  constructor(message) {
    this.message = message;
  }
  doIt() {
    axios
      .post(
        "https://api.cognitive.microsofttranslator.com/translate",
        [
          {
            Text: this.message
          }
        ],
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.TOKEN,
            "Content-type": "application/json",
            "X-ClientTraceId": uuidv4().toString()
          },
          params: {
            json: true,
            "api-version": "3.0",
            to: "cy"
          }
        }
      )
      .then(function(response) {
        const { data } = response; // ?
        console.log(data[0].translations[0].text);
        return data; // ?
      })
      .catch(function(error) {
        console.log(error);
      });
    // request(options, function(err, res, body) {
    //     this.message = JSON.stringify(body, null, 4);
    // });
  }
}

const Translator = new Welsh("hello there world");

Translator.doIt();
