import React from "react";
import { contactService } from "../services/contacts.service";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "37%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "",

  height: 0,
  boxShadow: 24,
  pt: 0,
  px: 0,
  pb: 0,
};

function Other() {
  const contacts = useSelector((state) => state.contacts.value);
  const [infoopen, setInfoOpen] = React.useState(false);
  const handleInfoOpen = () => {
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };
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
          <div className="text-[11px] mt-5 mb-3 flex">
            <span className="text-[11px]">OTHER CONTACTS</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              //   className="NSy2Hd cdByRd RTiFqe undefined"
              className="ml-2 opacity-50 cursor-pointer "
              onMouseOver={handleInfoOpen}
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
            </svg>
          </div>

          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="py-3 gap-6  grid grid-cols-4 hover:bg-gray-200  relative"
            >
              <div className="flex gap-2">
                <img src={contact.image} className="w-10 h-10 rounded-full" />
                <div className="">{contact.firstName}</div>
              </div>
              <div className="">{contact.email}</div>
              <NavLink
                className="absolute w-full h-full left-0 top-0 z-1"
                to={`/Other/${contact.id}`}
              ></NavLink>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={infoopen}
        onClose={handleInfoClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 550, height: 150, pt: 2 }}>
          <h2 id="parent-modal-title"></h2>
          <p id="parent-modal-description" className="pl-5">
            People you’ve interacted with in Google products, as well as any
            contacts you’ve hidden from your list. These contacts appear as
            autocomplete suggestions to help you communicate and share. Go to
            your Google Account to control how these contacts are saved.
          </p>
          {/* <Input placeholder="" className="mt-8 ml-9 w-[300px]" /> */}
          <div className="flex justify-end text-blue-400 mt">
            <button className=" mr-9 bg-white w-20 h-8 rounded  text-sm  hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Other;
