import React from 'react';

import { Link } from 'react-router-dom';
import Text from './Text';

export default function BrandName(props) {
  return (
    <Text.Link {...props}>
      <Link to="/">
        <Text.Brand className="flex items-center">newco</Text.Brand>
      </Link>
    </Text.Link>
  );
}
