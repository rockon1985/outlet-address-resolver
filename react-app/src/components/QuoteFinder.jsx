import React, { useState } from 'react';
import { getOutlet } from '../graphql/queries/outlet';
import { useLazyQuery } from 'react-apollo'

const OutletFinder = ({ ratingPoints, initialRating }) => {
  const [address, setAddress] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [fetchOutlet, { called, loading, data }] = useLazyQuery(getOutlet)
  return (
    <div className='container'>
      <h2>Outlet Finder</h2>
      <div>
        <input type='text'
          className='search-text'
          onInput={e => setAddress(e.target.value)}
        />
        <a href
          onClick={() => fetchOutlet({ variables: { address } })}
          className='search-btn'
        >Find Outlet</a>
      </div>
      <p>Outlet Identifier: { loading ? 'Loading...' : data && data.outlet }</p>
    </div>
  );
}

export default OutletFinder;
