import styles from "./User.module.css";
import { useState } from "react";
import UserItem from "./UserItem/UserItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button/Button";

export default function User({ currentUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    ...currentUser,
  });
  const { id } = useParams();

  const {
    owner,
    name,
    full_name,
    description,
    created_at,
    language,
    visibility,
    forks,
  } = user;
  if (!currentUser) {
    return <></>;
  }
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const options = [
    ["имя проекта", "name", name],
    ["Полное имя", "full_name", full_name],
    ["ID проекта", "id", user.id],
    ["Описание проекта:", "description", description],
    ["Создано", "created_at", created_at],
    ["Основной язык", "language", language],
    ["Видимость", "visibility", visibility],
    ["Форкнуто", "forks", forks],
  ];

  const handleSave = () => {
    sessionStorage.setItem(id, JSON.stringify(user));
  };
  const handleBlock = () => {
    const blackList = sessionStorage.getItem("blackList");
    if (blackList) {
      const newBlackList = JSON.parse(blackList);
      newBlackList.push(id);
      sessionStorage.setItem("blackList", JSON.stringify(newBlackList));
    } else {
      sessionStorage.setItem("blackList", JSON.stringify([id]));
    }
    sessionStorage.removeItem(id);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.owner}>
        <Link to="/">На главную</Link>
        <div>Создатель: {owner.login}</div>
        <div className={styles.btns}>
          <Button onClick={handleSave}>Сохранить</Button>
          <Button onClick={handleBlock}>Заблокировать</Button>
        </div>
      </div>
      <div>
        {options.map((item, index) => {
          return <UserItem key={index} item={item} onChange={handleChange} />;
        })}
      </div>
    </div>
  );
}
