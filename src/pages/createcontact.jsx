import React, { useState, useRef } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import TextField from "@mui/material/TextField";
import BusinessIcon from "@mui/icons-material/Business";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { contactService } from "../services/contacts.service";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getContacts } from "../store/slices/contacts.slice";
import { getLabels } from "../store/slices/label.slice";
import { open, setMessage } from "../store/slices/snackbar.slice";
import { labelService } from "../services/labels.service";
// import { getLabels } from "../store/slices/label.slice";


// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 0,
  height: 0,
  boxShadow: 24,
  pt: 0,
  px: 0,
  pb: 0,
};

function Createcontact() {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [appliedLabels, setAppliedLabels] = useState([]);
  const labelList = useSelector((state) => state.labelList.value);
  const [Labelopen, setLabelOpen] = React.useState(false);
  const handleLabelOpen = () => {
    setLabelOpen(true);
  };

  const handleLabelClose = () => {
    setLabelOpen(false);
  };
  const dispatch = useDispatch();
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    birthday: "",
    notes: "",
  });
  const inputFileRef = useRef();
  const imageRef = useRef();
  const user = useSelector((state) => state.authentication.user);
  const LabelUser = useSelector((state) => state.labelList.value);
  const handleSubmit = async (e) => {
    await contactService.create(
      { ...newContact, labels: appliedLabels.map((x) => x.id) },
      user.uid
    );
    dispatch(setMessage("Contact Created Successfully"));
    dispatch(open());
    dispatch(getContacts(user.uid));
    dispatch(getLabels(user.uid));
    setNewContact({
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      email: "",
      phone: "",
      birthday: "",
      notes: "",
    });
  };
  const [openLabel, setOpenLabel] = useState(false);
  const [label, setLabel] = useState("");
  const [CreateLabelopen, setCreateLabelOpen] = React.useState(false);

  const handleLabelSubmit = () => {
    const newLabel = { id: docRef.id, title: label };
    labelService.saveLabel(newLabel, user.uid);
    // dispatch(addLabel(newLabel));
    dispatch(getLabels(user.uid));
    setOpenLabel(false);
    setLabel("");
  };
  const selectFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      var imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        imageRef.current.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const clearInput = () => {
    setNewContact({
      firstName: "",
      lastName: "",
    });
  };
  const clearCompanyInput = () => {
    setNewContact({
      company: "",
      jobTitle: "",
    });
  };
  const clearEmailInput = () => {
    setNewContact({
      email: "",
    });
  };
  const clearTelInput = () => {
    setNewContact({
      phone: "",
    });
  };

  const clearBirthdayInput = () => {
    setNewContact({
      birthday: "",
    });
  };
  const clearNotesInput = () => {
    setNewContact({
      notes: "",
    });
  };
  const handleCreateLabelOpen = () => {
    setCreateLabelOpen(true);
  };
  const handleCreateLabelClose = () => {
    setCreateLabelOpen(false);
  };

  const handleChange = (event) => {
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };
  const manageLabels = (id) => {
    let label_exists = selectedLabels.includes(id);
    if (label_exists) {
      // del label
      setSelectedLabels(selectedLabels.filter((x) => x != id));
      return;
    }
    setSelectedLabels([...selectedLabels, id]);
  };
  const applyLabels = () => {
    setAppliedLabels(
      selectedLabels.map((x) => LabelUser.find((label) => label.id == x))
    );
  };
  return (
    <>
      <div className="pt-5 cursor-pointer ">X</div>
      <div className="ml-10 ">
        <div className="mb-30 fixed z-50  border-b-2 w-[90%] bg-white top-[80px]">
          <div className="flex relative mt-0">
            {/* <AccountCircleOutlinedIcon className="h-40 w-40" /> */}
            <img
              ref={imageRef}
              src="/img.png"
              className="w-40 h-44 rounded-full opacity-20"
            />
            <div className="w-12 h-12 bg-gray-400 absolute left-14 top-20  rounded-full cursor-pointer">
              <input
                type="file"
                className="mt-5"
                hidden
                ref={inputFileRef}
                accept="image/*"
                onChange={selectFile}
              />
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className=" opacity-50 ml-2 mt-2"
                onClick={() => inputFileRef.current.click()}
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 10h-2V7h-3V5h3V2h2v3h3v2h-3v3zm-4 3c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm4-1v7H4V7h9V3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7h-2z"></path>
              </svg>
            </div>
            <div className="ml-10 flex">
              {appliedLabels.map((lab) => (
                <div
                  key={lab.id}
                  className="mt-24 ml-2 rounded-[12px] h-7 px-2  border border-gray-400 cursor-pointer"
                >
                  {lab.name}
                </div>
              ))}
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="ml-4  mt-[100px] cursor-pointer stroke-blue-500  "
              onClick={handleLabelOpen}
            >
              <path fill="white" d="M0 0h24v24H0V0z"></path>
              <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
          </div>
          <button
            className="bg-blue-500 text-white h-8 w-20 ml-[900px] mb-7 rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        <form action="" className="mt-[23%]">
          <div className="mt-10">
            <div className="flex">
              <PermIdentityIcon className="opacity-60 mt-6 mr-8 pr-1" />{" "}
              <TextField
                className=" opacity-50 w-[500px]"
                id="standard-basic"
                label="First Name"
                variant="standard"
                name="firstName"
                value={newContact.firstName}
                onChange={handleChange}
                type="text"
              />
              <div className="mt-5 ml-5 cursor-pointer " onClick={clearInput}>
                X
              </div>
            </div>
            <div className="flex ml-14 ">
              {" "}
              <TextField
                className="w-[500px] opacity-50 "
                id="standard-basic"
                label="Last Name"
                variant="standard"
                name="lastName"
                value={newContact.lastName}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="flex">
              <BusinessIcon className="opacity-60 mt-6 mr-8 pr-1" />{" "}
              <TextField
                className=" opacity-50 w-[500px]"
                id="standard-basic"
                label="Company"
                variant="standard"
                name="company"
                value={newContact.company}
                onChange={handleChange}
                type="text"
              />
              <div
                className="mt-5 ml-5 cursor-pointer "
                onClick={clearCompanyInput}
              >
                X
              </div>
            </div>
            <div className="flex ml-14 ">
              {" "}
              <TextField
                className="w-[500px] opacity-50 "
                id="standard-basic"
                label="Job Title"
                variant="standard"
                name="jobTitle"
                value={newContact.jobTitle}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="flex">
              <MailOutlineIcon className="opacity-60 mt-6 mr-8 pr-1" />{" "}
              <TextField
                className=" opacity-50 w-[500px]"
                id="standard-basic"
                label="Email"
                variant="standard"
                name="email"
                value={newContact.email}
                onChange={handleChange}
                type="email"
              />
              <div
                className="mt-5 ml-5 cursor-pointer "
                onClick={clearEmailInput}
              >
                X
              </div>
            </div>
            <div className="flex ">
              <LocalPhoneIcon className="opacity-60 mt-6 mr-8 pr-1" />
              <Autocomplete
                className="w-10"
                id="country-select-demo"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    className="w-10"
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    className="w-"
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <TextField
                className=" opacity-50 w-[500px] ml-20"
                id="standard-basic"
                label="Phone"
                variant="standard"
                name="phone"
                value={newContact.phone}
                onChange={handleChange}
                type="tel"
              />
              <div
                className="mt-5 ml-5 cursor-pointer "
                onClick={clearTelInput}
              >
                X
              </div>
            </div>
            <div className="flex">
              <CakeOutlinedIcon className="opacity-60 mt-6 mr-8 pr-1" />
              <TextField
                className=" opacity-50 w-[500px]"
                id="standard-basic"
                label="Birthday"
                variant="standard"
                name="birthday"
                value={newContact.birthday}
                onChange={handleChange}
                type="date"
              />
              <div
                className="mt-5 ml-5 cursor-pointer "
                onClick={clearBirthdayInput}
              >
                X
              </div>
            </div>
            <div className="flex">
              <TextSnippetOutlinedIcon className="opacity-60 mt-6 mr-8 pr-1" />
              <TextField
                className=" opacity-50 w-[500px]"
                id="standard-basic"
                label="Notes"
                variant="standard"
                name="notes"
                value={newContact.notes}
                onChange={handleChange}
                type="text"
              />
              <div
                className="mt-5 ml-5 cursor-pointer "
                onClick={clearNotesInput}
              >
                X
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal
        open={Labelopen}
        onClose={handleLabelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300, pt: 2 }}>
          <h2 id="parent-modal-title"></h2>
          <p id="parent-modal-description" className="pl-7 pb-5 text-sm">
            Manage Labels
          </p>
          {labelList.map((item) => {
            const { name, id } = item;
            return (
              <div className=" mb-4 flex cursor-pointer ml-5" key={id}>
                {/* <NavLink
                  to={`/labels/${item.id}`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-400" : "text-black-400"
                    } transition-all duration-1000`
                  }
                > */}
                <div className="flex" onClick={() => manageLabels(id)}>
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="ml-1 opacity-70"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                    </svg>
                  </div>

                  <div className="ml-7">{name}</div>
                  {selectedLabels.includes(id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                {/* </NavLink> */}
              </div>
            );
          })}
          <hr />
          {selectedLabels.length != appliedLabels.length ? (
            <div
              onClick={() => {
                applyLabels();
                handleLabelClose();
              }}
              className="cursor-pointer"
            >
              <span className="ml-7 pt-4">Apply</span>
            </div>
          ) : (
            <div className="cursor-pointer" onClick={handleCreateLabelOpen}>
              {" "}
              <span className="ml-7 pt-4 h-10 w-10">+</span>
              <span className="ml-7 pt-4">Create Label</span>{" "}
            </div>
          )}
        </Box>
      </Modal>
      <Modal
        open={CreateLabelopen}
        onClose={handleCreateLabelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 380, height: 200, pt: 2 }}>
          <h2 id="parent-modal-title"></h2>
          <p id="parent-modal-description" className="pl-5">
            Create Label
          </p>
          <Input
            placeholder=""
            className="mt-8 ml-9 w-[300px]"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <div className="flex justify-end text-blue-500 mt-10">
            <button
              onClick={handleCreateLabelClose}
              className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleLabelSubmit}
              className=" mr-4 bg-white w-16 h-8 rounded  text-sm font-semibold hover:bg-gray-100"
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      ;
    </>
  );
}

export default Createcontact;

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan, Province of China",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
