import React, { useState } from "react";

const feedback_initial_data = {
  'readability': { key: 'readability', label: "Readability", upvote: 0, downvote: 0 },
  "performance": { key: 'performance', label: "Performance", upvote: 0, downvote: 0 },
  'security': { key: 'security', label: "Security", upvote: 0, downvote: 0 },
  'documentation': { key: 'documentation', label: "Documentation", upvote: 0, downvote: 0 },
  'testing': { key: 'testing', label: "Testing", upvote: 0, downvote: 0 },
}

const FeedbackSystem = () => {
  const [feedBackState, setFeedBackState] = useState({ ...feedback_initial_data });

  const updateFeedBack = (key = "", isUpVote = false) => {
    const copy = { ...feedBackState };
    if (isUpVote) {
      copy[key] = { ...copy[key], upvote: copy[key].upvote + 1 }
    } else {
      copy[key] = { ...copy[key], downvote: copy[key].downvote + 1 }
    }
    setFeedBackState(copy)
  }

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
        <h1>Feedback System</h1>
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {Object.keys(feedBackState)?.length > 0 &&
          Object.values(feedBackState)?.map((item, index) => (
            <div className="pa-10 w-300 card" key={item.key}>
              <h2>{item.label}</h2>
              <div className="flex my-30 mx-0 justify-content-around">
                <button className="py-10 px-15" data-testid={`upvote-btn-${index}`}
                  onClick={() => updateFeedBack(item.key, true)}
                >
                  👍 Upvote
                </button>
                <button className="py-10 px-15 danger" data-testid={`downvote-btn-${index}`}
                  onClick={() => updateFeedBack(item.key, false)}
                >
                  👎 Downvote
                </button>
              </div>
              <p className="my-10 mx-0" data-testid={`upvote-count-${index}`}>
                Upvotes: <strong>{item.upvote}</strong>
              </p>
              <p className="my-10 mx-0" data-testid={`downvote-count-${index}`}>
                Downvotes: <strong>{item.downvote}</strong>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FeedbackSystem;
