// Contact Component
export default function ContactInfoSection() {
  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="flex flex-col">
        <h2 className="resume-section">basic information</h2>
        <label>
          name
          <input type="text" name="name" required maxLength={50} />
        </label>
        <label>
          title
          <input type="text" name="title" required maxLength={50} />
        </label>
        <label>
          professional summary
          <textarea name="summary" required maxLength={400} />
        </label>
      </div>
      <div className="flex flex-col">
        <h2 className="resume-section">contact information</h2>
        <label>
          location
          <input type="text" name="location" required maxLength={50} />
        </label>
        <label>
          email
          <input type="text" name="email" required maxLength={50} />
        </label>
        <label>
          phone number
          <input type="text" name="phone" required maxLength={50} />
        </label>
        <label>
          github
          <input type="text" name="github" required maxLength={50} />
        </label>
        <label>
          website url
          <input type="text" name="website" required maxLength={50} />
        </label>
      </div>
    </div>
  );
}