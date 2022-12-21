import { Box } from "@mui/material";
import InfoAdd from "../components/InfoAdd";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";
import MealDataGridForUser from "../components/MealDataGridForUser";
import UserEntry from "../components/UserEntry";

const fetcher = (url) => axios.get(url).then((response) => response.data);

export default function Home() {
  const { data: session, status } = useSession();
  console.log("=============== SESSION : =============:",session);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <Box>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Login</button>
      </Box>
    );
  }

  return (
    <Box>
      
      <Navbar />
      <Box>
        <p> {session.user.name} </p>
        <button onClick={() => signOut()}>Sign Out</button>
      </Box>
      <UserEntry sessionUser={session.user} />
      
      
    </Box>
  );
}
