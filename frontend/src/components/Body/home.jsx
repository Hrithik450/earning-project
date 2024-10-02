import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import "./home.css";
import Navbar from "../Header/navbar";
import Pricing from "./pricing";
import Board from "../board";
import Reward from "./reward";
import Profile from "./profile";
import Services from "./services";
import Footer from "../Footer/footer";
import { useEffect } from "react";
import { useAuthContext } from "../../store/context/AuthContext";

const Button = styled.button`
  text-decoration: none;
  width: 20rem;
  background-color: rgb(98 84 243);
  color: rgb(255 255 255);
  padding: 1.4rem 2.4rem;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    transform: scale(0.9);
  }
  a {
    text-decoration: none;
    color: rgb(255 255 255);
    font-size: 1.8rem;
  }
`;

function Hero() {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <>
      <Navbar />
      <section className="wrapper" id="Home">
        <div className="Hero-container">
          <div className="gridbox">
            <div className="hero-data">
              <p className="intro">Welcome to</p>
              <p className="company-name">PocketKART</p>
              <p style={{ marginBottom: "0.5rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                dolor quia maxime! Sint quia, ducimus error ipsa minus sapiente
                quae rem. Nulla facere dolore ab molestias. Consequuntur animi
                eligendi omnis minima tempore officia modi quasi.
              </p>
              <a href="#Board">
                <Button>Explore</Button>
              </a>
            </div>
            <div>
              <figure>
                <img src="/hero.png" alt="img" className="img-style" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {user ? user.plan === "NONE" && <Pricing /> : <></>}
      {!isAuthenticated && <Pricing />}
      <Board />
      <Reward />
      <Profile />
      <Services />
      <Footer />
    </>
  );
}

export default Hero;
