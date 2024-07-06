const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://www.hadithapi.com/public/api/hadiths';

const getRandomHadith = async () => {
  try {
    const response = await axios.get(
      `${API_URL}?apiKey=${process.env.HADIDTH_API_KEY}&page=1`
    );
    const { total, per_page, data: firstPageData } = response.data.hadiths;

    const totalPages = Math.ceil(total / per_page);
    let randomHadith = null;

    while (
      !randomHadith ||
      !randomHadith.hadithEnglish ||
      !randomHadith.englishNarrator
    ) {
      const randomPage = Math.floor(Math.random() * totalPages) + 1;
      let hadithsData = firstPageData;

      if (randomPage !== 1) {
        const randomPageResponse = await axios.get(
          `${API_URL}?apiKey=${process.env.HADIDTH_API_KEY}&page=${randomPage}`
        );
        hadithsData = randomPageResponse.data.hadiths.data;
      }

      const randomIndex = Math.floor(Math.random() * hadithsData.length);
      randomHadith = hadithsData[randomIndex];
    }

    const hadith = `
      Hadith No: ${randomHadith.hadithNumber}.
      Book: ${randomHadith.book.bookName} written by ${randomHadith.book.writerName}.
      Volume: ${randomHadith.volume}.
      Chapter: ${randomHadith.chapter.chapterNumber} - ${randomHadith.chapter.chapterEnglish}
      Status: ${randomHadith.status}.
      ------------------------------
      ${randomHadith.englishNarrator}
      ${randomHadith.hadithEnglish}

      Hope you have a wonderful day. May Allah bless you.
    `;

    return hadith.trim();
  } catch (error) {
    console.error('Error fetching hadith:', error?.response?.data);
    throw error;
  }
};

module.exports = getRandomHadith;
