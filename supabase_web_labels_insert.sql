-- Supabase SQL script to populate web_labels table with i18n translations
-- Schema: key (text), value (text), locale (text), description (text)

-- Common translations
INSERT INTO web_labels (key, value, locale, description) VALUES
('common.loading', 'Loading...', 'en', ''),
('common.loading', 'กำลังโหลด...', 'th', '');

-- Home page translations
INSERT INTO web_labels (key, value, locale, description) VALUES
-- Stats section
('home.stats.title', 'Proven Excellence', 'en', ''),
('home.stats.title', 'ความเป็นเลิศที่พิสูจน์แล้ว', 'th', ''),
('home.stats.description', 'OIL DEVELOPMENT continuously develops underground fuel tanks and gas station projects, focusing on quality, safety, and the highest standards', 'en', ''),
('home.stats.description', 'กลุ่มบริษัทOIL DEVELOPMENTพัฒนาแบบถังน้ำมันใต้ดินและงานสถานีบริการน้ำมันอย่างต่อเนื่อง มุ่งเน้นคุณภาพ ความปลอดภัย และมาตรฐานสูงสุด', 'th', ''),
('home.stats.policy', 'Under the policy "Correct, Proper, Timely, Safe"', 'en', ''),
('home.stats.policy', 'ภายใต้นโยบาย "ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย"', 'th', ''),
('home.stats.bottomMessage', 'With over 50 years of experience, we are ready to provide comprehensive services from design, construction, system installation, and maintenance', 'en', ''),
('home.stats.bottomMessage', 'ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา', 'th', ''),
('home.stats.gasStationConstruction', 'Gas Station Construction (Stations)', 'en', ''),
('home.stats.gasStationConstruction', 'ก่อสร้างสถานีบริการน้ำมัน (สถานีบริการน้ำมัน)', 'th', ''),
('home.stats.permatankProduction', 'PERMATANK® Double-Wall Underground Tank Production (Units)', 'en', ''),
('home.stats.permatankProduction', 'ผลิตถังน้ำมันใต้ดินผนัง2ชั้น PERMATANK® (ใบ)', 'th', ''),
('home.stats.pipeInstallation', 'Double-Wall Underground Piping Sales and Installation (Stations)', 'en', ''),
('home.stats.pipeInstallation', 'จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น (สถานีบริการน้ำมัน)', 'th', ''),
('home.stats.atgSystem', 'Automatic Tank Gauging System Sales and Installation (ATG)', 'en', ''),
('home.stats.atgSystem', 'จำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน (ATG)', 'th', ''),

-- Products section
('home.products.sectionLabel', 'PRODUCTS', 'en', ''),
('home.products.sectionLabel', 'สินค้า', 'th', ''),
('home.products.title', 'Products & Services', 'en', ''),
('home.products.title', 'สินค้าของเรา', 'th', ''),
('home.products.description', 'High-quality products and services for gas stations and energy industry', 'en', ''),
('home.products.description', 'ผลิตภัณฑ์และบริการคุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน', 'th', ''),
('home.products.showLess', 'Show Less', 'en', ''),
('home.products.showLess', 'แสดงน้อยลง', 'th', ''),
('home.products.viewAll', 'View All Products', 'en', ''),
('home.products.viewAll', 'ดูผลิตภัณฑ์ทั้งหมด', 'th', ''),
('home.products.viewProductsPage', 'View Products Page', 'en', ''),
('home.products.viewProductsPage', 'ดูหน้าผลิตภัณฑ์', 'th', ''),

