import Card from "../Card/Card";

import styles from "./CardList.module.css";

export default function CardList({ data, loading }) {
  if (loading) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      {loading ? (
        <h1>Загрузочка...</h1>
      ) : (
        data?.map((item) => {
          return <Card key={item.id} {...item} />;
        })
      )}
    </div>
  );
}
