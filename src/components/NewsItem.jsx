import { useTranslation } from "react-i18next";  // Import translation hook
import fallbackImage from '../assets/news.jpeg'
export const NewsItem = ({title, description, src, url}) => {
  const { t } = useTranslation();  // Use i18n translations
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth:"345px"}}>
  <img src={src && src.trim() !== "" ? src : fallbackImage} style={{height:"200px",width:"325px", objectFit:"cover"}} className="card-img-top" alt={title || t("news")} 
  onError={(e) => (e.target.src = fallbackImage)} // fallback if image fails to load 
  />
  <div className="card-body">
    <h5 className="card-title">{title ?title.slice(0,40): "Breaking News"}</h5>
    <p className="card-text">{description ? description.slice(0,90): t("default_description")}</p>
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t("read_more")}</a>
  </div>
</div>
  );
};

export default NewsItem