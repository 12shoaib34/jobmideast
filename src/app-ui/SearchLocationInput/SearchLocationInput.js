import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function SearchLocationInput({
  placeholder,
  onSelect,
  companyLocationAddress,
  setCompanyLocationAddress,
}) {
  const [query, setQuery] = useState("");
  // const [inputTextValue, setInputTextValue] = useState(inputValue);
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    const apiKey =
      process.env.GOOGLE_API_KEY || "AIzaSyBQtLPrSMDHxvUvf5MS0zkhyydMRwnndzQ";

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handleScriptLoad = () => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );
    autoComplete.setFields(["geometry", "formatted_address"]);
    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect();
    });
  };

  const handlePlaceSelect = async () => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    setQuery(query);
    onSelect(addressObject);
  };
  return (
    <input
      autoComplete={"" + Math.random()}
      ref={autoCompleteRef}
      onChange={(event) => {
        setQuery(event.target.value);
        setCompanyLocationAddress(event.target.value);
      }}
      placeholder={placeholder}
      style={{ width: "100%" }}
      value={companyLocationAddress}
    />
  );
}

export default SearchLocationInput;
