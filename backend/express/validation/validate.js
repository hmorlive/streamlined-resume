function validateData(data) {
  // Validate the contact section
  validateContact(data.contact);

  // Validate the skills array
  validateArray(data.skills, validateSkill, 25, "skills");

  // Validate the languages array
  validateArray(data.languages, validateLanguage, 5, "languages");

  // Validate the education array
  validateArray(data.education, validateEducation, 3, "education");

  // Validate the experience section
  data.experience.forEach(validateExperience);

  // Validate the projects array
  validateArray(data.projects, validateProject, 3, "projects");
}

/**
 * Validates the contact object
 * @param {*} contact
 */
function validateContact(contact) {
  validateStringLength(contact.name, 25, "contact.name");
  validateStringLength(contact.title, 25, "contact.title");
  validateStringLength(contact.summary, 500, "contact.summary");
  validateStringLength(contact.location, 25, "contact.location");
  validateEmail(contact.email);
  validatePhone(contact.phone);
  validateStringLength(contact.website, 50, "contact.website");
  validateStringLength(contact.github, 25, "contact.github");
}

/**
 * Validates length of string
 * @param {*} value
 * @param {*} maxLength
 * @param {*} fieldName
 */
function validateStringLength(value, maxLength, fieldName) {
  if (value.length === 0) return;
  if (typeof value !== "string" || value.length > maxLength) {
    throw new Error(
      `${fieldName} must be a string with max length ${maxLength}`
    );
  }
}

/**
 * Validates email
 * @param {*} email
 */
function validateEmail(email) {
  if (email.length === 0) return;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
}

/**
 * Validates phone number
 * @param {*} phone
 */
function validatePhone(phone) {
  if (phone.length === 0) return;
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error("Invalid phone format, expected format: (999) 999-9999");
  }
}

/**
 * validates a given array
 * @param {*} array
 * @param {*} validator
 * @param {*} maxLength
 * @param {*} fieldName
 */
function validateArray(array, validator, maxLength, fieldName) {
  if (!Array.isArray(array) || array.length > maxLength) {
    throw new Error(
      `${fieldName} must be an array with max length ${maxLength}`
    );
  }
  array.forEach(validator);
}

/**
 * Validates skill object
 * @param {*} skill
 */
function validateSkill(skill) {
  if (skill.length === 0) return;
  validateStringLength(skill.skill, 25, "skill.skill");
}

/**
 * Validates language object
 * @param {*} language
 */
function validateLanguage(language) {
  if (language.length === 0) return;
  validateStringLength(language.language, 20, "language.language");
}

/**
 * Validates education object
 * @param {*} education - education section
 */
function validateEducation(education) {
  validateStringLength(education.name, 50, "education.name");
  validateDate(education.date, "education.date");
  validateStringLength(education.institution, 50, "education.institution");
  validateStringLength(education.location, 50, "education.location");
}

/**
 * Validates experience object
 * @param {*} experience - experience section
 */
function validateExperience(experience) {
  validateStringLength(experience.title, 50, "experience.title");
  validateStringLength(experience.company, 25, "experience.company");
  validateDate(experience.from, "experience.from");
  validateDate(experience.to, "experience.to");
  validateStringLength(
    experience.keypoints.join(""),
    500,
    "experience.keypoints"
  );
}

/**
 * Validates the project object
 * @param {*} project - project data
 */
function validateProject(project) {
  validateStringLength(project.name, 50, "project.name");
  validateDate(project.date, "project.date");
  validateURL(project.url);
  validateStringLength(project.description, 500, "project.description");
}

/**
 * Validates date
 * @param {*} date - date to be validated
 * @param {*} fieldName - name of field to validate
 */
function validateDate(date, fieldName) {
  if (date.length === 0) return;
  if (isNaN(new Date(date).getTime())) {
    throw new Error(`Invalid date format for ${fieldName}`);
  }
}

/**
 * Validates url
 * @param {*} url - url to be validated
 */
function validateURL(url) {
  if (url.length === 0) return;
  const urlRegex = /^[^\s/$.?#].[^\s]*$/i;
  if (!urlRegex.test(url)) {
    throw new Error("Invalid URL format");
  }
}

module.exports = {
  validateData,
};
