import React, { useEffect } from "react";
import User from "../../components/User/User";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  getCurrentUser,
  getLoading,
} from "../../features/dataSlice";

export default function UserPage() {
  const { owner, name, id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const userWithChanges = sessionStorage.getItem(id)
    ? JSON.parse(sessionStorage.getItem(id))
    : currentUser;
  const loading = useSelector(getLoading);
  useEffect(() => {
    dispatch(fetchUser(`${owner}/${name}`));
  }, [dispatch, owner, name]);

  if (loading) {
    return <h1>Загрузочка</h1>;
  }
  return (
    <>
      <User currentUser={userWithChanges} />
    </>
  );
}
