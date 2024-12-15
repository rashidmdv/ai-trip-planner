import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlaceToVisit from "../components/PlaceToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {

    const {tripId}= useParams();
    const [trip,setTrip] =useState([])
    const GetTripData=async()=>{
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("document:",docSnap.data());
            setTrip(docSnap.data())
            return;
        }else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            toast("No trip found")
          }
    }

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
       {/* Information section */}

       <InfoSection trip={trip}/>

       {/* Recommended Hotel */}

       <Hotels trip={trip} />

       {/* Daily Plan */}

       <PlaceToVisit trip={trip} />

       {/* footer */}

       <Footer />
    </div>
  )
}

export default ViewTrip