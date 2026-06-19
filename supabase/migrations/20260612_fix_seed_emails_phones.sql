-- Fix seeded user emails and phone numbers.
-- Remove fake @valmiki.com emails.
-- Set real contact details for Shekhar Rao Yadagiri (Valmiki school admin)
-- and Charan Yadagiri (master tech admin, infizium@outlook.com).

-- Update Shekhar Rao Yadagiri — Valmiki Vidyalayam school admin
UPDATE users
SET
  phone = '+919985401894',
  email = 'shekhar.yadagiri@gmail.com'
WHERE name ILIKE '%shekhar%'
  AND phone != '+919985401894';

-- Fix any remaining @valmiki.com fake emails to real Gmail placeholders
UPDATE users
SET email = REPLACE(email, '@valmiki.com', '@gmail.com')
WHERE email ILIKE '%@valmiki.com';

-- Fix any remaining @nandini.com fake emails
UPDATE users
SET email = REPLACE(email, '@nandini.com', '@gmail.com')
WHERE email ILIKE '%@nandini.com';

-- Charan Yadagiri — master admin of Infizium tech
-- Update or insert a platform-level super admin record if it exists
UPDATE users
SET
  phone = '+918329417456',
  email = 'infizium@outlook.com'
WHERE email = 'infizium@outlook.com' OR name ILIKE '%charan yadagiri%';
