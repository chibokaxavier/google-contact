import React from "react";
import { contactService } from "../services/Contacts.service";
import { NavLink } from "react-router-dom";

export function Contacts() {
  return (
    <div className="text-sm bg-white pl-5">
      <div className=" ">
        <div className="grid grid-cols-4  border-b border-b-gray-600/50">
          <div className="py-3 font-normal">Name</div>
          <div className="py-3 font-normal pl-3">Email</div>
          <div className="py-3 font-normal pl-3">Phone Number</div>
          <div className="py-3 font-normal pl-3">Job title & Company</div>
        </div>

        <div className="">
          <div className="text-[11px] mt-5 mb-3">
            <span className="text-[11px]">CONTACTS</span> (
            {contactService.getContacts().length})
          </div>

          {contactService.getContacts().map((contact) => (
            <div
              key={contact.id}
              className="py-3 gap-6  grid grid-cols-4 hover:bg-gray-200  relative"
            >
              <div className="flex gap-2">
                <img src={contact.image} className="w-10 h-10 rounded-full" />
                <div className="">{contact.name}</div>
              </div>
              <div></div>
              <div className="">{contact.phone}</div>
              <NavLink
                className="absolute w-full h-full left-0 top-0 z-1"
                to={`/${contact.id}`}
              ></NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
