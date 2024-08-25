import { AI_PROMPT, SelectBudgetOption } from "@/constants/options";
import { SelectTravelList } from "@/constants/options";
import Autocomplete from "./AutoComplete";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";


// create trip
const CreateTrip = () => {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // it is used to handle Data from create trip form
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      console.log("please enter less than 5");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // user can login using google
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // used to generate trip when user click generate button
  const onGenerateTrip = async () => {
    // check user login nor not
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // check user filled or not form field
    if ((formData?.noOfDays > 5 && !formData?.location) ||!formData?.budget || !formData?.traveler) {
      toast("Please fill the details");
      return;
    }

    setLoading(true);

    // generate AI prompt based on user input
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("final prompt : "+FINAL_PROMPT);

    // send th user prompt into gemini ai for creating trip details
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const TripData = result?.response?.text();
    console.log("result of prompt : "+result?.response?.text());

    setLoading(false);

    // used to save given Trip Data
    SaveAiTrip(TripData);
  };

  //Save Trip into firebase
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    // create a specific id
    const docId = Date.now().toString();
    try {
      // save data in firebase
      const tripData = JSON.parse(TripData);
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripData,
        userEmail: user?.email,
        id: docId,
      });
    } catch (error) {
      console.log('error'+error);
    }

    setLoading(false);
    navigate('/view-trip/'+docId)
  };


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>

          <Autocomplete handleInputChange={handleInputChange} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            style={{
              border: "1px solid #ccc",
              padding: "7px 10px",
              width: "100%",
              borderRadius: "5px",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg
                 ${
                   formData?.budget === item.title && "shadow-lg border-black"
                 } `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg
                    ${
                      formData?.traveler === item.people &&
                      "shadow-lg border-black"
                    } `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <div className="my-10 flex justify-end">
            <Button disabled={loading} onClick={onGenerateTrip}>
              {loading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>

          <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/logo.svg" alt="" />
                  <h2 className="font-bold text-lg mt-7">
                    Sign In With Google
                  </h2>
                  <p className="">
                    Sign in to the App with Google authentication securely
                  </p>
                  <Button
                    className="w-full mt-5 flex gap-4 -items-center"
                    onClick={login}
                  >
                    <FcGoogle className="h-7 w-7" />
                    Sign In With Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
