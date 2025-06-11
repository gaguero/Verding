-- Add is_active column to properties table if it doesn't exist
-- This fixes the user creation issue where the trigger looks for active properties

-- Add the column
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update all existing properties to be active
UPDATE properties 
SET is_active = TRUE 
WHERE is_active IS NULL;

-- Verify the update
SELECT id, name, is_active 
FROM properties 
ORDER BY name; 