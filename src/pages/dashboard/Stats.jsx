import { StatsContainer, ChartsContainer, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobsSlice";
import { useEffect } from "react";

export const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications, defaultStats } = useSelector(
    (store) => store.allJobs
  );
  useEffect(() => {
    dispatch(showStats());
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
