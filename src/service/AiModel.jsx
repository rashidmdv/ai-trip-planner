

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };


   export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate travel plan for Location : {location}, for {totalDays} days for {traveler} with a {budget} budget, give me a hotels options list with HotelName.Hotel address,price ,hotel image url, geo coordinates,rating ,descriptions and suggest itinerary with placename,place details ,place image url, geo coordinates ,ticket pricing ,time to travel each of the location for {totalDays} days with each day plan with best time to visit in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Las Vegas\",\n  \"duration\": 3,\n  \"budget\": \"cheap\",\n  \"travelers\": \"couple\",\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$$\",\n      \"image_url\": \"https://www.thelinq.com/media/images/hotel-exterior-day-2.jpg\",\n      \"geo_coordinates\": [36.1699, -115.1398],\n      \"rating\": 4.0,\n      \"description\": \"A vibrant and affordable hotel in the heart of Fremont Street, known for its lively atmosphere and proximity to attractions.\"\n    },\n    {\n      \"name\": \"Golden Nugget Las Vegas\",\n      \"address\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$$$\",\n      \"image_url\": \"https://www.goldennugget.com/las-vegas/media/images/hotel-exterior.jpg\",\n      \"geo_coordinates\": [36.1698, -115.1405],\n      \"rating\": 4.5,\n      \"description\": \"A luxurious hotel with a classic casino feel, featuring a shark tank, a variety of dining options, and a lively nightlife.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$$\",\n      \"image_url\": \"https://www.circuscircus.com/media/images/hotel-exterior-day.jpg\",\n      \"geo_coordinates\": [36.1116, -115.1720],\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a carnival theme, known for its affordable rates, circus acts, and amusement park.\"\n    },\n    {\n      \"name\": \"The Orleans Hotel & Casino\",\n      \"address\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"$$\",\n      \"image_url\": \"https://www.orleanscasino.com/media/images/hotel-exterior-day.jpg\",\n      \"geo_coordinates\": [36.0918, -115.2170],\n      \"rating\": 4.0,\n      \"description\": \"A comfortable hotel with a relaxed atmosphere, offering a wide range of amenities, including a golf course and multiple dining options.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"time\": \"Morning\",\n      \"place\": \"Fremont Street Experience\",\n      \"details\": \"A pedestrian-only street with a vibrant atmosphere, featuring street performers, live music, and the iconic Fremont Street canopy.\" ,\n      \"image_url\": \"https://www.fremontstreetexperience.com/media/images/fremont-street-experience-day.jpg\",\n      \"geo_coordinates\": [36.1699, -115.1398],\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"2-3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Afternoon\",\n      \"place\": \"The Neon Museum\",\n      \"details\": \"A museum dedicated to preserving the iconic neon signs of Las Vegas, showcasing a collection of vintage signs and offering nighttime tours.\" ,\n      \"image_url\": \"https://www.neonmuseum.org/media/images/neon-museum-night.jpg\",\n      \"geo_coordinates\": [36.1710, -115.1488],\n      \"ticket_pricing\": \"$25\",\n      \"time_to_travel\": \"1-2 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Evening\",\n      \"place\": \"Heart Bar at the Cosmopolitan\",\n      \"details\": \"A rooftop bar offering stunning views of the Las Vegas Strip, known for its signature cocktails and lively atmosphere.\" ,\n      \"image_url\": \"https://www.cosmopolitanlasvegas.com/media/images/heart-bar-night.jpg\",\n      \"geo_coordinates\": [36.1104, -115.1718],\n      \"ticket_pricing\": \"No entry fee, drinks are priced accordingly\",\n      \"time_to_travel\": \"2-3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Morning\",\n      \"place\": \"Red Rock Canyon National Conservation Area\",\n      \"details\": \"A scenic desert landscape featuring towering red rock formations, hiking trails, and opportunities for rock climbing.\" ,\n      \"image_url\": \"https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-landscape.jpg\",\n      \"geo_coordinates\": [36.1881, -115.2512],\n      \"ticket_pricing\": \"$15 per vehicle\",\n      \"time_to_travel\": \"3-4 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Afternoon\",\n      \"place\": \"The LINQ Promenade\",\n      \"details\": \"A pedestrian-friendly street with a variety of shops, restaurants, and attractions, featuring the High Roller observation wheel.\" ,\n      \"image_url\": \"https://www.thelinq.com/media/images/linq-promenade-day.jpg\",\n      \"geo_coordinates\": [36.1151, -115.1715],\n      \"ticket_pricing\": \"Free to enter, attractions have separate pricing\",\n      \"time_to_travel\": \"2-3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Evening\",\n      \"place\": \"The Venetian and The Palazzo\",\n      \"details\": \"Luxurious resorts featuring a replica of Venice, Italy, with gondolas, canals, and a variety of dining and entertainment options.\" ,\n      \"image_url\": \"https://www.venetian.com/media/images/venetian-and-palazzo-night.jpg\",\n      \"geo_coordinates\": [36.1205, -115.1704],\n      \"ticket_pricing\": \"Free to enter, attractions have separate pricing\",\n      \"time_to_travel\": \"2-3 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Morning\",\n      \"place\": \"Bellagio Conservatory & Botanical Garden\",\n      \"details\": \"A stunning indoor garden featuring elaborate floral displays, changing seasonally, and showcasing horticultural artistry.\" ,\n      \"image_url\": \"https://www.bellagio.com/media/images/conservatory-and-botanical-garden-spring.jpg\",\n      \"geo_coordinates\": [36.1114, -115.1746],\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"1-2 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Afternoon\",\n      \"place\": \"The Strip\",\n      \"details\": \"The iconic stretch of Las Vegas Boulevard featuring numerous hotels, casinos, and entertainment venues.\" ,\n      \"image_url\": \"https://www.visitlasvegas.com/media/images/las-vegas-strip-day.jpg\",\n      \"geo_coordinates\": [36.1151, -115.1715],\n      \"ticket_pricing\": \"Free to walk, attractions have separate pricing\",\n      \"time_to_travel\": \"3-4 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Evening\",\n      \"place\": \"A free show on the Strip\",\n      \"details\": \"Many hotels offer free shows on the Strip, including fountain shows, concerts, and acrobatics.\" ,\n      \"image_url\": \"https://www.bellagio.com/media/images/bellagio-fountain-show-night.jpg\",\n      \"geo_coordinates\": [36.1114, -115.1746],\n      \"ticket_pricing\": \"Free\",\n      \"time_to_travel\": \"1-2 hours\"\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be customized based on your interests and preferences.\n* Prices are approximate and may vary depending on the time of year and availability.\n* It's recommended to book hotels and attractions in advance, especially if traveling during peak season.\n* Consider purchasing a Las Vegas discount pass for access to multiple attractions at a reduced price. \n* For the best deals on cheap food, look for off-strip restaurants or take advantage of happy hour specials.\n\n**Enjoy your trip to Las Vegas!**"},
          ],
        },
      ],
    });

    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());


