// client/src/components/category-menu/index.tsx
import React, { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import CategoryService from "@/services/category-service";
// MUDANÇA: Apenas ICategory é necessário. ICategoryMenuItem foi removido.
import type { ICategory } from "@/commons/types"; 
import type { MenuItem } from "primereact/menuitem"; 

interface CategoryMenuProps {
  onSelectCategory: (categoryId?: number) => void;
  visible: boolean;
  onHide: () => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  onSelectCategory,
  visible,
  onHide,
}) => {
  // MUDANÇA: O estado usa o tipo nativo do PrimeReact (MenuItem[])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); 

  useEffect(() => {
    const loadCategories = async () => {
      const response = await CategoryService.findAll();
      if (response.success && Array.isArray(response.data)) {
        // Mapeamento direto para o tipo MenuItem[]
        const items: MenuItem[] = response.data.map(
          (category: ICategory) => ({
            label: category.name,
            command: () => onSelectCategory(category.id),
          })
        );
        
        setMenuItems([
          { 
            label: "All Products", 
            command: () => onSelectCategory(undefined) 
          }, 
          ...items,
        ]);
      }
    };
    loadCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar visible={visible} onHide={onHide} fullScreen> 
      <h2 className="text-xl mb-4">Product Categories</h2> 
      <Menu model={menuItems} className="w-full md:w-15rem" /> 
    </Sidebar>
  );
};