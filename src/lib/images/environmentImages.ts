import fs from 'fs';
import path from 'path';

export interface EnvironmentImage {
  src: string;
  alt: string;
  filename: string;
  category: string;
}

/**
 * Get all environment images from the public/images/environments/1/* and public/images/environments/2/* folders
 * Images are sorted by filename for consistent ordering
 */
export function getEnvironmentImages(): EnvironmentImage[] {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'environments');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      console.warn('Environment images directory not found:', imagesDir);
      return [];
    }

    const allImages: EnvironmentImage[] = [];

    // Check both subdirectories: 1 and 2
    const subdirs = ['1', '2'];
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(imagesDir, subdir);
      
      if (fs.existsSync(subdirPath)) {
        // Read all files in the subdirectory
        const files = fs.readdirSync(subdirPath);
        
        // Filter for image files and sort by filename
        const imageFiles = files
          .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
          })
          .sort(); // Sort alphabetically by filename

        // Map to EnvironmentImage objects
        const subdirImages: EnvironmentImage[] = imageFiles.map((filename, index) => ({
          src: `/images/environments/${subdir}/${filename}`,
          alt: `Environment Policy ${subdir}-${index + 1}`,
          filename,
          category: subdir
        }));

        allImages.push(...subdirImages);
      }
    }

    console.log(`Loaded ${allImages.length} environment images:`, allImages.map(img => `${img.category}/${img.filename}`));
    return allImages;
  } catch (error) {
    console.error('Error loading environment images:', error);
    return [];
  }
}
