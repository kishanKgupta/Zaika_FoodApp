/* In your React components */
import './index.css'; // Make sure to import the CSS file where you included the fonts

function Header() {
  return (
    <div className="header-1">
      <header>
              <h1  className="App-header" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome to Zaika</h1>
              
        {/* <p style={{ fontFamily: 'Roboto, sans-serif' }}>
          Discover the best food recipes and cooking tips.
        </p> */}
        {/* <button style={{ fontFamily: 'Poppins, sans-serif' }}>
          Get Started
        </button> */}
      </header>
      {/* <main>
        <section>
          <h2 style={{ fontFamily: 'Merriweather, serif' }}>Our Top Restaurant </h2>
          <p style={{ fontFamily: 'Lora, serif' }}>
            Try our top recipes curated just for you.
          </p>
        </section>
      </main> */}
    </div>
  );
}

export default Header;
