'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from './types';
import { addTodo, deleteTodo, getTodos, updateTodo } from './api';
/*
useQuery: Hook สำหรับ "การดึงข้อมูล" หรือการอ่านข้อมูล (Read)
useMutation: Hook สำหรับ "การเปลี่ยนแปลงข้อมูล" เช่น การสร้าง (Create), อัปเดต (Update), หรือลบ (Delete)
useQueryClient: Hook ที่ให้เราเข้าถึง "สมอง" ของ TanStack Query เพื่อสั่งการต่างๆ เช่น สั่งให้โหลดข้อมูลใหม่
*/


// --- Custom Hooks ---
/*
 สร้าง Custom Hooks: นำฟังก์ชัน API มาห่อหุ้มด้วย Hooks ของ TanStack Query (useQuery, useMutation) 
 เพื่อเพิ่มความสามารถพิเศษ เช่น Caching, auto-refetch, และการจัดการสถานะ (loading, error) 
 Custom Hooks เหล่านี้คือสิ่งที่เราจะเรียกใช้ใน Component ของเรา
*/

// Hook สำหรับดึงข้อมูล To-Do ทั้งหมด
export const useGetTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'], // นี่คือ Key ที่ใช้ระบุและ Caching ข้อมูล เก็บข้อมูล (Cache) ที่ดึงมาได้ ถ้ามีการเรียก useGetTodos ที่อื่นอีกในแอป มันจะเห็น queryKey ['todos'] เหมือนกัน และจะดึงข้อมูลจาก Cache มาให้ทันที ไม่ต้องยิง API ใหม่
    queryFn: getTodos, // ถ้าอยากได้ข้อมูลสำหรับ Key ['todos'] ให้ไปเรียกใช้ฟังก์ชัน getTodos นะ
  });
};

// Hook สำหรับเพิ่ม To-Do
export const useAddTodo = () => {
  const queryClient = useQueryClient(); // ดึง "สมอง" หรือตัวควบคุมหลักของ TanStack Query มาเก็บไว้ในตัวแปร queryClient
  return useMutation({ // เราเรียกใช้ useMutation สำหรับการกระทำที่ "เปลี่ยนแปลง" ข้อมูล
    mutationFn: addTodo, // บอก useMutation ว่า "วิธีการเปลี่ยนแปลงข้อมูลคือให้ไปเรียกฟังก์ชัน addTodo นะ"
    onSuccess: () => { // สิ่งที่ต้องทำเมื่อ Mutation สำเร็จ
      // เมื่อเพิ่มสำเร็จ ให้สั่งให้ query 'todos' โหลดข้อมูลใหม่
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // ส่งสัญญานบอก queryClient ว่า "ข้อมูลที่มี key ['todos'] ที่นายเก็บไว้ใน Cache  มันไม่อัปเดตแล้วนะ (Invalidate) เพราะเราเพิ่งเพิ่ม To-do ตัวใหม่เข้าไป
    },
  });
};

// Hook สำหรับอัปเดตสถานะ To-Do
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => { // เมื่ออัปเดตสำเร็จ ก็สั่งให้ข้อมูล 'todos' โหลดใหม่
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  })
}

// Hook สำหรับลบ To-Do
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => { // เมื่อลบสำเร็จ ก็สั่งให้ข้อมูล 'todos' โหลดใหม่เช่นกัน
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};