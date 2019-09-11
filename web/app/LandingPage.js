import React from 'react';

import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <div className="text-red-500">Hello world!</div>
      <div>
        Click <Link to="/signup">here</Link> to signup
      </div>
    </div>
  );
}
