"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
  Image,
  Avatar,
} from "@heroui/react";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  User,
} from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface BoardMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email?: string;
  phone?: string;
  image?: string;
  order: number;
}

export default function BoardMembersAdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  // Mock data - replace with actual API calls
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([
    {
      id: "1",
      name: "นายสมชาย ผดุงศิลป์",
      position: "ประธานกรรมการบริหาร",
      bio: "ผู้บริหารที่มีประสบการณ์กว่า 25 ปีในอุตสาหกรรมน้ำมันและพลังงาน",
      email: "somchai@padungsilpa.group",
      phone: "02-123-4567",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      order: 1,
    },
    {
      id: "2",
      name: "นางสาวสุดา วิศวกรรม",
      position: "กรรมการผู้จัดการ",
      bio: "ผู้เชี่ยวชาญด้านวิศวกรรมและการก่อสร้างสถานีบริการน้ำมัน",
      email: "suda@padungsilpa.group",
      phone: "02-123-4568",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      order: 2,
    },
    {
      id: "3",
      name: "นายวิชัย เทคโนโลยี",
      position: "ผู้อำนวยการฝ่ายเทคนิค",
      bio: "ผู้เชี่ยวชาญด้านเทคโนโลยีและนวัตกรรมในอุตสาหกรรมน้ำมัน",
      email: "wichai@padungsilpa.group",
      phone: "02-123-4569",
      order: 3,
    },
  ]);

  const handleEdit = (member: BoardMember) => {
    setSelectedMember(member);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setBoardMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSave = () => {
    // Implement save logic here
    onClose();
    setSelectedMember(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement image upload logic here
      console.log("Uploading image:", file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            คณะกรรมการบริหาร
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการข้อมูลคณะกรรมการและผู้บริหารบริษัท
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={() => {
            setSelectedMember(null);
            onOpen();
          }}
        >
          เพิ่มสมาชิกใหม่
        </Button>
      </div>

      {/* Board Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boardMembers
          .sort((a, b) => a.order - b.order)
          .map((member) => (
            <Card key={member.id} className="bg-white dark:bg-gray-800">
              <CardBody className="p-6">
                <div className="text-center">
                  <Avatar
                    src={member.image}
                    name={member.name}
                    className="w-24 h-24 mx-auto mb-4"
                    isBordered
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  {(member.email || member.phone) && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                      {member.email && (
                        <p>📧 {member.email}</p>
                      )}
                      {member.phone && (
                        <p>📞 {member.phone}</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="light"
                      color="primary"
                      startContent={<Edit size={16} />}
                      onPress={() => handleEdit(member)}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      startContent={<Trash2 size={16} />}
                      onPress={() => handleDelete(member.id)}
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>

      {/* Edit/Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {selectedMember ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิกใหม่"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar
                  src={selectedMember?.image}
                  name={selectedMember?.name || "New Member"}
                  className="w-24 h-24"
                  isBordered
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    as="label"
                    htmlFor="image-upload"
                    variant="bordered"
                    startContent={<Upload size={16} />}
                    className="cursor-pointer"
                  >
                    อัปโหลดรูปภาพ
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="ชื่อ-นามสกุล"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={selectedMember?.name || ""}
                  isRequired
                />
                <Input
                  label="ตำแหน่ง"
                  placeholder="กรอกตำแหน่ง"
                  value={selectedMember?.position || ""}
                  isRequired
                />
              </div>

              <Textarea
                label="ประวัติและผลงาน"
                placeholder="กรอกประวัติและผลงาน"
                value={selectedMember?.bio || ""}
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="อีเมล"
                  type="email"
                  placeholder="กรอกอีเมล"
                  value={selectedMember?.email || ""}
                />
                <Input
                  label="เบอร์โทรศัพท์"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  value={selectedMember?.phone || ""}
                />
              </div>

              <Input
                label="ลำดับการแสดง"
                type="number"
                placeholder="กรอกลำดับการแสดง"
                value={selectedMember?.order?.toString() || ""}
                min={1}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              ยกเลิก
            </Button>
            <Button color="primary" onPress={handleSave}>
              บันทึก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
