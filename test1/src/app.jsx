import React, { useState } from "react";

const FormCarousel = () => {
  const [formIndex, setFormIndex] = useState(0);

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

  return (
    <div className="bg">
    <div className="main">
      <h1>{currentForm.name}</h1>
      <form>
        {currentForm.fields.map((field, index) => (
          <div className="content" key={index}>
            <label>{field.label}</label>
            <input type={field.type} />
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
    </div>
    </div>
  );
};

export default FormCarousel;
