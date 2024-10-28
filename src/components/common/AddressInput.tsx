import React, { useCallback, useRef } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { envConfig } from "@/config/envConfig";
import { TypeAddress } from "@/types/address.type";

type AddressInputProps = {
  placeholder?: string;
  onChange: ({ ...addressData }: TypeAddress) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const AddressInput: React.FC<AddressInputProps> = ({
  placeholder,
  onChange,
  inputValue,
  setInputValue,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    },
    []
  );

  const getAddressComponent = (
    place: google.maps.places.PlaceResult,
    types: string[]
  ) => {
    const component = place?.address_components?.find((comp) =>
      comp.types.some((type) => types.includes(type))
    );
    return component ? component.long_name : "n/a";
  };

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setInputValue(place?.formatted_address || "");

      const addressData: TypeAddress = {
        city: getAddressComponent(place, [
          "locality",
          "administrative_area_level_2",
        ]),
        country: getAddressComponent(place, ["country"]),
        street: getAddressComponent(place, ["route"]),
        complement:
          getAddressComponent(place, ["sublocality", "sublocality_level_1"]) ||
          "",
        latitude: place?.geometry?.location?.lat()
          ? String(place.geometry.location.lat())
          : "",
        longitude: place?.geometry?.location?.lng()
          ? String(place.geometry.location.lng())
          : "",
        number: getAddressComponent(place, ["street_number"]),
        neighborhood: getAddressComponent(place, ["neighborhood", "political"]),
        state: getAddressComponent(place, ["administrative_area_level_1"]),
        weight: 0,
      };

      onChange?.({ ...addressData });
    }
  }, [onChange, setInputValue]);

  return (
    <div className="mt-2 mb-2">
      <LoadScript
        googleMapsApiKey={envConfig.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 rounded-md p-2 mt-2 mb-2 w-full border-gray-500 focus:border-gray-950"
          />
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export default AddressInput;
