'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'; // Headless UI

/*
flexRender: เป็นฟังก์ชันผู้ช่วยอัจฉริยะ ใช้สำหรับแสดงผล (render) เนื้อหาใน header หรือ cell มันสามารถแสดงได้ทั้งข้อความธรรมดา, 
ตัวเลข, หรือแม้กระทั่ง React Component เต็มรูปแบบ (เหมือนที่เราใช้แสดงปุ่ม Actions)

ColumnDef: คือ Type Definition สำหรับ "นิยามคอลัมน์" ที่เราสร้างไว้ในไฟล์ columns.tsx

getCoreRowModel: คือฟังก์ชันหลักที่ใช้ในการประมวลผลข้อมูลดิบให้กลายเป็น "Row Model" หรือโครงสร้างแถวที่ตารางพร้อมจะนำไปใช้งาน

useReactTable: นี่คือ Hook ที่เป็นหัวใจหลักของไลบรารี เราจะใช้ Hook นี้เพื่อสร้าง table instance ที่เก็บ Logic ทั้งหมดไว้
*/

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data, // ข้อมูล to-do list ของเรา
    columns, // คอลัมน์ที่เราสร้างไว้
    getCoreRowModel: getCoreRowModel(), //  สั่งให้ useReactTable ใช้ฟังก์ชัน getCoreRowModel เพื่อประมวลผลข้อมูลและคอลัมน์ข้างต้น
  });

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => ( // ดึงข้อมูล "กลุ่มของ Header" ออกมา
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => ( // ในแต่ละกลุ่ม Header ก็จะมี Header ย่อยๆ (ในที่นี้คือ Status, Title, Actions) 
                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => ( // ดึงข้อมูล "แถวทั้งหมด" ที่ผ่านการประมวลผลแล้วออกมา
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                {row.getVisibleCells().map((cell) => ( // ในแต่ละแถว (row) ก็จะดึง "เซลล์ทั้งหมด" ออกมา
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">

                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
