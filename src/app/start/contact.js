import { useState } from "react";

// Contact Component
export default function ContactInfoSection() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };
  
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="flex flex-col w-full flex-wrap gap-4">
      <div className="flex flex-col">
        <h2 className="resume-section">basic information</h2>
        <div className="flex flex-wrap gap-4">
          <label>
            name
            <input type="text" name="name" required maxLength={25} />
          </label>
          <label>
            title
            <input type="text" name="title" required maxLength={20} />
          </label>
          <label>
            professional summary
            <textarea name="summary" maxLength={400} />
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="resume-section">contact information</h2>
        <div className="flex flex-wrap gap-4">
          <label>
            location
            <input type="text" name="location" maxLength={30} />
          </label>
          <label>
            email
            <input type="text" name="email" maxLength={25} />
          </label>
          <label>
            phone number
            <input
              type="text"
              name="phone"
              minLength={14}
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
            />
          </label>
          <label>
            github
            <input type="text" name="github" maxLength={20} />
          </label>
          <label>
            website url
            <input type="text" name="website" maxLength={50} />
          </label>
        </div>
      </div>
    </div>
  );
}
