import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contactService } from "../services/contacts.service";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function OneLabel() {
  const all_contacts = useSelector((state) => state.contacts.value);
  const [contacts, setContacts] = useState([]);
  let { label_id } = useParams();
  useEffect(() => {
    setContacts(
      all_contacts.filter((person) => {
        let labels = person.labels || [];
        return labels.includes(label_id);
      })
    );
  }, [label_id,all_contacts]);

  //  let contact = contactService.getContact(bookId);
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
            <span className="text-[11px]">CONTACTS</span>
            <span className="ml-3">{contacts.length}</span>
          </div>

          {contacts.map((item) => {
            return (
              <div
                key={item.id}
                className="py-3 gap-6  grid grid-cols-4 hover:bg-gray-200  relative"
              >
                <div className="flex gap-2">
                  {/* <img src={contact.image} className="w-10 h-10 rounded-full" /> */}
                  <div className="">
                    {item.firstName} {item.lastName}
                  </div>
                </div>
                <div></div>
                <div className="">{item.phone}</div>
                <NavLink
                  className="absolute w-full h-full left-0 top-0 z-1"
                  to={`/Contacts/${item.id}`}
                ></NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default OneLabel;
