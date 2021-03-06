import "../SCSS/dashboard.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { GetUserGrowth } from "../../Redux/adminData/action";
import { useSelector } from "react-redux";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { GiDiamonds } from "react-icons/gi";
import { Card, Row, Col, Container } from "react-bootstrap";
import { TagCountChart } from "../../Components/PrivateComponents/admin/tagCountChart";
import { NewUserChart } from "../../Components/PrivateComponents/admin/NewUserChart";
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { FinishedRequestCard } from "../../Components/PrivateComponents/admin/fininshedRequestCard";
import { TaskCountCard } from "../../Components/PrivateComponents/admin/taskCard";
import { ResponseRateCard } from "../../Components/PrivateComponents/admin/responseCountCard";
import { TokenCountCard } from "../../Components/PrivateComponents/admin/TokenCard";
import { TokenTransactionList } from "../../Components/PrivateComponents/admin/tokenTransactionList";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function DashboardPage(props) {
  const dispatch = useDispatch();
  const adminDataStore = useSelector((state) => state.adminDataStore);
  useEffect(() => {
    dispatch(
      GetUserGrowth(
        moment().subtract(7, "day").startOf("day").format("YYYY-MM-DD"),
        moment().endOf("day").format("YYYY-MM-DD")
      )
    );
  }, [dispatch]);

  return (
    <>
      <AdminNavbar />
      <FadeIn className="p-2">
        <div className="my-5 mx-5 px-4 discover-title">
          <GiDiamonds className="me-2 mb-1" />
          DASHBOARD
        </div>
        <Container>
          <Row xs={1} md={2} lg={4} className="my-2">
            <Col>
              <Link to="/admin/token">
                <TokenCountCard />
              </Link>
            </Col>
            <Col className="column">
              <Link to="/admin/request">
                <FinishedRequestCard />
              </Link>
            </Col>
            <Col className="column">
              <ResponseRateCard />
            </Col>
            <Col>
              <Link to="/admin/task">
                <TaskCountCard />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={8} className="chart">
              <div className="my-2 mx-2 discover-title">
                <GiDiamonds className="me-2 mb-1" />
                Daily New User
              </div>
              <NewUserChart />
            </Col>
            <Col xs={12} lg={4}>
              <div className="my-2 mx-2 discover-title">
                <GiDiamonds className="me-2 mb-1" />
                Most used tag
              </div>
              <TagCountChart />
            </Col>
          </Row>
          <Row className="my-4">
            <Col xs={12} lg={4}>
              <div className="my-2 mx-2 discover-title">
                <GiDiamonds className="me-2 mb-1" />
                Request Status
              </div>
              <Card>
                <RequestTypeCard />
              </Card>
            </Col>
            <Col xs={12} lg={8}>
              <Link to="/admin/token">
                <div className="my-2 mx-2 discover-title">
                  <GiDiamonds className="me-2 mb-1" />
                  User Token Transaction record
                </div>
                <Card>
                  <TokenTransactionList itemsPerPage={5} />
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </FadeIn>
    </>
  );
}
