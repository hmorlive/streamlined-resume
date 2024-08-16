import { useState } from "react";

// Contact Component
export default function ContactInfoSection({ add }) {
  //format phone number as (999) 999-9999
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

  //format github handle
  const formatGithubValue = (value) => {
    if (!value) return value;
    return "@" + value.replace(/@/g, '');
  }

  //manage state of contact fields
  const [data, setData] = useState({
    name: "",
    title: "",
    summary: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    github: "",
  });

  //handle change in input
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "phone") {
      setData({ ...data, phone: formatPhoneNumber(e.target.value) });
    } else if (e.target.name === "github") {
      setData({ ...data, github: formatGithubValue(e.target.value) });
    }else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
    add(data);
  };

  return (
    <div className="flex flex-col w-full flex-wrap gap-4">
      <div className="flex flex-col">
        <h2 className="resume-section">basic information</h2>
          <div className="flex flex-wrap gap-6">
            <label>
              name
              <input
                type="text"
                name="name"
                required
                maxLength={25}
                onChange={handleChange}
                value={data.name}
              />
            </label>
            <label>
              title
              <input
                type="text"
                name="title"
                required
                maxLength={20}
                onChange={handleChange}
                value={data.title}
              />
            </label>
          </div>
          <label>
            professional summary
            <textarea
              name="summary"
              maxLength={400}
              onChange={handleChange}
              value={data.summary}
            />
          </label>
      </div> 
      <div className="flex flex-col">
        <h2 className="resume-section">contact information</h2>
        <div className="flex flex-wrap gap-6">
            <label>
              location
              <input
                type="text"
                name="location"
                maxLength={30}
                onChange={handleChange}
                value={data.location}
                placeholder="Miami, FL"
              />
            </label>
            <label>
              email
              <input
                type="email"
                name="email"
                maxLength={25}
                onChange={handleChange}
                value={data.email}
                placeholder="mail@hazmedmoreno.com"
              />
            </label>
            <label>
              phone number
              <input
                type="text"
                name="phone"
                minLength={14}
                onChange={handleChange}
                value={data.phone}
                placeholder="(999) 999-9999"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-6">
          <label>
            github
            <input
              type="text"
              name="github"
              maxLength={20}
              onChange={handleChange}
              value={data.github}
              placeholder="@hmorlive"
            />
          </label>
          <label>
            website url
            <input
              type="url"
              name="website"
              maxLength={50}
              onChange={handleChange}
              value={data.website}
              placeholder="https://hazmedmoreno.com"
            />
          </label>
          </div>
        </div>
    </div>
  );
}
