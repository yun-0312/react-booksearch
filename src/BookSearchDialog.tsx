import React, { useState, useEffect, useRef } from "react";
import { BookDescription } from "./BookDescription";
import BookSearchItem from "./BookSearchItem";
import { useBookData } from "./useBookData";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  
  const books = useBookData(title, author, props.maxResults);
  
  // const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitld(e.target.value);
  // };

  // const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuthor(e.target.value);
  // };

  const handleSearchClick = () => {
    if (!titleRef.current!.value && !authorRef.current!.value) {
      alert("条件を入力して下さい");
      return;
    };
    setTitle(titleRef.current!.value);
    setAuthor(authorRef.current!.value);
  };

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = books.map((b, idx) => {
    return (
      <BookSearchItem description={b} onBookAdd={(b) => handleBookAdd(b)} key={idx} />
    );
  });

  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input type="text" ref={titleRef} placeholder="タイトルで検索" />
          <input type="text" ref={authorRef} placeholder="著者名で検索" />
        </div>
        <div className="button-like" onClick={handleSearchClick}>
          検索
        </div>
      </div>
      <div className="search-results">{bookItems}</div>
    </div>
  )

};

export default BookSearchDialog;