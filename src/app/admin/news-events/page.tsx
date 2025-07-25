"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
} from "@heroui/react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
} from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
  publishDate: string;
  author: string;
  image?: string;
}

export default function NewsEventsAdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNews, setSelectedNews] = useState<NewsEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with actual API calls
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([
    {
      id: "1",
      title: "ผดุงศิลป์กรุ๊ป คว้าโครงการก่อสร้างสถานีบริการน้ำมันใหญ่",
      excerpt: "บริษัทได้รับเลือกให้เป็นผู้รับเหมาหลักในโครงการก่อสร้างสถานีบริการน้ำมันขนาดใหญ่",
      content: "เนื้อหาข่าวแบบเต็ม...",
      category: "ข่าวบริษัท",
      status: "published",
      featured: true,
      publishDate: "2024-01-15",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "เปิดตัวถังน้ำมัน PERMATANK® รุ่นใหม่",
      excerpt: "นวัตกรรมถังน้ำมันใต้ดินผนัง 2 ชั้น ที่ปลอดภัยและทนทานยิ่งขึ้น",
      content: "เนื้อหาข่าวแบบเต็ม...",
      category: "ผลิตภัณฑ์",
      status: "published",
      featured: false,
      publishDate: "2024-01-10",
      author: "Admin",
    },
    {
      id: "3",
      title: "มาตรฐานความปลอดภัยใหม่ในการก่อสร้าง",
      excerpt: "บริษัทนำมาตรฐานความปลอดภัยระดับสากลมาใช้ในทุกโครงการ",
      content: "เนื้อหาข่าวแบบเต็ม...",
      category: "ความปลอดภัย",
      status: "draft",
      featured: false,
      publishDate: "2024-01-08",
      author: "Admin",
    },
  ]);

  const handleEdit = (news: NewsEvent) => {
    setSelectedNews(news);
    onOpen();
  };

  const handleDelete = (id: string) => {
    setNewsEvents(prev => prev.filter(news => news.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setNewsEvents(prev => 
      prev.map(news => 
        news.id === id ? { ...news, featured: !news.featured } : news
      )
    );
  };

  const handleSave = () => {
    // Implement save logic here
    onClose();
    setSelectedNews(null);
  };

  const filteredNews = newsEvents.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || news.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "success";
      case "draft": return "warning";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ข่าวสารและกิจกรรม
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการข่าวสารและกิจกรรมของบริษัท
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus size={20} />}
          onPress={() => {
            setSelectedNews(null);
            onOpen();
          }}
        >
          เพิ่มข่าวใหม่
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="ค้นหาข่าว..."
              startContent={<Search size={20} />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="max-w-xs"
            />
            <Select
              placeholder="สถานะ"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="max-w-xs"
              startContent={<Filter size={20} />}
            >
              <SelectItem key="all">ทั้งหมด</SelectItem>
              <SelectItem key="published">เผยแพร่แล้ว</SelectItem>
              <SelectItem key="draft">ร่าง</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* News Table */}
      <Card>
        <Table aria-label="News events table">
          <TableHeader>
            <TableColumn>หัวข้อ</TableColumn>
            <TableColumn>หมวดหมู่</TableColumn>
            <TableColumn>สถานะ</TableColumn>
            <TableColumn>ข่าวเด่น</TableColumn>
            <TableColumn>วันที่เผยแพร่</TableColumn>
            <TableColumn>การจัดการ</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredNews.map((news) => (
              <TableRow key={news.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {news.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {news.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat">
                    {news.category}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    color={getStatusColor(news.status)}
                    variant="flat"
                  >
                    {news.status === "published" ? "เผยแพร่แล้ว" : "ร่าง"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color={news.featured ? "warning" : "default"}
                    onPress={() => handleToggleFeatured(news.id)}
                  >
                    <Star size={16} fill={news.featured ? "currentColor" : "none"} />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-1" />
                    {new Date(news.publishDate).toLocaleDateString("th-TH")}
                  </div>
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
                        key="view"
                        startContent={<Eye size={16} />}
                      >
                        ดูรายละเอียด
                      </DropdownItem>
                      <DropdownItem
                        key="edit"
                        startContent={<Edit size={16} />}
                        onPress={() => handleEdit(news)}
                      >
                        แก้ไข
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        color="danger"
                        startContent={<Trash2 size={16} />}
                        onPress={() => handleDelete(news.id)}
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

      {/* Edit/Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {selectedNews ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="หัวข้อข่าว"
                placeholder="กรอกหัวข้อข่าว"
                value={selectedNews?.title || ""}
              />
              <Textarea
                label="สรุปข่าว"
                placeholder="กรอกสรุปข่าว"
                value={selectedNews?.excerpt || ""}
              />
              <Select
                label="หมวดหมู่"
                placeholder="เลือกหมวดหมู่"
                selectedKeys={selectedNews ? [selectedNews.category] : []}
              >
                <SelectItem key="ข่าวบริษัท">ข่าวบริษัท</SelectItem>
                <SelectItem key="ผลิตภัณฑ์">ผลิตภัณฑ์</SelectItem>
                <SelectItem key="ความปลอดภัย">ความปลอดภัย</SelectItem>
                <SelectItem key="กิจกรรม">กิจกรรม</SelectItem>
              </Select>
              <div className="flex gap-4">
                <Select
                  label="สถานะ"
                  placeholder="เลือกสถานะ"
                  selectedKeys={selectedNews ? [selectedNews.status] : []}
                >
                  <SelectItem key="draft">ร่าง</SelectItem>
                  <SelectItem key="published">เผยแพร่</SelectItem>
                </Select>
                <Switch
                  isSelected={selectedNews?.featured || false}
                >
                  ข่าวเด่น
                </Switch>
              </div>
              <Input
                type="date"
                label="วันที่เผยแพร่"
                value={selectedNews?.publishDate || ""}
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
