import React, { useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";
import "./cityWidget.css";
import cityList from "./CityList";

function CityWidget({ searchWeather, setvisible }) {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50,
    })
  );

  const [searchTerm, setsearchTerm] = useState("");
  const [cityListSorted, setcityListSorted] = useState(
    cityList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  );

  const clickHandler = (index) => {
    searchWeather(cityListSorted[index]["name"]);
    setvisible(false);
  };

  function rowRenderer({ key, index, isScrolling, isVisible, style, parent }) {
    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div
          style={style}
          className="city-list-item"
          onClick={(e) => clickHandler(index)}
        >
          {cityListSorted[index]["name"]} , {cityListSorted[index]["country"]}
        </div>
      </CellMeasurer>
    );
  }

  const filterCities = (text) => {
    setsearchTerm(text);

    setcityListSorted(
      cityList.filter((city) =>
        city.name.toLowerCase().search(text.toLowerCase()) >= 0 ? true : false
      )
    );
  };

  const handleKeypress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="city-widget-bg">
      <form noValidate autoComplete="off">
        <input
          type="text"
          name="search"
          id=""
          className="search"
          placeholder="Search..."
          onChange={(e) => filterCities(e.target.value)}
          onKeyPress={(e) => handleKeypress(e)}
          value={searchTerm}
        />
      </form>
      <div className="city-list">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={cityListSorted.length}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowRenderer={rowRenderer}
              className="city-list-view"
            />
          )}
        </AutoSizer>
      </div>
      <p className="info-text">
        * Same city appears multiple times for different weather stations in the
        same area
      </p>
    </div>
  );
}

export default CityWidget;
