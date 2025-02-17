/**
 * Strips HTML tags from a string while preserving the text content
 * @param {string} html - The HTML string to strip tags from
 * @returns {string} The text content without HTML tags
 */
export const stripHtmlTags = (html) => {
  if (!html) return '';
  
  // Create a temporary div element
  const temp = document.createElement('div');
  // Set the HTML content
  temp.innerHTML = html;
  // Return the text content only
  return temp.textContent || temp.innerText || '';
};
