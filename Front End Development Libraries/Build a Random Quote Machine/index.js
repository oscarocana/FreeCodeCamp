const { useState, useEffect } = React;

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true); // Show loader when fetching starts
      setError('');
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log(data); // Log the data to verify structure
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch quote. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
      <div id="quote-box" style={{ padding: '20px', textAlign: 'center' }}>
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
        </>
      )}

      <button id="new-quote" onClick={fetchQuote} disabled={loading}>
         {loading ? 'Loading...' : 'New Quote'}
      </button>

      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet
      </a>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
