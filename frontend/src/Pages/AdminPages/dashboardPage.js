import { useEffect, useState } from "react";
import "../SCSS/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { FaDollarSign, FaCheck } from "react-icons/fa";
import { BsChatSquareQuote } from "react-icons/bs";
import moment from "moment";
import { GetUserGrowth } from "../../Redux/adminData/action";
import AdminNavbar from "../../Components/PrivateComponents/admin/adminNavBar";
import { Card, Row, Col, Container } from "react-bootstrap";
import LineBarComposed from "../../Components/PrivateComponents/admin/LineBarComposedchartComponent";
import { UserList } from "../../Components/PrivateComponents/admin/userList";
import { RequestList } from "../../Components/PrivateComponents/admin/requestList";
import { TagCountChart } from "../../Components/PrivateComponents/admin/tagCountChart";
import { NewUserChart } from "../../Components/PrivateComponents/admin/NewUserChart";
import { RequestTypeCard } from "../../Components/PrivateComponents/admin/RequestCountCard";
import { Link } from "react-router-dom";

export default function DashboardPage(props) {
  const adminDataStore = useSelector((state) => state.adminDataStore);
  const request = adminDataStore.request;
  const userGrowth = adminDataStore.user.userGrowth;
  const newUserList = adminDataStore.user.newUserList;
  const dispatch = useDispatch();
  console.log(typeof moment().toDate());
  useEffect(() => {
  }, []);
  console.log(adminDataStore);
  return (
    <>
      <AdminNavbar />
      <h1>Welcome back, admin!</h1>
      <p>Here is some of the detail you need to see</p>
      <Container fluid>
        <Row xs={1} md={2} lg={4} className="my-2">
          <Col>
            <Card className="column">
              <div className="m-2 p-0 text-end">
                <p>Today's income</p>
              </div>
              <FaDollarSign className="icon" />
            </Card>
          </Col>
          <Col className="column">
            <Card>
              <p className="me-2 mt-2 text-end">Finished request</p>
              <FaCheck className="icon" />
            </Card>
          </Col>
          <Col className="column">
            <Card>
              <p className="text-end">Matched Response</p>
            </Card>
          </Col>
          <Col>
            <Card>
              <p className="ms-2 mt-2">Task</p>
            </Card>
          </Col>
        </Row>
        {/* <Col lg={3}> */}
        {/* <Card style={{textAlign:'center'}} className='mx-2'> */}
        <Row>
          <Col xs={12} lg={8}>
            <Card>
              <NewUserChart />
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <TagCountChart />
          </Col>
        </Row>
        <Row xs={1} md={2} lg={4} className="my-4">
          <Col>
            <Card>
              <RequestTypeCard />
            </Card>
          </Col>
          <Col>
            <Card>Top User</Card>
          </Col>
          <Col>
            <Card>Recent Review</Card>
          </Col>
          <Col>
            <Card>Guest message</Card>
          </Col>
        </Row>
       
      </Container>
    </>
  );
}
