import React from 'react';

import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      Hello world! Click <Link to="/signup">here</Link> to signup
    </div>
  );
}
