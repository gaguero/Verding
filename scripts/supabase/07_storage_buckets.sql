-- =====================================================================================
-- Verding Storage Buckets Configuration
-- =====================================================================================
-- This script sets up storage buckets for the Verding microgreens management platform
-- including user content, operational photos, knowledge base, and system storage.

-- =====================================================================================
-- STORAGE BUCKETS CREATION
-- =====================================================================================

-- 1. User Content Buckets
-- =====================================================================================

-- Avatars bucket (public access for profile pictures)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- User documents bucket (private, property-scoped)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents',
    'documents',
    false,
    52428800, -- 50MB limit
    ARRAY['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
);

-- 2. Microgreens Operations Buckets
-- =====================================================================================

-- Batch photos bucket (private, property-scoped)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'batch-photos',
    'batch-photos',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
);

-- Harvest images bucket (private, property-scoped)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'harvest-images',
    'harvest-images',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
);

-- Facility photos bucket (private, property-scoped)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'facility-photos',
    'facility-photos',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
);

-- 3. Knowledge Base Buckets
-- =====================================================================================

-- Growing guides bucket (mixed public/private access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'growing-guides',
    'growing-guides',
    false,
    104857600, -- 100MB limit for comprehensive guides
    ARRAY['application/pdf', 'text/plain', 'text/markdown', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/webp']
);

-- Variety images bucket (public access for reference)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'variety-images',
    'variety-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
);

-- 4. System Buckets
-- =====================================================================================

-- Temporary uploads bucket (private, auto-cleanup)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'temp-uploads',
    'temp-uploads',
    false,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf', 'text/plain', 'text/csv', 'application/json']
);

-- =====================================================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================================================

-- Enable RLS on storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =====================================================================================
-- AVATARS BUCKET POLICIES (Public Read, Authenticated Write)
-- =====================================================================================

-- Allow public read access to avatars
CREATE POLICY "Public read access for avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete their own avatars"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- =====================================================================================
-- PROPERTY-SCOPED BUCKET POLICIES (Private, Property-based Access)
-- =====================================================================================

-- Documents bucket policies
CREATE POLICY "Property-scoped read access for documents"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties()
    )
);

CREATE POLICY "Property-scoped upload access for documents"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped update access for documents"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped delete access for documents"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_manage = true
    )
);

-- Batch photos bucket policies
CREATE POLICY "Property-scoped read access for batch photos"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'batch-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties()
    )
);

CREATE POLICY "Property-scoped upload access for batch photos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'batch-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped update access for batch photos"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'batch-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped delete access for batch photos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'batch-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_manage = true
    )
);

-- Harvest images bucket policies (same pattern as batch photos)
CREATE POLICY "Property-scoped read access for harvest images"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'harvest-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties()
    )
);

CREATE POLICY "Property-scoped upload access for harvest images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'harvest-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped update access for harvest images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'harvest-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped delete access for harvest images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'harvest-images'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_manage = true
    )
);

-- Facility photos bucket policies (same pattern)
CREATE POLICY "Property-scoped read access for facility photos"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'facility-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties()
    )
);

CREATE POLICY "Property-scoped upload access for facility photos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'facility-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped update access for facility photos"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'facility-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_edit = true
    )
);

CREATE POLICY "Property-scoped delete access for facility photos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'facility-photos'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1]::uuid IN (
        SELECT property_id FROM get_user_properties() WHERE can_manage = true
    )
);

-- =====================================================================================
-- KNOWLEDGE BASE BUCKET POLICIES
-- =====================================================================================

-- Growing guides bucket policies (property-scoped with public option)
CREATE POLICY "Property-scoped read access for growing guides"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'growing-guides'
    AND (
        -- Public guides (in 'public' folder)
        (storage.foldername(name))[1] = 'public'
        OR (
            -- Private property guides
            auth.role() = 'authenticated'
            AND (storage.foldername(name))[1]::uuid IN (
                SELECT property_id FROM get_user_properties()
            )
        )
    )
);

