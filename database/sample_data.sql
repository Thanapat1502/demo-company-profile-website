-- Insert sample contact information
INSERT INTO contact_info (
    company_name_en, company_name_th,
    address_en, address_th,
    phone, email,
    working_hours_en, working_hours_th,
    social_facebook, social_instagram, social_linkedin, social_youtube
) VALUES (
    'Padungsilpa Group', 'กลุ่มบริษัท ผดุงศิลป์',
    '123 Business District, Bangkok 10110, Thailand', '123 เขตธุรกิจ กรุงเทพมหานคร 10110 ประเทศไทย',
    '+66 2 123 4567', 'info@padungsilpa.group',
    'Mon - Fri: 8:00 AM - 6:00 PM, Sat: 8:00 AM - 12:00 PM', 'จันทร์ - ศุกร์: 08:00 - 18:00 น., เสาร์: 08:00 - 12:00 น.',
    'https://facebook.com/padungsilpagroup', 'https://instagram.com/padungsilpagroup',
    'https://linkedin.com/company/padungsilpagroup', 'https://youtube.com/padungsilpagroup'
);

-- Insert sample team members
INSERT INTO team_members (name_en, name_th, position_en, position_th, bio_en, bio_th, sort_order, is_active) VALUES
('John Smith', 'จอห์น สมิธ', 'Chief Executive Officer', 'ประธานเจ้าหน้าที่บริหาร', 
 'Over 25 years of experience in construction and engineering industry.', 'มีประสบการณ์กว่า 25 ปี ในอุตสาหกรรมก่อสร้างและวิศวกรรม', 1, true),
('Sarah Johnson', 'ซาร่าห์ จอห์นสัน', 'Chief Technology Officer', 'ประธานเจ้าหน้าที่เทคโนโลยี',
 'Expert in modern construction technologies and project management.', 'ผู้เชี่ยวชาญด้านเทคโนโลยีการก่อสร้างสมัยใหม่และการจัดการโครงการ', 2, true),
('Michael Chen', 'ไมเคิล เฉิน', 'Head of Engineering', 'หัวหน้าฝ่ายวิศวกรรม',
 'Licensed professional engineer with expertise in gas station construction.', 'วิศวกรผู้เชี่ยวชาญด้านการก่อสร้างสถานีบริการน้ำมัน', 3, true);

-- Insert sample products and services
INSERT INTO products_services (
    title_en, title_th, slug_en, slug_th,
    description_en, description_th,
    short_description_en, short_description_th,
    category, is_featured, sort_order
) VALUES
('Gas Station Construction', 'ก่อสร้างสถานีบริการน้ำมัน', 'gas-station-construction', 'gas-station-construction-th',
 'Complete gas station construction services from initial design to final completion. We handle all aspects including site preparation, underground tank installation, pump systems, canopy construction, and safety compliance.',
 'บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ตั้งแต่การออกแบบเบื้องต้นจนถึงการก่อสร้างเสร็จสิ้น เราดูแลทุกด้านรวมถึงการเตรียมพื้นที่ การติดตั้งถังใต้ดิน ระบบปั๊ม การก่อสร้างหลังคา และการปฏิบัติตามมาตรฐานความปลอดภัย',
 'Complete gas station construction from design to completion', 'บริการก่อสร้างสถานีบริการน้ำมันครบวงจร',
 'construction', true, 1),

('Engineering Consulting', 'บริการที่ปรึกษาวิศวกรรม', 'engineering-consulting', 'engineering-consulting-th',
 'Professional engineering consulting services for gas station projects. Our team provides technical expertise, regulatory compliance guidance, and project management support.',
 'บริการที่ปรึกษาวิศวกรรมมืออาชีพสำหรับโครงการสถานีบริการน้ำมัน ทีมงานของเราให้ความเชี่ยวชาญทางเทคนิค คำแนะนำการปฏิบัติตามกฎระเบียบ และการสนับสนุนการจัดการโครงการ',
 'Professional engineering consulting and project management', 'บริการที่ปรึกษาวิศวกรรมและการจัดการโครงการ',
 'consulting', true, 2),

('Maintenance Services', 'บริการบำรุงรักษา', 'maintenance-services', 'maintenance-services-th',
 'Comprehensive maintenance and support services for gas station operations. We provide regular inspections, preventive maintenance, emergency repairs, and equipment upgrades.',
 'บริการบำรุงรักษาและสนับสนุนครบวงจรสำหรับการดำเนินงานสถานีบริการน้ำมัน เราให้บริการตรวจสอบเป็นประจำ การบำรุงรักษาเชิงป้องกัน การซ่อมแซมฉุกเฉิน และการอัพเกรดอุปกรณ์',
 'Ongoing maintenance and support for gas station operations', 'บริการบำรุงรักษาและสนับสนุนการดำเนินงาน',
 'maintenance', false, 3);

