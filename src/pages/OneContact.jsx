import React from "react";
import { useParams } from "react-router-dom";
import { contactService } from "../services/contacts.service";
import { useSelector } from "react-redux";


function OneContact() {
  const contact = useSelector((state) => state.contacts.value);
  let { bookId } = useParams();
  // let contact = contactService.getContact(bookId);
  return (
    <div className="relative">
      <div className="flex pb-8">
        <div className="flex relative pl-10 pt-10">
          <img src={contact.image} className="w-40  h-40 rounded-full" />
          <div className="text-3xl pt-10 pl-5 ">
            {contact.firstName}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="mt-4 ml-2"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
          </div>
        </div>
        <div className="flex   ml-60 pl-48 mt-44 ">
          <div className="px-3 mt-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="NSy2Hd cdByRd RTiFqe undefined"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
            </svg>
          </div>
          <div className="px-3 mt-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="NSy2Hd cdByRd RTiFqe undefined"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <div className="px-3">
            <button className="bg-blue-500 w-16 h-8 rounded text-white text-sm font-semibold">
              Edit
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="pt-7 pl-10">
        <div className="w-[500px] h-[95px] border-2 rounded-md p-3">
          <span className="font-semibold">Contact Details</span>
          <div className="flex pt-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
        
              className="mr-3 mt-1"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"></path>
            </svg>
            <div className="mb-2">
              <a href="#" className="text-blue-600 pb-4 text-sm">
              
                {contact.phone}
              </a>
              . Mobile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneContact;
