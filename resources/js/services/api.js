import axios from "axios";
import { Inertia, PageProps } from "@inertiajs/inertia";

const httpPlaces = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
});

export const places = {
  search(key, token) {
    let uri = `${encodeURI(key)}.json`;
    return httpPlaces.get(uri, {
      params: {
        access_token: token,
        cachebuster: "1614266800421",
        autocomplete: true,
        country: "br",
        types: "address",
        language: "pt",
        proximity: "-46.76467682916416,-23.499345647600578",
      },
    });
  },
};
