import { memo } from "react";
import styles from "./Card.module.css";
import star from "../../assets/icons/star.svg";
import view from "../../assets/icons/view.svg";
import pencil from "../../assets/icons/pencil.svg";
import Input from "../ui/Input/Input";
import { Link } from "react-router-dom";

const Card = memo(function Card(props) {
  const { owner, name, full_name, html_url, stargazers_count, watchers, id } =
    props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={html_url}>{name}</Link>
        <Link to={`/${full_name}/${id}`}>Редактировать</Link>
      </div>

      <div className={styles.user}>
        <img src={owner.avatar_url} alt="user_icon" />
        <Link to={owner.html_url}>{owner.login}</Link>
      </div>
      <div className={styles.details}>
        <div className={styles.option}>
          <img src={star} alt="stars" />
          <span>{stargazers_count}</span>
        </div>
        <div className={styles.option}>
          <img src={view} alt="views" />
          <span>{watchers}</span>
        </div>
      </div>
      <div className={styles.comments}>
        <Input />
        <div className={styles.icon}>
          <img src={pencil} alt="pencil" />
        </div>
      </div>
    </div>
  );
});
export default Card;
