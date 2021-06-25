import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import fetch from 'isomorphic-fetch';

import MTGSearchInput, { MTGCard  } from '../components/MTGSearchInput'

export default function SearchPage() {
  const [cardData, setCardData] = useState<MTGCard | undefined>();
  
  return (
    <div>
      <Head>
        <title>MTG Search</title>
      </Head>

      <main>
        <h1>
          Welcome to Search MTG!
        </h1>

        <div className="p-6">
          <MTGSearchInput onCardResult={(cardData) => console.log('Alex - API cardData', cardData) || setCardData(cardData)}/>

          {
            cardData && (
              <div>
                <p>{cardData.name}</p>
                <Image  src={cardData.image_uris.normal} alt={cardData.name} layout="fill" objectFit="contain"/>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}

