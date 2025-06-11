-- =====================================================================================
-- Verding Test Data - Comprehensive Sample Data for Development & Testing
-- =====================================================================================
-- This script creates realistic test data for the Verding multi-property microgreens
-- management system, enabling immediate testing and development.

-- =====================================================================================
-- CROP VARIETIES - Comprehensive Microgreens Parameters from Growing Guide
-- =====================================================================================

INSERT INTO crop_varieties (
    name, scientific_name, category,
    sowing_density_1020_grams, sowing_density_small_grams, growing_medium,
    soak_time_hours, bury_seed, weight_required, weight_lbs,
    germination_days, blackout_days, light_days, total_grow_days,
    optimal_temp_min, optimal_temp_max, optimal_humidity_min, optimal_humidity_max,
    difficulty_level, harvest_height_cm, yield_per_tray_grams, price_per_kg, multiple_harvests,
    special_requirements, growing_notes, metadata
) VALUES
-- From microgreens growing guide data
('Popcorn', 'Zea mays var. everta', 'Grain', 200.0, 21.0, 'Coco Coir', 12, true, true, 15, 5, 3, 0, 8, 18, 24, 70, 85, 'intermediate', 8, 120, 32.00, false, 
 ARRAY['bury_seed', 'keep_in_dark', 'prevent_green'], 'Bury the seed to prevent mold from occurring. Must be kept in the dark for the entirety of the grow to prevent from turning green.', 
 '{"flavor": "nutty, corn-like", "nutrition": "fiber, antioxidants"}'),

('Chia Black', 'Salvia hispanica', 'Seed', 12.0, 1.3, 'Coco Coir', 0, false, false, 0, 3, 2, 2, 7, 18, 24, 65, 80, 'beginner', 5, 80, 45.00, false,
 ARRAY['mucilaginous_seeds', 'gentle_handling'], 'After several tests, we found it is beneficial to keep weight on basil. It really helps to drive down the roots. Be sure not to life the tray during germination due to the seeds being mucilaginous.',
 '{"flavor": "mild, nutty", "nutrition": "omega-3, fiber"}'),

('Pea Shoots', 'Pisum sativum', 'Legume', 200.0, 21.0, 'Coco Coir', 12, true, true, 15, 5, 3, 0, 8, 18, 24, 70, 85, 'beginner', 10, 120, 28.00, false,
 ARRAY['soak_required', 'bury_seed'], 'Soak for 12 hours before sowing. Bury seeds completely to prevent mold.',
 '{"flavor": "sweet, fresh", "nutrition": "high protein, vitamin C"}'),

('Sunflower', 'Helianthus annuus', 'Seed', 100.0, 11.0, 'Coco Coir', 8, true, true, 15, 4, 2, 2, 8, 20, 26, 60, 75, 'beginner', 8, 100, 32.00, false,
 ARRAY['soak_required', 'bury_seed'], 'Soak for 8 hours, bury seeds. Weight helps with shell removal.',
 '{"flavor": "nutty, crunchy", "nutrition": "vitamin E, healthy fats"}'),

('Radish', 'Raphanus sativus', 'Brassica', 25.0, 2.7, 'Coco Coir', 0, false, false, 0, 3, 2, 2, 7, 16, 22, 65, 80, 'beginner', 5, 80, 35.00, false,
 ARRAY['fast_growing'], 'Very fast growing, ready in just 7 days. No soaking required.',
 '{"flavor": "spicy, peppery", "nutrition": "vitamin C, antioxidants"}'),

('Arugula', 'Eruca sativa', 'Brassica', 15.0, 1.6, 'Coco Coir', 0, false, false, 0, 3, 2, 3, 8, 15, 20, 60, 75, 'beginner', 6, 75, 42.00, false,
 ARRAY['cool_weather'], 'Prefers cooler temperatures. Excellent for beginners.',
 '{"flavor": "peppery, bold", "nutrition": "vitamin K, folate"}'),

('Broccoli', 'Brassica oleracea', 'Brassica', 20.0, 2.1, 'Coco Coir', 0, false, false, 0, 4, 2, 3, 9, 18, 24, 65, 80, 'beginner', 7, 85, 38.00, false,
 ARRAY['steady_growth'], 'Steady, reliable growth. Good for consistent production.',
 '{"flavor": "mild broccoli", "nutrition": "vitamin C, fiber"}'),

('Basil', 'Ocimum basilicum', 'Herb', 10.0, 1.1, 'Coco Coir', 0, false, true, 5, 7, 3, 4, 14, 20, 26, 70, 85, 'intermediate', 8, 60, 55.00, false,
 ARRAY['weight_beneficial', 'mucilaginous_seeds'], 'Weight helps drive down roots. Handle gently due to mucilaginous nature.',
 '{"flavor": "sweet, aromatic", "nutrition": "vitamin K, antioxidants"}'),

('Nasturtium', 'Tropaeolum majus', 'Flower', 100.0, 11.0, 'Coco Coir', 12, true, false, 0, 7, 3, 4, 14, 18, 24, 65, 80, 'intermediate', 10, 90, 65.00, true,
 ARRAY['soak_required', 'multiple_harvests'], 'Soak for 12 hours. Can be harvested multiple times for continuous production.',
 '{"flavor": "peppery, floral", "nutrition": "vitamin C, lutein"}'),

('Wheatgrass', 'Triticum aestivum', 'Grass', 100.0, 11.0, 'Coco Coir', 12, true, false, 0, 7, 3, 4, 14, 18, 24, 70, 85, 'intermediate', 12, 150, 40.00, true,
 ARRAY['soak_required', 'multiple_harvests'], 'Soak for 12 hours. Multiple harvests possible. Popular for juicing.',
 '{"flavor": "grassy, sweet", "nutrition": "chlorophyll, enzymes"}'),

