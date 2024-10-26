"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
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
import { supabase } from "../../../lib/SupabaseClient";
import { useUser } from "@/app/context/UserContext";

interface FormData {

  section: string;
  quantity: string;
  purchasePrice: string;
  sellingPrice: string;
  expiryDate: string;
}

export default function CardWithForm() {
  const router = useRouter();
  const { shopId } = useUser();
  const [formData, setFormData] = React.useState<FormData>({

    section: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    expiryDate: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSectionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      section: value,
    }));
  };

  const validateFormData = () => {

    if (!formData.section) {
      throw new Error('Please select a section');
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      throw new Error('Please enter a valid quantity');
    }
    if (!formData.purchasePrice || Number(formData.purchasePrice) <= 0) {
      throw new Error('Please enter a valid purchase price');
    }
    if (!formData.sellingPrice || Number(formData.sellingPrice) <= 0) {
      throw new Error('Please enter a valid selling price');
    }
    if (!formData.expiryDate) {
      throw new Error('Please enter an expiry date');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('📝 Starting inventory submission process...');

    try {
      // Validate shop ID
      if (!shopId) {
        console.error('❌ Shop ID missing', { shopId });
        throw new Error('Shop ID not found. Please try again later.');
      }
      console.log('🏪 Shop ID verified:', shopId);

      // Validate form data
      validateFormData();
      console.log('✅ Form data validated:', formData);

      // Prepare inventory data
      const inventoryData = {
        shop_id: shopId,
        quantity: Number(formData.quantity),
        purchase_price: Number(formData.purchasePrice),
        selling_price: Number(formData.sellingPrice),
        expiry_date: formData.expiryDate,
        section: formData.section,
        sharable: true, // Default value
        last_updated: new Date().toISOString()
      };
      console.log('📦 Prepared inventory data:', inventoryData);

      // Insert into Supabase
      const { data, error } = await supabase
        .from('Inventory')
        .insert([inventoryData])
        .select();

      if (error) {
        console.error('❌ Supabase Error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ Inventory added successfully:', data);
      alert('Inventory item added successfully!');

      // Reset form
      setFormData({
        section: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
        expiryDate: "",
      });

      router.push("/dashboard");

    } catch (error) {
      console.error("❌ Detailed Error:", {
        error,
        type: error instanceof Error ? 'Error instance' : typeof error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }

      alert('Failed to add inventory item: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Submission process completed');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Inventory</CardTitle>
        <CardDescription>
          Deploy your new inventory in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-2 space-y-1.5">


              <Label htmlFor="section">Select section</Label>
              <Select onValueChange={handleSectionChange} required>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Medications">Medications</SelectItem>
                  <SelectItem value="Stationary">Stationary Shops</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="quantity">Enter available quantity</Label>
              <Input
                id="quantity"
                placeholder="100 units"
                value={formData.quantity}
                onChange={handleChange}
                type="number"
                min="1"
                required
              />

              <Label htmlFor="purchasePrice">Purchase price</Label>
              <Input
                id="purchasePrice"
                placeholder="Purchase price that was for you"
                value={formData.purchasePrice}
                onChange={handleChange}
                type="number"
                min="0.01"
                step="0.01"
                required
              />

              <Label htmlFor="sellingPrice">Selling price</Label>
              <Input
                id="sellingPrice"
                placeholder="Price per unit"
                value={formData.sellingPrice}
                onChange={handleChange}
                type="number"
                min="0.01"
                step="0.01"
                required
              />

              <Label htmlFor="expiryDate">Expiry</Label>
              <Input
                id="expiryDate"
                placeholder="Deadline for stock availability"
                value={formData.expiryDate}
                onChange={handleChange}
                type="date"
                required
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button
              variant="outline"
              type="reset"
              disabled={isSubmitting}
              onClick={() => setFormData({
                section: "",
                quantity: "",
                purchasePrice: "",
                sellingPrice: "",
                expiryDate: "",
              })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deploying...' : 'Deploy'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}