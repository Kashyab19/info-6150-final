import React, {useState} from "react";
import Navbar from "./Navbar";

import Main from "./Main";
import Book from "./Book";
import ThankYou from "./ThankYou";
import Modify from "./Modify";



const LibraryBooking = () => {
    const [page, setPage] = useState(0);

    return(
    <>
    <div>
      <Navbar setPage={setPage} />
      {page === 0 ? <Main setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
      {page === 3 ? <Modify setPage={setPage} /> : null}
    </div>
    </>
    )
}

export default LibraryBooking;