-- Premium and specialty varieties
('Purple Radish', 'Raphanus sativus var. purpureus', 'Brassica', 25.0, 2.7, 'Coco Coir', 0, false, false, 0, 3, 2, 2, 7, 16, 22, 65, 80, 'beginner', 5, 75, 45.00, false,
 ARRAY['colorful', 'fast_growing'], 'Beautiful purple stems, same growing as regular radish.',
 '{"flavor": "spicy, colorful", "nutrition": "anthocyanins, vitamin C"}'),

('Red Cabbage', 'Brassica oleracea var. capitata', 'Brassica', 20.0, 2.1, 'Coco Coir', 0, false, false, 0, 4, 2, 4, 10, 16, 22, 70, 85, 'beginner', 8, 90, 40.00, false,
 ARRAY['colorful', 'steady_growth'], 'Beautiful red/purple color, adds visual appeal to mixes.',
 '{"flavor": "mild, sweet", "nutrition": "vitamin C, antioxidants"}'),

('Mustard', 'Brassica juncea', 'Brassica', 15.0, 1.6, 'Coco Coir', 0, false, false, 0, 3, 2, 3, 8, 18, 24, 65, 80, 'beginner', 6, 70, 36.00, false,
 ARRAY['spicy', 'fast_growing'], 'Spicy kick, grows quickly. Popular in spicy mixes.',
 '{"flavor": "spicy, tangy", "nutrition": "vitamin K, glucosinolates"}'),

('Kale', 'Brassica oleracea var. acephala', 'Brassica', 20.0, 2.1, 'Coco Coir', 0, false, false, 0, 4, 2, 4, 10, 16, 22, 70, 85, 'beginner', 7, 80, 44.00, false,
 ARRAY['nutritious', 'steady_growth'], 'Highly nutritious, steady growth pattern.',
 '{"flavor": "earthy, mild", "nutrition": "vitamin A, iron"}'),

('Cilantro', 'Coriandrum sativum', 'Herb', 25.0, 2.7, 'Coco Coir', 0, false, false, 0, 7, 3, 5, 15, 18, 24, 65, 80, 'advanced', 8, 60, 48.00, false,
 ARRAY['slow_germination', 'temperature_sensitive'], 'Slower germination, can be tricky. Requires consistent temperature.',
 '{"flavor": "fresh, citrusy", "nutrition": "vitamin K, antioxidants"}'),

-- Popular mixes
('Spicy Mix', 'Mixed varieties', 'Mix', 20.0, 2.1, 'Coco Coir', 0, false, false, 0, 3, 2, 3, 8, 16, 22, 65, 80, 'beginner', 6, 85, 50.00, false,
 ARRAY['blend', 'spicy'], 'Blend of radish, mustard, and arugula for spicy flavor profile.',
 '{"components": ["radish", "mustard", "arugula"], "flavor": "spicy blend"}'),

('Mild Mix', 'Mixed varieties', 'Mix', 30.0, 3.2, 'Coco Coir', 8, true, true, 10, 4, 2, 3, 9, 18, 24, 70, 85, 'beginner', 7, 90, 46.00, false,
 ARRAY['blend', 'mild'], 'Gentle blend of pea shoots, sunflower, and broccoli.',
 '{"components": ["pea", "sunflower", "broccoli"], "flavor": "gentle blend"}'),

('Rainbow Mix', 'Mixed varieties', 'Mix', 22.0, 2.4, 'Coco Coir', 0, false, false, 0, 4, 2, 3, 9, 16, 24, 65, 85, 'intermediate', 7, 88, 52.00, false,
 ARRAY['blend', 'colorful'], 'Colorful blend featuring purple radish, red cabbage, and kale.',
 '{"components": ["purple_radish", "red_cabbage", "kale"], "flavor": "colorful blend"}')

-- =====================================================================================
-- TEST PROPERTIES - Sample Farm Locations
-- =====================================================================================

-- Main demo property
INSERT INTO properties (id, name, description, location, address, timezone, settings, metadata) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Verde Valley Farm',
    'Primary microgreens production facility with 6 growing rooms and automated climate control.',
    ST_Point(-112.0740, 34.8697),
    '{
        "street": "1234 Farm Road",
        "city": "Sedona",
        "state": "Arizona",
        "country": "USA",
        "postal_code": "86336"
    }',
    'America/Phoenix',
    '{
        "production_capacity": "500_trays_weekly",
        "growing_rooms": 6,
        "automated_climate": true,
        "delivery_radius_km": 50
    }',
    '{
        "established": "2023-01-15",
        "certifications": ["organic", "gap"],
        "specialty": "restaurant_supply"
    }'
),

-- Secondary urban farm
(
    '22222222-2222-2222-2222-222222222222',
    'City Greens Hub',
    'Urban microgreens operation focusing on direct-to-consumer sales and farmers markets.',
    ST_Point(-111.9311, 33.4734),
    '{
        "street": "567 Urban Way",
        "city": "Phoenix",
        "state": "Arizona",
        "country": "USA",
        "postal_code": "85004"
    }',
    'America/Phoenix',
    '{
        "production_capacity": "200_trays_weekly",
        "growing_rooms": 3,
        "automated_climate": false,
        "delivery_radius_km": 25
    }',
    '{
        "established": "2023-06-10",
        "certifications": ["local_organic"],
        "specialty": "farmers_markets"
    }'
),

-- Research facility
(
    '33333333-3333-3333-3333-333333333333',
    'Innovation Lab',
    'Research and development facility for testing new varieties and growing techniques.',
    ST_Point(-111.8910, 33.4152),
    '{
        "street": "789 Innovation Drive",
        "city": "Tempe",
        "state": "Arizona",
        "country": "USA",
        "postal_code": "85281"
    }',
    'America/Phoenix',
    '{
        "production_capacity": "100_trays_weekly",
        "growing_rooms": 2,
        "automated_climate": true,
        "delivery_radius_km": 15
    }',
    '{
        "established": "2023-09-01",
        "certifications": ["research"],
        "specialty": "variety_development"
    }'
);

