function flattenJson(obj, options) {
  const result = [];
  const local = options && options.local ? options.local : "";

  function recurse(current, path) {
    if (
      typeof current === "object" &&
      current !== null &&
      !Array.isArray(current)
    ) {
      for (const key in current) {
        recurse(current[key], [...path, key]);
      }
    } else {
      result.push({
        key: path.join("."),
        value: String(current),
        local,
      });
    }
  }

  recurse(obj, []);
  return result;
}

const thLabel = {
  navigation: {
    home: "หน้าแรก",
    company: "เกี่ยวกับเรา",
    services: "สินค้าและบริการ",
    references: "ผลงาน",
    news: "ข่าวสารและกิจกรรม",
    contact: "ติดต่อเรา",
  },
  common: {
    learnMore: "เรียนรู้เพิ่มเติม",
    contactUs: "ติดต่อเรา",
    getQuote: "ขอใบเสนอราคา",
    callNow: "โทรเลย",
    readMore: "อ่านเพิ่มเติม",
    viewAll: "ดูทั้งหมด",
    loading: "กำลังโหลด...",
    error: "เกิดข้อผิดพลาด",
    success: "สำเร็จ",
  },
  home: {
    hero: {
      title: "กลุ่มบริษัท\nOIL DEVELOPMENT",
      subtitle: "ก่อตั้งเมื่อปี 2003",
      description:
        "ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน\nด้วยประสบการณ์กว่า 50 ปี",
      viewServices: "ดูบริการของเรา",
      contactUs: "ติดต่อเรา",
    },
    stats: {
      experience: "ปีประสบการณ์",
      projects: "โครงการที่เสร็จสิ้น",
      clients: "ลูกค้าที่พึงพอใจ",
      support: "บริการสนับสนุน",
    },
    services: {
      title: "สินค้าและบริการ",
      description:
        "ตลอดระยะเวลากว่า 50 ปี กลุ่มบริษัทOIL DEVELOPMENT คือผู้เชี่ยวชาญในธุรกิจสถานีบริการน้ำมันครบวงจร ปัจจุบันเรามีสินค้าและบริการที่ตอบสนองความต้องการของกลุ่มลูกค้า ดังต่อไปนี้",
      viewAll: "สินค้าและบริการ",
      cta: {
        title: "สนใจสินค้าและบริการของเรา?",
        description:
          "ติดต่อเราเพื่อขอคำปรึกษาและรับใบเสนอราคาฟรี หรือดูรายละเอียดเพิ่มเติมของสินค้าและบริการทั้งหมด",
      },
      gasStation: {
        title: "ก่อสร้างสถานีบริการน้ำมัน",
        description:
          "บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ตั้งแต่ออกแบบจนเสร็จสิ้น",
      },
      engineering: {
        title: "บริการวิศวกรรม",
        description: "บริการที่ปรึกษาวิศวกรรมและการจัดการโครงการอย่างมืออาชีพ",
      },
      maintenance: {
        title: "บริการบำรุงรักษา",
        description: "บริการบำรุงรักษาและสนับสนุนการดำเนินงานสถานีบริการน้ำมัน",
      },
    },
    about: {
      title: "เกี่ยวกับกลุ่มบริษัท OIL DEVELOPMENT",
      description:
        "ก่อตั้งขึ้นด้วยวิสัยทัศน์ที่จะเป็นบริษัทชั้นนำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันในประเทศไทย กลุ่มบริษัท OIL DEVELOPMENT ได้ให้บริการลูกค้าด้วยความเป็นเลิศมากว่าสองทศวรรษ",
      features: {
        team: "ทีมวิศวกรมืออาชีพ",
        quality: "มาตรฐานการก่อสร้างคุณภาพ",
        support: "บริการลูกค้า 24/7",
        coverage: "ครอบคลุมบริการทั่วประเทศ",
      },
      certification: "รับรองคุณภาพ",
    },
    cta: {
      title: "พร้อมเริ่มโครงการของคุณแล้วหรือยัง?",
      description:
        "ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคาสำหรับโครงการก่อสร้างสถานีบริการน้ำมันของคุณ",
    },
  },
  footer: {
    company: {
      description:
        "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม",
    },
    quickLinks: "ลิงก์ด่วน",
    services: "บริการของเรา",
    contact: "ข้อมูลติดต่อ",
    workingHours: {
      weekdays: "จันทร์ - ศุกร์: 08:00 - 18:00 น.",
      saturday: "เสาร์: 08:00 - 12:00 น.",
    },
    rights: "สงวนลิขสิทธิ์",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "เงื่อนไขการใช้งาน",
  },
  company: {
    hero: {
      title: "เกี่ยวกับกลุ่มบริษัท OIL DEVELOPMENT",
      subtitle: "ความเป็นเลิศด้านการก่อสร้างและวิศวกรรม",
      description:
        "ค้นพบเส้นทางการเดินทางของเรากว่าสองทศวรรษในการส่งมอบโซลูชันการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่ยอดเยี่ยมทั่วประเทศไทย",
      ourProjects: "ผลงานของเรา",
    },
    mission: {
      title: "พันธกิจของเรา",
      description:
        "เพื่อให้บริการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่ยอดเยี่ยม ซึ่งเกินความคาดหวังของลูกค้า พร้อมทั้งรักษามาตรฐานสูงสุดด้านความปลอดภัย คุณภาพ และความรับผิดชอบต่อสิ่งแวดล้อม",
    },
    vision: {
      title: "วิสัยทัศน์ของเรา",
      description:
        "เป็นบริษัทชั้นนำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันในเอเชียตะวันออกเฉียงใต้ ที่ได้รับการยอมรับในด้านนวัตกรรม ความยั่งยืน และความเป็นเลิศในทุกโครงการที่เราดำเนินการ",
    },
    values: {
      title: "ค่านิยมหลักของเรา",
      description: "หลักการที่เป็นแนวทางในการทำงานและกำหนดวัฒนธรรมองค์กรของเรา",
      excellence: {
        title: "ความเป็นเลิศ",
        description:
          "เรามุ่งมั่นสู่ความสมบูรณ์แบบในทุกด้านของงาน ตั้งแต่การออกแบบเบื้องต้นจนถึงการเสร็จสิ้นโครงการ",
      },
      teamwork: {
        title: "การทำงานเป็นทีม",
        description:
          "เราเชื่อในพลังของการทำงานร่วมกันและทำงานร่วมกันเพื่อให้ได้ผลลัพธ์ที่โดดเด่น",
      },
      integrity: {
        title: "ความซื่อสัตย์",
        description:
          "เราดำเนินธุรกิจด้วยความซื่อสัตย์ ความโปร่งใส และการปฏิบัติที่มีจริยธรรมในทุกการติดต่อ",
      },
      innovation: {
        title: "นวัตกรรม",
        description:
          "เรายอมรับเทคโนโลยีและวิธีการใหม่ๆ เพื่อส่งมอบโซลูชันที่ทันสมัยให้กับลูกค้า",
      },
    },
    history: {
      title: "เส้นทางของเรา",
      description:
        "จากจุดเริ่มต้นที่เรียบง่ายสู่การเป็นผู้นำในการก่อสร้างสถานีบริการน้ำมัน เส้นทางของเราเต็มไปด้วยการเติบโตอย่างต่อเนื่อง นวัตกรรม และความมุ่งมั่นสู่ความเป็นเลิศ",
    },
    milestones: {
      founded:
        "ก่อตั้งบริษัทด้วยวิสัยทัศน์ในการปฏิวัติการก่อสร้างสถานีบริการน้ำมัน",
      expansion:
        "ขยายการดำเนินงานทั่วประเทศไทยด้วยโครงการที่ประสบความสำเร็จหลายโครงการ",
      certification: "ได้รับการรับรอง ISO 9001 สำหรับระบบการจัดการคุณภาพ",
      technology:
        "นำเทคโนโลยีการก่อสร้างขั้นสูงและแนวทางปฏิบัติที่ยั่งยืนมาใช้",
      sustainability: "เปิดตัวโครงการก่อสร้างสีเขียวและโซลูชันพลังงานหมุนเวียน",
      present:
        "ยังคงเป็นผู้นำในอุตสาหกรรมด้วยโซลูชันที่เป็นนวัตกรรมและบริการที่ยอดเยี่ยม",
    },
    certifications: {
      title: "การรับรองและมาตรฐาน",
      description:
        "ความมุ่งมั่นของเราต่อคุณภาพและความปลอดภัยสะท้อนให้เห็นในการรับรองที่ได้รับการยอมรับในระดับสากล",
      iso9001:
        "การรับรองระบบการจัดการคุณภาพเพื่อให้มั่นใจในการส่งมอบบริการที่สม่ำเสมอ",
      iso14001:
        "ระบบการจัดการสิ่งแวดล้อมสำหรับแนวทางปฏิบัติการก่อสร้างที่ยั่งยืน",
      ohsas: "การจัดการอาชีวอนามัยและความปลอดภัยเพื่อการป้องกันคนงาน",
    },
    experience: "ปีแห่งความเป็นเลิศ",
    viewProjects: "ดูผลงานของเรา",
    navigation: {
      overview: "ภาพรวมบริษัท",
      history: "ประวัติความเป็นมา",
      team: "ทีมผู้บริหาร",
      mission: "วิสัยทัศน์และพันธกิจ",
    },
    overview: {
      title: "กลุ่มบริษัท OIL DEVELOPMENT",
      subtitle: "ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน",
      description:
        "ด้วยประสบการณ์กว่า 50 ปี เราให้บริการก่อสร้าง วิศวกรรม และบำรุงรักษาสถานีบริการน้ำมันครบวงจรทั่วประเทศไทย",
      aboutUs: "เกี่ยวกับเรา",
      content: {
        paragraph1:
          "กลุ่มบริษัท OIL DEVELOPMENT ก่อตั้งขึ้นเมื่อปี พ.ศ. 2543 โดยมีจุดประสงค์เพื่อให้บริการด้านการก่อสร้าง วิศวกรรม และบำรุงรักษาสถานีบริการน้ำมันอย่างครบวงจร",
        paragraph2:
          "ด้วยประสบการณ์กว่า 50 ปี เราได้พัฒนาความเชี่ยวชาญในการผลิตถังน้ำมันใต้ดินผนัง 2 ชั้น PERMATANK® ระบบท่อน้ำมันใต้ดิน และระบบวัดน้ำมันอัตโนมัติ (ATG) ที่ได้มาตรฐานสากล",
        paragraph3:
          "เราภาคภูมิใจที่ได้ร่วมงานกับพันธมิตรชั้นนำในอุตสาหกรรมน้ำมันและพลังงาน และได้รับความไว้วางใจจากลูกค้าทั่วประเทศไทย",
      },
    },
    cta: {
      title: "พร้อมที่จะร่วมงานกับเรา?",
      description: "ติดต่อเราวันนี้เพื่อปรึกษาโครงการของคุณ",
    },
  },
  services: {
    hero: {
      title: "สินค้าและบริการ",
      subtitle: "โซลูชันสถานีบริการน้ำมันครบวงจร",
      description:
        "ตั้งแต่การออกแบบเบื้องต้นจนถึงการบำรุงรักษาอย่างต่อเนื่อง เราให้บริการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันครบวงจรที่ปรับแต่งตามความต้องการเฉพาะของคุณ",
      viewProjects: "ดูผลงานของเรา",
    },
    main: {
      title: "บริการหลักของเรา",
      description:
        "เราเชี่ยวชาญในการส่งมอบโซลูชันครบวงจรสำหรับโครงการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน",
    },
    gasStation: {
      title: "ก่อสร้างสถานีบริการน้ำมัน",
      description:
        "บริการก่อสร้างสถานีบริการน้ำมันแบบครบวงจรตั้งแต่การเตรียมพื้นที่จนถึงการเปิดดำเนินการ เราดูแลทุกด้านของโครงการด้วยความแม่นยำและความเชี่ยวชาญ",
      features: {
        design: "การออกแบบสถาปัตยกรรมและวิศวกรรม",
        construction: "การจัดการก่อสร้างครบวงจร",
        installation: "การติดตั้งอุปกรณ์และระบบ",
        compliance: "การปฏิบัติตามกฎระเบียบและใบอนุญาต",
      },
    },
    engineering: {
      title: "บริการที่ปรึกษาวิศวกรรม",
      description:
        "บริการวิศวกรรมมืออาชีพที่ให้ความเชี่ยวชาญทางเทคนิค คำแนะนำด้านกฎระเบียบ และการสนับสนุนการจัดการโครงการสำหรับโครงการสถานีบริการน้ำมันที่ซับซ้อน",
      features: {
        consulting: "การให้คำปรึกษาทางเทคนิคและการศึกษาความเป็นไปได้",
        design: "การออกแบบวิศวกรรมโดยละเอียดและข้อกำหนด",
        management: "การจัดการและประสานงานโครงการ",
        supervision: "การควบคุมการก่อสร้างและควบคุมคุณภาพ",
      },
    },
    maintenance: {
      title: "บำรุงรักษาและสนับสนุน",
      description:
        "บริการบำรุงรักษาครบวงจรเพื่อให้สถานีบริการน้ำมันของคุณดำเนินการอย่างปลอดภัยและมีประสิทธิภาพ ด้วยการหยุดทำงานน้อยที่สุดและผลกำไรสูงสุด",
      features: {
        inspection: "การตรวจสอบความปลอดภัยและการตรวจสอบเป็นประจำ",
        preventive: "โปรแกรมการบำรุงรักษาเชิงป้องกัน",
        emergency: "บริการซ่อมแซมฉุกเฉิน 24/7",
        upgrade: "การอัพเกรดและทำให้อุปกรณ์ทันสมัย",
      },
    },
    additional: {
      title: "บริการเพิ่มเติม",
      description:
        "บริการเฉพาะทางเพื่อเพิ่มประสิทธิภาพการดำเนินงานสถานีบริการน้ำมันและรับประกันประสิทธิภาพที่เหมาะสม",
      equipment: {
        title: "จัดหาอุปกรณ์",
        description:
          "หัวจ่ายน้ำมัน ถัง และอุปกรณ์สถานีคุณภาพสูงจากผู้ผลิตชั้นนำ",
      },
      safety: {
        title: "ระบบความปลอดภัย",
        description:
          "ระบบความปลอดภัยและการตรวจสอบขั้นสูงเพื่อปกป้องการลงทุนและรับประกันการปฏิบัติตามกฎระเบียบ",
      },
      automation: {
        title: "โซลูชันระบบอัตโนมัติ",
        description:
          "ระบบอัตโนมัติและควบคุมสมัยใหม่สำหรับการจัดการและดำเนินงานสถานีที่มีประสิทธิภาพ",
      },
    },
    process: {
      title: "กระบวนการของเรา",
      description:
        "วิธีการที่ได้รับการพิสูจน์แล้วที่รับประกันการส่งมอบโครงการที่ประสบความสำเร็จตั้งแต่แนวคิดจนถึงการเสร็จสิ้น",
      consultation: {
        title: "การปรึกษา",
        description:
          "การปรึกษาเบื้องต้นเพื่อทำความเข้าใจความต้องการและพัฒนาขอบเขตโครงการ",
      },
      design: {
        title: "การออกแบบและวางแผน",
        description:
          "การพัฒนาการออกแบบโดยละเอียด วิศวกรรม และการวางแผนโครงการที่ครอบคลุม",
      },
      construction: {
        title: "การก่อสร้าง",
        description:
          "การจัดการก่อสร้างมืออาชีพพร้อมการควบคุมคุณภาพและการดูแลความปลอดภัย",
      },
      delivery: {
        title: "การส่งมอบและสนับสนุน",
        description:
          "การส่งมอบโครงการ การฝึกอบรม และการสนับสนุนอย่างต่อเนื่องเพื่อรับประกันการดำเนินงานที่ประสบความสำเร็จ",
      },
    },
    learnMore: "เรียนรู้เพิ่มเติม",
    cta: {
      title: "พร้อมเริ่มโครงการสถานีบริการน้ำมันของคุณแล้วหรือยัง?",
      description:
        "ติดต่อทีมผู้เชี่ยวชาญของเราวันนี้เพื่อหารือเกี่ยวกับความต้องการการก่อสร้างหรือวิศวกรรมสถานีบริการน้ำมันของคุณ เราพร้อมช่วยให้วิสัยทัศน์ของคุณเป็นจริง",
    },
  },
  references: {
    hero: {
      title: "ผลงานของเรา",
      subtitle: "ประวัติการทำงานที่พิสูจน์ความเป็นเลิศ",
      description:
        "สำรวจผลงานของเราในโครงการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่ประสบความสำเร็จทั่วประเทศไทย แสดงให้เห็นถึงความมุ่งมั่นของเราต่อคุณภาพและนวัตกรรม",
      viewServices: "ดูบริการของเรา",
    },
    stats: {
      completed: "โครงการที่เสร็จสิ้น",
      clients: "ลูกค้าที่พึงพอใจ",
      provinces: "จังหวัดที่ให้บริการ",
      satisfaction: "ความพึงพอใจของลูกค้า",
    },
    featured: {
      title: "โครงการเด่น",
      description:
        "เน้นโครงการก่อสร้างสถานีบริการน้ำมันที่ประสบความสำเร็จและเป็นนวัตกรรมมากที่สุดของเรา",
    },
    categories: {
      gasStation: "ก่อสร้างสถานีบริการน้ำมัน",
      renovation: "ปรับปรุงสถานี",
      consulting: "ที่ปรึกษาวิศวกรรม",
    },
    projects: {
      title: "โครงการที่เราภาคภูมิใจ",
      sectionLabel: "โครงการที่เสร็จสิ้น",
      noProjects: "ไม่พบโปรเจค",
    },
    keyFeatures: "คุณสมบัติหลัก",
    viewDetails: "ดูรายละเอียด",
    types: {
      title: "ประเภทโครงการ",
      description:
        "เราเชี่ยวชาญในโครงการสถานีบริการน้ำมันประเภทต่างๆ เพื่อตอบสนองความต้องการของลูกค้าที่หลากหลาย",
      newConstruction: {
        title: "ก่อสร้างใหม่",
        description:
          "การก่อสร้างสถานีบริการน้ำมันแบบครบวงจรตั้งแต่เริ่มต้น พร้อมสิ่งอำนวยความสะดวกและอุปกรณ์สมัยใหม่",
      },
      renovation: {
        title: "ปรับปรุงและอัพเกรด",
        description:
          "การทำให้ทันสมัยและอัพเกรดสถานีบริการน้ำมันที่มีอยู่เพื่อปรับปรุงประสิทธิภาพและการปฏิบัติตามกฎระเบียบ",
      },
      consulting: {
        title: "ที่ปรึกษาวิศวกรรม",
        description:
          "บริการที่ปรึกษามืออาชีพสำหรับการออกแบบทางเทคนิค การวางแผน และการจัดการโครงการ",
      },
    },
    cta: {
      title: "เริ่มโครงการถัดไปของคุณกับเรา",
      description:
        "เข้าร่วมกับรายชื่อลูกค้าที่พึงพอใจที่เพิ่มขึ้นของเรา และสัมผัสความแตกต่างที่ความเชี่ยวชาญระดับมืออาชีพสร้างขึ้น",
      startProject: "เริ่มโครงการของคุณ",
    },
  },
  news: {
    hero: {
      title: "ข่าวสารและกิจกรรม",
      subtitle: "ติดตามความพัฒนาล่าสุดของเรา",
      description:
        "ค้นพบข่าวสารล่าสุด การอัพเดตโครงการ ข้อมูลเชิงลึกของอุตสาหกรรม และประกาศของบริษัทจากกลุ่มบริษัท OIL DEVELOPMENT",
      subscribe: "สมัครรับข้อมูลอัพเดต",
    },
    featured: {
      sectionTitle: "ข่าวเด่น",
      label: "ข่าวเด่น",
      title: "กลุ่มบริษัท OIL DEVELOPMENT ชนะโครงการสถานีบริการน้ำมันใหญ่",
      excerpt:
        "เรามีความภาคภูมิใจที่จะประกาศว่า กลุ่มบริษัท OIL DEVELOPMENT ได้รับรางวัลโครงการก่อสร้างสถานีบริการน้ำมันใหญ่มูลค่า 50 ล้านบาท แสดงให้เห็นถึงความเป็นผู้นำอย่างต่อเนื่องในอุตสาหกรรม",
      content:
        "เรารู้สึกตื่นเต้นที่จะแบ่งปันว่า กลุ่มบริษัท OIL DEVELOPMENT ได้รับเลือกให้เป็นผู้รับเหมาหลักสำหรับโครงการก่อสร้างสถานีบริการน้ำมันใหญ่ โครงการนี้แสดงถึงความมุ่งมั่นของเราต่อความเป็นเลิศและนวัตกรรมในอุตสาหกรรม",
    },
    categories: {
      all: "ข่าวทั้งหมด",
      company: "ข่าวบริษัท",
      safety: "ความปลอดภัย",
      sustainability: "ความยั่งยืน",
      technology: "เทคโนโลยี",
      business: "ธุรกิจ",
      partnership: "ความร่วมมือ",
      training: "การฝึกอบรม",
    },
    search: {
      placeholder: "ค้นหาข่าวสารและกิจกรรม...",
    },
    latest: {
      title: "ข่าวสารและอัพเดตล่าสุด",
      description:
        "ติดตามข้อมูลเกี่ยวกับโครงการล่าสุด ความสำเร็จ และการพัฒนาของอุตสาหกรรม",
    },
    articles: {
      safety: {
        title: "การนำมาตรฐานความปลอดภัยใหม่มาใช้",
        excerpt:
          "กลุ่มบริษัท OIL DEVELOPMENT นำมาตรฐานความปลอดภัยระหว่างประเทศใหม่มาใช้ในโครงการก่อสร้างทั้งหมด เพื่อความปลอดภัยของคนงานและประชาชน",
      },
      green: {
        title: "โครงการเทคโนโลยีสีเขียว",
        excerpt:
          "ความมุ่งมั่นของเราต่อความยั่งยืนด้านสิ่งแวดล้อมผ่านการนำเทคโนโลยีการก่อสร้างสีเขียวและโซลูชันพลังงานหมุนเวียนมาใช้",
      },
      expansion: {
        title: "ประกาศการขยายตัวในภูมิภาค",
        excerpt:
          "กลุ่มบริษัท OIL DEVELOPMENT ประกาศการขยายตัวสู่ภูมิภาคใหม่เพื่อให้บริการลูกค้าทั่วเอเชียตะวันออกเฉียงใต้ได้ดีขึ้น",
      },
      technology: {
        title: "การรวมเทคโนโลยีสถานีอัจฉริยะ",
        excerpt:
          "การแนะนำโซลูชันเทคโนโลยีอัจฉริยะที่ทันสมัยสำหรับการดำเนินงานและการจัดการสถานีบริการน้ำมันสมัยใหม่",
      },
      partnership: {
        title: "ความร่วมมือเชิงกลยุทธ์กับซัพพลายเออร์ชั้นนำ",
        excerpt:
          "ความร่วมมือใหม่กับซัพพลายเออร์อุปกรณ์ระหว่างประเทศเพื่อเพิ่มการเสนอบริการและความสามารถของโครงการ",
      },
      training: {
        title: "โปรแกรมการฝึกอบรมพนักงานขั้นสูง",
        excerpt:
          "เปิดตัวโปรแกรมการฝึกอบรมที่ครอบคลุมเพื่อเพิ่มทักษะของพนักงานและรักษามาตรฐานการบริการที่เป็นเลิศของเรา",
      },
    },
    loadMore: "โหลดบทความเพิ่มเติม",
    newsletter: {
      title: "สมัครรับจดหมายข่าว",
      description:
        "รับข้อมูลอัพเดตล่าสุดเกี่ยวกับโครงการของเรา ข้อมูลเชิงลึกของอุตสาหกรรม และข่าวสารของบริษัทส่งตรงถึงกล่องจดหมายของคุณ",
      emailPlaceholder: "ใส่ที่อยู่อีเมลของคุณ",
      subscribe: "สมัครสมาชิก",
      privacy: "เราเคารพความเป็นส่วนตัวของคุณและจะไม่แบ่งปันที่อยู่อีเมลของคุณ",
    },
  },
  contact: {
    hero: {
      title: "ติดต่อเรา",
      subtitle: "มาสร้างวิสัยทัศน์ของคุณร่วมกัน",
      description:
        "พร้อมเริ่มโครงการสถานีบริการน้ำมันของคุณแล้วหรือยัง? ติดต่อทีมผู้เชี่ยวชาญของเราเพื่อรับคำปรึกษา ใบเสนอราคา และคำแนะนำจากผู้เชี่ยวชาญ",
      getQuote: "รับใบเสนอราคาฟรี",
      callNow: "โทรเลย",
    },
    methods: {
      title: "ติดต่อเรา",
      description:
        "เลือกวิธีที่สะดวกที่สุดในการติดต่อเราและเริ่มการปรึกษาโครงการของคุณ",
      phone: {
        title: "โทรหาเรา",
        description:
          "พูดคุยโดยตรงกับผู้เชี่ยวชาญของเราเพื่อรับความช่วยเหลือและคำปรึกษาทันที",
      },
      email: {
        title: "ส่งอีเมลหาเรา",
        description:
          "ส่งความต้องการโดยละเอียดของคุณมาให้เรา และเราจะตอบกลับภายใน 24 ชั่วโมง",
      },
      chat: {
        title: "แชทสด",
        description:
          "แชทกับทีมสนับสนุนของเราเพื่อรับคำตอบที่รวดเร็วสำหรับคำถามของคุณ",
        value: "เริ่มแชท",
      },
    },
    form: {
      title: "ส่งข้อความหาเรา",
      sectionLabel: "แบบฟอร์ม",
      description: "กรอกแบบฟอร์มด้านล่าง และทีมของเราจะติดต่อกลับโดยเร็วที่สุด",
      firstName: "ชื่อ",
      firstNamePlaceholder: "ใส่ชื่อของคุณ",
      lastName: "นามสกุล",
      lastNamePlaceholder: "ใส่นามสกุลของคุณ",
      email: "ที่อยู่อีเมล",
      emailPlaceholder: "ใส่ที่อยู่อีเมลของคุณ",
      phone: "หมายเลขโทรศัพท์",
      phonePlaceholder: "ใส่หมายเลขโทรศัพท์ของคุณ",
      company: "ชื่อบริษัท",
      companyPlaceholder: "ใส่ชื่อบริษัทของคุณ",
      inquiryType: "ประเภทการสอบถาม",
      inquiryTypePlaceholder: "เลือกประเภทการสอบถาม",
      inquiryTypes: {
        general: "ข้อมูลทั่วไป",
        quote: "ขอใบเสนอราคา",
        support: "การสนับสนุนทางเทคนิค",
        partnership: "โอกาสความร่วมมือ",
        career: "สอบถามเกี่ยวกับอาชีพ",
      },
      message: "ข้อความ",
      messagePlaceholder: "บอกเราเกี่ยวกับความต้องการโครงการของคุณ...",
      submit: "ส่งข้อความ",
    },
    offices: {
      title: "สำนักงานของเรา",
      headquarters: {
        name: "สำนักงานใหญ่ - กรุงเทพฯ",
        address:
          "11/1 ซ.พิทักษ์​ 1 ถ.แจ้งวัฒนะ 14 แขวงทุ่งสองห้อง เขตหลักสี่ กทม. 10210",
        hours: "จันทร์ - ศุกร์: 08:00 - 18:00 น.\nเสาร์: 08:00 - 12:00 น.",
      },
      regional: {
        name: "สำนักงานภูมิภาค - ภาคตะวันออก",
        address: "456 นิคมอุตสาหกรรม ชลบุรี 20000 ประเทศไทย",
        hours: "จันทร์ - ศุกร์: 08:00 - 17:00 น.\nเสาร์: 08:00 - 12:00 น.",
      },
    },
    map: {
      title: "แผนที่ตำแหน่งสำนักงาน",
      loading: "กำลังโหลดแผนที่...",
      placeholder: "แผนที่แบบโต้ตอบจะแสดงที่นี่",
    },
    faq: {
      title: "คำถามที่พบบ่อย",
      description:
        "คำตอบด่วนสำหรับคำถามทั่วไปเกี่ยวกับบริการและกระบวนการของเรา",
      questions: {
        services: {
          question: "คุณให้บริการอะไรบ้าง?",
          answer:
            "เราให้บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ที่ปรึกษาวิศวกรรม บริการบำรุงรักษา และการจัดหาอุปกรณ์",
        },
        timeline: {
          question: "โครงการทั่วไปใช้เวลานานเท่าไหร่?",
          answer:
            "ระยะเวลาโครงการแตกต่างกันไปตามขอบเขตและความซับซ้อน โดยทั่วไปใช้เวลา 3-12 เดือนสำหรับการก่อสร้างครบวงจร",
        },
        consultation: {
          question: "คุณให้คำปรึกษาฟรีหรือไม่?",
          answer:
            "ใช่ เราให้คำปรึกษาเบื้องต้นฟรีเพื่อหารือเกี่ยวกับความต้องการโครงการของคุณและให้คำแนะนำเบื้องต้น",
        },
        warranty: {
          question: "มีการรับประกันหรือไม่?",
          answer:
            "เรารับประกันงานก่อสร้าง 2 ปี และอุปกรณ์ PERMATANK® รับประกัน 10 ปี",
        },
      },
      sectionLabel: "คำถามที่พบบ่อย",
      title: "คำถามที่พบบ่อย",
      description: "คำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด",
    },
    info: {
      sectionLabel: "ข้อมูลติดต่อ",
      description:
        "ข้อมูลการติดต่อหลักของบริษัท พร้อมช่องทางการติดต่อที่หลากหลาย",
    },
  },
};

