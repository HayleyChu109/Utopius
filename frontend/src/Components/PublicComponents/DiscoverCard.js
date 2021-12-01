import { useDispatch } from "react-redux";
import { searchReq } from "../../Redux/request/actions";

import { Card } from "reactstrap";

const DiscoverCard = (props) => {
  const dispatch = useDispatch();

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  return (
    <>
      <div className="col-2">
        <Card className="discover-card">
          <a
            href="#0"
            onClick={(e) => {
              e.preventDefault();
              handleSearch(props.tagname.replace(/\s/g, ""));
            }}
          >
            <div className="discover-icons p-4">
              <img
                src={props.photoPath}
                alt="logo"
                className="card-img-top mx-auto"
              />
            </div>
            <div className="discover-tagname text-center p-2">
              {props.tagname}
            </div>
          </a>
        </Card>
      </div>
    </>
  );
};

export default DiscoverCard;