-- =====================================================================================
-- TEST USERS & PROPERTY ACCESS
-- =====================================================================================
-- Note: These will be created when users actually sign up through auth,
-- but we'll create sample access records for demonstration

-- Sample user property access (will be linked when real users are created)
-- These represent the access patterns for the test system

-- =====================================================================================
-- GROWING BATCHES - Enhanced Production Cycles with Stage Management
-- =====================================================================================

-- Verde Valley Farm batches
INSERT INTO growing_batches (
    property_id, batch_number, crop_variety_id, tray_count, tray_type, growing_medium, seed_weight_grams, 
    location, current_stage, stage_started_at, sowing_date, expected_harvest_date, actual_harvest_date,
    harvest_count, total_yield_grams, quality_score, avg_temperature, avg_humidity,
    assigned_equipment, notes, problems_encountered
) VALUES
-- Current week production
('11111111-1111-1111-1111-111111111111', 'VVF-2024-001', (SELECT id FROM crop_varieties WHERE name = 'Pea Shoots'), 20, '1020', 'Coco Coir', 400.0, 
 'Room A1', 'light', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_DATE - 8, CURRENT_DATE + 6, NULL,
 0, NULL, NULL, 21.5, 78.0, '{"weights": ["15lb"], "trays": ["1020x20"]}', 'Excellent germination rate, temperature optimal', ARRAY[]::TEXT[]),

('11111111-1111-1111-1111-111111111111', 'VVF-2024-002', (SELECT id FROM crop_varieties WHERE name = 'Sunflower'), 25, '1020', 'Coco Coir', 500.0,
 'Room A2', 'harvest_ready', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_DATE - 10, CURRENT_DATE + 2, NULL,
 0, NULL, 8, 23.0, 72.0, '{"weights": ["15lb"], "trays": ["1020x25"]}', 'Ready for harvest tomorrow', ARRAY[]::TEXT[]),

('11111111-1111-1111-1111-111111111111', 'VVF-2024-003', (SELECT id FROM crop_varieties WHERE name = 'Radish'), 15, '1020', 'Coco Coir', 150.0,
 'Room B1', 'light', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_DATE - 6, CURRENT_DATE + 2, NULL,
 0, NULL, NULL, 19.0, 75.0, '{"trays": ["1020x15"]}', 'Fast growth, looking good', ARRAY[]::TEXT[]),

('11111111-1111-1111-1111-111111111111', 'VVF-2024-004', (SELECT id FROM crop_varieties WHERE name = 'Spicy Mix'), 30, '1020', 'Coco Coir', 450.0,
 'Room B2', 'light', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_DATE - 7, CURRENT_DATE + 3, NULL,
 0, NULL, NULL, 20.0, 76.0, '{"trays": ["1020x30"]}', 'Mixed variety performance as expected', ARRAY[]::TEXT[]),

-- Next week sowing
('11111111-1111-1111-1111-111111111111', 'VVF-2024-005', (SELECT id FROM crop_varieties WHERE name = 'Arugula'), 18, '1020', 'Coco Coir', 180.0,
 'Room C1', 'planned', NULL, CURRENT_DATE + 1, CURRENT_DATE + 11, NULL,
 0, NULL, NULL, NULL, NULL, '{"trays": ["1020x18"]}', 'Scheduled for tomorrow', ARRAY[]::TEXT[]),

('11111111-1111-1111-1111-111111111111', 'VVF-2024-006', (SELECT id FROM crop_varieties WHERE name = 'Broccoli'), 22, '1020', 'Coco Coir', 330.0,
 'Room C2', 'planned', NULL, CURRENT_DATE + 2, CURRENT_DATE + 14, NULL,
 0, NULL, NULL, NULL, NULL, '{"trays": ["1020x22"]}', 'Large order preparation', ARRAY[]::TEXT[]),

-- Recently harvested
('11111111-1111-1111-1111-111111111111', 'VVF-2024-007', (SELECT id FROM crop_varieties WHERE name = 'Purple Radish'), 12, '1020', 'Coco Coir', 120.0,
 'Room A1', 'completed', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_DATE - 14, CURRENT_DATE - 4, CURRENT_DATE - 4,
 1, 840.0, 9, 18.5, 74.0, '{"trays": ["1020x12"]}', 'Premium quality batch', ARRAY[]::TEXT[]),

('11111111-1111-1111-1111-111111111111', 'VVF-2024-008', (SELECT id FROM crop_varieties WHERE name = 'Mustard'), 16, '1020', 'Coco Coir', 160.0,
 'Room B1', 'completed', CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_DATE - 16, CURRENT_DATE - 6, CURRENT_DATE - 6,
 1, 1040.0, 8, 21.0, 73.0, '{"trays": ["1020x16"]}', 'Good yield and quality', ARRAY[]::TEXT[]);

-- City Greens Hub batches
INSERT INTO growing_batches (property_id, batch_number, crop_variety_id, tray_count, growing_medium, seed_weight_grams, sowing_date, expected_harvest_date, status, location, notes, yield_grams, quality_score) VALUES
('22222222-2222-2222-2222-222222222222', 'CGH-2024-001', (SELECT id FROM crop_varieties WHERE name = 'Mild Mix'), 15, 'coconut_coir', 300.0, CURRENT_DATE - 9, CURRENT_DATE + 3, 'growing', 'Urban Room 1', 'Farmers market preparation', NULL, NULL),
('22222222-2222-2222-2222-222222222222', 'CGH-2024-002', (SELECT id FROM crop_varieties WHERE name = 'Rainbow Mix'), 12, 'soil', 240.0, CURRENT_DATE - 5, CURRENT_DATE + 7, 'growing', 'Urban Room 2', 'Colorful display variety', NULL, NULL),
('22222222-2222-2222-2222-222222222222', 'CGH-2024-003', (SELECT id FROM crop_varieties WHERE name = 'Cilantro'), 8, 'coconut_coir', 80.0, CURRENT_DATE - 12, CURRENT_DATE + 4, 'growing', 'Urban Room 3', 'Specialty herb order', NULL, NULL);

