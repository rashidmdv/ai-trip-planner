import HotelCardItem from "./HotelCardItem";

// eslint-disable-next-line react/prop-types
const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {
          // eslint-disable-next-line react/prop-types
          trip?.tripData?.hotels?.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))
        }
      </div>
    </div>
  );
};

export default Hotels;
