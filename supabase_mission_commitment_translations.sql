-- Supabase SQL script for ClientMissionCommitmentPage translations
-- Schema: key (text), value (text), locale (text), description (text)

-- Mission & Vision translations
INSERT INTO web_labels (key, value, locale, description) VALUES
-- Mission section
('company.mission.missionTitle', 'Mission', 'en', ''),
('company.mission.missionTitle', 'พันธกิจ', 'th', ''),
('company.mission.missionDescription', 'To be a leader in providing high-quality gas station construction and engineering services with modern technology, professional teams, and services beyond expectations to create maximum satisfaction for customers and stakeholders', 'en', ''),
('company.mission.missionDescription', 'เป็นผู้นำในการให้บริการด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่มีคุณภาพสูง ด้วยเทคโนโลยีที่ทันสมัย ทีมงานมืออาชีพ และการบริการที่เหนือความคาดหมาย เพื่อสร้างความพึงพอใจสูงสุดให้กับลูกค้าและผู้มีส่วนได้ส่วนเสีย', 'th', ''),
('company.mission.missionImageAlt', 'Mission', 'en', ''),
('company.mission.missionImageAlt', 'พันธกิจ', 'th', ''),

-- Vision section
('company.mission.visionTitle', 'Vision', 'en', ''),
('company.mission.visionTitle', 'วิสัยทัศน์', 'th', ''),
('company.mission.visionDescription', 'To be a leading company in Southeast Asia in gas station and energy construction and engineering, recognized for quality, safety, and sustainability, ready to expand business into clean energy technology in the future', 'en', ''),
('company.mission.visionDescription', 'เป็นบริษัทชั้นนำในภูมิภาคเอเชียตะวันออกเฉียงใต้ ด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันและพลังงาน ที่ได้รับการยอมรับในด้านคุณภาพ ความปลอดภัย และความยั่งยืน พร้อมขยายธุรกิจสู่เทคโนโลยีพลังงานสะอาดในอนาคต', 'th', ''),
('company.mission.visionImageAlt', 'Vision', 'en', ''),
('company.mission.visionImageAlt', 'วิสัยทัศน์', 'th', ''),

-- Commitments section
('company.mission.commitments.description', 'Principles and values we uphold in conducting sustainable business', 'en', ''),
('company.mission.commitments.description', 'หลักการและค่านิยมที่เรายึดถือในการดำเนินธุรกิจอย่างยั่งยืน', 'th', ''),

-- Safety commitment
('company.mission.commitments.safety.title', 'Safety', 'en', ''),
('company.mission.commitments.safety.title', 'ความปลอดภัย', 'th', ''),
('company.mission.commitments.safety.description', 'Committed to maintaining the highest safety standards in every project to protect employees, customers, and communities', 'en', ''),
('company.mission.commitments.safety.description', 'มุ่งมั่นในการรักษามาตรฐานความปลอดภัยสูงสุดในทุกโครงการ เพื่อปกป้องพนักงาน ลูกค้า และชุมชน', 'th', ''),

-- Sustainability commitment
('company.mission.commitments.sustainability.title', 'Sustainability', 'en', ''),
('company.mission.commitments.sustainability.title', 'ความยั่งยืน', 'th', ''),
('company.mission.commitments.sustainability.description', 'Conducting business responsibly towards the environment and supporting sustainable development', 'en', ''),
('company.mission.commitments.sustainability.description', 'ดำเนินธุรกิจอย่างรับผิดชอบต่อสิ่งแวดล้อม และสนับสนุนการพัฒนาที่ยั่งยืน', 'th', ''),

-- Integrity commitment
('company.mission.commitments.integrity.title', 'Integrity', 'en', ''),
('company.mission.commitments.integrity.title', 'ความซื่อสัตย์', 'th', ''),
('company.mission.commitments.integrity.description', 'Adhering to transparency, sincerity, and conducting business with ethics', 'en', ''),
('company.mission.commitments.integrity.description', 'ยึดมั่นในความโปร่งใส ความจริงใจ และการดำเนินธุรกิจด้วยจริยธรรม', 'th', ''),

-- Innovation commitment
('company.mission.commitments.innovation.title', 'Innovation', 'en', ''),
('company.mission.commitments.innovation.title', 'นวัตกรรม', 'th', ''),
('company.mission.commitments.innovation.description', 'Developing new technologies and innovations to continuously meet customer needs', 'en', ''),
('company.mission.commitments.innovation.description', 'พัฒนาเทคโนโลยีและนวัตกรรมใหม่ๆ เพื่อตอบสนองความต้องการของลูกค้าอย่างต่อเนื่อง', 'th', ''),

-- Teamwork commitment
('company.mission.commitments.teamwork.title', 'Teamwork', 'en', ''),
('company.mission.commitments.teamwork.title', 'การทำงานเป็นทีม', 'th', ''),
('company.mission.commitments.teamwork.description', 'Promoting efficient collaboration and developing team potential', 'en', ''),
('company.mission.commitments.teamwork.description', 'ส่งเสริมการทำงานร่วมกันอย่างมีประสิทธิภาพ และการพัฒนาศักยภาพของทีมงาน', 'th', ''),

-- Excellence commitment
('company.mission.commitments.excellence.title', 'Excellence', 'en', ''),
('company.mission.commitments.excellence.title', 'ความเป็นเลิศ', 'th', ''),
('company.mission.commitments.excellence.description', 'Striving for excellence in all aspects of operations and providing services beyond expectations', 'en', ''),
('company.mission.commitments.excellence.description', 'มุ่งมั่นสู่ความเป็นเลิศในทุกด้านของการดำเนินงาน และการให้บริการที่เหนือความคาดหมาย', 'th', '');
