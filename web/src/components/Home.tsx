import { LinkContainer } from 'react-router-bootstrap';

export function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <p className="d-flex justify-content-center mt-4">
          <img src="/icon.svg" style={{width: '100px', height: '100px'}} />
          </p>
          <h1 className="display-4 text-center mb-4">Crypto Wallet Checker</h1>
          <p className="lead">Welcome to the Crypto Wallet Checker! With this tool, you can easily check the balance and
            transaction history of your Ethereum wallet.</p>
          <p>Simply sign-up and enter your wallets addresses:</p>
          <div className="input-group mb-5 d-flex justify-content-center">
            <LinkContainer to="/sign-in"><button className="btn btn-outline-primary" type="button" id="check-button">Sign In</button></LinkContainer>
            <LinkContainer to="/sign-up"><button className="btn btn-primary" type="button" id="check-button">Sign Up</button></LinkContainer>
          </div>

          <h3 className="mb-3">Why Choose Crypto Wallet Checker?</h3>
          <ul className="list-group mb-3">
            <li className="list-group-item">Safe and Secure: Your wallet information is encrypted and stored securely,
              ensuring the safety of your funds.</li>
            <li className="list-group-item">Fast and Reliable: Our platform is built for speed, allowing you to quickly
              retrieve wallet information without delays.</li>
            <li className="list-group-item">100% Availability: Our service is available 24/7, ensuring that you can access
              your wallet information whenever you need it.</li>
            <li className="list-group-item">User-Friendly Interface: Our intuitive interface makes it easy for users of all
              levels to check their wallet balance and transaction history.</li>
            <li className="list-group-item">And coming soon Real-Time Updates: Get instant updates on the latest transactions and balance
              changes in your Ethereum wallet.</li>
          </ul>

          <div className="input-group mb-3 d-flex justify-content-center">
            <LinkContainer to="/sign-in"><button className="btn btn-outline-primary" type="button" id="check-button">Sign In</button></LinkContainer>
            <LinkContainer to="/sign-up"><button className="btn btn-primary" type="button" id="check-button">Sign Up</button></LinkContainer>
          </div>

          <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 mt-4 mb-5 border-top">
            <a href="https://github.com/betula/resume/blob/master/README.md">
              Slava Bereza CV
            </a>
          </footer>

        </div>
      </div>
    </div>
  );
}
