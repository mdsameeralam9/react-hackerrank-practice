/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import App from "./App";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cleanup();
});

const TEST_IDS = {
  titleInput: "title-input",
  descriptionInput: "description-input",
  createButton: "create-button",
  postsContainer: "posts-container",
};

let titleInput, descriptionInput, createButton, postsContainer;

beforeEach(() => {
  const app = render(<App />);
  titleInput = app.getByTestId(TEST_IDS.titleInput);
  descriptionInput = app.getByTestId(TEST_IDS.descriptionInput);
  createButton = app.getByTestId(TEST_IDS.createButton);
  postsContainer = app.getByTestId(TEST_IDS.postsContainer);
});

describe("Blog Post Application", () => {
  test("initially the title and description should be empty", () => {
    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });

  test("should add new blog post on clicking button when title and description are added", () => {
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(createButton);

    const postBox = postsContainer.children[0];
    expect(postBox.children[0]).toHaveTextContent("Test Title");
    expect(postBox.children[1]).toHaveTextContent("Test Description");
    expect(postBox.children[2]).toBeInTheDocument(); // This is the delete button
    expect(postBox.children[2]).toHaveTextContent("Delete");
  });

  test("should not add new blog post on clicking button if either title or description are empty", () => {
    // Test with empty title
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(createButton);
    expect(postsContainer.children.length).toBe(0);

    // Test with empty description
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.click(createButton);
    expect(postsContainer.children.length).toBe(0);

    // Test with both empty
    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.click(createButton);
    expect(postsContainer.children.length).toBe(0);
  });

  test("check the content of new blog post with the content added while creating/entering inputs to title and description", () => {
    fireEvent.change(titleInput, { target: { value: "Content Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Content Description" },
    });
    fireEvent.click(createButton);

    const postBox = postsContainer.children[0];
    expect(postBox.children[0]).toHaveTextContent("Content Title");
    expect(postBox.children[1]).toHaveTextContent("Content Description");
  });

  test("delete button should delete the respective blog post, after adding multiple posts", () => {
    // Create multiple posts
    fireEvent.change(titleInput, { target: { value: "First Post" } });
    fireEvent.change(descriptionInput, {
      target: { value: "First Description" },
    });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "Second Post" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Second Description" },
    });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "Third Post" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Third Description" },
    });
    fireEvent.click(createButton);

    // Delete the second post
    const secondPostDeleteButton = postsContainer.children[1].children[2];
    fireEvent.click(secondPostDeleteButton);

    // Check the posts remaining
    expect(postsContainer.children[0].children[0]).toHaveTextContent(
      "First Post"
    );
    expect(postsContainer.children[1].children[0]).toHaveTextContent(
      "Third Post"
    );
    expect(postsContainer.children.length).toBe(2);
  });

  test("should clear title and description fields after adding a new blog post", () => {
    fireEvent.change(titleInput, { target: { value: "Title to Clear" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description to Clear" },
    });
    fireEvent.click(createButton);

    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });
});
