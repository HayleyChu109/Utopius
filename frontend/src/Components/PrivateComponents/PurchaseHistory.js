import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table } from "reactstrap";

function PurchaseHistory() {
  const tokenPurchase = useSelector(
    (state) => state.tokenRecordStore.tokenPurchaseRecord
  );

  return (
    <>
      <div className="container history-table">
        <Table borderless hover className="text-center">
          <thead>
            <tr className="history-title">
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Plan Name</th>
              <th>HKD</th>
              <th>Token Purchased</th>
            </tr>
          </thead>
          <tbody>
            {tokenPurchase && tokenPurchase.length > 0
              ? tokenPurchase.map((record) => {
                  return (
                    <tr key={record.id}>
                      <th scope="row">{record.id}</th>
                      <td>{moment(record.created_at).format("LLL")}</td>
                      <td>{record.planName}</td>
                      <td>{record.hkd}</td>
                      <td>{record.noOfToken}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default PurchaseHistory;
