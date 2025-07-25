"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
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
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  Wrench,
} from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  available: boolean;
  price?: string;
  image?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  category: string;
  image?: string;
}

export default function ProductsServicesAdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("products");
  const [selectedItem, setSelectedItem] = useState<Product | Service | null>(null);
  const [editType, setEditType] = useState<"product" | "service">("product");

  // Mock data - replace with actual API calls
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "ถังน้ำมันใต้ดิน PERMATANK®",
      description: "ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล",
      category: "ถังน้ำมัน",
      available: true,
      price: "ติดต่อสอบถาม",
    },
    {
      id: "2",
      name: "ท่อน้ำมันใต้ดินผนัง 2 ชั้น",
      description: "ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล",
      category: "ระบบท่อ",
      available: true,
      price: "ติดต่อสอบถาม",
    },
    {
      id: "3",
      name: "ระบบวัดน้ำมันอัตโนมัติ (ATG)",
      description: "ระบบตรวจวัดระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ",
      category: "ระบบตรวจวัด",
      available: true,
      price: "ติดต่อสอบถาม",
    },
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "ก่อสร้างสถานีบริการน้ำมัน",
      description: "บริการก่อสร้างสถานีบริการน้ำมันครบวงจร",
      features: [
        "ออกแบบและวางผังสถานีบริการน้ำมัน",
        "ก่อสร้างอาคารและโครงสร้าง",
        "ติดตั้งระบบน้ำมันและอุปกรณ์",
        "ตรวจสอบมาตรฐานความปลอดภัย",
      ],
      category: "ก่อสร้าง",
    },
    {
      id: "2",
      name: "บริการต่าง ๆ เกี่ยวกับถังน้ำมัน",
      description: "บริการครบวงจรเกี่ยวกับถังน้ำมันใต้ดิน",
      features: [
        "ผลิตถังน้ำมันใต้ดินผนัง 2 ชั้น PERMATANK®",
        "ติดตั้งและทดสอบระบบถังน้ำมัน",
        "บำรุงรักษาและซ่อมแซมถังน้ำมัน",
        "ตรวจสอบการรั่วไหลและความปลอดภัย",
      ],
      category: "บำรุงรักษา",
    },
  ]);

  const handleEdit = (item: Product | Service, type: "product" | "service") => {
    setSelectedItem(item);
    setEditType(type);
    onOpen();
  };

  const handleDelete = (id: string, type: "product" | "service") => {
    if (type === "product") {
      setProducts(prev => prev.filter(product => product.id !== id));
    } else {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const handleSave = () => {
    // Implement save logic here
    onClose();
    setSelectedItem(null);
  };

  const handleToggleAvailability = (id: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, available: !product.available } : product
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ผลิตภัณฑ์และบริการ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการผลิตภัณฑ์และบริการของบริษัท
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Products and Services tabs"
      >
        <Tab key="products" title={
          <div className="flex items-center space-x-2">
            <Package size={16} />
            <span>ผลิตภัณฑ์</span>
          </div>
        }>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                color="primary"
                startContent={<Plus size={20} />}
                onPress={() => {
                  setSelectedItem(null);
                  setEditType("product");
                  onOpen();
                }}
              >
                เพิ่มผลิตภัณฑ์
              </Button>
            </div>

            <Card>
              <Table aria-label="Products table">
                <TableHeader>
                  <TableColumn>ชื่อผลิตภัณฑ์</TableColumn>
                  <TableColumn>หมวดหมู่</TableColumn>
                  <TableColumn>สถานะ</TableColumn>
                  <TableColumn>ราคา</TableColumn>
                  <TableColumn>การจัดการ</TableColumn>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat">
                          {product.category}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          color={product.available ? "success" : "danger"}
                          variant="flat"
                          onPress={() => handleToggleAvailability(product.id)}
                        >
                          {product.available ? "พร้อมจำหน่าย" : "ไม่พร้อมจำหน่าย"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {product.price || "ไม่ระบุ"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key="edit"
                              startContent={<Edit size={16} />}
                              onPress={() => handleEdit(product, "product")}
                            >
                              แก้ไข
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              color="danger"
                              startContent={<Trash2 size={16} />}
                              onPress={() => handleDelete(product.id, "product")}
                            >
                              ลบ
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </Tab>

        <Tab key="services" title={
          <div className="flex items-center space-x-2">
            <Wrench size={16} />
            <span>บริการ</span>
          </div>
        }>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                color="primary"
                startContent={<Plus size={20} />}
                onPress={() => {
                  setSelectedItem(null);
                  setEditType("service");
                  onOpen();
                }}
              >
                เพิ่มบริการ
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-white dark:bg-gray-800">
                  <CardBody className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {service.name}
                        </h3>
                        <Chip size="sm" variant="flat" className="mb-3">
                          {service.category}
                        </Chip>
                      </div>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key="edit"
                            startContent={<Edit size={16} />}
                            onPress={() => handleEdit(service, "service")}
                          >
                            แก้ไข
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            color="danger"
                            startContent={<Trash2 size={16} />}
                            onPress={() => handleDelete(service.id, "service")}
                          >
                            ลบ
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {service.description}
                    </p>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        คุณสมบัติ:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-gray-500 dark:text-gray-400">
                            และอีก {service.features.length - 3} รายการ...
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* Edit/Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {selectedItem 
              ? `แก้ไข${editType === "product" ? "ผลิตภัณฑ์" : "บริการ"}` 
              : `เพิ่ม${editType === "product" ? "ผลิตภัณฑ์" : "บริการ"}ใหม่`
            }
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label={`ชื่อ${editType === "product" ? "ผลิตภัณฑ์" : "บริการ"}`}
                placeholder={`กรอกชื่อ${editType === "product" ? "ผลิตภัณฑ์" : "บริการ"}`}
                value={selectedItem?.name || ""}
                isRequired
              />
              
              <Textarea
                label="รายละเอียด"
                placeholder="กรอกรายละเอียด"
                value={selectedItem?.description || ""}
                rows={3}
              />

              <Select
                label="หมวดหมู่"
                placeholder="เลือกหมวดหมู่"
              >
                {editType === "product" ? (
                  <>
                    <SelectItem key="ถังน้ำมัน">ถังน้ำมัน</SelectItem>
                    <SelectItem key="ระบบท่อ">ระบบท่อ</SelectItem>
                    <SelectItem key="ระบบตรวจวัด">ระบบตรวจวัด</SelectItem>
                    <SelectItem key="อุปกรณ์ความปลอดภัย">อุปกรณ์ความปลอดภัย</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem key="ก่อสร้าง">ก่อสร้าง</SelectItem>
                    <SelectItem key="บำรุงรักษา">บำรุงรักษา</SelectItem>
                    <SelectItem key="ติดตั้ง">ติดตั้ง</SelectItem>
                    <SelectItem key="ตรวจสอบ">ตรวจสอบ</SelectItem>
                  </>
                )}
              </Select>

              {editType === "product" && (
                <>
                  <Input
                    label="ราคา"
                    placeholder="กรอกราคา (เช่น ติดต่อสอบถาม)"
                    value={(selectedItem as Product)?.price || ""}
                  />
                  <Switch
                    isSelected={(selectedItem as Product)?.available ?? true}
                  >
                    พร้อมจำหน่าย
                  </Switch>
                </>
              )}

              {editType === "service" && (
                <Textarea
                  label="คุณสมบัติ (แยกด้วยเครื่องหมาย |)"
                  placeholder="คุณสมบัติ 1 | คุณสมบัติ 2 | คุณสมบัติ 3"
                  value={(selectedItem as Service)?.features?.join(" | ") || ""}
                  rows={4}
                />
              )}
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