-- Overview section
('home.overview.sectionLabel', 'ABOUT US', 'en', ''),
('home.overview.sectionLabel', 'เกี่ยวกับเรา', 'th', ''),
('home.overview.title', 'Leading Company in', 'en', ''),
('home.overview.title', 'บริษัทผู้นำด้าน', 'th', ''),
('home.overview.titleHighlight', 'Gas Station Construction', 'en', ''),
('home.overview.titleHighlight', 'การก่อสร้างสถานีบริการน้ำมัน', 'th', ''),
('home.overview.description', 'We are committed to maintaining the highest standards of product and service quality, providing expert consultation for continuous development, and prioritizing the safety of all employees and customers under the concept of ''Correct, Principled, Modern, Safe''', 'en', ''),
('home.overview.description', 'เรามุ่งมั่นรักษามาตรฐานสูงสุดด้านคุณภาพสินค้าและบริการ พร้อมให้คำปรึกษาผู้เชี่ยวชาญเพื่อพัฒนาอย่างต่อเนื่อง และคำนึงถึงความปลอดภัยของพนักงานและลูกค้าทุกท่าน ภายใต้แนวคิด ''ถูกต้อง ถูกหลักดี ทันสมัย ปลอดภัย''', 'th', ''),
('home.overview.learnMore', 'Learn More', 'en', ''),
('home.overview.learnMore', 'เรียนรู้เพิ่มเติม', 'th', ''),
('home.overview.viewProjects', 'View Projects', 'en', ''),
('home.overview.viewProjects', 'ดูผลงาน', 'th', ''),

-- Overview features
('home.overview.features.safety.title', 'Highest Safety Standards', 'en', ''),
('home.overview.features.safety.title', 'มาตรฐานความปลอดภัยสูงสุด', 'th', ''),
('home.overview.features.safety.description', 'Safety systems certified to international UL and STI-P3® standards', 'en', ''),
('home.overview.features.safety.description', 'ระบบความปลอดภัยที่ได้รับการรับรองมาตรฐานสากล UL และ STI-P3®', 'th', ''),
('home.overview.features.expertise.title', 'Professional Expertise', 'en', ''),
('home.overview.features.expertise.title', 'ความเชี่ยวชาญระดับมืออาชีพ', 'th', ''),
('home.overview.features.expertise.description', 'Expert engineering and construction team with over 50 years of experience', 'en', ''),
('home.overview.features.expertise.description', 'ทีมงานผู้เชี่ยวชาญด้านวิศวกรรมและการก่อสร้างกว่า 50 ปี', 'th', ''),
('home.overview.features.support.title', '24/7 After-Sales Service', 'en', ''),
('home.overview.features.support.title', 'บริการหลังการขายตลอด 24 ชั่วโมง', 'th', ''),
('home.overview.features.support.description', 'Support team ready to serve around the clock for maximum safety', 'en', ''),
('home.overview.features.support.description', 'ทีมซัพพอร์ตพร้อมให้บริการตลอดเวลาเพื่อความปลอดภัยสูงสุด', 'th', ''),
('home.overview.features.technology.title', 'Advanced PERMATANK® Technology', 'en', ''),
('home.overview.features.technology.title', 'เทคโนโลยี PERMATANK® ทันสมัย', 'th', ''),
('home.overview.features.technology.description', 'Double-wall underground fuel storage tanks meeting international standards', 'en', ''),
('home.overview.features.technology.description', 'ถังเก็บน้ำมันใต้ดินผนัง 2 ชั้นที่ได้มาตรฐานระหว่างประเทศ', 'th', ''),

-- Partners section
('home.partners.sectionLabel', 'Our Partners', 'en', ''),
('home.partners.sectionLabel', 'พันธมิตรของเรา', 'th', ''),
('home.partners.title', 'Trusted by', 'en', ''),
('home.partners.title', 'ความไว้วางใจจาก', 'th', ''),
('home.partners.titleHighlight', 'Energy Leaders', 'en', ''),
('home.partners.titleHighlight', 'ผู้นำด้านพลังงาน', 'th', ''),
('home.partners.description', 'We are proud to be trusted by leading oil companies in the country for construction and installation services of gas station systems', 'en', ''),
('home.partners.description', 'เราภูมิใจที่ได้รับความไว้วางใจจากบริษัทน้ำมันชั้นนำของประเทศ ในการให้บริการก่อสร้างและติดตั้งระบบสถานีบริการน้ำมัน', 'th', ''),
('home.partners.trustMessage', 'Trusted by Leading Partners', 'en', ''),
('home.partners.trustMessage', 'ความไว้วางใจจากพันธมิตรชั้นนำ', 'th', ''),
('home.partners.additionalMessage', 'And many other partners who trust in the quality of our work', 'en', ''),
('home.partners.additionalMessage', 'และพันธมิตรอื่น ๆ อีกมากมาย ที่ไว้วางใจในคุณภาพงานของเรา', 'th', '');

