import { useEffect } from 'react';
import './App.css';
import { useWombatVariant, setFavicons, wombatAsset } from './wombat';

// TODO: replace with the published Chrome Web Store listing URL once live.
const CHROME_STORE_URL = 'https://chromewebstore.google.com/';
const REPO_URL = 'https://github.com/Wombat-Socks/Wombat-Socks.github.io';
// Where "Share feedback" points. GitHub issues is the project's existing channel
// (see privacy.html); swap this one line for a Google Form / mailto if preferred.
const FEEDBACK_URL = `${REPO_URL}/issues/new?title=${encodeURIComponent('Feedback: ')}`;

function NavBar({ variant }: { variant: number }) {
  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <img
          className="brand-mark"
          src={wombatAsset(variant, 'android-chrome-192x192.png')}
          alt=""
          aria-hidden="true"
        />
        <span className="brand-text">Wombat Socks</span>
      </a>
      <div className="nav-right">
        <nav className="nav-links">
          <a href="#how">How it works</a>
        </nav>
        <a
          className="btn btn-primary nav-cta"
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add Extension to Chrome
        </a>
      </div>
    </header>
  );
}

const STEPS = [
  {
    title: 'Paste links to recipes or add your ingredient list',
    body: 'You can paste multiple recipes separated by commas, or just put the full recipe list with measurements.',
  },
  {
    title: 'We find them at the market',
    body: 'Each ingredient is matched to a Queen Vic Market product, with its price and vendor. You can set your preferences to be find the cheapest produce and prioritise by your favourite traders.',
  },
  {
    title: 'Review & add to cart',
    body: 'Keep, swap or remove each item, then add everything to your QVM cart in one click. It works whether you are signed in or not!',
  },
];

function App() {
  const variant = useWombatVariant();

  // Keep the browser-tab favicon in sync with the current wombat variant.
  useEffect(() => {
    setFavicons(variant);
  }, [variant]);

  return (
    <div className="App" id="top">
      <NavBar variant={variant} />

      <main>
        <section className="hero">
          <p className="hero-eyebrow">Chrome extension</p>
          <h1 className="hero-title">Recipe → Queen Victoria Market cart</h1>
          <p className="hero-lede">
            Wombat Socks processes your recipe links and ingredient list, picks produce from your fav {' '}
            <a href="https://qvm.com.au/shop/" target="_blank" rel="noopener noreferrer">
              Queen Victoria Market
            </a>{' '}
            traders and gets it ready for review & check out, in minutes!
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
              Add Extension to Chrome
            </a>
            <a className="btn btn-ghost" href="#how">
              See how it works
            </a>
          </div>
          <p className="hero-note">
            no need to be signed in · toggle for cheapest option · prioritise favourite traders
          </p>
        </section>

        <section className="how" id="how">
          <h2 className="section-title">How it works</h2>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li className="step" key={step.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="feedback" id="feedback">
          <h2 className="section-title">Feedback &amp; ideas</h2>
          <p className="feedback-lede">
            Found a bug, an ingredient that didn't match, or have a feature idea? We'd love to
            hear it!
          </p>
          <div className="feedback-actions">
            <a className="btn btn-primary" href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
              Share feedback
            </a>
            <a className="btn btn-ghost" href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
              Browse open issues
            </a>
          </div>
        </section>

        <section className="cta-band">
          <h2>Ready for some fresh produce?</h2>
          <a className="btn btn-primary big" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            Add Extension to Chrome
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <nav className="footer-links" aria-label="Site map">
          <a href="#how">How it works</a>
          <a href="#feedback">Feedback</a>
          <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            Add Extension to Chrome
          </a>
          <a href="/privacy.html">Privacy</a>
        </nav>
        <p className="copyright">
          <img
            className="footer-logo"
            src={wombatAsset(variant, 'android-chrome-192x192.png')}
            alt=""
            aria-hidden="true"
          />
          Wombat Socks™
        </p>
        <a className="footer-repo" href={REPO_URL} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
