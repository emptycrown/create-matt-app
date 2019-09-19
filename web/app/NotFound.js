import React from 'react';

import { Button, Footer, Header, Text } from '~/components';
import { Link } from 'react-router-dom';
import { colors } from '~/styles/theme';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center">
        <Text.Heading>This page doesn't exist</Text.Heading>
        <div className="my-6">
          <img src="/static/graphics/404.png" style={{ height: 300 }} />
        </div>
        <Link to="/">
          <div className="mb-16">
            <Button large colorScheme={colors.deepBlue}>
              Back to homepage
            </Button>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