const enLabel = {
  navigation: {
    home: "Home",
    company: "Company Profile",
    services: "Products & Services",
    references: "References",
    news: "News & Events",
    contact: "Contact Us",
  },
  common: {
    learnMore: "Learn More",
    contactUs: "Contact Us",
    getQuote: "Get Quote",
    callNow: "Call Now",
    readMore: "Read More",
    viewAll: "View All",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  home: {
    hero: {
      title: "OIL DEVELOPMENT\nGROUP",
      subtitle: "Established in 2003",
      description:
        "Leading Gas Station Construction & Engineering Services\nWith over 50 years of experience",
      viewServices: "Services",
      contactUs: "Contact Us",
    },
    stats: {
      experience: "Years Experience",
      projects: "Projects Completed",
      clients: "Happy Clients",
      support: "Support Service",
    },
    services: {
      title: "Products & Services",
      description:
        "For over 50 years, OIL DEVELOPMENT has been the expert in comprehensive gas station business.",
      viewAll: "Services",
      cta: {
        title: "Interested in Our Products & Services?",
        description:
          "Contact us for consultation and free quotation, or view more details of all our products and services",
      },
      gasStation: {
        title: "Gas Station Construction",
        description:
          "Complete gas station construction services from design to completion",
      },
      engineering: {
        title: "Engineering Services",
        description:
          "Professional engineering consulting and project management",
      },
      maintenance: {
        title: "Maintenance Services",
        description:
          "Ongoing maintenance and support for gas station operations",
      },
    },
    about: {
      title: "About OIL DEVELOPMENT",
      description:
        "Established with a vision to become the leading gas station construction and engineering company in Thailand, OIL DEVELOPMENT has been serving clients with excellence for over two decades.",
      features: {
        team: "Professional Engineering Team",
        quality: "Quality Construction Standards",
        support: "24/7 Customer Support",
        coverage: "Nationwide Service Coverage",
      },
      certification: "Certified Quality",
    },
    cta: {
      title: "Ready to Start Your Project?",
      description:
        "Contact us today for a free consultation and quote for your gas station construction project.",
    },
  },
  footer: {
    company: {
      description:
        "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering.",
    },
    quickLinks: "Quick Links",
    services: "Our Services",
    contact: "Contact Info",
    workingHours: {
      weekdays: "Mon - Fri: 8:00 AM - 6:00 PM",
      saturday: "Sat: 8:00 AM - 12:00 PM",
    },
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  company: {
    hero: {
      title: "About OIL DEVELOPMENT",
      subtitle: "Excellence in Construction & Engineering",
      description:
        "Discover our journey of over two decades in delivering exceptional gas station construction and engineering solutions across Thailand.",
      ourProjects: "Our Projects",
    },
    mission: {
      title: "Our Mission",
      description:
        "To provide exceptional gas station construction and engineering services that exceed client expectations while maintaining the highest standards of safety, quality, and environmental responsibility.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the leading gas station construction and engineering company in Southeast Asia, recognized for innovation, sustainability, and excellence in every project we undertake.",
    },
    values: {
      title: "Our Core Values",
      description:
        "The principles that guide our work and define our company culture",
      excellence: {
        title: "Excellence",
        description:
          "We strive for perfection in every aspect of our work, from initial design to project completion.",
      },
      teamwork: {
        title: "Teamwork",
        description:
          "We believe in the power of collaboration and work together to achieve outstanding results.",
      },
      integrity: {
        title: "Integrity",
        description:
          "We conduct business with honesty, transparency, and ethical practices in all our dealings.",
      },
      innovation: {
        title: "Innovation",
        description:
          "We embrace new technologies and methods to deliver cutting-edge solutions to our clients.",
      },
    },
    history: {
      title: "Our Journey",
      description:
        "From humble beginnings to becoming a leader in gas station construction, our journey has been marked by continuous growth, innovation, and commitment to excellence.",
    },
    milestones: {
      founded:
        "Company founded with a vision to revolutionize gas station construction",
      expansion:
        "Expanded operations across Thailand with multiple successful projects",
      certification:
        "Achieved ISO 9001 certification for quality management systems",
      technology:
        "Implemented advanced construction technologies and sustainable practices",
      sustainability:
        "Launched green construction initiative and renewable energy solutions",
      present:
        "Continuing to lead the industry with innovative solutions and exceptional service",
    },
    certifications: {
      title: "Certifications & Standards",
      description:
        "Our commitment to quality and safety is reflected in our internationally recognized certifications",
      iso9001:
        "Quality Management System certification ensuring consistent service delivery",
      iso14001:
        "Environmental Management System for sustainable construction practices",
      ohsas: "Occupational Health and Safety management for worker protection",
    },
    experience: "Years of Excellence",
    viewProjects: "View Our Projects",
    navigation: {
      overview: "Company Overview",
      history: "Company History",
      team: "Executive Team",
      mission: "Vision & Mission",
    },
    overview: {
      title: "OIL DEVELOPMENT",
      subtitle: "Leader in Gas Station Construction & Engineering",
      description:
        "With over 50 years of experience, we provide comprehensive construction, engineering, and maintenance services for gas stations throughout Thailand",
      aboutUs: "About Us",
      content: {
        paragraph1:
          "OIL DEVELOPMENT was established in 2000 with the purpose of providing comprehensive construction, engineering, and maintenance services for gas stations.",
        paragraph2:
          "With over 50 years of experience, we have developed expertise in manufacturing double-wall underground fuel tanks PERMATANK®, underground fuel piping systems, and automatic tank gauging (ATG) systems that meet international standards.",
        paragraph3:
          "We are proud to work with leading partners in the oil and energy industry and have earned the trust of customers throughout Thailand.",
      },
    },
    cta: {
      title: "Ready to Work With Us?",
      description: "Contact us today to discuss your project",
    },
  },
  services: {
    hero: {
      title: "Products & Services",
      subtitle: "Comprehensive Gas Station Solutions",
      description:
        "From initial design to ongoing maintenance, we provide complete gas station construction and engineering services tailored to your specific needs.",
      viewProjects: "View Our Projects",
    },
    main: {
      title: "Our Core Services",
      description:
        "We specialize in delivering end-to-end solutions for gas station construction and engineering projects",
    },
    gasStation: {
      title: "Gas Station Construction",
      description:
        "Complete turnkey gas station construction services from site preparation to grand opening. We handle every aspect of your project with precision and expertise.",
      features: {
        design: "Architectural design and engineering",
        construction: "Complete construction management",
        installation: "Equipment and system installation",
        compliance: "Regulatory compliance and permits",
      },
    },
    engineering: {
      title: "Engineering Consulting",
      description:
        "Professional engineering services providing technical expertise, regulatory guidance, and project management support for complex gas station projects.",
      features: {
        consulting: "Technical consulting and feasibility studies",
        design: "Detailed engineering design and specifications",
        management: "Project management and coordination",
        supervision: "Construction supervision and quality control",
      },
    },
    maintenance: {
      title: "Maintenance & Support",
      description:
        "Comprehensive maintenance services to keep your gas station operating safely and efficiently with minimal downtime and maximum profitability.",
      features: {
        inspection: "Regular safety inspections and audits",
        preventive: "Preventive maintenance programs",
        emergency: "24/7 emergency repair services",
        upgrade: "Equipment upgrades and modernization",
      },
    },
    additional: {
      title: "Additional Services",
      description:
        "Specialized services to enhance your gas station operations and ensure optimal performance",
      equipment: {
        title: "Equipment Supply",
        description:
          "High-quality fuel dispensers, tanks, and station equipment from leading manufacturers",
      },
      safety: {
        title: "Safety Systems",
        description:
          "Advanced safety and monitoring systems to protect your investment and ensure compliance",
      },
      automation: {
        title: "Automation Solutions",
        description:
          "Modern automation and control systems for efficient station management and operations",
      },
    },
    process: {
      title: "Our Process",
      description:
        "A proven methodology that ensures successful project delivery from concept to completion",
      consultation: {
        title: "Consultation",
        description:
          "Initial consultation to understand your requirements and develop project scope",
      },
      design: {
        title: "Design & Planning",
        description:
          "Detailed design development, engineering, and comprehensive project planning",
      },
      construction: {
        title: "Construction",
        description:
          "Professional construction management with quality control and safety oversight",
      },
      delivery: {
        title: "Delivery & Support",
        description:
          "Project handover, training, and ongoing support to ensure successful operations",
      },
    },
    learnMore: "Learn More",
    cta: {
      title: "Ready to Start Your Gas Station Project?",
      description:
        "Contact our team of experts today to discuss your gas station construction or engineering needs. We're here to help bring your vision to life.",
    },
  },
  references: {
    hero: {
      title: "Project References",
      subtitle: "Proven Track Record of Excellence",
      description:
        "Explore our portfolio of successful gas station construction and engineering projects across Thailand, showcasing our commitment to quality and innovation.",
      viewServices: "View Our Services",
    },
    stats: {
      completed: "Projects Completed",
      clients: "Satisfied Clients",
      provinces: "Provinces Served",
      satisfaction: "Client Satisfaction",
    },
    featured: {
      title: "Featured Projects",
      description:
        "Highlighting some of our most successful and innovative gas station construction projects",
    },
    categories: {
      gasStation: "Gas Station Construction",
      renovation: "Station Renovation",
      consulting: "Engineering Consulting",
    },
    projects: {
      title: "Project References",
      sectionLabel: "Project References",
      noProjects: "No projects found",
    },
    keyFeatures: "Key Features",
    viewDetails: "View Details",
    types: {
      title: "Project Types",
      description:
        "We specialize in various types of gas station projects to meet diverse client needs",
      newConstruction: {
        title: "New Construction",
        description:
          "Complete turnkey gas station construction from ground up with modern facilities and equipment",
      },
      renovation: {
        title: "Renovation & Upgrade",
        description:
          "Modernization and upgrade of existing gas stations to improve efficiency and compliance",
      },
      consulting: {
        title: "Engineering Consulting",
        description:
          "Professional consulting services for technical design, planning, and project management",
      },
    },
    cta: {
      title: "Start Your Next Project With Us",
      description:
        "Join our growing list of satisfied clients and experience the difference that professional expertise makes.",
      startProject: "Start Your Project",
    },
  },
  news: {
    hero: {
      title: "News & Events",
      subtitle: "Stay Updated with Our Latest Developments",
      description:
        "Discover the latest news, project updates, industry insights, and company announcements from OIL DEVELOPMENT.",
      subscribe: "Subscribe to Updates",
    },
    featured: {
      sectionTitle: "Featured News",
      label: "Featured",
      title: "OIL DEVELOPMENT Wins Major Gas Station Project",
      excerpt:
        "We are proud to announce that OIL DEVELOPMENT has been awarded a major gas station construction project worth 50 million baht, demonstrating our continued leadership in the industry.",
      content:
        "We are excited to share that OIL DEVELOPMENT has been selected as the primary contractor for a major gas station construction project. This project represents our commitment to excellence and innovation in the industry.",
    },
    categories: {
      all: "All News",
      company: "Company News",
      safety: "Safety",
      sustainability: "Sustainability",
      technology: "Technology",
      business: "Business",
      partnership: "Partnerships",
      training: "Training",
    },
    search: {
      placeholder: "Search news and events...",
    },
    latest: {
      title: "Latest News & Updates",
      description:
        "Stay informed about our latest projects, achievements, and industry developments",
    },
    articles: {
      safety: {
        title: "New Safety Standards Implementation",
        excerpt:
          "OIL DEVELOPMENT implements new international safety standards across all construction projects to ensure worker and public safety.",
      },
      green: {
        title: "Green Technology Initiative",
        excerpt:
          "Our commitment to environmental sustainability through the adoption of green construction technologies and renewable energy solutions.",
      },
      expansion: {
        title: "Regional Expansion Announcement",
        excerpt:
          "OIL DEVELOPMENT announces expansion into new regions to better serve clients across Southeast Asia.",
      },
      technology: {
        title: "Smart Station Technology Integration",
        excerpt:
          "Introduction of cutting-edge smart technology solutions for modern gas station operations and management.",
      },
      partnership: {
        title: "Strategic Partnership with Leading Suppliers",
        excerpt:
          "New partnerships with international equipment suppliers to enhance our service offerings and project capabilities.",
      },
      training: {
        title: "Advanced Employee Training Program",
        excerpt:
          "Launch of comprehensive training program to enhance employee skills and maintain our high standards of service excellence.",
      },
    },
    loadMore: "Load More Articles",
    newsletter: {
      title: "Subscribe to Our Newsletter",
      description:
        "Get the latest updates on our projects, industry insights, and company news delivered directly to your inbox.",
      emailPlaceholder: "Enter your email address",
      subscribe: "Subscribe",
      privacy:
        "We respect your privacy and will never share your email address.",
    },
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Let's Build Your Vision Together",
      description:
        "Ready to start your gas station project? Get in touch with our expert team for consultation, quotes, and professional guidance.",
      getQuote: "Get Free Quote",
      callNow: "Call Now",
    },
    methods: {
      title: "Get in Touch",
      description:
        "Choose the most convenient way to reach us and start your project consultation",
      phone: {
        title: "Call Us",
        description:
          "Speak directly with our experts for immediate assistance and consultation",
      },
      email: {
        title: "Email Us",
        description:
          "Send us your detailed requirements and we'll respond within 24 hours",
      },
      chat: {
        title: "Live Chat",
        description:
          "Chat with our support team for quick answers to your questions",
        value: "Start Chat",
      },
    },
    form: {
      title: "Send Us a Message",
      sectionLabel: "Form",
      description:
        "Fill out the form below and our team will get back to you as soon as possible.",
      firstName: "First Name",
      firstNamePlaceholder: "Enter your first name",
      lastName: "Last Name",
      lastNamePlaceholder: "Enter your last name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      phone: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      company: "Company Name",
      companyPlaceholder: "Enter your company name",
      inquiryType: "Inquiry Type",
      inquiryTypePlaceholder: "Select inquiry type",
      inquiryTypes: {
        general: "General Information",
        quote: "Request Quote",
        support: "Technical Support",
        partnership: "Partnership Opportunity",
        career: "Career Inquiry",
      },
      message: "Message",
      messagePlaceholder: "Tell us about your project requirements...",
      submit: "Send Message",
    },
    offices: {
      title: "Our Offices",
      headquarters: {
        name: "Headquarters - Bangkok",
        address:
          "11/1 Chaengwatta 14 Rd, Thungsonghong, Laksi Bangkok 10210, Thailand",
        hours:
          "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 8:00 AM - 12:00 PM",
      },
      regional: {
        name: "Regional Office - Eastern Region",
        address: "456 Industrial Zone, Chonburi 20000, Thailand",
        hours:
          "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM",
      },
    },
    map: {
      title: "Office Location",
      loading: "Loading map...",
      placeholder: "Interactive map will be displayed here",
    },
    faq: {
      title: "Frequently Asked Questions",
      description:
        "Quick answers to common questions about our services and processes",
      questions: {
        services: {
          question: "What services do you offer?",
          answer:
            "We provide complete gas station construction, engineering consulting, maintenance services, and equipment supply.",
        },
        timeline: {
          question: "How long does a typical project take?",
          answer:
            "Project timelines vary based on scope and complexity, typically ranging from 3-12 months for complete construction.",
        },
        consultation: {
          question: "Do you offer free consultations?",
          answer:
            "Yes, we provide free initial consultations to discuss your project requirements and provide preliminary guidance.",
        },
        warranty: {
          question: "Do you provide warranty?",
          answer:
            "We provide 2-year warranty for construction work and 10-year warranty for PERMATANK® equipment.",
        },
      },
      sectionLabel: "FAQ",
      title: "Frequently Asked Questions",
      description: "Answers to the most common questions from our customers",
    },
    info: {
      sectionLabel: "Contact Information",
      description:
        "Main company contact information with various communication channels",
    },
  },
};

// Example usage:
export const flatTH = flattenJson(thLabel, { local: "th" });
export const flatEN = flattenJson(enLabel, { local: "en" });

// console.log("TH>>", flatTH);
// console.log("EN>>", flatEN);
// flat is now an array of { key, value, local } with .th or .en suffix
