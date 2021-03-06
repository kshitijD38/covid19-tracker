import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// function coloryo(casesType) {
//   if (casesType == "cases") {
//     return "#CC1034";
//   } else if (casesType == "recovered") {
//     return "#7dd71d";
//   } else {
//     return "#fb4443";
//   }
// }

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country, index) => (
    <Circle
      key={country.countryInfo.id}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      // color={coloryo}
      fillColor={casesTypeColors[casesType].hex}
      // fillColor={coloryo}
      fillOpacity={0.4}
      radius={
        (Math.sqrt(country[casesType]) *
          casesTypeColors[casesType].multiplier) /
        4
      }
    >
      <Popup>
        <div className="info__container">
          <div
            className="info__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info__name">{country.country}</div>
          <div className="info__confirmed">
            Cases: {numeral(country.cases).format("0.0")}
          </div>
          <div className="info__recovered">
            Recovered: {numeral(country.recovered).format("0.0")}
          </div>
          <div className="info__deaths">
            Deaths: {numeral(country.deaths).format("0.0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
