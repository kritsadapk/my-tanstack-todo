'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod'; // Library ยอดนิยมสำหรับ Validation

export function RegisterForm() {
  // 1. --- สร้าง Form Instance ด้วย useForm Hook ---
  const form = useForm({
    // กำหนดค่าเริ่มต้นของฟอร์ม
    /*
    useForm คือ Hook หลักที่สร้าง "instance" ของฟอร์มขึ้นมา ตัวแปร form นี้จะเก็บ State, Methods, และข้อมูลทุกอย่างที่เกี่ยวกับฟอร์มนี้ไว้
    */
    defaultValues: {
      email: '',
      password: '',
    },
    // กำหนดฟังก์ชันที่จะทำงานเมื่อฟอร์มถูก Submit
    onSubmit: async ({ value }) => {
      // ตรงนี้คือส่วนที่เราจะส่งข้อมูลไปที่ API
      console.log('Submitting:', value);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // จำลองการดีเลย์ของ API
      alert(`Form submitted with email: ${value.email}`);
    },
  });

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      {/* 2. --- สร้างแท็ก <form> และผูกกับ form instance --- */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(); // เรียกใช้ฟังก์ชัน submit ของ form instance รันการ Validation ทั้งหมดในฟอร์มอีกครั้ง ถ้า Validation ผ่าน มันถึงจะไปเรียกฟังก์ชัน onSubmit ที่เรากำหนดไว้ใน useForm ให้เอง
        }}
        className="space-y-6"
      >
        {/* 3. --- สร้าง Field สำหรับ Email --- */}
        <form.Field
          name="email"
          // กำหนดกฎการ Validation ด้วย Zod
          validators={{
            onChange: z.string().email('Must be a valid email'),
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {/* 4. --- แสดง Error Message --- */}
              {field.state.meta.errors ? (
                <em className="text-sm text-red-500 mt-1">{field.state.meta.errors?.map((error) => error?.message)}</em>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* --- สร้าง Field สำหรับ Password (เหมือนกับ Email) --- */}
        <form.Field
          name="password"
          validators={{
            onChange: z.string().min(8, 'Password must be at least 8 characters'),
          }}
        >
          {(field) => {
            // console.log('Password field:', field.state);
            return (
              <div>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />

                {field.state.meta.errors ? (
                  <em className="text-sm text-red-500 mt-1">{field.state.meta.errors?.map((error) => error?.message)}</em>
                ) : null}
              </div>
            );
          }}
        </form.Field>

        {/* 5. --- ปุ่ม Submit และการจัดการสถานะ --- */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}