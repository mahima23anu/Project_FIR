import React, { useState } from "react";
import ProjectFIR from './abis/ProjectFIR.json';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3/dist/web3.min.js"; 



const FormCarousel = () => {
  const [formIndex, setFormIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [witness, setWitness] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  
  


  const forms = [
    {
      name: "Personal Information",
      fields: [
        { label: "Full Name", type: "text" },
        { label: "Email", type: "email" },
        { label: "Phone Number", type: "tel" }
      ]
    },
    {
      name: "Address",
      fields: [
        { label: "Street Address", type: "text" },
        { label: "City", type: "text" },
        // { label: "State", type: "text" },
        { label: "Zip Code", type: "number" }
      ]
    },
    {
      name: "Complaint",
      fields: [
        { label: "Witness", type: "text" },
        { label: "Incident Date", type: "month" },
        { label: "Details", type: "text" }
      ]
    }
  ];

  const handleNext = () => {
    setFormIndex(formIndex + 1);
  };

  const handlePrev = () => {
    setFormIndex(formIndex - 1);
  };

  const currentForm = forms[formIndex];

  async function launchFIR() {
    const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('account: ', accounts[0]);
    const provider = await detectEthereumProvider();

if ( provider) {
  console.log('Connected');
  window.web3 = new Web3(provider);
} else {
  console.log('Not Connected'); 
}
const AccountAddress = await window.web3.eth.getAccounts();
console.log(AccountAddress);
var id = 0;
await window.web3.eth.net.getId()
 .then(
   data => {
        id = data;  
   });
   console.log(id);
const networkData = await ProjectFIR.networks[id];
console.log(networkData);
if ( networkData ) {
    const abi = ProjectFIR.abi;
    const contractAddress = networkData.address;
     const newcontract = new window.web3.eth.Contract(abi, contractAddress);  
     console.log(newcontract); 
     console.log(AccountAddress[0])
     var check;
     await newcontract.methods.launchFIR(name,email,phone,phone,street,city,zip,witness,date,details)
     .send({from: AccountAddress[0], to: contractAddress, gasPrice: Web3.utils.toHex(10e9), gas: Web3.utils.toHex(0x186a0)})
    

    //  newcontract.methods.mint(metadataUrl, window.web3.utils.toWei(String(5), 'ether'), "Demo", "New").send({from: AccountAddress[0]})
    //  .then( async function(receipt){
    //      if ( receipt.status == true ) {
    //       alert('Miniting Successfull!!')
    //       setLoading(false);
    //      }
    //  })
   }
   
  }

  return (
    <div className="bg">
    <div className="main">
      <h1>{currentForm.name}</h1>
      <form>
        {currentForm.fields.map((field, index) => (
          <div className="content" key={index}>
            <label>{field.label}</label>
            <input type={field.type} onChange = { (e) => {
                if ( field.label === "Full Name" ) {
                  setName(e.target.value);
                  console.log(name);
                } else if ( field.label === "Email" ) {
                  setEmail(e.target.value);
                  console.log(email);
                } else if ( field.label === "Phone Number" ) {
                  setPhone(e.target.value);
                  console.log(phone);
                } else if ( field.label === "Street Address" ) {
                  setStreet(e.target.value);
                  console.log(street);
                } else if ( field.label === "City" ) {
                  setCity(e.target.value);
                  console.log(city);
                } else if ( field.label === "Zip Code" ) {
                  setZip(e.target.value);
                  console.log(zip);
                } else if ( field.label === "Witness" ) {
                  setWitness(e.target.value);
                  console.log(witness);
                } else if ( field.label === "Incident Date" ) {
                  setDate(e.target.value);
                  console.log(date);
                } else if ( field.label === "Details" ) {
                  setDetails(e.target.value);
                  console.log(details);
                }
            }}/>
          </div>
        ))}
      </form>
      <div className="btn">
      <button className="btn" onClick={handlePrev} disabled={formIndex === 0}>
        Previous
      </button>
      <button className="btn" onClick={handleNext} disabled={formIndex === forms.length - 1}>
        Next
      </button>
      </div>
      <button onClick={ () => {
          launchFIR();
      }}>
        Launch FIR
      </button>
    </div>
    </div>
  );
};

export default FormCarousel;