-- Innovation Lab experimental batches
INSERT INTO growing_batches (
    property_id, batch_number, crop_variety_id, tray_count, tray_type, growing_medium, seed_weight_grams,
    location, current_stage, stage_started_at, sowing_date, expected_harvest_date, actual_harvest_date,
    harvest_count, total_yield_grams, quality_score, avg_temperature, avg_humidity,
    assigned_equipment, notes, problems_encountered
) VALUES
('33333333-3333-3333-3333-333333333333', 'IL-2024-EXP-001', (SELECT id FROM crop_varieties WHERE name = 'Kale'), 5, '1020', 'Coco Coir', 50.0,
 'Lab Room 1', 'light', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_DATE - 7, CURRENT_DATE + 5, NULL,
 0, NULL, NULL, 20.0, 75.0, '{"trays": ["1020x5"]}', 'Testing new growing parameters', ARRAY[]::TEXT[]),

('33333333-3333-3333-3333-333333333333', 'IL-2024-EXP-002', (SELECT id FROM crop_varieties WHERE name = 'Red Cabbage'), 5, '1020', 'Coco Coir', 75.0,
 'Lab Room 2', 'light', CURRENT_TIMESTAMP - INTERVAL '4 days', CURRENT_DATE - 10, CURRENT_DATE + 4, NULL,
 0, NULL, NULL, 19.0, 78.0, '{"trays": ["1020x5"]}', 'Color development study', ARRAY[]::TEXT[]);

-- =====================================================================================
-- BATCH STAGE EVENTS - Detailed Activity Tracking
-- =====================================================================================

-- Sample stage events for VVF-2024-001 (Pea Shoots)
INSERT INTO batch_stage_events (
    batch_id, property_id, user_id, event_type, stage, previous_stage,
    title, description, temperature, humidity, light_level,
    problem_type, severity, resolution_action, harvest_weight_grams, harvest_quality,
    photos, attachments, event_timestamp
) VALUES
-- Pea Shoots batch events
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111', NULL,
 'stage_start', 'soaking', NULL, 'Started soaking pea seeds', 'Soaking 400g of pea seeds for 12 hours as per variety requirements',
 21.0, 75.0, 'ambient', NULL, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '8 days'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111', NULL,
 'stage_complete', 'soaking', NULL, 'Soaking complete', 'Seeds properly hydrated, ready for sowing',
 21.0, 75.0, 'ambient', NULL, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '7 days 12 hours'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111', NULL,
 'stage_start', 'sowing', 'soaking', 'Sowing started', 'Sowed soaked pea seeds in 20 trays with coco coir medium',
 21.5, 78.0, 'ambient', NULL, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '7 days 11 hours'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111', NULL,
 'stage_complete', 'germination', 'sowing', 'Germination complete', 'Excellent germination rate observed, approximately 95%',
 21.5, 78.0, 'dark', NULL, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '5 days'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111', NULL,
 'stage_start', 'light', 'blackout', 'Moved to light stage', 'Transitioned from blackout to light stage, growth looking excellent',
 21.5, 78.0, 'full_spectrum_led', NULL, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '2 days'),

-- Sunflower batch events (ready for harvest)
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), '11111111-1111-1111-1111-111111111111', NULL,
 'observation', 'harvest_ready', NULL, 'Ready for harvest', 'Sunflower microgreens have reached optimal height and quality',
 23.0, 72.0, 'full_spectrum_led', NULL, NULL, NULL, NULL, 8, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '1 day'),

-- Problem tracking example
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-003'), '11111111-1111-1111-1111-111111111111', NULL,
 'problem', 'light', NULL, 'Minor mold spotted', 'Small amount of mold detected on edge trays',
 19.0, 75.0, 'full_spectrum_led', 'mold', 'low', 'Increased ventilation and reduced humidity slightly', NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '2 days'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-003'), '11111111-1111-1111-1111-111111111111', NULL,
 'intervention', 'light', NULL, 'Mold treatment applied', 'Applied organic fungicide and improved air circulation',
 19.0, 73.0, 'full_spectrum_led', NULL, NULL, 'Applied organic treatment, mold cleared', NULL, NULL, '[]'::jsonb, '[]'::jsonb, CURRENT_TIMESTAMP - INTERVAL '1 day 12 hours');

-- =====================================================================================
-- BATCH RESOURCES - Resource Usage and Cost Tracking
-- =====================================================================================

-- Resource usage for VVF-2024-001 (Pea Shoots)
INSERT INTO batch_resources (
    batch_id, property_id, resource_type, resource_name, supplier, batch_lot_number,
    quantity_used, unit, stage_used, unit_cost, total_cost, currency, used_at, notes
) VALUES
-- Seeds
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'seeds', 'Organic Pea Seeds', 'Mountain Valley Seeds', 'MVS-PEA-2024-03', 400.0, 'grams', 'sowing', 0.025, 10.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '7 days 11 hours', 'Premium organic pea seeds'),

-- Growing medium
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'growing_medium', 'Organic Coco Coir', 'EcoGrow Supplies', 'ECO-CC-2024-02', 20.0, 'liters', 'sowing', 1.50, 30.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '7 days 11 hours', 'High-quality coco coir medium'),

-- Trays
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'trays', '1020 Growing Trays', 'Bootstrap Farmer', 'BF-1020-2024-01', 20.0, 'pieces', 'sowing', 2.50, 50.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '7 days 11 hours', 'Standard 1020 trays'),

-- Weights
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'weights', '15lb Weight Plates', 'Farm Equipment Co', 'FEC-W15-2024', 4.0, 'pieces', 'germination', 15.00, 60.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '7 days', 'Used during germination stage'),

-- Labor
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'labor', 'Sowing Labor', 'Internal', NULL, 2.5, 'hours', 'sowing', 18.00, 45.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '7 days 11 hours', 'Time spent on sowing process'),

