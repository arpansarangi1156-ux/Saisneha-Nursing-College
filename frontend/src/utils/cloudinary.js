export const optimizeCloudinaryUrl = (url, width, height) => {
  if (!url) return url;
  // Ensure it's a Cloudinary URL before replacing
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Base transformations: automatic format and quality for CDN optimization
  const transformations = ['f_auto', 'q_auto'];
  
  // Optional resizing
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push('c_fill'); // c_fill ensures it fills the dimensions without distortion

  const transformationString = transformations.join(',');
  
  // Insert transformations immediately after /upload/
  return url.replace('/upload/', `/upload/${transformationString}/`);
};
