/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {

  const [imageURL, setImageURL] = useState();
  const fetchImages = async () => {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: trip?.userSelection?.location,
        orientation: "landscape",
        count: 5, // fetch 5 images
      },
      headers: {
        Authorization: "Client-ID S1kcj72TWeA5_6U5hN8Cki-qlfbDW114hwMd9Ikig60",
      },
    });
    console.log("info section : " + response.data.results[0].urls);
    setImageURL(response.data.results[0].urls.full);
  };

  useEffect(() => {
    trip && fetchImages();
    console.log("img : " + imageURL);
  }, [trip]);

  return (
   <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 transition-all cursor-pointer">
      <img src={imageURL?imageURL:"/about-bg.jpg"} alt="" className="rounded-xl h-[220px] w-full"/>
      <div>
        <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days Trip with{" "}
          {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
   </Link>
  );
};

export default UserTripCardItem;
