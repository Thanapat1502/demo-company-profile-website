"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@heroui/react";
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Key,
  LogOut,
  Save,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface BusinessInfo {
  companyName: string;
  companyNameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  website: string;
  fax?: string;
  description: string;
  descriptionEn: string;
}

export default function SettingsAdminPage() {
  const router = useRouter();
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
  const { isOpen: isLogoutModalOpen, onOpen: onLogoutModalOpen, onClose: onLogoutModalClose } = useDisclosure();
  
  const [activeTab, setActiveTab] = useState("business");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mock business info - replace with actual API calls
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "กลุ่มบริษัท ผดุงศิลป์",
    companyNameEn: "Padungsilpa Group",
    address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร 10110",
    addressEn: "123 Sukhumvit Road, Khlong Tan, Khlong Tan District, Bangkok 10110",
    phone: "02-123-4567",
    email: "info@padungsilpa.group",
    website: "https://www.padungsilpa.group",
    fax: "02-123-4568",
    description: "ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน ด้วยประสบการณ์กว่า 20 ปี",
    descriptionEn: "Leading provider of gas station construction and engineering services with over 20 years of experience",
  });

  const handleSaveBusinessInfo = () => {
    // Implement save business info logic here
    console.log("Saving business info:", businessInfo);
    // Show success message
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    
    // Implement password change logic here
    console.log("Changing password");
    onPasswordModalClose();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    // Show success message
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out");
    router.push("/admin/login");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          การตั้งค่า
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          จัดการข้อมูลบริษัทและการตั้งค่าระบบ
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Settings tabs"
      >
        <Tab key="business" title={
          <div className="flex items-center space-x-2">
            <Building size={16} />
            <span>ข้อมูลบริษัท</span>
          </div>
        }>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ข้อมูลทั่วไป
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="ชื่อบริษัท (ไทย)"
                    placeholder="กรอกชื่อบริษัท"
                    value={businessInfo.companyName}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, companyName: e.target.value }))}
                    startContent={<Building size={16} />}
                  />
                  <Input
                    label="ชื่อบริษัท (อังกฤษ)"
                    placeholder="Enter company name"
                    value={businessInfo.companyNameEn}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, companyNameEn: e.target.value }))}
                    startContent={<Building size={16} />}
                  />
                </div>

                <Textarea
                  label="คำอธิบายบริษัท (ไทย)"
                  placeholder="กรอกคำอธิบายบริษัท"
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />

                <Textarea
                  label="คำอธิบายบริษัท (อังกฤษ)"
                  placeholder="Enter company description"
                  value={businessInfo.descriptionEn}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, descriptionEn: e.target.value }))}
                  rows={3}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ข้อมูลติดต่อ
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Textarea
                  label="ที่อยู่ (ไทย)"
                  placeholder="กรอกที่อยู่"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                  startContent={<MapPin size={16} />}
                  rows={3}
                />

                <Textarea
                  label="ที่อยู่ (อังกฤษ)"
                  placeholder="Enter address"
                  value={businessInfo.addressEn}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, addressEn: e.target.value }))}
                  startContent={<MapPin size={16} />}
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="เบอร์โทรศัพท์"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                    startContent={<Phone size={16} />}
                  />
                  <Input
                    label="เบอร์แฟกซ์"
                    placeholder="กรอกเบอร์แฟกซ์"
                    value={businessInfo.fax || ""}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, fax: e.target.value }))}
                    startContent={<Phone size={16} />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="อีเมล"
                    type="email"
                    placeholder="กรอกอีเมล"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
                    startContent={<Mail size={16} />}
                  />
                  <Input
                    label="เว็บไซต์"
                    placeholder="กรอก URL เว็บไซต์"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                    startContent={<Globe size={16} />}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    color="primary"
                    startContent={<Save size={16} />}
                    onPress={handleSaveBusinessInfo}
                  >
                    บันทึกข้อมูล
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="account" title={
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>บัญชีผู้ใช้</span>
          </div>
        }>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  การจัดการบัญชี
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      เปลี่ยนรหัสผ่าน
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      เปลี่ยนรหัสผ่านสำหรับเข้าสู่ระบบ
                    </p>
                  </div>
                  <Button
                    color="primary"
                    variant="bordered"
                    startContent={<Key size={16} />}
                    onPress={onPasswordModalOpen}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Button>
                </div>

                <Divider />

                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-200">
                      ออกจากระบบ
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      ออกจากระบบและกลับไปหน้าเข้าสู่ระบบ
                    </p>
                  </div>
                  <Button
                    color="danger"
                    variant="bordered"
                    startContent={<LogOut size={16} />}
                    onPress={onLogoutModalOpen}
                  >
                    ออกจากระบบ
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}>
        <ModalContent>
          <ModalHeader>เปลี่ยนรหัสผ่าน</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="รหัสผ่านปัจจุบัน"
                type="password"
                placeholder="กรอกรหัสผ่านปัจจุบัน"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="รหัสผ่านใหม่"
                type="password"
                placeholder="กรอกรหัสผ่านใหม่"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="ยืนยันรหัสผ่านใหม่"
                type="password"
                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onPasswordModalClose}>
              ยกเลิก
            </Button>
            <Button color="primary" onPress={handleChangePassword}>
              เปลี่ยนรหัสผ่าน
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isLogoutModalOpen} onClose={onLogoutModalClose}>
        <ModalContent>
          <ModalHeader>ยืนยันการออกจากระบบ</ModalHeader>
          <ModalBody>
            <p className="text-gray-600 dark:text-gray-300">
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onLogoutModalClose}>
              ยกเลิก
            </Button>
            <Button color="danger" onPress={handleLogout}>
              ออกจากระบบ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
