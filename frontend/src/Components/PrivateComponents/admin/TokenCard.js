import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { GetTokenTransaction } from "../../../Redux/adminToken/action";
import { FaDollarSign } from "react-icons/fa";
import "../../../Pages/SCSS/dashboard.scss";
import moment from "moment";

export function TokenCountCard() {
  const { transaction } = useSelector((state) => state.adminTokenStore);
  const disptach = useDispatch();
  let income;
  useEffect(() => {
    disptach(GetTokenTransaction());
  }, [disptach]);
  if (transaction && transaction.length > 0) {
    income = transaction;
    income = income.filter(
      (item) => moment().startOf("date").toDate() <= new Date(item.created_at)
    );

    income = income.map((dollar) => dollar.hkd).reduce((a, b) => a + b, 0);
  }
  return (
    <>
      <Card className="column">
        <div className="m-2 p-0 text-end">
          <p>Today's income</p>
          {income ? <p>HKD$ {income}</p> : <p>HKD$0</p>}
        </div>
        <FaDollarSign className="dashboard-icon" />
      </Card>
    </>
  );
}