-- Utilities (estimated)
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-001'), '11111111-1111-1111-1111-111111111111',
 'utilities', 'LED Lighting', 'Internal', NULL, 192.0, 'kwh', 'light', 0.12, 23.04, 'USD', CURRENT_TIMESTAMP - INTERVAL '2 days', 'Estimated lighting costs for light stage'),

-- Resource usage for VVF-2024-002 (Sunflower - ready for harvest)
((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), '11111111-1111-1111-1111-111111111111',
 'seeds', 'Organic Sunflower Seeds', 'Sunny Seeds Co', 'SSC-SF-2024-02', 500.0, 'grams', 'sowing', 0.020, 10.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '10 days', 'Black oil sunflower seeds'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), '11111111-1111-1111-1111-111111111111',
 'growing_medium', 'Organic Coco Coir', 'EcoGrow Supplies', 'ECO-CC-2024-02', 25.0, 'liters', 'sowing', 1.50, 37.50, 'USD', CURRENT_TIMESTAMP - INTERVAL '10 days', 'Same batch as pea shoots'),

((SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), '11111111-1111-1111-1111-111111111111',
 'labor', 'Harvest Preparation', 'Internal', NULL, 1.0, 'hours', 'harvest_ready', 18.00, 18.00, 'USD', CURRENT_TIMESTAMP - INTERVAL '1 day', 'Preparing for harvest tomorrow');

-- =====================================================================================
-- CUSTOMERS - Sample Customer Base
-- =====================================================================================

-- Verde Valley Farm customers (B2B focus)
INSERT INTO customers (property_id, customer_type, name, email, phone, address, contact_preferences, preferred_communication, credit_limit, payment_terms, notes, tags) VALUES
('11111111-1111-1111-1111-111111111111', 'restaurant', 'Sedona Bistro', 'orders@sedonabistro.com', '+1-928-555-0101', '{"street": "89 Uptown Circle", "city": "Sedona", "state": "AZ", "postal_code": "86336"}', '{"order_frequency": "weekly", "delivery_day": "tuesday"}', 'email', 2500.00, 'net_30', 'Premium restaurant client, weekly standing orders', ARRAY['premium', 'weekly', 'restaurant']),

('11111111-1111-1111-1111-111111111111', 'restaurant', 'Canyon View Restaurant', 'chef@canyonview.com', '+1-928-555-0102', '{"street": "156 Red Rock Drive", "city": "Sedona", "state": "AZ", "postal_code": "86336"}', '{"order_frequency": "biweekly", "delivery_day": "friday"}', 'email', 1800.00, 'net_15', 'Mid-scale restaurant, focuses on local sourcing', ARRAY['local', 'biweekly', 'restaurant']),

('11111111-1111-1111-1111-111111111111', 'retailer', 'Whole Earth Market', 'produce@wholeearthmarket.com', '+1-928-555-0103', '{"street": "234 Market Street", "city": "Flagstaff", "state": "AZ", "postal_code": "86001"}', '{"order_frequency": "weekly", "delivery_day": "monday"}', 'email', 3500.00, 'net_30', 'Large health food store, consistent volume', ARRAY['retail', 'weekly', 'high_volume']),

('11111111-1111-1111-1111-111111111111', 'business', 'Verde Catering Co.', 'supply@verdecatering.com', '+1-928-555-0104', '{"street": "567 Business Park", "city": "Cottonwood", "state": "AZ", "postal_code": "86326"}', '{"order_frequency": "as_needed", "advance_notice": "48_hours"}', 'phone', 2000.00, 'immediate', 'Event catering, large but irregular orders', ARRAY['catering', 'irregular', 'events']);

-- City Greens Hub customers (B2C focus)
INSERT INTO customers (property_id, customer_type, name, email, phone, address, contact_preferences, preferred_communication, credit_limit, payment_terms, notes, tags) VALUES
('22222222-2222-2222-2222-222222222222', 'individual', 'Sarah Johnson', 'sarah.johnson@email.com', '+1-602-555-0201', '{"street": "123 Central Ave", "city": "Phoenix", "state": "AZ", "postal_code": "85004"}', '{"order_frequency": "weekly", "delivery_preferred": true}', 'email', 200.00, 'immediate', 'Regular customer, prefers home delivery', ARRAY['home_delivery', 'weekly', 'regular']),

('22222222-2222-2222-2222-222222222222', 'individual', 'Mike Chen', 'mike.chen@email.com', '+1-602-555-0202', '{"street": "456 Roosevelt Row", "city": "Phoenix", "state": "AZ", "postal_code": "85003"}', '{"order_frequency": "biweekly", "pickup_preferred": true}', 'email', 150.00, 'immediate', 'Health-conscious customer, farmers market pickup', ARRAY['farmers_market', 'biweekly', 'health_focused']),

('22222222-2222-2222-2222-222222222222', 'restaurant', 'Farm Table Café', 'orders@farmtablecafe.com', '+1-602-555-0203', '{"street": "789 Mill Avenue", "city": "Tempe", "state": "AZ", "postal_code": "85281"}', '{"order_frequency": "weekly", "delivery_day": "wednesday"}', 'email', 800.00, 'net_15', 'Small farm-to-table restaurant', ARRAY['farm_to_table', 'weekly', 'restaurant']);

-- =====================================================================================
-- ORDERS - Sample Order History and Active Orders
-- =====================================================================================

-- Verde Valley Farm orders
INSERT INTO orders (property_id, customer_id, order_number, order_type, status, order_date, requested_delivery_date, subtotal, tax_amount, delivery_fee, total_amount, payment_status, payment_method, delivery_address, special_instructions, notes) VALUES
-- Active orders
('11111111-1111-1111-1111-111111111111', (SELECT id FROM customers WHERE name = 'Sedona Bistro'), 'VVF-ORD-001', 'recurring', 'confirmed', CURRENT_DATE, CURRENT_DATE + 2, 280.00, 22.40, 15.00, 317.40, 'pending', 'invoice', '{"street": "89 Uptown Circle", "city": "Sedona", "state": "AZ", "postal_code": "86336"}', 'Deliver to back entrance, Tuesday 8-10am', 'Weekly standing order'),

