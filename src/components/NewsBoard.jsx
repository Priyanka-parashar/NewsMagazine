import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsItem from "./NewsItem";

export const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language === "hi" ? "hi" : "en"; // Detect language
    setLoading(true);
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&token=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => {
        setArticles([]);
        setLoading(false);
      });
  }, [category, i18n.language]);

  return (
    <div>
      <h2 className="text-center">
        {t("latest")} <span className="badge bg-danger">{t("news")}</span>
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">{t("loading")}</span>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center">{t("no_news")}</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.image}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
