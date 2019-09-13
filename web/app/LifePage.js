import React, { useState } from 'react';

import { CREATE_NEW_COMPANY, LIFE_PAGE } from './LifePageGql';
import { useLogout, useMe } from '~/lib/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';

function Company({ company }) {
  const { me, loading } = useMe();
  if (loading) return null;
  if (company.ceo?.id === me.id)
    return <div>I am the CEO of {company.name}!</div>;
  else
    return (
      <div>
        {company.ceo?.name} is the CEO of {company.name}
      </div>
    );
}

export default function LifePage() {
  const logout = useLogout();
  const [companyName, setCompanyName] = useState();
  const { data, loading } = useQuery(LIFE_PAGE);
  const [createNewCompany] = useMutation(CREATE_NEW_COMPANY, {
    refetchQueries: ['LifePage'],
    awaitRefetchQueries: true,
  });
  if (loading) return null;

  const { me, companies } = data;

  return (
    <div>
      <div>
        {me.name} ({me.email})
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div className="mt-4">
        Clout: <span className="text-blue-400">{me.clout}</span>
      </div>
      <div>
        Make a new company:{' '}
        <input
          placeholder="New company name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
        <button
          onClick={async () => {
            await createNewCompany({ variables: { name: companyName } });
            setCompanyName('');
          }}
        >
          CLICK TO INCORPORATE
        </button>
      </div>
      <div className="mt-4">
        {companies.map(company => (
          <Company key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
