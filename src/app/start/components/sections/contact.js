import { Field, ErrorMessage } from "formik";

export default function ContactSection() {
  return (
    <div className="flex gap-4 flex-wrap">
      <div>
        <label htmlFor="contact.name">Name</label>
        <Field name="contact.name" type="text" className="input-field" />
        <ErrorMessage
          name="contact.name"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.title">Title</label>
        <Field name="contact.title" type="text" className="input-field" />
        <ErrorMessage
          name="contact.title"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div className="w-full">
        <label htmlFor="contact.summary">Professional Summary</label>
        <Field name="contact.summary" as="textarea" className="input-field" />
        <ErrorMessage
          name="contact.summary"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.phone">Phone</label>
        <Field name="contact.phone" type="tel" className="input-field" />
        <ErrorMessage
          name="contact.phone"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.email">Email</label>
        <Field name="contact.email" type="email" className="input-field" />
        <ErrorMessage
          name="contact.email"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.location">Location</label>
        <Field name="contact.location" type="text" className="input-field" />
        <ErrorMessage
          name="contact.location"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.github">GitHub</label>
        <Field name="contact.github" type="url" className="input-field" />
        <ErrorMessage
          name="contact.github"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
      <div>
        <label htmlFor="contact.website">Website</label>
        <Field name="contact.website" type="url" className="input-field" />
        <ErrorMessage
          name="contact.website"
          component="div"
          className="p-1 text-red-600 rounded text-xs border border-red-600"
        />
      </div>
    </div>
  );
}
