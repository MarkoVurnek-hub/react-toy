/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import "../bootstrap";
import * as colors from "styles/colors";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Input, Spinner, BookListUL } from "components/lib";
import BookRow from "components/book-row";
import client from "utils/api-client";
import { bookModel } from "utils/book-model";
import { useAsync } from "utils/hooks";

function DiscoverBooksScreen({ user }) {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);
  let parsedData = "";
  if (data) {
    parsedData = bookModel(data);
  }

  useEffect(() => {
    if (!queried) {
      return;
    }

    run(client(`?q=${query}`));
  }, [query, queried, run]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
    setQueried(true);
  }

  return (
    <div
      css={{ maxWidth: 800, margin: "auto", width: "90vw", padding: "40px 0" }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: "100%" }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: "0",
                position: "relative",
                marginLeft: "-35px",
                background: "transparent"
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>Oh no, there was and error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      {isSuccess ? (
        parsedData.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {parsedData.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}

export default DiscoverBooksScreen;
