
import React from "react";

// export const EntryCreate = () => {
//   return React.useCallback(
//     (user) =>
//       new Promise((resolve, reject) => {
//         fetch("/api/foodEntry", {
//           method: "POST",
//           body: JSON.stringify(user),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("^^^^^^ `````````````````````````````` ^^^^^^^");
//             console.log(data.d);
//             resolve(data.d);
//           })
//           .catch((error) => {
//             reject(new Error("Error while saving data: Field cannot be empty"));
//           });
//       }),

//     []
//   );
// };

// // export const EntryCreate = async (user) => {
// //   try{
// //     await fetch("/api/foodEntry", {
// //       method: "POST",
// //       body: JSON.stringify(user),
// //     })
// //   }catch(error){

// //   }
// // };

// export const entryUpdate = () => {
//   return React.useCallback(
//     (user) =>
//       new Promise((resolve, reject) => {
//         fetch("/api/updateList", {
//           method: "PUT",
//           body: JSON.stringify(user),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             resolve(user);
//           })
//           .catch((error) => {
//             reject(new Error("Error while saving data: Field cannot be empty"));
//           });
//       }),
//     []
//   );
// };




// // export const entryDelete = () => {
// //   return React.useCallback(
// //     (id) =>
// //       new Promise((resolve, reject) => {
// //         fetch("/api/foodEntry", {
// //           method: "PUT",
// //           body: JSON.stringify(id),
// //         })
// //           .then((response) => response.json())
// //           .then((data) => {
// //             // resolve();
// //           })
// //           .catch((error) => {
// //             reject(new Error("Error while saving data: Field cannot be empty"));
// //           });
// //       }),
// //     []
// //   );
// // };

// export const entryDelete = () => {
//   return React.useCallback(
//     async (id) =>
//       {
//         try {
//           await fetch("/api/foodEntry", {
//             method: "PUT",
//             body: JSON.stringify(id),
//           });
//         } catch (e) {
//         }
//       }
//   );
// };

// // export const entryDelete = async (id) => {
//   // try {
//   //   await fetch("/api/foodEntry", {
//   //     method: "PUT",
//   //     body: JSON.stringify(id),
//   //   });
//   // } catch (e) {
//   // }
// // };

export async function mutationAddRows(rows,rowDB){
  console.log( "hiiiiiiiiiiiiiiiiiiiiii");
  console.log(rows);
  console.log(rowDB); 
  const updatedTodo = await fetch("/api/foodEntry", {
    method: "POST",
    body: JSON.stringify(rowDB),
  });
  const addedRow = await updatedTodo.json();
  console.log(" 000000000  in mutation 000000000");

  return [...rows, addedRow];
}


export async function mutateAvgCalorie(){
  const avgRows = await fetch("/api/avgCalorie", {
    method: "GET",
    body: JSON.stringify(),
  });
  const avgRowsNew = await avgRows.json();
  console.log(" 000000000  in mutation 000000000",avgRowsNew);

  return avgRowsNew;
};


export const schemaObject = {
  emailSchema:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  foodSchema: /(.|\s)*\S(.|\s)*$/,
  calSchema: /^\d*[1-9]+\d*$/,
};