-- Insert sample project references
INSERT INTO project_references (
    title_en, title_th,
    description_en, description_th,
    client_name, project_type, location, completion_date, project_value, is_featured
) VALUES
('PTT Gas Station - Sukhumvit', 'สถานีบริการ PTT - สุขุมวิท',
 'Complete construction of modern gas station with 8 fuel dispensers, convenience store, and car wash facility.',
 'การก่อสร้างสถานีบริการน้ำมันสมัยใหม่ครบวงจร พร้อมหัวจ่ายน้ำมัน 8 หัว ร้านสะดวกซื้อ และบริการล้างรถ',
 'PTT Public Company Limited', 'Gas Station Construction', 'Bangkok, Thailand', '2023-12-15', 15000000.00, true),

('Shell Station - Pattaya', 'สถานีบริการ Shell - พัทยา',
 'New gas station construction with modern design and eco-friendly features including solar panels and rainwater harvesting.',
 'การก่อสร้างสถานีบริการน้ำมันใหม่ด้วยการออกแบบสมัยใหม่และคุณสมบัติที่เป็นมิตรกับสิ่งแวดล้อม รวมถึงแผงโซลาร์เซลล์และระบบเก็บน้ำฝน',
 'Shell Thailand', 'Gas Station Construction', 'Pattaya, Chonburi', '2023-08-30', 12000000.00, true),

('Bangchak Station - Chiangmai', 'สถานีบริการ บางจาก - เชียงใหม่',
 'Renovation and modernization of existing gas station including new pump systems and safety upgrades.',
 'การปรับปรุงและทำให้ทันสมัยของสถานีบริการน้ำมันที่มีอยู่ รวมถึงระบบปั๊มใหม่และการอัพเกรดด้านความปลอดภัย',
 'Bangchak Corporation', 'Station Renovation', 'Chiangmai, Thailand', '2023-06-20', 8000000.00, false);

-- Insert sample news and events
INSERT INTO news_events (
    title_en, title_th, slug_en, slug_th,
    excerpt_en, excerpt_th,
    content_en, content_th,
    category, status, published_at
) VALUES
('Padungsilpa Group Wins Major Gas Station Project', 'กลุ่มบริษัท ผดุงศิลป์ ชนะโครงการสถานีบริการน้ำมันใหญ่',
 'padungsilpa-wins-major-project', 'padungsilpa-wins-major-project-th',
 'We are proud to announce that Padungsilpa Group has been awarded a major gas station construction project worth 50 million baht.',
 'เรามีความภาคภูมิใจที่จะประกาศว่า กลุ่มบริษัท ผดุงศิลป์ ได้รับรางวัลโครงการก่อสร้างสถานีบริการน้ำมันใหญ่มูลค่า 50 ล้านบาท',
 'We are excited to share that Padungsilpa Group has been selected as the primary contractor for a major gas station construction project. This project represents our commitment to excellence and innovation in the industry.',
 'เรารู้สึกตื่นเต้นที่จะแบ่งปันว่า กลุ่มบริษัท ผดุงศิลป์ ได้รับเลือกให้เป็นผู้รับเหมาหลักสำหรับโครงการก่อสร้างสถานีบริการน้ำมันใหญ่ โครงการนี้แสดงถึงความมุ่งมั่นของเราต่อความเป็นเลิศและนวัตกรรมในอุตสาหกรรม',
 'company-news', 'published', NOW() - INTERVAL '7 days'),

('New Safety Standards Implementation', 'การนำมาตรฐานความปลอดภัยใหม่มาใช้',
 'new-safety-standards-implementation', 'new-safety-standards-implementation-th',
 'Padungsilpa Group implements new international safety standards across all construction projects to ensure worker and public safety.',
 'กลุ่มบริษัท ผดุงศิลป์ นำมาตรฐานความปลอดภัยระหว่างประเทศใหม่มาใช้ในโครงการก่อสร้างทั้งหมด เพื่อความปลอดภัยของคนงานและประชาชน',
 'Safety is our top priority. We have implemented new international safety standards across all our construction projects to ensure the highest level of protection for our workers and the public.',
 'ความปลอดภัยคือสิ่งสำคัญอันดับแรกของเรา เราได้นำมาตรฐานความปลอดภัยระหว่างประเทศใหม่มาใช้ในโครงการก่อสร้างทั้งหมดของเรา เพื่อให้มั่นใจในระดับการป้องกันสูงสุดสำหรับคนงานและประชาชน',
 'safety', 'published', NOW() - INTERVAL '14 days'),

('Green Technology Initiative', 'โครงการเทคโนโลยีสีเขียว',
 'green-technology-initiative', 'green-technology-initiative-th',
 'Our commitment to environmental sustainability through the adoption of green construction technologies and renewable energy solutions.',
 'ความมุ่งมั่นของเราต่อความยั่งยืนด้านสิ่งแวดล้อมผ่านการนำเทคโนโลยีการก่อสร้างสีเขียวและโซลูชันพลังงานหมุนเวียนมาใช้',
 'Padungsilpa Group is committed to environmental sustainability. We are implementing green construction technologies and renewable energy solutions in all our new projects.',
 'กลุ่มบริษัท ผดุงศิลป์ มุ่งมั่นต่อความยั่งยืนด้านสิ่งแวดล้อม เรากำลังนำเทคโนโลยีการก่อสร้างสีเขียวและโซลูชันพลังงานหมุนเวียนมาใช้ในโครงการใหม่ทั้งหมดของเรา',
 'sustainability', 'published', NOW() - INTERVAL '21 days');