-- Company page translations
INSERT INTO web_labels (key, value, locale, description) VALUES
-- Navigation
('company.navigation.overview', 'Company Overview', 'en', ''),
('company.navigation.overview', 'ภาพรวมบริษัท', 'th', ''),
('company.navigation.history', 'Company History', 'en', ''),
('company.navigation.history', 'ประวัติความเป็นมา', 'th', ''),
('company.navigation.team', 'Executive Team', 'en', ''),
('company.navigation.team', 'ทีมผู้บริหาร', 'th', ''),
('company.navigation.mission', 'Mission & Vision', 'en', ''),
('company.navigation.mission', 'วิสัยทัศน์และพันธกิจ', 'th', ''),

-- History page
('company.history.hero.title', 'Company History', 'en', ''),
('company.history.hero.title', 'ประวัติความเป็นมา', 'th', ''),
('company.history.hero.subtitle', 'Journey of Success', 'en', ''),
('company.history.hero.subtitle', 'เส้นทางแห่งความสำเร็จ', 'th', ''),
('company.history.hero.description', 'Over 50 years of experience\nin fuel station construction industry', 'en', ''),
('company.history.hero.description', 'มากกว่า 50 ปีแห่งประสบการณ์\nในอุตสาหกรรมการก่อสร้างสถานีบริการน้ำมัน', 'th', ''),
('company.history.title', 'Company Origin', 'en', ''),
('company.history.title', 'ประวัติความเป็นมา', 'th', ''),
('company.history.imageAlt', 'Company History', 'en', ''),
('company.history.imageAlt', 'ประวัติบริษัท', 'th', ''),
('company.history.placeholderText', 'Company History Images', 'en', ''),
('company.history.placeholderText', 'รูปภาพประวัติบริษัท', 'th', ''),
('company.history.sectionLabel', 'History', 'en', ''),
('company.history.sectionLabel', 'ประวัติศาสตร์', 'th', ''),
('company.history.subtitle', 'Follow our development and progress over the past 5 decades', 'en', ''),
('company.history.subtitle', 'ติดตามการพัฒนาและความก้าวหน้าของเราตลอด 5 ทศวรรษที่ผ่านมา', 'th', ''),

-- History beginning section
('company.history.beginning.title', 'The Beginning', 'en', ''),
('company.history.beginning.title', 'จุดเริ่มต้น', 'th', ''),
('company.history.beginning.description1', 'OIL DEVELOPMENT started its fuel station business in 1964 under the name Padungsilpa Engineering Limited Partnership, founded by Mr. Amnuay Sinsamutphadung, who had extensive experience and expertise in construction work.', 'en', ''),
('company.history.beginning.description1', 'กลุ่มบริษัทOIL DEVELOPMENTได้เริ่มต้นธุรกิจเกี่ยวกับสถานีบริการน้ำมันในปี 2507 ในชื่อ ห้างหุ้นส่วนจำกัด OIL DEVELOPMENTการช่าง ก่อตั้งโดยคุณอำนวย สินสมุทรผดุง ซึ่งเป็นผู้ที่มีประสบการณ์และความเชี่ยวชาญในงานก่อสร้าง', 'th', ''),
('company.history.beginning.description2', 'In the early days of business operations, the company focused on providing construction and installation services for various systems in fuel stations, particularly the installation of fuel tanks and fuel piping systems.', 'en', ''),
('company.history.beginning.description2', 'ในช่วงแรกของการดำเนินธุรกิจ บริษัทมุ่งเน้นการให้บริการด้านการก่อสร้างและติดตั้งระบบต่างๆ ในสถานีบริการน้ำมัน โดยเฉพาะการติดตั้งถังน้ำมันและระบบท่อส่งน้ำมัน', 'th', ''),

-- History expansion section
('company.history.expansion.title', 'Business Expansion', 'en', ''),
('company.history.expansion.title', 'การขยายธุรกิจ', 'th', ''),
('company.history.expansion.imageAlt', 'Business Expansion', 'en', ''),
('company.history.expansion.imageAlt', 'การขยายธุรกิจ', 'th', ''),
('company.history.expansion.description1', 'In 1977, the company expanded its scope of operations and transformed into Padungsilpa Engineering Co., Ltd. to accommodate business growth and more diverse services.', 'en', ''),
('company.history.expansion.description1', 'ในปี 2520 บริษัทได้ขยายขอบเขตการดำเนินงานและเปลี่ยนแปลงเป็น บริษัท OIL DEVELOPMENTโยธาการ จำกัด เพื่อรองรับการเติบโตของธุรกิจและการให้บริการที่หลากหลายมากขึ้น', 'th', ''),
('company.history.expansion.description2', 'The business expansion during this period enabled the company to take on larger projects and began developing expertise in modern fuel storage technology.', 'en', ''),
('company.history.expansion.description2', 'การขยายธุรกิจในช่วงนี้ทำให้บริษัทสามารถรับงานโครงการขนาดใหญ่มากขึ้น และเริ่มพัฒนาความเชี่ยวชาญในด้านเทคโนโลยีการจัดเก็บน้ำมันที่ทันสมัย', 'th', ''),

-- History innovation section
('company.history.innovation.title', 'Innovation & Technology', 'en', ''),
('company.history.innovation.title', 'นวัตกรรมและเทคโนโลยี', 'th', ''),
('company.history.innovation.imageAlt', 'Innovation & Technology', 'en', ''),
('company.history.innovation.imageAlt', 'นวัตกรรมและเทคโนโลยี', 'th', ''),
('company.history.innovation.description1', 'The company imported PERMATANK® technology from Germany, which is a high-standard and safe underground fuel tank system, making the company a leader in fuel storage technology in Thailand.', 'en', ''),
('company.history.innovation.description1', 'บริษัทได้นำเข้าเทคโนโลยี PERMATANK® จากประเทศเยอรมนี ซึ่งเป็นระบบถังน้ำมันใต้ดินที่มีมาตรฐานสูงและปลอดภัย ทำให้บริษัทกลายเป็นผู้นำในด้านเทคโนโลยีการจัดเก็บน้ำมันในประเทศไทย', 'th', ''),
('company.history.innovation.description2', 'With over 50 years of experience, we are ready to provide comprehensive services from design, construction, system installation, and maintenance to fully meet customer needs.', 'en', ''),
('company.history.innovation.description2', 'ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา เพื่อตอบสนองความต้องการของลูกค้าอย่างครบถ้วน', 'th', ''),

-- Executive page
('company.executive.hero.title', 'Executive Team', 'en', ''),
('company.executive.hero.title', 'ทีมผู้บริหาร', 'th', ''),
('company.executive.hero.subtitle', 'Experienced Leadership', 'en', ''),
('company.executive.hero.subtitle', 'ผู้นำที่มีประสบการณ์', 'th', ''),
('company.executive.hero.description', 'Professional executive team with expertise in each field', 'en', ''),
('company.executive.hero.description', 'ทีมผู้บริหารมืออาชีพ ที่มีความเชี่ยวชาญในแต่ละสาขา', 'th', ''),
('company.executive.description', 'Experienced leaders with expertise in driving organizational success', 'en', ''),
('company.executive.description', 'ผู้นำที่มีประสบการณ์และความเชี่ยวชาญในการขับเคลื่อนองค์กรสู่ความสำเร็จ', 'th', ''),
('company.executive.messageFromManagement.sectionLabel', 'Message from Management', 'en', ''),
('company.executive.messageFromManagement.sectionLabel', 'สาส์นจากผู้บริหาร', 'th', ''),
('company.executive.messageFromManagement.title', 'Message from Management', 'en', ''),
('company.executive.messageFromManagement.title', 'สาส์นจากผู้บริหาร', 'th', ''),

