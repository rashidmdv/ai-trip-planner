/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const HotelCardItem = ({ hotel }) => {
  const [imageURL, setImageURL] = useState();

  const fetchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: hotel?.name,
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
    hotel&&fetchImages();
  }, [hotel]);

  return (
    <Link to={"https://www.google.com/maps/search/" + hotel?.name + "," + hotel?.address }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={imageURL?imageURL:"/about-bg.jpg"} alt="" className="rounded-xl h-[200px] w-full" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="font-medium">⭐ {hotel?.rating} Stars</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
