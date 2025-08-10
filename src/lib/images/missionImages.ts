import fs from 'fs';
import path from 'path';

export interface MissionImage {
  src: string;
  alt: string;
  filename: string;
}

/**
 * Get all mission commitment images from the public/images/mission-commitments folder
 * Images are sorted by filename for consistent ordering
 */
export function getMissionCommitmentImages(): MissionImage[] {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'mission-commitments');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      console.warn('Mission commitments images directory not found:', imagesDir);
      return [];
    }

    // Read all files in the directory
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files and sort by filename
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
      })
      .sort(); // Sort alphabetically by filename

    // Map to MissionImage objects
    const images: MissionImage[] = imageFiles.map((filename, index) => ({
      src: `/images/mission-commitments/${filename}`,
      alt: `Mission & Commitment ${index + 1}`,
      filename
    }));

    console.log(`Loaded ${images.length} mission commitment images:`, images.map(img => img.filename));
    return images;
  } catch (error) {
    console.error('Error loading mission commitment images:', error);
    return [];
  }
}