CREATE POLICY "Property-scoped upload access for growing guides"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'growing-guides'
    AND auth.role() = 'authenticated'
    AND (
        -- Can upload to public folder if admin
        (
            (storage.foldername(name))[1] = 'public'
            AND is_super_admin(auth.uid())
        )
        OR (
            -- Can upload to property folder if can edit
            (storage.foldername(name))[1]::uuid IN (
                SELECT property_id FROM get_user_properties() WHERE can_edit = true
            )
        )
    )
);

CREATE POLICY "Property-scoped update access for growing guides"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'growing-guides'
    AND auth.role() = 'authenticated'
    AND (
        -- Can update public guides if admin
        (
            (storage.foldername(name))[1] = 'public'
            AND is_super_admin(auth.uid())
        )
        OR (
            -- Can update property guides if can edit
            (storage.foldername(name))[1]::uuid IN (
                SELECT property_id FROM get_user_properties() WHERE can_edit = true
            )
        )
    )
);

CREATE POLICY "Property-scoped delete access for growing guides"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'growing-guides'
    AND auth.role() = 'authenticated'
    AND (
        -- Can delete public guides if admin
        (
            (storage.foldername(name))[1] = 'public'
            AND is_super_admin(auth.uid())
        )
        OR (
            -- Can delete property guides if can manage
            (storage.foldername(name))[1]::uuid IN (
                SELECT property_id FROM get_user_properties() WHERE can_manage = true
            )
        )
    )
);

-- Variety images bucket policies (public read, admin write)
CREATE POLICY "Public read access for variety images"
ON storage.objects FOR SELECT
USING (bucket_id = 'variety-images');

CREATE POLICY "Admin upload access for variety images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'variety-images'
    AND auth.role() = 'authenticated'
    AND is_super_admin(auth.uid())
);

CREATE POLICY "Admin update access for variety images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'variety-images'
    AND auth.role() = 'authenticated'
    AND is_super_admin(auth.uid())
);

CREATE POLICY "Admin delete access for variety images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'variety-images'
    AND auth.role() = 'authenticated'
    AND is_super_admin(auth.uid())
);

-- =====================================================================================
-- TEMPORARY UPLOADS BUCKET POLICIES
-- =====================================================================================

-- Temp uploads bucket policies (user-scoped, auto-cleanup)
CREATE POLICY "User-scoped read access for temp uploads"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'temp-uploads'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "User-scoped upload access for temp uploads"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'temp-uploads'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "User-scoped update access for temp uploads"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'temp-uploads'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "User-scoped delete access for temp uploads"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'temp-uploads'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- =====================================================================================
-- STORAGE HELPER FUNCTIONS
-- =====================================================================================

-- Function to clean up old temporary uploads (for maintenance)
CREATE OR REPLACE FUNCTION cleanup_temp_uploads()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete temp uploads older than 24 hours
    DELETE FROM storage.objects 
    WHERE bucket_id = 'temp-uploads' 
    AND created_at < NOW() - INTERVAL '24 hours';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get storage usage by property
CREATE OR REPLACE FUNCTION get_property_storage_usage(property_uuid UUID)
RETURNS TABLE (
    bucket_name TEXT,
    file_count BIGINT,
    total_size BIGINT,
    avg_file_size NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        so.bucket_id as bucket_name,
        COUNT(*) as file_count,
        SUM(so.metadata->>'size')::BIGINT as total_size,
        AVG((so.metadata->>'size')::NUMERIC) as avg_file_size
    FROM storage.objects so
    WHERE so.bucket_id IN ('documents', 'batch-photos', 'harvest-images', 'facility-photos', 'growing-guides')
    AND (storage.foldername(so.name))[1]::uuid = property_uuid
    GROUP BY so.bucket_id
    ORDER BY total_size DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================================================
-- GRANT PERMISSIONS
-- =====================================================================================

-- Grant execute permissions on helper functions
GRANT EXECUTE ON FUNCTION cleanup_temp_uploads() TO service_role;
GRANT EXECUTE ON FUNCTION get_property_storage_usage(UUID) TO authenticated; 