import axios from "axios";
import react, { useEffect, useState } from "react";
import Product from "./components/product";
import "./components/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";

function App() {
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [cartCount, setCartCount] = useState(0);

  const Url = "https://scmq7n.a.searchspring.io/api/search/search.json";

  useEffect(() => {
    const delayedFetch = debounce(() => {
      setSearchItem("");
      loaditemsData(searchItem, currentPage);
    }, 500);
    delayedFetch();
    return delayedFetch.cancel;
  }, [currentPage]);


  //fetching data from url with given params

  const loaditemsData = async (searchItem, pageNo) => {
    return await axios
      .get(
        Url +
          "?" +
          new URLSearchParams({
            q: searchItem,
            resultsFormat: "native",
            page: pageNo,
            siteId: "scmq7n",
            size: itemsPerPage,
          })
      )
      .then((res) => {
        setData(res.data.results);

        setFilteredData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //for handling search filter  selection

  const handleSearch = (e) => {
    console.log("Search Term:", searchItem);
    e.preventDefault();
    const trimmedSearchTerm = searchItem.trim().toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(trimmedSearchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

//for handling pagination
  const handlePageClick = async (data) => {
    let selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const productsToShow = filteredData.slice(startIndex, endIndex);

  return (
    <div className="mainContainer">
      <Navbar
        value={searchItem}
        setsearchitem={(e) => setSearchItem(e.target.value)}
        handleSearchItem={handleSearch}
        cartCount={cartCount}
      />

      {data && (
        <div>
          <Product
            query={searchItem}
            data={productsToShow}
            setCartCount={setCartCount}
          />
        </div>
      )}
      {filteredData.length > 0 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"next"}
          brealLabel={"..."}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
}

export default App;