('11111111-1111-1111-1111-111111111111', (SELECT id FROM customers WHERE name = 'Canyon View Restaurant'), 'VVF-ORD-002', 'one_time', 'preparing', CURRENT_DATE - 1, CURRENT_DATE + 1, 450.00, 36.00, 20.00, 506.00, 'paid', 'credit_card', '{"street": "156 Red Rock Drive", "city": "Sedona", "state": "AZ", "postal_code": "86336"}', 'Call upon arrival', 'Special event order'),

('11111111-1111-1111-1111-111111111111', (SELECT id FROM customers WHERE name = 'Whole Earth Market'), 'VVF-ORD-003', 'recurring', 'ready', CURRENT_DATE, CURRENT_DATE + 1, 720.00, 57.60, 35.00, 812.60, 'pending', 'invoice', '{"street": "234 Market Street", "city": "Flagstaff", "state": "AZ", "postal_code": "86001"}', 'Loading dock delivery Mon 6-8am', 'Weekly retail order'),

-- Recent completed orders
('11111111-1111-1111-1111-111111111111', (SELECT id FROM customers WHERE name = 'Sedona Bistro'), 'VVF-ORD-004', 'recurring', 'delivered', CURRENT_DATE - 7, CURRENT_DATE - 5, 280.00, 22.40, 15.00, 317.40, 'paid', 'invoice', '{"street": "89 Uptown Circle", "city": "Sedona", "state": "AZ", "postal_code": "86336"}', 'Deliver to back entrance', 'Previous week order'),

('11111111-1111-1111-1111-111111111111', (SELECT id FROM customers WHERE name = 'Verde Catering Co.'), 'VVF-ORD-005', 'one_time', 'delivered', CURRENT_DATE - 10, CURRENT_DATE - 8, 1250.00, 100.00, 50.00, 1400.00, 'paid', 'credit_card', '{"street": "567 Business Park", "city": "Cottonwood", "state": "AZ", "postal_code": "86326"}', 'Large corporate event', 'Successful large order');

-- City Greens Hub orders
INSERT INTO orders (property_id, customer_id, order_number, order_type, status, order_date, requested_delivery_date, subtotal, tax_amount, delivery_fee, total_amount, payment_status, payment_method, delivery_address, special_instructions, notes) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM customers WHERE name = 'Sarah Johnson'), 'CGH-ORD-001', 'recurring', 'confirmed', CURRENT_DATE, CURRENT_DATE + 1, 45.00, 3.15, 8.00, 56.15, 'paid', 'credit_card', '{"street": "123 Central Ave", "city": "Phoenix", "state": "AZ", "postal_code": "85004"}', 'Leave at front door if not home', 'Weekly home delivery'),

('22222222-2222-2222-2222-222222222222', (SELECT id FROM customers WHERE name = 'Farm Table Café'), 'CGH-ORD-002', 'recurring', 'preparing', CURRENT_DATE, CURRENT_DATE + 1, 120.00, 8.40, 12.00, 140.40, 'pending', 'invoice', '{"street": "789 Mill Avenue", "city": "Tempe", "state": "AZ", "postal_code": "85281"}', 'Wednesday morning delivery preferred', 'Restaurant weekly order');

-- =====================================================================================
-- ORDER ITEMS - Detailed Order Contents
-- =====================================================================================

-- VVF-ORD-001 (Sedona Bistro weekly order)
INSERT INTO order_items (order_id, crop_variety_id, product_name, quantity_grams, unit_price, line_total, special_requests) VALUES
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Pea Shoots'), 'Pea Shoots', 2000.0, 0.028, 56.00, 'Extra fresh for salads'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Sunflower'), 'Sunflower Microgreens', 3000.0, 0.032, 96.00, NULL),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Radish'), 'Radish Microgreens', 1500.0, 0.035, 52.50, 'Extra spicy preferred'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Arugula'), 'Arugula Microgreens', 1800.0, 0.042, 75.60, NULL);

-- VVF-ORD-002 (Canyon View special event)
INSERT INTO order_items (order_id, crop_variety_id, product_name, quantity_grams, unit_price, line_total, special_requests) VALUES
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Purple Radish'), 'Purple Radish Microgreens', 2500.0, 0.045, 112.50, 'Premium presentation'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Red Cabbage'), 'Red Cabbage Microgreens', 2000.0, 0.040, 80.00, 'Deep color preferred'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Spicy Mix'), 'Spicy Microgreens Mix', 3000.0, 0.050, 150.00, 'Custom blend for event'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Mild Mix'), 'Mild Microgreens Mix', 2200.0, 0.046, 101.20, NULL);

-- VVF-ORD-003 (Whole Earth Market weekly)
INSERT INTO order_items (order_id, crop_variety_id, product_name, quantity_grams, unit_price, line_total, special_requests) VALUES
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Pea Shoots'), 'Pea Shoots - Retail Pack', 5000.0, 0.028, 140.00, 'Individual 50g packages'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Sunflower'), 'Sunflower - Retail Pack', 4000.0, 0.032, 128.00, 'Individual 50g packages'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Radish'), 'Radish - Retail Pack', 3000.0, 0.035, 105.00, 'Individual 40g packages'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Broccoli'), 'Broccoli - Retail Pack', 3500.0, 0.038, 133.00, 'Individual 50g packages'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Rainbow Mix'), 'Rainbow Mix - Retail Pack', 2500.0, 0.052, 130.00, 'Individual 60g packages'),
((SELECT id FROM orders WHERE order_number = 'VVF-ORD-003'), (SELECT id FROM crop_varieties WHERE name = 'Mild Mix'), 'Mild Mix - Retail Pack', 2000.0, 0.046, 92.00, 'Individual 60g packages');

