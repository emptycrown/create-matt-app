import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Text } from '~/components';
import { logout, useMe } from '~/lib/auth';
import BrandName from './BrandName';

function HeaderAuth() {
  const { me, loading } = useMe();
  const [expanded, setExpanded] = useState(false);
  if (loading) return null;

  if (me)
    return expanded ? (
      <div className="flex">
        <Text.Link onClick={() => setExpanded(false)}>back</Text.Link>
        {me.creator ? (
          <Link to="/dashboard">
            <Text.Link className="ml-6">dashboard</Text.Link>
          </Link>
        ) : (
          <Text.Link className="ml-6">request access</Text.Link>
        )}
        <Text.Link className="ml-6" onClick={() => logout()}>
          logout
        </Text.Link>
      </div>
    ) : (
      <Text.Link onClick={() => setExpanded(true)}>Hello</Text.Link>
    );
  else
    return (
      <Link to="/signup">
        <Text.Link>Sign in</Text.Link>
      </Link>
    );
}

export default function Header({ showAuth = true }) {
  return (
    <div>
      <div className="resp-container">
        <div className="flex flex-row justify-between items-center h-20 text-xl font-bold">
          <BrandName />
          {showAuth && <HeaderAuth />}
        </div>
      </div>
    </div>
  );
}
