import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { useEffect } from "react";
import { getAllJobs } from "../features/allJobsSlice";
import { PageBtnContainer } from "../components";

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    numOfPages,
    sort,
    searchStatus,
    searchType,
    search,
    page,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return <Wrapper>No jobs to display...</Wrapper>;
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
