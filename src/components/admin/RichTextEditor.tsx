"use client";

import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@heroui/react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link,
  Quote,
  Type,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
} from "lucide-react";

interface ContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "list" | "quote";
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  listItems?: string[];
}

interface RichTextEditorProps {
  value?: ContentBlock[];
  onChange?: (blocks: ContentBlock[]) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value = [],
  onChange,
  placeholder = "เริ่มเขียนเนื้อหา...",
}: RichTextEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    value.length > 0 ? value : [{ id: "1", type: "paragraph", content: "" }]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBlockId, setSelectedBlockId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    onChange?.(newBlocks);
  };

  const addBlock = (type: ContentBlock["type"], afterId?: string) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      ...(type === "list" && { listItems: [""] }),
    };

    if (afterId) {
      const index = blocks.findIndex((block) => block.id === afterId);
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      updateBlocks(newBlocks);
    } else {
      updateBlocks([...blocks, newBlock]);
    }
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    );
    updateBlocks(newBlocks);
  };

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      updateBlocks(blocks.filter((block) => block.id !== id));
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id);
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < blocks.length - 1)
    ) {
      const newBlocks = [...blocks];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];
      updateBlocks(newBlocks);
    }
  };

  const handleImageAdd = () => {
    if (imageUrl && selectedBlockId) {
      updateBlock(selectedBlockId, {
        type: "image",
        imageUrl,
        imageAlt,
        content: imageAlt,
      });
      setImageUrl("");
      setImageAlt("");
      onClose();
    }
  };

  const updateListItem = (blockId: string, itemIndex: number, value: string) => {
    const block = blocks.find((b) => b.id === blockId);
    if (block && block.listItems) {
      const newListItems = [...block.listItems];
      newListItems[itemIndex] = value;
      updateBlock(blockId, { listItems: newListItems });
    }
  };

  const addListItem = (blockId: string) => {
    const block = blocks.find((b) => b.id === blockId);
    if (block && block.listItems) {
      updateBlock(blockId, { listItems: [...block.listItems, ""] });
    }
  };

  const removeListItem = (blockId: string, itemIndex: number) => {
    const block = blocks.find((b) => b.id === blockId);
    if (block && block.listItems && block.listItems.length > 1) {
      const newListItems = block.listItems.filter((_, i) => i !== itemIndex);
      updateBlock(blockId, { listItems: newListItems });
    }
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const isFirst = index === 0;
    const isLast = index === blocks.length - 1;

    return (
      <div key={block.id} className="group relative border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
        {/* Block Controls */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 shadow-lg">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => moveBlock(block.id, "up")}
              isDisabled={isFirst}
            >
              <MoveUp size={14} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => moveBlock(block.id, "down")}
              isDisabled={isLast}
            >
              <MoveDown size={14} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => deleteBlock(block.id)}
              isDisabled={blocks.length === 1}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        {/* Block Content */}
        {block.type === "heading" && (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="หัวข้อ..."
            className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
        )}

        {block.type === "paragraph" && (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder={placeholder}
            className="w-full min-h-[100px] bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400"
          />
        )}

        {block.type === "quote" && (
          <div className="border-l-4 border-blue-500 pl-4">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="ข้อความอ้างอิง..."
              className="w-full min-h-[80px] bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400 italic"
            />
          </div>
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            {block.imageUrl ? (
              <img
                src={block.imageUrl}
                alt={block.imageAlt || ""}
                className="max-w-full h-auto rounded-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>
            )}
            <Button
              size="sm"
              variant="bordered"
              startContent={<ImageIcon size={16} />}
              onPress={() => {
                setSelectedBlockId(block.id);
                setImageUrl(block.imageUrl || "");
                setImageAlt(block.imageAlt || "");
                onOpen();
              }}
            >
              {block.imageUrl ? "เปลี่ยนรูปภาพ" : "เพิ่มรูปภาพ"}
            </Button>
          </div>
        )}

        {block.type === "list" && (
          <div className="space-y-2">
            {block.listItems?.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateListItem(block.id, itemIndex, e.target.value)}
                  placeholder="รายการ..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                {block.listItems && block.listItems.length > 1 && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => removeListItem(block.id, itemIndex)}
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              variant="light"
              startContent={<Plus size={16} />}
              onPress={() => addListItem(block.id)}
            >
              เพิ่มรายการ
            </Button>
          </div>
        )}

        {/* Add Block Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="light"
              startContent={<Type size={16} />}
              onPress={() => addBlock("heading", block.id)}
            >
              หัวข้อ
            </Button>
            <Button
              size="sm"
              variant="light"
              startContent={<Type size={16} />}
              onPress={() => addBlock("paragraph", block.id)}
            >
              ย่อหน้า
            </Button>
            <Button
              size="sm"
              variant="light"
              startContent={<ImageIcon size={16} />}
              onPress={() => addBlock("image", block.id)}
            >
              รูปภาพ
            </Button>
            <Button
              size="sm"
              variant="light"
              startContent={<List size={16} />}
              onPress={() => addBlock("list", block.id)}
            >
              รายการ
            </Button>
            <Button
              size="sm"
              variant="light"
              startContent={<Quote size={16} />}
              onPress={() => addBlock("quote", block.id)}
            >
              อ้างอิง
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardBody className="space-y-4">
          {blocks.map((block, index) => renderBlock(block, index))}
        </CardBody>
      </Card>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>เพิ่มรูปภาพ</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="URL รูปภาพ"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Input
                label="คำอธิบายรูปภาพ"
                placeholder="คำอธิบายรูปภาพ"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="max-w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              ยกเลิก
            </Button>
            <Button color="primary" onPress={handleImageAdd}>
              เพิ่มรูปภาพ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
