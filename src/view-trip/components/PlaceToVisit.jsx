import PlaceCardItem from "./PlaceCardItem"

// eslint-disable-next-line react/prop-types
const PlaceToVisit = ({trip}) => {
  return (
    <div>
       <h2 className="font-bold text-xl mt-5">Places to Visit</h2>

       <div>
        {
          // eslint-disable-next-line react/prop-types
          trip?.tripData?.itinerary?.map((item,index)=>(
              <div key={index} className="mt-5">
                <h2 className="font-bold text-lg">{item.day}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                {
                  item?.plan?.map((place,index)=>(
                    <div key={index} className="my-1">
                      <h2 className="font-medium text-sm text-orange-600">{place?.time}</h2>
                      <PlaceCardItem  place={place} />
                    </div>
                  ))
                }
                </div>
              </div>
          ))
        }
       </div>
    </div>
  )
}

export default PlaceToVisit