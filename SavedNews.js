import React, { useEffect, useState } from 'react';

function SavedNews() {
const [savedNews, setSavedNews] = useState([]);
useEffect(() => {
const news =
  JSON.parse(localStorage.getItem('savedNews')) || [];

setSavedNews(news);
}, []);

const removeNews = (index) => {
const updatedNews =
  savedNews.filter((_, i) => i !== index);

localStorage.setItem(
  'savedNews',
  JSON.stringify(updatedNews)
);

setSavedNews(updatedNews);
};

return (
<div
  className="container"
  style={{ marginTop: "120px" }}
>

  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

    <div>

      <h2>🔖 Saved News</h2>

      <p className="text-muted">
        Total Saved News : {savedNews.length}
      </p>

    </div>

    <div className="d-flex gap-2 flex-wrap">

      <button
        className="btn btn-secondary"
        onClick={() => window.history.back()}
      >
        🔙 Back
      </button>

      <a
        href="/"
        className="btn btn-dark"
      >
        🏠 Dashboard
      </a>

      <a
        href="/"
        className="btn btn-success"
      >
        🚀 Explore News
      </a>

    </div>

  </div>

  {savedNews.length === 0 && (

    <div className="text-center mt-5">

      <h3>😔 No Saved News Yet</h3>

      <p>
        Save some news and it will appear here.
      </p>

      <a
        href="/"
        className="btn btn-primary"
      >
        Browse News
      </a>

    </div>

  )}

  <div className="row">

    {savedNews.map((news, index) => (

      <div
        className="col-lg-4 col-md-6 mb-4"
        key={index}
      >

        <div className="card h-100 shadow-sm news-card">

          <img
            src={news.imageUrl}
            className="card-img-top"
            alt="news"
          />

          <div className="card-body d-flex flex-column">

            <h6 className="fw-bold">
              {news.title}
            </h6>

            <a
              href={news.newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mb-2"
            >
              📰 Read News
            </a>

            <button
              className="btn btn-outline-danger"
              onClick={() => removeNews(index)}
            >
              🗑 Remove
            </button>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
);}
export default SavedNews;
