import React from "react";
// Import icons directly
import { AiOutlineZoomIn, AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiEdit3, FiType } from "react-icons/fi";

export type OrgNode = {
    title: string;
    children?: OrgNode[];
};

export const data: OrgNode[] = [
    {
        title: 'مدیرعامل',
        children: [
            {
                title: 'مدیر ارشد فناوری',
                children: [
                    {
                        title: 'سرپرست مهندسی بک‌اند',
                        children: [
                            { title: 'توسعه‌دهنده ارشد بک‌اند' },
                            { title: 'توسعه‌دهنده بک‌اند' },
                            { title: 'کارآموز بک‌اند' }
                        ]
                    },
                    {
                        title: 'سرپرست مهندسی فرانت‌اند',
                        children: [
                            { title: 'توسعه‌دهنده ارشد فرانت‌اند' },
                            { title: 'توسعه‌دهنده فرانت‌اند' },
                            { title: 'طراح UI/UX' }
                        ]
                    },
                    {
                        title: 'سرپرست زیرساخت',
                        children: [
                            { title: 'مهندس ' },
                            { title: 'مهندس ' }
                        ]
                    }
                ]
            },
            {
                title: 'مدیر ارشد مالی',
                children: [
                    { title: 'حسابدار ارشد' },
                    { title: 'حسابدار' },
                    { title: 'تحلیلگر مالی' }
                ]
            },
            {
                title: 'مدیر ارشد عملیات',
                children: [
                    {
                        title: 'سرپرست پشتیبانی',
                        children: [
                            { title: 'کارشناس پشتیبانی' }
                        ]
                    },
                    { title: 'مدیر تدارکات' }
                ]
            },
            {
                title: 'مدیر بازاریابی',
                children: [
                    { title: 'سرپرست محتوا' },
                    { title: 'کارشناس سئو' },
                    { title: 'مدیر تبلیغات' }
                ]
            },
            {
                title: 'مدیر منابع انسانی',
                children: [
                    { title: 'کارشناس جذب و استخدام' },
                    { title: 'کارشناس آموزش و توسعه' },
                    { title: 'کارشناس جبران خدمات' }
                ]
            }
        ]
    }
];

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