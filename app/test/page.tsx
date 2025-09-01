"use client";
import { BackendNode } from "@/utils/data";
import TreeChart from "@/components/TreeChart/page";

export default function TestPage() {
  // Test data matching the provided structure
  const testData: BackendNode[] = [
    {
      _id: "687398ec3c6b455a5eece33f",
      title: "aaa",
      position: "aaa",
      lang: "string",
      parent_id: null,
      parent_lang: null,
      platform_id: "raychi.ir",
      user_id: "67a08995f55d39eceb3aa5e8",
      created_at: "2025-07-13T11:30:52.226000",
      updated_at: "2025-07-13T11:30:52.226000",
      children: ["687398ff3c6b455a5eece340"]
    },
    {
      _id: "687398ff3c6b455a5eece340",
      title: "2aaa",
      position: "2aaa",
      lang: "string",
      parent_id: "687398ec3c6b455a5eece33f",
      parent_lang: null,
      platform_id: "raychi.ir",
      user_id: "67a08995f55d39eceb3aa5e8",
      created_at: "2025-07-13T11:31:11.252000",
      updated_at: "2025-07-13T11:31:11.252000",
      children: []
    }
  ];

  const organizationOptions = [
    { title: "مدیرعامل" },
    { title: "مدیر ارشد فناوری" },
    { title: "مدیر ارشد مالی" },
    { title: "مدیر ارشد عملیات" },
    { title: "مدیر بازاریابی" },
    { title: "مدیر منابع انسانی" }
  ];

  const handleAddPosition = (pos: "top" | "right" | "bottom" | "left", nodeId: string, title: string) => {
    console.log("Add position:", { pos, nodeId, title });
  };

  const handleEditPosition = (nodeId: string, newTitle: string, newDescription: string) => {
    console.log("Edit position:", { nodeId, newTitle, newDescription });
  };

  const handleDeletePosition = (nodeId: string) => {
    console.log("Delete position:", { nodeId });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">TreeChart Test with Backend Data</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Test Data:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
          {JSON.stringify(testData, null, 2)}
        </pre>
      </div>

      <div className="border border-gray-300 rounded p-4">
        <TreeChart
          data={testData}
          onAddPosition={handleAddPosition}
          onEditPosition={handleEditPosition}
          onDeletePosition={handleDeletePosition}
          organizationOptions={organizationOptions}
        />
      </div>
    </div>
  );
}
