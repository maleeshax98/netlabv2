export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  stock?: number;
};

export const featuredProducts: Product[] = [
  {
    id: "p1",
    name: "Arduino Uno R3",
    category: "Microcontrollers",
    price: 24.99,
    image: "/default.png",
    isNew: true,
    stock: 15,
  },
  {
    id: "p2",
    name: "ESP32 DevKit V1",
    category: "Wireless Modules",
    price: 8.5,
    image: "/default.png",
    isOnSale: true,
    discount: 15,
    stock: 8,
  },
  {
    id: "p3",
    name: "Ultrasonic Sensor HC-SR04",
    category: "Sensors",
    price: 3.99,
    image: "/default.png",
    stock: 45,
  },
  {
    id: "p4",
    name: "5V 2A Power Adapter",
    category: "Power Systems",
    price: 12.0,
    image: "/default.png",
    isNew: true,
    stock: 12,
  },
  {
    id: "p5",
    name: "DS18B20 Temp Sensor",
    category: "Sensors",
    price: 2.5,
    image: "/default.png",
    stock: 0,
  },
  {
    id: "p6",
    name: "10k Ohm Resistor Pack (50)",
    category: "Passive Components",
    price: 1.99,
    image: "/default.png",
    isOnSale: true,
    discount: 10,
    stock: 100,
  },
  {
    id: "p7",
    name: "Breadboard (830 Points)",
    category: "Tools & Equipment",
    price: 5.49,
    image: "/default.png",
    stock: 25,
  },
  {
    id: "p8",
    name: "OLED Display 0.96 inch",
    category: "Modules",
    price: 6.99,
    image: "/default.png",
    isNew: true,
    stock: 20,
  },
];

export const exclusiveProducts: Product[] = [
  {
    id: "ex1",
    name: "NET Pro-Series Logic Analyzer",
    category: "Precision Tools",
    price: 189.99,
    image: "/default.png",
    isNew: true,
    stock: 5,
  },
  {
    id: "ex2",
    name: "NET Ultra-Low Noise Power Supply",
    category: "Power Systems",
    price: 145.5,
    image: "/default.png",
    isOnSale: false,
    stock: 3,
  },
  {
    id: "ex3",
    name: "NET Developer Kit Platinum",
    category: "Development Kits",
    price: 299.0,
    image: "/default.png",
    isNew: true,
    stock: 10,
  },
];
