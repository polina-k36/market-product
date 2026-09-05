import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "109848509617-ep381krnslskil2fpjue3o11ui27m2do.apps.googleusercontent.com",
      callback: (response) => {
        console.log(response);
      },
    });

    const button = document.getElementById("google-btn");

    if (button) {
      google.accounts.id.renderButton(button, {
        type: "standard",
        theme: "outline",
        size: "large",
      });
    }
  });
  console.log(window.location.origin);
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Начнем</h1>
          <p>Войдите в систему используя простой способ!!</p>
        </div>
        <div id="google-btn"></div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
