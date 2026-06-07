import React, { useEffect, useState } from 'react';

function LikedNews() {
const [likedNews, setLikedNews] = useState([]);
useEffect(() => {
const news =
  JSON.parse(localStorage.getItem('likedNews')) || [];

setLikedNews(news);
}, []);

const removeNews = (index) => {
const updatedNews =
  likedNews.filter((_, i) => i !== index);

localStorage.setItem(
  'likedNews',
  JSON.stringify(updatedNews)
);

setLikedNews(updatedNews);
};

return (
<div
  className="container"
  style={{ marginTop: "120px" }}
>

  <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

    <div>

      <h2>❤️ Liked News</h2>

      <p className="text-muted">
        Total Liked News : {likedNews.length}
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

  {likedNews.length === 0 && (

    <div className="text-center mt-5">

      <h3>😔 No Liked News Yet</h3>

      <p>
        Start liking news and it will appear here.
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

    {likedNews.map((news, index) => (

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
              className="btn btn-danger mb-2"
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
);
}

export default LikedNews;
