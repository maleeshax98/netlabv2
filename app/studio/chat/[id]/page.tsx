"use client";

import { ChatInterface } from "@/components/studio/ChatInterface";
import { WorkspacePanel } from "@/components/studio/WorkspacePanel";
import React from "react";

const page = () => {
  const sampleMessages = [
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm your AI Engineering Assistant. Tell me about the electronics project you're planning, and I'll help you design the circuit and generate a Bill of Materials.",
    },
    {
      id: "2",
      sender: "user",
      text: "I want to build an automated indoor plant watering system. It needs to monitor soil moisture for three different plants and pump water only when necessary.",
    },
    {
      id: "3",
      sender: "ai",
      text: "That's a solid project. For a three-plant setup, we'll need a microcontroller with at least 3 Analog-to-Digital (ADC) pins and a relay module to control the pumps safely. I've updated the 'Components' tab with a suggested BOM including capacitive soil sensors—they're more durable than resistive ones.",
    },
    {
      id: "4",
      sender: "user",
      text: "Can I run this off a 9V battery, or should I use a wall adapter?",
    },
    {
      id: "5",
      sender: "ai",
      text: "I'd recommend a 12V DC wall adapter. Water pumps have high inductive loads that will drain a 9V battery very quickly. I've added a DC power jack and a buck converter to the list to step the voltage down for your microcontroller.",
    },
    {
      id: "6",
      sender: "user",
      text: "Can I run this off a 9V battery, or should I use a wall adapter?",
    },
    {
      id: "7",
      sender: "ai",
      text: "I'd recommend a 12V DC wall adapter. Water pumps have high inductive loads that will drain a 9V battery very quickly. I've added a DC power jack and a buck converter to the list to step the voltage down for your microcontroller.",
    },
    {
      id: "8",
      sender: "user",
      text: "Can I run this off a 9V battery, or should I use a wall adapter?",
    },
    {
      id: "9",
      sender: "ai",
      text: "I'd recommend a 12V DC wall adapter. Water pumps have high inductive loads that will drain a 9V battery very quickly. I've added a DC power jack and a buck converter to the list to step the voltage down for your microcontroller.",
    },
    {
      id: "10",
      sender: "user",
      text: "Can I run this off a 9V battery, or should I use a wall adapter?",
    },
    {
      id: "11",
      sender: "ai",
      text: "I'd recommend a 12V DC wall adapter. Water pumps have high inductive loads that will drain a 9V battery very quickly. I've added a DC power jack and a buck converter to the list to step the voltage down for your microcontroller.",
    },
    {
      id: "12",
      sender: "user",
      text: "Can I run this off a 9V battery, or should I use a wall adapter?",
    },
    {
      id: "13",
      sender: "ai",
      text: "I'd recommend a 12V DC wall adapter. Water pumps have high inductive loads that will drain a 9V battery very quickly. I've added a DC power jack and a buck converter to the list to step the voltage down for your microcontroller.",
    },
  ];

  const sampleComponents = [
    {
      id: "comp-001",
      name: "ESP32 DevKit V1",
      category: "Microcontroller",
      price: 8.5,
      quantity: 1,
      status: "in-stock",
      specs: "Dual-core, WiFi/BT",
    },
    {
      id: "comp-002",
      name: "Capacitive Soil Moisture Sensor",
      category: "Sensor",
      price: 3.2,
      quantity: 3,
      status: "in-stock",
      specs: "Corrosion resistant",
    },
    {
      id: "comp-003",
      name: "12V Submersible Water Pump",
      category: "Actuator",
      price: 5.4,
      quantity: 3,
      status: "limited",
      specs: "240L/H flow rate",
    },
    {
      id: "comp-004",
      name: "4-Channel 5V Relay Module",
      category: "Power Control",
      price: 4.15,
      quantity: 1,
      status: "in-stock",
      specs: "Opto-isolated",
    },
    {
      id: "comp-005",
      name: "DC-DC Buck Converter (LM2596)",
      category: "Power",
      price: 2.1,
      quantity: 2,
      status: "in-stock",
      specs: "Step-down 12V to 5V",
    },
    {
      id: "comp-006",
      name: "I2C 16x2 LCD Display",
      category: "Display",
      price: 4.5,
      quantity: 1,
      status: "in-stock",
      specs: "Blue backlight",
    },
  ];

  const projectStats = {
    totalCost: sampleComponents.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    ),
    itemCount: sampleComponents.length,
    estimatedShipping: "3-5 Business Days",
    powerRequirement: "12V DC / 2A",
  };

  return (
    <div className="p-10">
      <div className="w-full flex gap-2">
        <div className="w-full h-[80vh]">
          <ChatInterface messages={sampleMessages} onSendMessage={() => {}} />
        </div>
        <div className="w-full ">
          <WorkspacePanel components={sampleComponents} totalCost={projectStats.totalCost} onAddToCart={() => {}}/>
        </div>
      </div>
    </div>
  );
};

export default page;
