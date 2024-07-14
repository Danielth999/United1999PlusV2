'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';

const AddProduct = ({ categories }) => {
  const [products, setProducts] = useState([
    {
      name: '',
      description: '',
      categoryId: '',
      color: '',
      size: '',
      quantity: '',
      imageFile: null,
      imagePreview: '',
      isPublished: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedProducts = [...products];
    updatedProducts[index].imageFile = file;
    updatedProducts[index].imagePreview = URL.createObjectURL(file);
    setProducts(updatedProducts);
  };

  const addProductForm = () => {
    setProducts([
      ...products,
      {
        name: '',
        description: '',
        categoryId: '',
        color: '',
        size: '',
        quantity: '',
        imageFile: null,
        imagePreview: '',
        isPublished: false,
      },
    ]);
  };

  const removeProductForm = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataArray = products.map(product => {
      const formData = new FormData();
      for (const key in product) {
        if (key !== 'imageFile' && key !== 'imagePreview') {
          formData.append(key, product[key]);
        }
      }
      if (product.imageFile) {
        formData.append('image', product.imageFile);
      }
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map(formData =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
            method: 'POST',
            body: formData,
          })
        )
      );

      if (responses.every(res => res.ok)) {
        toast.success('เพิ่มสินค้าเรียบร้อยแล้ว');
        router.refresh(); // Refresh the table or page to reflect new data
        router.push('/admin/products');
      } else {
        throw new Error('Some requests failed');
      }
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">เพิ่มสินค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="relative border rounded-lg p-4 mb-4">
            <Tabs defaultValue="general">
              <TabsList className="flex justify-center mb-4">
                <TabsTrigger value="general" className="px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200">ทั่วไป</TabsTrigger>
                <TabsTrigger value="details" className="px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200">รายละเอียด</TabsTrigger>
                <TabsTrigger value="media" className="px-4 py-2 mx-2 bg-gray-100 rounded-lg hover:bg-gray-200">รูปภาพ</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="mb-4">
                  <Label htmlFor={`name-${index}`}>ชื่อสินค้า</Label>
                  <Input
                    id={`name-${index}`}
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    placeholder="กรอกชื่อสินค้า"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor={`description-${index}`}>คำอธิบาย</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={product.description}
                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                    placeholder="กรอกคำอธิบายสินค้า"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor={`category-${index}`}>หมวดหมู่</Label>
                  <Select value={product.categoryId} onValueChange={(value) => handleProductChange(index, 'categoryId', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.categoryId} value={category.categoryId}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <Label htmlFor={`color-${index}`}>สี</Label>
                    <Input
                      id={`color-${index}`}
                      value={product.color}
                      onChange={(e) => handleProductChange(index, 'color', e.target.value)}
                      placeholder="กรอกสีของสินค้า"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`size-${index}`}>ขนาด</Label>
                    <Input
                      id={`size-${index}`}
                      value={product.size}
                      onChange={(e) => handleProductChange(index, 'size', e.target.value)}
                      placeholder="กรอกขนาดของสินค้า"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor={`quantity-${index}`}>จำนวน</Label>
                  <Input
                    id={`quantity-${index}`}
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    placeholder="กรอกจำนวนสินค้า"
                  />
                </div>
              </TabsContent>
              <TabsContent value="media">
                <div className="mb-4">
                  <Label htmlFor={`imageFile-${index}`}>อัปโหลดรูปภาพ</Label>
                  <Input
                    id={`imageFile-${index}`}
                    type="file"
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder="อัปโหลดรูปภาพสินค้า"
                  />
                  {product.imagePreview && <img src={product.imagePreview} alt="Product Preview" className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md" />}
                </div>
                <div className="flex items-center mt-4">
                  <Checkbox
                    id={`isPublished-${index}`}
                    checked={product.isPublished}
                    onCheckedChange={(checked) => handleProductChange(index, 'isPublished', checked)}
                  />
                  <Label htmlFor={`isPublished-${index}`} className="ml-2">เผยแพร่</Label>
                </div>
              </TabsContent>
              {index > 0 && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <Button variant="destructive" onClick={() => removeProductForm(index)}>ลบสินค้า</Button>
                </div>
              )}
            </Tabs>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <Button onClick={addProductForm} disabled={isLoading}>เพิ่มรายการสินค้าอีก</Button>
          <Button variant='success' type="submit" className="ml-4" disabled={isLoading}>
            {isLoading ? 'กำลังเพิ่มสินค้า...' : 'เพิ่มสินค้า'}
          </Button>
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p>จำนวนสินค้าที่เพิ่ม: {products.length}</p>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
