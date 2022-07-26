import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";
function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                          <div className="menu">
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
            <h2>PANIER</h2>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
