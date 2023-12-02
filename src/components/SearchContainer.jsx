import Wrapper from "../assets/wrappers/SearchContainer"
import { useDispatch, useSelector } from "react-redux";
import {FormRow, FormRowSelect} from '../components'
import { handleChange } from "../features/allJobsSlice";
import { clearFilters } from "../features/allJobsSlice";
import { useState, useMemo } from "react";

const SearchContainer = () => {

  const[localSearch, setLocalSearch] = useState('')

  const dispatch = useDispatch()
  const {isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector(store => store.allJobs)

  const {statusOptions, jobTypeOptions} = useSelector(store => store.job)

  const debounce = () => {
    let timerId;
    return (e) => {
      setLocalSearch(e.target.value)
      timerId = setTimeout(() => { 
        clearTimeout(timerId);
        dispatch(handleChange({name: e.target.name, value: e.target.value}))
      }, 1000);
    };
  };

  const handleSearch = e => {
    dispatch(handleChange({name: e.target.name, value: e.target.value}))
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(clearFilters())
  }

  const optimizedDebounce = useMemo(() => debounce(),[])
  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          {/* search input */}
          <FormRow
            type="text"
            value={localSearch}
            labelText="search"
            name="search"
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer