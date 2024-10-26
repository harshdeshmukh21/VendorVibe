"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputFile } from "./inputFile";
import { supabase } from "../../../lib/SupabaseClient";

interface ProductData {
  product_name: string;
  category: string;
  brand: string;
  unit: string;
  description: string;
  image_url: string;
  expiry_date: string;
  listing_price: string;
  inventory_id: string;  // Added inventory_id field
}

interface ProductWithFormProps {
  inventoryId: string;  // Accepting inventory ID as a prop
}

export function ProductWithForm({ inventoryId }: ProductWithFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    product_name: "",
    category: "",
    brand: "",
    unit: "",
    description: "",
    image_url: "",
    expiry_date: "",
    listing_price: "",
    inventory_id: inventoryId,  // Set the initial state with the passed inventory ID
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!productData.product_name) throw new Error("Product name is required");
    if (!productData.category) throw new Error("Category is required");
    if (!productData.brand) throw new Error("Brand is required");
    if (!productData.unit) throw new Error("Unit is required");
    if (!productData.listing_price || Number(productData.listing_price) <= 0)
      throw new Error("Valid listing price is required");
    if (!productData.description) throw new Error("Description is required");
    if (!productData.inventory_id) throw new Error("Inventory ID is required");  // Added validation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('📝 Starting product submission process...');

    try {
      validateForm();
      console.log('✅ Form data validated:', productData);

      const { data, error } = await supabase
        .from('ProductCatalog')
        .insert([
          {
            product_name: productData.product_name,
            category: productData.category,
            brand: productData.brand,
            unit: productData.unit,
            description: productData.description,
            image_url: productData.image_url,
            expiry_date: productData.expiry_date || null,
            listing_price: Number(productData.listing_price),
            inventory_id: productData.inventory_id,  // Added to submission
          },
        ])
        .select();

      if (error) {
        console.error('❌ Supabase Error:', error);
        throw error;
      }

      console.log('✅ Product added successfully:', data);
      alert('Product added successfully!');

      // Reset form
      setProductData({
        product_name: "",
        category: "",
        brand: "",
        unit: "",
        description: "",
        image_url: "",
        expiry_date: "",
        listing_price: "",
        inventory_id: inventoryId,  // Reset to current inventory ID
      });

    } catch (error) {
      console.error("❌ Error:", error);
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      alert('Failed to add product: ' + message);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Submission process completed');
    }
  };

  return (
    <Card className="w-full h-1/2">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Add a new product to the catalog</CardDescription>
      </CardHeader>
      <CardContent className="h-full overflow-auto"> {/* Allow scrolling if content overflows */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4"> {/* Use a grid with two columns */}
            <div>
              <Label htmlFor="inventory_id">Inventory ID *</Label>
              <Input
                id="inventory_id"
                name="inventory_id"
                placeholder="Enter inventory ID"
                value={productData.inventory_id}
                onChange={handleChange}

                readOnly // Make it read-only since it's set dynamically
              />
            </div>

            <div>
              <Label htmlFor="product_name">Product Name *</Label>
              <Input
                id="product_name"
                name="product_name"
                placeholder="Enter product name"
                value={productData.product_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                name="category"
                onValueChange={(value) => setProductData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="medications">Medications</SelectItem>
                  <SelectItem value="stationary">Stationary</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand">Brand Name *</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Enter brand name"
                value={productData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="unit">Unit Type *</Label>
              <Input
                id="unit"
                name="unit"
                placeholder="e.g., pieces, kg, liters"
                value={productData.unit}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter product description"
                value={productData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="listing_price">Listing Price *</Label>
              <Input
                id="listing_price"
                name="listing_price"
                placeholder="Enter price"
                value={productData.listing_price}
                onChange={handleChange}
                type="number"
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                name="expiry_date"
                type="date"
                value={productData.expiry_date}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2"> {/* Make the image input span two columns */}
              <Label>Product Image</Label>
              <InputFile />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setProductData({
                product_name: "",
                category: "",
                brand: "",
                unit: "",
                description: "",
                image_url: "",
                expiry_date: "",
                listing_price: "",
                inventory_id: inventoryId,  // Reset to current inventory ID
              })}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
