import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { envConfig } from "@/config/envConfig";
import { TypeAddressMarkers } from "@/types/address.type";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type MarkerListProp = {
  addressListData: TypeAddressMarkers[];
};

const Map: React.FC<MarkerListProp> = ({ addressListData }) => {
  return (
    <div className="mt-2 mb-2">
      <LoadScript
        googleMapsApiKey={envConfig.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            addressListData.length > 0
              ? {
                  lat: Number(addressListData[0].latitude),
                  lng: Number(addressListData[0].longitude),
                }
              : { lat: 0, lng: 0 }
          }
          zoom={2}
        >
          {addressListData.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(marker.latitude),
                lng: Number(marker.longitude),
              }}
              options={{
                label: {
                  text: marker.client?.name || "",
                  className: `border-2 border-gray-950 bg-white rounded-2 p-2 mb-5`,
                },
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
