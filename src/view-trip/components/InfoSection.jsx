/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";

const InfoSection = ({ trip }) => {
  const [imageURL, setImageURL] = useState();

  const fetchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: trip?.userSelection?.location,
          orientation: "landscape",
          count: 5, // fetch 5 images
        },
        headers: {
          Authorization: "Client-ID S1kcj72TWeA5_6U5hN8Cki-qlfbDW114hwMd9Ikig60",
        },
      }
    );
    console.log('info section : '+response.data.results[0].urls);
    setImageURL(response.data.results[1].urls.full)
  };


  useEffect(() => {
    trip&&fetchImages();
    console.log("img : "+imageURL);
  }, [trip]);

  return (
    <div>
      <img src={imageURL?imageURL:"/about-bg.jpg"} alt="ab"
      className="h-[500px] w-full object-fill rounded-xl"
        />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No of Traveler : {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