-- CGH-ORD-001 (Sarah Johnson home delivery)
INSERT INTO order_items (order_id, crop_variety_id, product_name, quantity_grams, unit_price, line_total, special_requests) VALUES
((SELECT id FROM orders WHERE order_number = 'CGH-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Mild Mix'), 'Mild Microgreens Mix', 500.0, 0.046, 23.00, 'Small family portion'),
((SELECT id FROM orders WHERE order_number = 'CGH-ORD-001'), (SELECT id FROM crop_varieties WHERE name = 'Pea Shoots'), 'Pea Shoots', 700.0, 0.028, 19.60, NULL);

-- CGH-ORD-002 (Farm Table Café weekly)
INSERT INTO order_items (order_id, crop_variety_id, product_name, quantity_grams, unit_price, line_total, special_requests) VALUES
((SELECT id FROM orders WHERE order_number = 'CGH-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Rainbow Mix'), 'Rainbow Microgreens Mix', 1200.0, 0.052, 62.40, 'Colorful presentation'),
((SELECT id FROM orders WHERE order_number = 'CGH-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Cilantro'), 'Cilantro Microgreens', 800.0, 0.048, 38.40, 'Fresh herb garnish'),
((SELECT id FROM orders WHERE order_number = 'CGH-ORD-002'), (SELECT id FROM crop_varieties WHERE name = 'Arugula'), 'Arugula Microgreens', 600.0, 0.042, 25.20, NULL);

-- =====================================================================================
-- TASKS - Sample Task Management Data
-- =====================================================================================

-- Verde Valley Farm tasks
INSERT INTO tasks (property_id, title, description, task_type, priority, status, due_date, estimated_duration_minutes, tags, related_batch_id, metadata) VALUES
-- Daily operations
('11111111-1111-1111-1111-111111111111', 'Harvest VVF-2024-002 Sunflowers', 'Harvest 25 trays of sunflower microgreens for ready orders', 'harvesting', 'high', 'todo', CURRENT_DATE + 1, 120, ARRAY['harvest', 'sunflower', 'orders'], (SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), '{"harvest_time": "early_morning", "target_yield": "2500g"}'),

('11111111-1111-1111-1111-111111111111', 'Sow VVF-2024-005 Arugula', 'Sow 18 trays of arugula in Room C1', 'sowing', 'medium', 'todo', CURRENT_DATE + 1, 90, ARRAY['sowing', 'arugula', 'room_c1'], (SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-005'), '{"seed_weight": "180g", "medium": "rockwool"}'),

('11111111-1111-1111-1111-111111111111', 'Package Sedona Bistro Order', 'Package weekly order VVF-ORD-001 for Tuesday delivery', 'delivery', 'high', 'todo', CURRENT_DATE + 1, 60, ARRAY['packaging', 'delivery', 'sedona_bistro'], NULL, '{"order_id": "VVF-ORD-001", "delivery_time": "8-10am"}'),

('11111111-1111-1111-1111-111111111111', 'Check Room A2 Temperature', 'Room A2 temperature sensor showing irregularities', 'maintenance', 'medium', 'todo', CURRENT_DATE, 30, ARRAY['maintenance', 'temperature', 'room_a2'], NULL, '{"sensor_id": "temp_a2_01", "issue": "irregular_readings"}'),

-- Weekly maintenance
('11111111-1111-1111-1111-111111111111', 'Clean Growing Trays - Room B', 'Deep clean and sanitize all growing trays in Room B', 'maintenance', 'medium', 'todo', CURRENT_DATE + 3, 180, ARRAY['cleaning', 'sanitization', 'room_b'], NULL, '{"tray_count": "60", "sanitizer": "food_safe"}'),

('11111111-1111-1111-1111-111111111111', 'Update Inventory Records', 'Update seed inventory and order new stock as needed', 'general', 'low', 'todo', CURRENT_DATE + 5, 45, ARRAY['inventory', 'seeds', 'ordering'], NULL, '{"check_varieties": ["pea", "sunflower", "radish"]}'),

-- Completed tasks
('11111111-1111-1111-1111-111111111111', 'Deliver to Canyon View', 'Delivered special event order VVF-ORD-002', 'delivery', 'high', 'done', CURRENT_DATE - 1, 45, ARRAY['delivery', 'canyon_view', 'completed'], NULL, '{"delivery_time": "completed", "customer_satisfaction": "excellent"}');

-- City Greens Hub tasks
INSERT INTO tasks (property_id, title, description, task_type, priority, status, due_date, estimated_duration_minutes, tags, related_batch_id, metadata) VALUES
('22222222-2222-2222-2222-222222222222', 'Farmers Market Setup', 'Set up booth for Saturday farmers market', 'general', 'high', 'todo', CURRENT_DATE + 2, 90, ARRAY['farmers_market', 'setup', 'saturday'], NULL, '{"location": "downtown_phoenix", "booth_number": "15"}'),

('22222222-2222-2222-2222-222222222222', 'Prepare Home Deliveries', 'Package and route home delivery orders', 'delivery', 'medium', 'todo', CURRENT_DATE + 1, 120, ARRAY['home_delivery', 'packaging', 'routing'], NULL, '{"delivery_count": "8", "route": "central_phoenix"}'),

('22222222-2222-2222-2222-222222222222', 'Harvest CGH-2024-001 Mild Mix', 'Harvest mild mix for farmers market', 'harvesting', 'medium', 'todo', CURRENT_DATE + 1, 75, ARRAY['harvest', 'mild_mix', 'farmers_market'], (SELECT id FROM growing_batches WHERE batch_number = 'CGH-2024-001'), '{"target_yield": "1200g", "package_size": "100g"}');

-- Innovation Lab tasks
INSERT INTO tasks (property_id, title, description, task_type, priority, status, due_date, estimated_duration_minutes, tags, related_batch_id, metadata) VALUES
('33333333-3333-3333-3333-333333333333', 'Document Rockwool Experiment', 'Record growth measurements and photos for IL-2024-EXP-001', 'general', 'medium', 'todo', CURRENT_DATE, 30, ARRAY['research', 'documentation', 'rockwool'], (SELECT id FROM growing_batches WHERE batch_number = 'IL-2024-EXP-001'), '{"measurement_day": "7", "photo_angles": ["top", "side", "detail"]}'),

('33333333-3333-3333-3333-333333333333', 'Analyze Color Development', 'Measure and record color intensity of red cabbage experiment', 'general', 'low', 'todo', CURRENT_DATE + 2, 45, ARRAY['research', 'color', 'analysis'], (SELECT id FROM growing_batches WHERE batch_number = 'IL-2024-EXP-002'), '{"colorimeter": "required", "sample_points": "5"}');

-- =====================================================================================
-- SAMPLE SENSOR DATA - Environmental Monitoring
-- =====================================================================================

-- Verde Valley Farm sensor readings (last 24 hours)
INSERT INTO sensor_readings (property_id, sensor_type, sensor_location, sensor_id, value, unit, recorded_at) VALUES
-- Room A1 (Pea Shoots)
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room A1', 'temp_a1_01', 21.5, '°C', NOW() - INTERVAL '1 hour'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room A1', 'hum_a1_01', 75.2, '%', NOW() - INTERVAL '1 hour'),
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room A1', 'temp_a1_01', 20.8, '°C', NOW() - INTERVAL '6 hours'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room A1', 'hum_a1_01', 78.1, '%', NOW() - INTERVAL '6 hours'),
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room A1', 'temp_a1_01', 19.9, '°C', NOW() - INTERVAL '12 hours'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room A1', 'hum_a1_01', 80.5, '%', NOW() - INTERVAL '12 hours'),

