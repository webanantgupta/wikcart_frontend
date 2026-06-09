import CommonHero from "../common/CommonHero";
import PolicyCard from "../common/PolicyCard";
import { FaBook } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineDisconnect } from "react-icons/ai";
import { LiaCookieSolid } from "react-icons/lia";
import { FaLock } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-200">
      <CommonHero
        title="Privacy Policy"
        bgColor="from-imdigo-600 to-indigo-400"
      />

      <div className="px-20 py-10 ">
        <PolicyCard
          icon={<FaBook />}
          title={"Information We Collect"}
          content={
            "Name, phone, email, address, payment details, order history, device info."
          }
        />

        <PolicyCard
          icon={<IoMdSettings />}
          title={"How We Use Information"}
          content={
            "To process orders, improve services, communicate updates, and ensure security."
          }
        />

        <PolicyCard
          icon={<AiOutlineDisconnect />}
          title={"Sharing of Information"}
          content={
            "Shared only with delivery partners, payment gateways, and vendors when needed."
          }
        />

        <PolicyCard
          icon={<LiaCookieSolid />}
          title={"Cookies"}
          content={
            "Used to improve user experience. Can be disabled via browser settings."
          }
        />

        <PolicyCard
          icon={<FaLock />}
          title={"Data Security"}
          content={"We use security measures but no system is 100% secure."}
        />

        <PolicyCard
          icon={<IoMdPerson />}
          title={"Your Rights"}
          content={
            "You can request access, correction, or deletion of your data."
          }
        />

        <PolicyCard
          icon={<FaPhoneAlt />}
          title={"Contact"}
          content={"Phone: 8423954942 Address: Sultanpur, UP"}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
