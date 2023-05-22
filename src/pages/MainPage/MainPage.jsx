import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBat/SearchBar";
import CardList from "../../components/CardList/CardList";
import Paginator from "../../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  fetchData,
  getData,
  getLoading,
} from "../../features/dataSlice";

export default function MainPage() {
  const data = useSelector(getData);
  const loading = useSelector(getLoading);
  const currentPage = useSelector((state) => state.data.currentPage);
  const perPage = useSelector((state) => state.data.perPage);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState(
    sessionStorage.getItem("search") ?? ""
  );

  useEffect(() => {
    subject
      ? dispatch(fetchData({ subject, currentPage, perPage }))
      : dispatch(clearState());
  }, [dispatch, subject, currentPage, perPage]);

  const changeSubject = (value) => {
    setSubject(value);
    sessionStorage.setItem("search", value);
  };

  if (data.loading) {
    return <></>;
  }

  return (
    <>
      <SearchBar subject={subject} changeSubject={changeSubject} />
      <CardList data={data} loading={loading} />
      <Paginator subject={subject} data={data} loading={loading} />
    </>
  );
}
