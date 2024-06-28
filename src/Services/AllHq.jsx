import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Swr = () => {
  const {
    data: comics,
    error,
    isValidating,
  } = useSWR(`https://gateway.marvel.com/v1/public/comics/?startYear=2021&limit=10&ts=1&apikey=e053145fd0982715b5cdb1bb9e5fe0c2&hash=5d30905a04649c736f3cdf33c95b81db`, 
    fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <pre>{JSON.stringify(comics)}</pre>
  );
};

export default Swr;