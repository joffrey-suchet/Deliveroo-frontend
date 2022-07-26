import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";
function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [counters, setCounters] = useState([]);

  const newCounters = () => {
    const newCounters = [...counters];
    newCounters.push(1);
    setCounters(newCounters);
  };

  const handleClickLess = (indexToCheck) => {
    const newCounters = [...counters];
    newCounters[indexToCheck]--;
    setCounters(newCounters);
  };
  const handleClickMore = (indexToCheck) => {
    const newCounters = [...counters];
    newCounters[indexToCheck]++;
    setCounters(newCounters);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addMenuToBasket = (indexMenu, title, price) => {
    console.log("click is ok");
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <header>
        <div className="container">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </header>
      <div className="restaurant">
        <div>
          <h2>{data.restaurant.name}</h2>
          <p>{data.restaurant.description}</p>
        </div>
        <div>
          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>
      <div className="back">
        <main className="container">
          <div className="rigth-part">
            {data.categories.map((key) => {
              return (
                key.meals.length > 0 && (
                  <div className="categories">
                    <h3>{key.name}</h3>
                    <div className="oneCategorie">
                      {key.meals.map((element) => {
                        return (
                          <div className="menu" onClick={newCounters}>
                            <div>
                              <h4>{element.title}</h4>
                              {element.description && (
                                <p className="description">
                                  {element.description}
                                </p>
                              )}
                              <p className="price">{element.price} €</p>
                              {element.popular === true && (
                                <p style={{ color: "orange" }}>Populaire</p>
                              )}
                            </div>
                            <div>
                              {element.picture && (
                                <img src={element.picture} alt="" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="panier">
            <div>
              <h2>PANIER</h2>
            </div>
            {counters.map((counter, index) => {
              return (
                <div className="basket-menu" key={index}>
                  <button
                    onClick={() => {
                      counter > 0 && handleClickLess(index);
                    }}
                  >
                    -
                  </button>
                  <p>{counters}</p>
                  <button
                    onClick={() => {
                      handleClickMore(index);
                    }}
                  >
                    +
                  </button>
                  {data.categories.map((key) => {
                    return (
                      <div>
                        <p>{key.title}</p>
                        <p>{key.price}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
