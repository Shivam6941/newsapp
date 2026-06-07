

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

function News(props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // const [search, state,setSearch] = useState('');
  const [time, setTime] = useState(new Date());
  const [savedCount, setSavedCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [locationSearch, setLocationSearch] = useState("");


  useEffect(() => {

    const updateCounts = () => {

      const saved =
        JSON.parse(localStorage.getItem("savedNews")) || [];

      const liked =
        JSON.parse(localStorage.getItem("likedNews")) || [];

      setSavedCount(saved.length);
      setLikedCount(liked.length);
    };
    updateCounts();
    const interval = setInterval(updateCounts, 1000);
    return () => clearInterval(interval);

  }, []);
  useEffect(() => {
    fetchNews();
  }, [props.category, locationSearch]);
  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const fetchNews = async () => {

    try {
      props.setProgress(10);
      setLoading(true);
      let url;

      if (locationSearch.trim() !== "") {

        url =
          `https://gnews.io/api/v4/search?q=${locationSearch}&lang=en&max=10&page=1&token=42a3a437ec213d152bb7ef5e72114826`;

      }
      else {

        url =
          `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=10&page=1&topic=${props.category}&token=42a3a437ec213d152bb7ef5e72114826`;

      }
      const data = await fetch(url);
      props.setProgress(50);
      const parsedData = await data.json();
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalArticles || 0);

      setPage(1);

      setLoading(false);

      props.setProgress(100);

    } catch (error) {

      console.log(error);
      setLoading(false);

    }

  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url =
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=8&page=${nextPage}&topic=${props.category}&token=42a3a437ec213d152bb7ef5e72114826`;

    const data = await fetch(url);

    const parsedData = await data.json();

    setPage(nextPage);

    setArticles(
      articles.concat(parsedData.articles || [])
    );
  };
  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(locationSearch.toLowerCase()) ||
    article.description?.toLowerCase().includes(locationSearch.toLowerCase())
  );



  return (

    <>

      <div className="news-top-container">

        <h2 className="fixed-heading">
          📰 NewsAdda - Top {props.category?.toUpperCase()} Headlines
        </h2>

        <div className="breaking-strip">

          <div className="breaking-strip-content">

            🔥 Breaking News • Sports • Technology • Business • Health • Entertainment • Live Updates 🚀 • Trending News • India News • World News 🌎

          </div>

        </div>

        <div className="premium-dashboard">

          <div className="mini-card">
            <span className="icon">📅</span>
            <div>
              <small>Date</small>
              <p>{time.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mini-card">
            <span className="icon">⏰</span>
            <div>
              <small>Time</small>
              <p>{time.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="mini-card">
            <span className="icon">📍</span>
            <div>
              <small>Location</small>
              <p>
                {
                  [
                    "patna",
                    "delhi",
                    "mumbai",
                    "lucknow",
                    "noida",
                    "gurugram",
                    "kanpur",
                    "jaipur",
                    "hyderabad",
                    "kolkata",
                    "chennai",
                    "bengaluru",
                    "pune"
                  ].includes(locationSearch.toLowerCase())

                    ? locationSearch

                    : "India"
                }
              </p>
            </div>
          </div>

          <div className="mini-card">
            <span className="icon">📰</span>
            <div>
              <small>News</small>
              <p>{articles.length}</p>
            </div>
          </div>

          <a href="/saved" className="mini-card action-card">
            <span className="icon">🔖</span>
            <div>
              <small>Saved</small>
              <p>{savedCount}</p>
            </div>
          </a>

          <a href="/liked" className="mini-card action-card">
            <span className="icon">❤️</span>
            <div>
              <small>Liked</small>
              <p>{likedCount}</p>
            </div>
          </a>

        </div>


      </div>

      <div className="news-ticker">
        🔥 Breaking News • Sports • Technology • Business • Health • Entertainment • Live Updates 🚀
      </div>

      <div className="container my-4 news-container">

        {/* Search */}

        <input
          type="text"
          className="form-control mb-3"
          placeholder={`🔍 Search City `}
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={filteredArticles.length}
          next={fetchMoreData}
          hasMore={filteredArticles.length < totalResults}
          loader={<Spinner />}
        >

          <div className="row g-4">

            {filteredArticles.map((element) => {

              return (

                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.source?.name}
                    date={element.publishedAt}
                    source={element.source?.name}
                  />

                </div>

              );

            })}

          </div>

        </InfiniteScroll>

      </div>
    </>
  );
}

export default News;