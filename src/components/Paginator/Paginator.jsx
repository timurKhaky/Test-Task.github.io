import styles from "./Pagination.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
import Button from "../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changePerPage,
  decPage,
  getLoading,
  incPage,
  setPage,
} from "../../features/dataSlice";

export default function Paginator({ data, subject }) {
  const dispatch = useDispatch();
  const nextPage = () => dispatch(incPage());
  const prevPage = () => dispatch(decPage());
  const changePerPageCount = (e) => dispatch(changePerPage(+e.target.value));

  const currentPage = useSelector((state) => state.data.currentPage);
  const totalPage = useSelector((state) => state.data.totalPage);
  const perPage = useSelector((state) => state.data.perPage);

  const loading = useSelector(getLoading);

  if (loading || !data || !data.length) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.perPage}>
        <select onChange={changePerPageCount} value={perPage}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className={styles.pages}>
        <Button
          variant="arrow"
          disabled={currentPage - 1 <= 0}
          onClick={prevPage}
        >
          <img src={arrowLeft} alt="prev" />
        </Button>
        <Button
          variant="pagination"
          disabled={currentPage - 1 <= 0}
          onClick={() => dispatch(setPage(currentPage - 1))}
        >
          {currentPage - 1 > 0 ? currentPage - 1 : "..."}
        </Button>
        <Button variant="pagination">{currentPage}</Button>
        <Button
          variant="pagination"
          disabled={totalPage === currentPage}
          onClick={() => dispatch(setPage(currentPage + 1))}
        >
          {totalPage === currentPage ? "..." : currentPage + 1}
        </Button>
        <Button
          variant="arrow"
          disabled={totalPage === currentPage}
          onClick={nextPage}
        >
          <img src={arrowRight} alt="next" />
        </Button>
      </div>
    </div>
  );
}
