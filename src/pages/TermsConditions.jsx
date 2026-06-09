import CommonHero from "../common/CommonHero";
import PolicyCard from "../common/PolicyCard";
import { IoPinSharp } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { BsBagFill } from "react-icons/bs";
import { IoCard } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { FaWeightScale } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";


const TermsCondition = () => {
  return (
    <div className="bg-slate-200">
      <CommonHero
        title="Terms & Conditions"
        bgColor="from-pink-400 to-orange-400"
      />
    
     <div className="px-20 py-10 ">
        <PolicyCard
              icon={<IoPinSharp />}
                  title={"General"}
                  content={"WikCart is a multivendor platform selling clothing and may expand in future. We reserve the right to update terms anytime."}
        />

         <PolicyCard
              icon={<IoMdPerson />}
                  title={"User Responsibilities"}
                  content={"Users must provide accurate information and maintain account confidentiality."}
        />

        <PolicyCard
              icon={<BsBagFill />}
                  title={"Product Information"}
                  content={"We strive for accuracy but product descriptions may vary. Prices are subject to change."}
        />

        <PolicyCard
              icon={<IoCard />}
                  title={"Orders & Payments"}
                  content={"Orders are confirmed after successful payment. Suspicious orders may be cancelled."}
        />

        <PolicyCard
              icon={<GiShop />}
                  title={"Vendor Responsibility"}
                  content={"Products are sold by third-party vendors. Vendors are responsible for quality and delivery."}
        />

          <PolicyCard
              icon={<FaExclamationTriangle />}
                  title={"Limitation of Liability"}
                  content={"WikCart is not liable for indirect damages or losses."}
        />

        
          <PolicyCard
              icon={<RiFilePaper2Fill />}
                  title={"Intellectual Property"}
                  content={"All website content belongs to WikCart."}
        />

           <PolicyCard
              icon={<FaWeightScale />}
                  title={"Governing Law"}
                  content={"These terms are governed by Indian law."}
        />

          <PolicyCard
              icon={<FaPhoneAlt />}
                  title={"Contact"}
                  content={"Phone: 8423954942 Address: Amiliya Sikra Jaisinghpur, Sultanpur, UP"}
        />
     </div>

     


  
    </div>
  );
};

export default TermsCondition;