-- Room A2 (Sunflower - ready for harvest)
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room A2', 'temp_a2_01', 23.2, '°C', NOW() - INTERVAL '1 hour'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room A2', 'hum_a2_01', 68.7, '%', NOW() - INTERVAL '1 hour'),
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room A2', 'temp_a2_01', 24.1, '°C', NOW() - INTERVAL '6 hours'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room A2', 'hum_a2_01', 65.3, '%', NOW() - INTERVAL '6 hours'),

-- Room B1 (Radish)
('11111111-1111-1111-1111-111111111111', 'temperature', 'Room B1', 'temp_b1_01', 19.2, '°C', NOW() - INTERVAL '1 hour'),
('11111111-1111-1111-1111-111111111111', 'humidity', 'Room B1', 'hum_b1_01', 82.4, '%', NOW() - INTERVAL '1 hour'),

-- City Greens Hub sensors
('22222222-2222-2222-2222-222222222222', 'temperature', 'Urban Room 1', 'temp_ur1_01', 22.8, '°C', NOW() - INTERVAL '2 hours'),
('22222222-2222-2222-2222-222222222222', 'humidity', 'Urban Room 1', 'hum_ur1_01', 71.5, '%', NOW() - INTERVAL '2 hours'),
('22222222-2222-2222-2222-222222222222', 'temperature', 'Urban Room 2', 'temp_ur2_01', 21.6, '°C', NOW() - INTERVAL '2 hours'),
('22222222-2222-2222-2222-222222222222', 'humidity', 'Urban Room 2', 'hum_ur2_01', 74.2, '%', NOW() - INTERVAL '2 hours');

-- =====================================================================================
-- ALERTS - Sample System Alerts
-- =====================================================================================

-- Active alerts
INSERT INTO alerts (property_id, alert_type, severity, title, message, source_id, is_acknowledged, is_resolved) VALUES
('11111111-1111-1111-1111-111111111111', 'sensor', 'medium', 'Room A2 Temperature High', 'Room A2 temperature has been above 24°C for the last 2 hours. Sunflower microgreens may be affected.', NULL, FALSE, FALSE),

('11111111-1111-1111-1111-111111111111', 'task', 'high', 'Harvest Due Tomorrow', 'VVF-2024-002 Sunflower batch is ready for harvest tomorrow. Order VVF-ORD-001 depends on this harvest.', (SELECT id FROM growing_batches WHERE batch_number = 'VVF-2024-002'), FALSE, FALSE),

('22222222-2222-2222-2222-222222222222', 'order', 'low', 'Farmers Market Preparation', 'Remember to prepare booth setup for Saturday farmers market. Check inventory levels.', NULL, TRUE, FALSE),

-- Resolved alerts
('11111111-1111-1111-1111-111111111111', 'system', 'low', 'Database Backup Completed', 'Daily database backup completed successfully at 2:00 AM.', NULL, TRUE, TRUE),

('33333333-3333-3333-3333-333333333333', 'harvest', 'medium', 'Experiment Ready for Analysis', 'IL-2024-EXP-002 Red Cabbage experiment is ready for color analysis measurements.', (SELECT id FROM growing_batches WHERE batch_number = 'IL-2024-EXP-002'), TRUE, TRUE);

-- =====================================================================================
-- DATA SUMMARY
-- =====================================================================================

-- This test data provides:
-- ✅ 13 crop varieties (popular + premium + mixes)
-- ✅ 3 properties (main farm, urban hub, research lab)
-- ✅ 12 growing batches (various stages: planned, growing, ready, harvested)
-- ✅ 7 customers (restaurants, retailers, individuals)
-- ✅ 6 orders (active and completed)
-- ✅ 24 order items (detailed product breakdown)
-- ✅ 12 tasks (operational, maintenance, delivery, research)
-- ✅ 18 sensor readings (environmental monitoring)
-- ✅ 5 alerts (active and resolved)

-- The data represents realistic microgreens operations with:
-- - Multi-property architecture with different business models
-- - Complete order-to-delivery cycles
-- - Environmental monitoring and alerts
-- - Task management across different operational areas
-- - Research and development activities

-- This enables comprehensive testing of:
-- ✅ Property switching and access control
-- ✅ Order management and fulfillment
-- ✅ Growing cycle tracking
-- ✅ Customer relationship management
-- ✅ Task and workflow management
-- ✅ Environmental monitoring
-- ✅ Alert and notification systems
-- ✅ Agent knowledge and context 