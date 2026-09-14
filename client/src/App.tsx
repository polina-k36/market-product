import './App.css';

function App() {
  console.log(window.location.origin);
  return (
    <>
      <section id="center">
        <div className="hero"></div>
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
