/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";

const PlaceCardItem = ({place}) => {

  const [imageURL, setImageURL] = useState()
  const fetchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: place?.placeName,
          orientation: "landscape",
          count: 5, // fetch 5 images
        },
        headers: {
          Authorization: "Client-ID S1kcj72TWeA5_6U5hN8Cki-qlfbDW114hwMd9Ikig60",
        },
      }
    );
    console.log("Hotel card item : "+response.data.results[0].urls);
    setImageURL(response.data.results[0].urls.full)
  };


  useEffect(() => {
    place&&fetchImages();
  }, [place]);

  return (
    <Link to={'https://www.google.com/maps/search/'+place?.placeName} target="_blank">
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md">
        <img src={imageURL?imageURL:"/about-bg.jpg"} alt=""  className="w-[130px] h-[130px] rounded-xl" />
        <div>
            <h2 className="font-bold text-lg">{place?.placeName}</h2>
            <p className="text-sm text-gray-400">{place?.placeDetails}</p>
            <h2 className="mt-2">🕒 {place?.timeToTravel}</h2>
            <h2 className="mt-1">💸 {place?.ticketPrice}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem