import React, { useState } from "react";
import "./Support.css";
import { Button, Spin } from "antd";
import { createSessionCheckout } from "slices/billingSlice";
import { useDispatch } from "react-redux";

const SupportView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    setIsLoading(true);
    dispatch(
      createSessionCheckout({ priceId: "price_1N8nQjFX51BBY2GUFcqK3zlm" })
    )
      .unwrap()
      .then((res) => {
        window.location.href = res.url;
      });
  };

  return (
    <div className={"support-container"}>
      {isLoading && <Spin />}
      <p>Hi,</p>

      <p>
        Ambince is currently free and we'll make sure to always have a free
        version, but to make sure our business grows and changes the lives of
        many other people who want to improve themselves, we need your help.
      </p>

      <p>
        If you truly feel like we've helped you, or you like the things that you
        see, then please consider supporting the movement. Any amount is
        appreciated.
      </p>

      <p>
        Even if you can't provide any money, then just letting your friends know
        about us is just as good enough!
      </p>

      <Button type={"primary"} onClick={handleCheckout}>
        Support Ambince
      </Button>

      <p>Thanks so much!</p>
    </div>
  );
};

export default SupportView;
