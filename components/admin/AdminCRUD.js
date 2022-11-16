
import React from "react";

export const EntryCreate = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        fetch("/api/foodEntry", {
          method: "POST",
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(user);
          })
          .catch((error) => {
            reject(new Error("Error while saving data: Field cannot be empty"));
          });
      }),

    []
  );
};

export const entryUpdate = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        fetch("/api/updateList", {
          method: "PUT",
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(user);
          })
          .catch((error) => {
            reject(new Error("Error while saving data: Field cannot be empty"));
          });
      }),
    []
  );
};

export const entryDelete = async (id) => {
  try {
    await fetch("/api/foodEntry", {
      method: "PUT",
      body: JSON.stringify(id),
    });
  } catch (e) {
  }
};

export const schemaObject = {
  emailSchema:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  foodSchema: /(.|\s)*\S(.|\s)*$/,
  calSchema: /^\d*[1-9]+\d*$/,
};