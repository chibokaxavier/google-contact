import React from "react";
import { contactService } from "../services/contacts.service";
import { NavLink } from "react-router-dom";
import { FreqcontactService } from "../services/freqContacts.service";
import { useSelector } from "react-redux";


export function FreqContacted() {
  const contacts = useSelector((state) => state.contacts.value);
  return (
    <div className="text-sm pl-6 ">
      <div className=" ">
        <div className="grid grid-cols-4">
        <div className="py-3 font-normal">Name</div>
        <div className="py-3 font-normal pl-3">Email</div>
        <div className="py-3 font-normal pl-3">Phone Number</div>
        <div className="py-3 font-normal pl-3">Job title & Company</div>

        </div>
       
        <hr />
        <div className="text-[11px] mt-5 mb-3">
          <span className="text-[11px]">FREQUENTLY CONTACTED</span> 

        </div>

        {contacts.map((contact) => (
          <div key={contact.id} className="py-3  gap-6 grid grid-cols-4 hover:bg-gray-200  relative">
            <div className="flex gap-2">
              {/* <img src={contact.image} className="w-10 h-10 rounded-full" /> */}
              <div className="">{contact.firstName}</div>
            </div>
            
            <div className="">{contact.email}</div>
            <div className="">{contact.phone}</div>
            <NavLink
            className="absolute w-full h-full left-0 top-0 z-1"
            to={`/FreqContacted/${contact.id}`}
          ></NavLink>

          </div>
        ))}
      </div>
    </div>
  );
}
