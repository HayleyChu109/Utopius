import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import FadeIn from "react-fade-in/lib/FadeIn";
import moment from "moment";
export const TokenIncomeTable = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let paginate = [];
  const handleFirstpage = () => {
    setActivePage(1);
    const newOffset = (0 * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${activePage}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  const handleLastpage = () => {
    setActivePage(pageCount);
    const newOffset = (pageCount - 1 * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${activePage}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  const handlePageClick = (number) => {
    setActivePage(number + 1);
    const newOffset = (number * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${number}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      const newOffset = (activePage * itemsPerPage) % items.length;
      // console.log(
      //   `User requested page number ${activePage}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    }
  };
  const handleNext = () => {
    if (activePage < pageCount) {
      setActivePage(activePage + 1);
      const newOffset = (activePage * itemsPerPage) % items.length;
      // console.log(
      //   `User requested page number ${activePage}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    }
  };
  for (let i = 1; i <= pageCount; i++) {
    paginate.push(
      <Pagination.Item
        onClick={() => handlePageClick(i - 1)}
        active={i === activePage}
      >
        {i}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);
  return (
    <>
      <FadeIn>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Plan</th>
              <th>token</th>
              <th>Income</th>
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/admin/user/${item.accountId}`}>
                      {item.profilePath ? (
                        <img
                          src={item.profilePath}
                          alt=""
                          className="profile mx-2"
                        />
                      ) : (
                        <img
                          src="https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg"
                          alt="profile pic"
                          className="profile mx-2"
                        />
                      )}
                      {item.username
                        ? item.username
                        : `New user UID#${item.accountId}`}
                    </Link>
                  </td>

                  <td>
                    <img src={item.photoPath} alt="plan" className="profile" />
                    {item.planName}
                  </td>
                  <td>{item.noOfToken}</td>
                  <td>{item.hkd}</td>
                  <td>
                    {moment().diff(item.created_at, "day") >= 1
                      ? moment(item.created_at).format("YYYY-MM-DD HH:MM")
                      : moment(item.created_at).fromNow()}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.First
            onClick={handleFirstpage}
            disabled={activePage === 1}
          />
          <Pagination.Prev onClick={handlePrevious} disabled={activePage === 1}>
            Previous
          </Pagination.Prev>
          {paginate}
          <Pagination.Next
            disabled={activePage === pageCount || pageCount === 0}
            onClick={handleNext}
          >
            Next
          </Pagination.Next>
          <Pagination.Last
            onClick={handleLastpage}
            disabled={activePage === pageCount || pageCount === 0}
          />
        </Pagination>
      </FadeIn>
    </>
  );
};
