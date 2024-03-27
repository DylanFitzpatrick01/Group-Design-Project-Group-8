import axios from 'axios';
import {waitForElementToBeRemoved} from "@testing-library/react";

async function checkAndReplaceBadWords(text) {
  const options = {
  method: 'POST',
  url: 'https://profanity-cleaner-bad-word-filter.p.rapidapi.com/profanity',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'b2a89e86a8mshe7a0dc45cace45cp1e308ajsn0a4513169f67',
    'X-RapidAPI-Host': 'profanity-cleaner-bad-word-filter.p.rapidapi.com'
  },
  data: {
    text: text,
    maskCharacter: '*',
    language: 'en'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    return response.data["clean"]
} catch (error) {
	console.error(error);
}
}


export { checkAndReplaceBadWords };

