
import React from 'react'
import EntryListAdmin from "../../components/admin/EntryListAdmin" 
import { PrismaClient } from "@prisma/client";
import useSWR, { useSWRConfig,SWRConfig } from 'swr';
import { useSession, signIn,signOut } from "next-auth/react";

import TwoWeekReport from '../../components/admin/TwoWeekReport';
import { Box } from '@mui/material';
import TestC from '../../components/TestC';
import WrapperComAdmin from '../../components/admin/WrapperComAdmin';
import { getSession } from "next-auth/react";



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
  // const { data: session, status } = useSession();
  
  console.log("------- ((((((((((( ))))))))))) --------- : ", session);
  // if (status === "loading") {
  //   return <p>Loading...</p>
  // }

  // if (status === "unauthenticated") {
  //   return( 
  //     <Box>
  //       <p>Access Denied</p>
  //       <button onClick={() => signIn()}>Login</button> 
  //     </Box>
    
    
  //   );
  // }


  // const session = await getSession({ req })

  if (session && session.user.role === "admin") {
    return (
      // <SWRConfig value={{ fallback }}>
       <Box>
        <WrapperComAdmin userSession={session.user}/>
      </Box>
        // </SWRConfig>
    );
  } else {
    return( 
      <Box>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Login</button> 
      </Box>
    
    
    );
  }

  

  
}




