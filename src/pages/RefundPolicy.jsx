import CommonHero from "../common/CommonHero";
import PolicyCard from "../common/PolicyCard";
import { LuArrowRightLeft } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import { GiMoneyStack } from "react-icons/gi";
import { MdFindReplace } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const RefundPolicy = () =>{
    return <div bg-slate-200>
        <CommonHero title="Refund Policy"
        bgColor="from-green-600 to-green-400"
        />

  <div className="px-20 py-10 ">
 <PolicyCard
        icon={<LuArrowRightLeft />}
        title={"Returns"}
        content={
          "We have a 7 days return, refund and replacement policy. Products can be returned within 7 days of delivery. Items must be unused, unwashed, and in original packaging with tags intact."
        }
      />

      <PolicyCard
        icon={<RxCrossCircled />}
        title={"Non-Returnable Items"}
        content={
          "Used or damaged products and items without original packaging are not eligible."
        }
      />

       <PolicyCard
        icon={<GiMoneyStack />}
        title={"Refund Process"}
        content={
          "Refunds will be processed within 5–10 business days after approval and credited to the original payment method."
        }
      />

       <PolicyCard
        icon={<MdFindReplace />}
        title={"Replacement"}
        content={
          "Replacement products will be delivered within 5–7 days. Replacement is available only for defective or wrong items."
        }
      />

       <PolicyCard
        icon={<MdLocalShipping />}
        title={"Shipping Policy"}
        content={
          "Products will be delivered within 5–7 days from the date of order confirmation."
        }
      />

             <PolicyCard
        icon={<FaWarehouse />}
        title={"Vendor Responsibility"}
        content={
          "As a multivendor platform, returns may be handled by individual sellers."
        }
      />

        <PolicyCard
        icon={<FaPhoneAlt />}
        title={"Contact"}
        content={
          "For return requests: Phone: 8423954942"
        }
      />
      </div>
    </div>
}

export default RefundPolicy;