-- Mission page
('company.mission.hero.title', 'Mission & Vision', 'en', ''),
('company.mission.hero.title', 'วิสัยทัศน์และพันธกิจ', 'th', ''),
('company.mission.hero.subtitle', 'Principles & Values', 'en', ''),
('company.mission.hero.subtitle', 'หลักการและค่านิยม', 'th', ''),
('company.mission.hero.description', 'Striving for Excellence\nwith Social Responsibility', 'en', ''),
('company.mission.hero.description', 'มุ่งมั่นสู่ความเป็นเลิศ\nด้วยความรับผิดชอบต่อสังคม', 'th', ''),
('company.mission.commitments.sectionLabel', 'COMMITMENTS', 'en', ''),
('company.mission.commitments.sectionLabel', 'ความมุ่งมั่น', 'th', ''),
('company.mission.commitments.title', 'Our Commitments', 'en', ''),
('company.mission.commitments.title', 'ความมุ่งมั่นของเรา', 'th', '');

-- Services page translations
INSERT INTO web_labels (key, value, locale, description) VALUES
-- Construction services
('services.construction.title', 'Gas Station Construction Services', 'en', ''),
('services.construction.title', 'งานก่อสร้างสถานีบริการน้ำมัน', 'th', ''),
('services.construction.description', 'Complete gas station construction services from design and installation to maintenance', 'en', ''),
('services.construction.description', 'บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ตั้งแต่การออกแบบ ติดตั้ง จนถึงการบำรุงรักษา', 'th', ''),
('services.construction.sectionLabel', 'CONSTRUCTION', 'en', ''),
('services.construction.sectionLabel', 'งานก่อสร้าง', 'th', ''),
('services.construction.experienceText', 'With over 50 years of experience in gas station construction, we understand the specific needs and requirements of this industry very well.', 'en', ''),
('services.construction.experienceText', 'ด้วยประสบการณ์ในการก่อสร้างสถานีบริการน้ำมันมากกว่า 50 ปี ทำให้เราเข้าใจถึงความต้องการและข้อกำหนดเฉพาะของอุตสาหกรรมนี้เป็นอย่างดี', 'th', ''),
('services.construction.policyText', 'Under the policy ''Correct, Proper, Timely, Safe''', 'en', ''),
('services.construction.policyText', 'ภายใต้นโยบาย ''ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย''', 'th', ''),
('services.construction.comprehensiveText', 'We provide comprehensive services from design, construction, equipment installation, and maintenance to ensure customers receive complete and highest quality service.', 'en', ''),
('services.construction.comprehensiveText', 'เราให้บริการครบวงจรตั้งแต่การออกแบบ การก่อสร้าง การติดตั้งอุปกรณ์ และการบำรุงรักษา เพื่อให้ลูกค้าได้รับบริการที่สมบูรณ์แบบและมีคุณภาพสูงสุด', 'th', ''),
('services.construction.contactButton', 'Contact Us', 'en', ''),
('services.construction.contactButton', 'ติดต่อสอบถาม', 'th', ''),
('services.construction.placeholderText', 'Gas Station Construction Images', 'en', ''),
('services.construction.placeholderText', 'รูปภาพงานก่อสร้างสถานีบริการน้ำมัน', 'th', ''),

-- Permatank services
('services.permatank.title', 'PERMATANK® Underground Fuel Tanks', 'en', ''),
('services.permatank.title', 'ถังน้ำมันใต้ดิน PERMATANK®', 'th', ''),
('services.permatank.description', 'Double-wall underground fuel tanks, durable, safe, and internationally certified', 'en', ''),
('services.permatank.description', 'ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล', 'th', ''),

