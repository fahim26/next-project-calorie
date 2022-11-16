import { Box } from "@mui/material";
import InfoAdd from "../components/InfoAdd"
import FoodEntryList from "../components/foodEntryList";
import axios from "axios";
import { useSession, signIn,signOut } from "next-auth/react";
import Navbar from "../components/Navbar";



const fetcher = (url) => axios.get(url).then((response) => response.data);


export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return( 
      <Box>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Login</button> 
      </Box>
    
    
    );
  }
  
 
  return (
    <Box>
      <Navbar />
      <p> {session.user.name} </p>
      <button onClick={()=>signOut()}>Sign Out</button>
      <InfoAdd sessionUser = {session.user} />
      <FoodEntryList/>
    </Box>
  );
}
