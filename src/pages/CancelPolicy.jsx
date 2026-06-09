import CommonHero from "../common/CommonHero";
import PolicyCard from "../common/PolicyCard";
import { RxCross2 } from "react-icons/rx";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const CancelPolicy = () => {
  return (
    <div className="bg-slate-200">
      <CommonHero
        title="Cancellation Policy"
        bgColor="from-pink-600 to-pink-400"
      />

      <div className="px-20 py-10 ">
        <PolicyCard
          icon={<RxCross2 />}
          title={"Order Cancellation"}
          content={
            "Orders can be cancelled before dispatch. Once shipped, cancellation is not allowed."
          }
        />

        <PolicyCard
          icon={<GiTakeMyMoney />}
          title={"Refund on Cancellation"}
          content={
            "If cancelled successfully, the refund will be initiated within 5–7 business days."
          }
        />

        <PolicyCard
          icon={<FaWarehouse />}
          title={"Vendor Orders"}
          content={
            "Some products may be shipped directly by vendors; cancellation policies may vary."
          }
        />

        <PolicyCard
          icon={<FaPhoneAlt />}
          title={"How to Cancel"}
          content={"Contact us at: Phone: 8423954942"}
        />
      </div>
    </div>
  );
};

export default CancelPolicy;
