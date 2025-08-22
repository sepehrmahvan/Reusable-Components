import React from "react";
// Import icons directly
import { AiOutlineZoomIn, AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiEdit3, FiType } from "react-icons/fi";

/**
 * UUID System for Tree Chart
 * 
 * This system implements MongoDB-like ObjectId generation for tree nodes.
 * Each node gets a unique 24-character hexadecimal ID that includes:
 * - Timestamp (8 chars): Unix timestamp in hex
 * - Random part (8 chars): Random hex string
 * - Counter (8 chars): Random counter in hex
 * 
 * Benefits:
 * - Unique identification for backend operations
 * - No conflicts when adding/removing nodes
 * - Easy to track node relationships
 * - Compatible with MongoDB ObjectId format
 */

// Utility function to generate MongoDB-like ObjectId
export const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Math.random().toString(16).substring(2, 10);
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  return timestamp + randomPart + counter;
};

// Utility function to add IDs to existing tree structure
export const addIdsToTree = (nodes: RawOrgNode[]): OrgNode[] => {
  return nodes.map(node => ({
    ...node,
    id: generateObjectId(),
    children: node.children ? addIdsToTree(node.children) : undefined
  }));
};

// Utility function to find node by ID
export const findNodeById = (nodes: OrgNode[], targetId: string): OrgNode | null => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === targetId) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

// Utility function to find parent node by child ID
export const findParentById = (nodes: OrgNode[], targetId: string): OrgNode | null => {
  for (const node of nodes) {
    if (node.children) {
      for (const child of node.children) {
        if (child.id === targetId) {
          return node;
        }
      }
      const found = findParentById(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

// Utility function to log tree structure with IDs for debugging
export const logTreeWithIds = (nodes: OrgNode[], level: number = 0): void => {
  nodes.forEach(node => {
    const indent = '  '.repeat(level);
    console.log(`${indent}ID: ${node.id}, Title: ${node.title}`);
    if (node.children && node.children.length > 0) {
      logTreeWithIds(node.children, level + 1);
    }
  });
};

export type OrgNode = {
    id: string;
    title: string;
    children?: OrgNode[];
    description?: string;
};

// Type for raw data without IDs
export type RawOrgNode = {
    title: string;
    children?: RawOrgNode[];
    description?: string;
};

export const data: OrgNode[] = addIdsToTree([
    {
        title: 'مدیرعامل',
        description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
        children: [
            {
                title: 'مدیر ارشد فناوری',
                description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                children: [
                    {
                        title: 'سرپرست مهندسی بک‌اند',
                        description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                    },
                    {
                        title: 'سرپرست مهندسی فرانت‌اند',
                        description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                    },
                    {
                        title: 'سرپرست زیرساخت',
                        description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                    }
                ]
            },
            {
                title: 'مدیر ارشد مالی',
                description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
            },
            {
                title: 'مدیر ارشد عملیات',
                description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                children: [
                    {
                        title: 'سرپرست پشتیبانی',
                        description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
                    },
                    { title: 'مدیر تدارکات' }
                ]
            },
            {
                title: 'مدیر بازاریابی',
                description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
            },
            {
                title: 'مدیر منابع انسانی',
                description: "مسئول کلی هدایت و راهبری سازمان و اتخاذ تصمیمات استراتژیک",
            }
        ]
    }
]);

// Log the tree structure with IDs for debugging
console.log('Tree structure with UUIDs:');
logTreeWithIds(data);

// Also log the complete data structure in JSON format
console.log('Complete tree data with UUIDs:', JSON.stringify(data, null, 2));

export type GuideStep = {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    title: string;
    description: string;
};

export const guideData: GuideStep[] = [
    {
        icon: MdKeyboardArrowDown,
        title: "افزودن زیرمجموعه",
        description: "برای افزودن زیرمجموعه به یک کارت، روی آیکن + پایین همان کارت کلیک کنید."
    },
    {
        icon: AiOutlinePlus,
        title: "افزودن هم‌سطح",
        description: "برای افزودن هم‌سطح قبل یا بعد از یک کارت، به‌ترتیب روی + سمت چپ یا + سمت راست همان کارت کلیک کنید."
    },
    {
        icon: FiType,
        title: "وارد کردن عنوان",
        description: "پس از انتخاب محل افزودن، در پنجره بازشده عنوان موردنظر را وارد کرده و دکمه «ثبت» را بزنید."
    },
    {
        icon: FiEdit3,
        title: "ویرایش و حذف",
        description: "برای ویرایش یا حذف هر کارت، روی عنوان آن کلیک کنید تا گزینه‌های ویرایش و حذف نمایش داده شود."
    }
];