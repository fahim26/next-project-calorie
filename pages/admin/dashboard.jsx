
import React from 'react'
import EntryListAdmin from "../../components/admin/EntryListAdmin" 
import { PrismaClient } from "@prisma/client";
import useSWR, { useSWRConfig,SWRConfig } from 'swr';
import { useSession, signIn,signOut } from "next-auth/react";

import TwoWeekReport from '../../components/admin/TwoWeekReport';
import { Box } from '@mui/material';
import TestC from '../../components/TestC';
import WrapperComAdmin from '../../components/admin/WrapperComAdmin';




// export async function getStaticProps () {
//   const prisma = new PrismaClient();
//   const foodEntry = await prisma.FoodEntry.findMany();
//   return {
//     props: { 
//       fallback: {
//         '/api/entryList': foodEntry
//       }
//     }
//   }
// }



export default function dashboard(){
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
    // <SWRConfig value={{ fallback }}>
     <Box>
      <WrapperComAdmin userSession={session.user}/>
    </Box>
      // </SWRConfig>
  );
}




