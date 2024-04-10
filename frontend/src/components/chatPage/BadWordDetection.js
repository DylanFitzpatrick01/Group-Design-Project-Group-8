import axios from 'axios';
import {waitForElementToBeRemoved} from "@testing-library/react";

async function checkAndReplaceBadWords(text) {
  const options = {
    method: 'POST',
    url: 'https://profanity-cleaner-bad-word-filter.p.rapidapi.com/profanity',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST
    },
    data: {
      text: text,
      maskCharacter: '*',
      language: 'en'
  }
};

try {
    console.log(process.env.REACT_APP_RAPIDAPI_KEY);
      const response = await axios.request(options);
      console.log(response.data);
      return response.data["clean"]
  } catch (error) {
      console.error(error);
  }
}


export { checkAndReplaceBadWords };

