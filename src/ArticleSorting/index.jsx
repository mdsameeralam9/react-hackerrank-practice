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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sorting Articles</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-700">Sort By</span>
          <button
            data-testid="most-upvoted-link"
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            onClick={handleMostUpvoted}
          >
            Most Upvoted
          </button>
          <button
            data-testid="most-recent-link"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            onClick={handleMostRecent}
          >
            Most Recent
          </button>
        </div>
      </div>
      
      <Articles sortedArticles={data} />
    </div>
  );
}

export default ArticleSorting;
