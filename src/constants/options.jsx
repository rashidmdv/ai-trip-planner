export const SelectTravelList =[
    {
        id:1,
        title:'Just Me',
        desc:'A Solo travel in explore',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two Travels in explore',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A Group of fun loving dev',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'⛵',
        people:'5 to 10 people'
    },
]


export const SelectBudgetOption=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💸',
    },
]


export const AI_PROMPT = `Generate travel plan for Location : {location}, for {totalDays} days for {traveler} with a {budget} budget, give me a hotels options list with HotelName.Hotel address,price ,hotel image url, geo coordinates,rating ,descriptions and suggest itinerary with place names ,place details ,place image url, geo coordinates ,ticket pricing ,time to travel each of the location for {totalDays} days with each day plans with best time to visit in json format. Hotel price convert the cash into country and give country cash symbol
i want itinerary format below given:
itinerary = [
   {
     day : The day number of the trip (e.g., Day1, Day2, Day 3).
     plan :[
        {
            geoCoordinates:An array containing two numbers representing the latitude and longitude of the place,
            placeName: The name of the place,
            placeDetails: A short description of the place,
            ticketPrice: The estimated cost of entry or free and convert the cash into country and give country cash symbol.
            time: The time to spend given place(e.g., 9:00 AM - 11:00 AM)
            timeToTravel: The estimated travel time from the previous location (e.g, 30 minutes).
        }
     ]
   }
]`

// export const AI_PROMPT = `Generate a travel plan in JSON format for a {totalDays} day trip to {location} for a {traveler} traveler on a {budget} budget. Include hotel options with details like HotelName, address, price, image URL, geo coordinates, rating, and description. Additionally, suggest an itinerary with details for each day:

// day: The day number of the trip (e.g., 1, 2, 3).
// places: An array of objects representing places to visit on that day. Each place object should include:
// placeName: The name of the place.
// placeDetails: A short description of the place.
// placeImageUrl: A URL for an image of the place.
// geoCoordinates: An array containing two numbers representing the latitude and longitude of the place.
// ticketPrice: The estimated cost of entry (or 0 if free).
// timeToTravel: The estimated travel time from the previous location (in hours).
// bestTimeToVisit: A suggestion for the best time of day to visit the places on that day (e.g., "Morning," "Afternoon," "Evening").`