-- Pipe installation services
('services.pipeInstallation.title', 'Double-Wall Underground Piping', 'en', ''),
('services.pipeInstallation.title', 'ท่อน้ำมันใต้ดินผนัง 2 ชั้น', 'th', ''),
('services.pipeInstallation.description', 'Underground fuel piping system that prevents leaks with real-time leak detection system', 'en', ''),
('services.pipeInstallation.description', 'ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหลแบบเรียลไทม์', 'th', ''),
('services.pipeInstallation.sectionLabel', 'PIPE INSTALLATION', 'en', ''),
('services.pipeInstallation.sectionLabel', 'ติดตั้งท่อ', 'th', ''),
('services.pipeInstallation.detailedDescription', 'With over 20 years of experience in double-wall fuel pipe installation, Padungsilpa Engineering Co., Ltd. is an authorized distributor and installer of NUPIGECO S.P.A. brand fuel pipes, Smartflex and Ecoflex models, manufactured in Italy. Made from Polyethylene (PE) and Polyamide (PA) materials with special properties to prevent fuel leaks and can detect leaks in real-time. This piping system is certified to European Standard EN 14125 and tested in various environments, ensuring maximum durability and safety. With installation teams trained directly by the product owner, with experience in over 300 projects.', 'en', ''),
('services.pipeInstallation.detailedDescription', 'ด้วยประสบการณ์การติดตั้งท่อน้ำมันแบบผนัง 2 ชั้นมากกว่า 20 ปี บริษัท OIL DEVELOPMENTวิศวการ จำกัด เป็นตัวแทนจำหน่ายและติดตั้งท่อน้ำมันยี่ห้อ NUPIGECO S.P.A. รุ่น Smartflex และ Ecoflex ซึ่งผลิตในประเทศอิตาลี ผลิตจากวัสดุ Polyethylene (PE) และ Polyamide (PA) ที่มีคุณสมบัติพิเศษในการป้องกันการรั่วไหลของน้ำมัน และสามารถตรวจจับการรั่วไหลได้แบบ Real-Time ระบบท่อนี้ได้รับการรับรองมาตรฐานจาก European Standard EN 14125 และผ่านการทดสอบในสภาพแวดล้อมที่หลากหลาย รับประกันความทนทานและความปลอดภัยสูงสุด โดยมีทีมงานติดตั้งที่ได้รับการฝึกอบรมจากเจ้าของผลิตภัณฑ์โดยตรง ด้วยประสบการณ์มากกว่า 300 โครงการ', 'th', ''),
('services.pipeInstallation.contactButton', 'Contact Us', 'en', ''),
('services.pipeInstallation.contactButton', 'ติดต่อสอบถาม', 'th', ''),

-- ATG system services
('services.atgSystem.title', 'Automatic Tank Gauging (ATG) System', 'en', ''),
('services.atgSystem.title', 'ระบบวัดน้ำมันอัตโนมัติ (ATG)', 'th', ''),
('services.atgSystem.description', 'Automatic fuel level and leak detection system connected to computer and IoT systems', 'en', ''),
('services.atgSystem.description', 'ระบบตรวจวัดระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ เชื่อมต่อระบบคอมพิวเตอร์และ IoT', 'th', ''),
('services.atgSystem.sectionTitle', 'Automatic Tank Gauging System', 'en', ''),
('services.atgSystem.sectionTitle', 'ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน', 'th', ''),

-- Tank services
('services.tankServices.title', 'Tank Services', 'en', ''),
('services.tankServices.title', 'บริการถังน้ำมัน', 'th', ''),
('services.tankServices.description', 'Complete tank services from installation, maintenance to repair', 'en', ''),
('services.tankServices.description', 'บริการครบวงจรสำหรับถังน้ำมัน ตั้งแต่การติดตั้ง บำรุงรักษา จนถึงการซ่อมแซม', 'th', ''),
('services.tankServices.companyName', 'Padungsilpa Engineering Co., Ltd.', 'en', ''),
('services.tankServices.companyName', 'บริษัท OIL DEVELOPMENTวิศวการ จำกัด', 'th', ''),

-- Products services
('services.products.description', 'High-quality products for gas stations and energy industry', 'en', ''),
('services.products.description', 'ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน', 'th', ''),
('services.products.sectionLabel', 'PRODUCTS', 'en', ''),
('services.products.sectionLabel', 'ผลิตภัณฑ์', 'th', ''),
('services.products.title', 'Our Products', 'en', ''),
('services.products.title', 'ผลิตภัณฑ์ของเรา', 'th', ''),
('services.products.showLess', 'Show Less', 'en', ''),
('services.products.showLess', 'แสดงน้อยลง', 'th', ''),
('services.products.viewAll', 'View All Products', 'en', ''),
('services.products.viewAll', 'ดูผลิตภัณฑ์ทั้งหมด', 'th', '');
