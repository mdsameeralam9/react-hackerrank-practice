import { useState, useCallback, useEffect } from "react";
import { ARTICLES_DATA } from "./articlesData";
import Articles from "./Articles";

const sortByVote = (arr = []) => [...arr].sort((a, b) => b.upvotes - a.upvotes);
const sortByRecent = (arr = []) =>
  [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));

function ArticleSorting({ articles = ARTICLES_DATA }) {
  const [data, setData] = useState([]);

  // init once; if articles can change later, add [articles] and re-sort
  useEffect(() => {
    setData(sortByVote(articles));
  }, []); // or [articles]

  const handleMostUpvoted = useCallback(() => {
    setData((prev) => sortByVote(prev));
  }, []);

  const handleMostRecent = useCallback(() => {
    setData((prev) => sortByRecent(prev));
  }, []);

  return (
    <div className="layout-column align-items-center mx-auto">
      <h1>Sorting Articles</h1>
      <div className="App">
        <div className="layout-row align-items-center justify-content-center my-20 navigation">
          <label className="form-hint mb-0 text-uppercase font-weight-light">
            Sort By
          </label>
          <button
            data-testid="most-upvoted-link"
            className="small"
            onClick={handleMostUpvoted}
          >
            Most Upvoted
          </button>
          <button
            data-testid="most-recent-link"
            className="small"
            onClick={handleMostRecent}
          >
            Most Recent
          </button>
        </div>
        <Articles sortedArticles={data} />
      </div>
    </div>
  );
}

export default ArticleSorting;
