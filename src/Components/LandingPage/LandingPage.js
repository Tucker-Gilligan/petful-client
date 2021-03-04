import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <div className="landing__page">
      <p>Welcome to FIFO, where we make the adoption process easy</p>
      <p>
        When you choose to start the adoption process, you will be placed in a
        queue
      </p>
      <p>While you wait, you can see which pets are currently being rescued!</p>
      <p>Don't worry, you'll always be able to see your place in line:) </p>
      <p>Start the adoption process now, and leave with a new furry friend:)</p>
      <Link to="/adopt">
        <button>Start</button>
      </Link>
    </div>
  );
}

export default LandingPage;
