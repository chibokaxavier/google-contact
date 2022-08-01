import React from "react";
import { useParams } from "react-router-dom";
import { contactService } from "../services/contacts.service";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function OneOther() {
  let { bookId } = useParams();
  let contact = contactService.getContact(bookId);
  return (
    <div className="relative">
      <div className="flex pb-8">
        <div className="flex relative pl-10 pt-10">
          <img src={contact.image} className="w-40  h-40 rounded-full" />
          <div className="text-3xl pt-10 pl-5 ">
            {contact.name}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              // className="NSy2Hd cdByRd RTiFqe undefined"
              className="mt-4 ml-2"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
          </div>
        </div>
        <div className="flex   ml-60 pl-48 mt-44 ">
          <div className="px-3 mt-1">
            <PersonAddOutlinedIcon />
          </div>
          <div className="px-3 mt-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="opacity-70"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <div className="px-3"></div>
        </div>
      </div>
      <hr />
      <div className="pt-7 pl-10">
        <div className="w-[500px] h-[95px] border-2 rounded-md p-3">
          <span className="font-semibold">Contact Details</span>
          <div className="flex pt-2">
            <EmailOutlinedIcon className="mr-3" />

            <div className="mb-2">
              <a href="#" className="text-blue-600 pb-4 text-sm">
                {" "}
                {contact.email}{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneOther;
