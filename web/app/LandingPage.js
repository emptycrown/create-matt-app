import React from 'react';

import { Footer, Header, Text } from '~/components';

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center">
        <Text.Heading>Landing page</Text.Heading>
      </div>
      <Footer />
    </div>
  );
}
