import React, { useEffect, useState } from "react";

export default function useTextCensor(inputText) {
  const [censoredText, setCensoredText] = useState(inputText);

  const apiKey = "93338a1970msh0f54fddbc4fd56ep1b0f48jsn1fff8695f70d";

  useEffect(() => {
    const censorText = async () => {
      const url =
        "https://community-purgomalum.p.rapidapi.com/json?text=" +
        encodeURIComponent(inputText);
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const result = await response.json();
          setCensoredText(result.result);
        } else {
          console.error("Error:", response.status, await response.text());
          alert("Error:", response.status, await response.text());
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred:", error);
      }
    };

    // Run the effect when inputText changes
    censorText();
  }, [inputText]);
  // console.log(censoredText);

  return censoredText;
}
