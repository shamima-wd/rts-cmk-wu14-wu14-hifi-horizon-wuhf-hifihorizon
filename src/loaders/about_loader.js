import { API_BASE_URL } from "../config/api";

export const loadAboutUs = async () => {
  const response = await fetch(`${API_BASE_URL}/about_us`);
  if (!response.ok) {
    throw new Error("Failed to load about us data");
  }
  const aboutData = await response.json();

  // Transform image paths to include API_BASE_URL
  Object.keys(aboutData).forEach((key) => {
    if (aboutData[key].image) {
      aboutData[key].image = `${API_BASE_URL}/${aboutData[key].image}`;
    }
  });

  return aboutData;
};
