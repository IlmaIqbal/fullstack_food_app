import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

import { CChart } from "@coreui/react-chartjs";
import { setOrders } from "../context/actions/ordersAction";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const drinks = products?.filter((item) => item.product_category === "drinks");
  const deserts = products?.filter(
    (item) => item.product_category === "deserts"
  );
  const kottu = products?.filter((item) => item.product_category === "kottu");
  const rice = products?.filter((item) => item.product_category === "rice");
  const noodles = products?.filter(
    (item) => item.product_category === "noodles"
  );
  const chilli = products?.filter((item) => item.product_category === "chilli");
  const burger = products?.filter((item) => item.product_category === "burger");
  const submarine = products?.filter(
    (item) => item.product_category === "submarine"
  );
  const pizza = products?.filter((item) => item.product_category === "pizza");
  const pasta = products?.filter((item) => item.product_category === "pasta");
  const special = products?.filter(
    (item) => item.product_category === "special"
  );

  const paid = orders?.filter((item) => item.status === "paid");
  const not_paid = orders?.filter((item) => item.status === "not_paid");
  const delivered = orders?.filter((item) => item.sts === "delivered");
  const cancelled = orders?.filter((item) => item.sts === "cancelled");
  const preparing = orders?.filter((item) => item.sts === "preparing");
  //const orders = orders?.filter((item) => orders.orderId === "orders");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  });
  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  });

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className=" grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Kottu",
                  "Rice",
                  "Noodles",
                  "Chilli",
                  "Burger",
                  "Submarine",
                  "Pizza",
                  "Pasta",
                  "Special",
                ],
                datasets: [
                  {
                    label: "Category wise count",
                    backgroundColor: "#00CED1",
                    data: [
                      drinks?.length,
                      deserts?.length,
                      kottu?.length,
                      rice?.length,
                      noodles?.length,
                      chilli?.length,
                      burger?.length,
                      submarine?.length,
                      pizza?.length,
                      pasta?.length,
                      special?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className=" w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "Cancelled",
                  "Preparing",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#7FFFD4",
                      "#32CD32   ",
                      "#DD1B16",
                      "#f97316",
                      "#1E90FF",
                      "#A52A2A",
                    ],
                    data: [
                      orders?.length,
                      delivered?.length,
                      cancelled?.length,
                      preparing?.length,
                      paid?.length,
                      not_paid?.length,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
