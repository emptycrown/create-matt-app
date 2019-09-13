import React from 'react';

import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <div className="text-red-500">Hello world!</div>
      <div>
        <Link to="/signup">Click here to signup</Link> (works if not already
        logged in)
      </div>
      <div>
        <Link to="/life">Click here to play life</Link>
      </div>
    </div>
  );
}
