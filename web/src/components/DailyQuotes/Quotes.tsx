import React, { FC, useEffect, useState } from 'react';
import './Quotes.css';

interface QuotesProps {}

interface RandomQoute {
  author: string;
  quote: string;
}

const Quotes: FC<QuotesProps> = ({}: QuotesProps) => {
  const [randomQoute, setRandomQuote] = useState<RandomQoute>({
    quote: 'Learn then remove L.',
    author: 'Anonymous',
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setRandomQuote({ author: data.author, quote: data.content });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          <p>{randomQoute.quote}</p>
          <p>-{randomQoute.author}</p>
        </div>
      )}
    </div>
  );
};

export default Quotes;
