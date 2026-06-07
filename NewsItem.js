import React, { useState } from 'react';

function NewsItem(props) {

  const [showSummary, setShowSummary] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  const truncate = (text, n) => {
    return text && text.length > n
      ? text.slice(0, n) + "..."
      : text;
  };

  const {
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source
  } = props;

  // Save News

  const saveNews = () => {

    const savedNews =
      JSON.parse(localStorage.getItem("savedNews")) || [];

    const newsData = {
      title,
      imageUrl,
      newsUrl,
      source
    };

    const alreadySaved = savedNews.find(
      (item) => item.newsUrl === newsUrl
    );

    if (!alreadySaved) {

      savedNews.push(newsData);

      localStorage.setItem(
        "savedNews",
        JSON.stringify(savedNews)
      );

    }

    setSaved(true);

  };

  // Like News

  const likeNews = () => {

    const likedNews =
      JSON.parse(localStorage.getItem("likedNews")) || [];

    const newsData = {
      title,
      imageUrl,
      newsUrl,
      source
    };

    const alreadyLiked = likedNews.find(
      (item) => item.newsUrl === newsUrl
    );

    if (!alreadyLiked) {

      likedNews.push(newsData);

      localStorage.setItem(
        "likedNews",
        JSON.stringify(likedNews)
      );

    }

    setLiked(true);

  };

  // Share News

  const shareNews = async () => {

    try {

      if (navigator.share) {

        await navigator.share({
          title: title,
          text: description,
          url: newsUrl
        });

      } else {

        await navigator.clipboard.writeText(newsUrl);

        alert("📤 News Link Copied!");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="card news-card h-100 shadow-sm">

      <div className="position-relative">

        <img
          src={
            imageUrl && imageUrl.startsWith("http")
              ? imageUrl
              : "https://via.placeholder.com/300x200?text=News"
          }
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=News";
          }}
          className="card-img-top"
          alt="news"
        />

        <span
          className="badge bg-danger position-absolute top-0 end-0 m-2"
        >
          {source || "News"}
        </span>

      </div>

      <div className="card-body d-flex flex-column">

        <h6 className="card-title fw-bold">
          {truncate(title, 70)}
        </h6>

        <p className="card-text">
          {truncate(description, 100)}
        </p>

        <div className="news-actions">

          <button
            className="action-btn summary-btn"
            onClick={() => setShowSummary(!showSummary)}
          >
            {showSummary ? "❌ Hide" : "🤖 Summary"}
          </button>

          <button
            className="action-btn like-btn"
            onClick={likeNews}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>

          <button
            className="action-btn save-btn"
            onClick={saveNews}
          >
            {saved ? "🔖 Saved" : "📌 Save"}
          </button>

          <button
            className="action-btn share-btn"
            onClick={shareNews}
          >
            📤 Share
          </button>

        </div>

        {
          showSummary && (
            <div className="alert alert-light mt-2">

              {
                description
                  ? description.substring(0, 150)
                  : "No Summary Available"
              }

            </div>
          )
        }



      </div>

      <small className="text-muted mb-3">

        By {author || "Unknown"}

        <br />

        {
          date
            ? new Date(date).toLocaleString()
            : ""
        }

      </small>

      <a
        href={newsUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary mt-auto"
      >
        Read Full News →
      </a>

    </div>
  );
}

export default NewsItem;