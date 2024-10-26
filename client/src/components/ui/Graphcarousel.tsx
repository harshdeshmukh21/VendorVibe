"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BarComponent } from "./barchart"; // Adjust the path to your BarChart component
import { LineComponent } from "./Linechart"; // Adjust the path to your LineChart component
import { PieComponent } from "./Piechart"; // Adjust the path to your PieComponent

export function CarouselDemo() {
  return (
    <div className="relative">
      <Carousel className="w-full ml-20 max-w-xs">
        <CarouselContent>
          <CarouselItem>
            <BarComponent /> {/* Add your bar chart component */}
          </CarouselItem>
          <CarouselItem>
            <LineComponent /> {/* Add your line chart component */}
          </CarouselItem>
          <CarouselItem>
            <PieComponent />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
