// ListHierarchy.tsx
import React from 'react';

interface ListHierarchyProps {
  hierarchy: { label: string; data: any[]; dataKey?: string; onClick: (item: any) => void }[];
}

const ListHierarchy: React.FC<ListHierarchyProps> = ({ hierarchy }) => {
  return (
    <div>
      {hierarchy.map((item, index) => (
        <div key={index}>
          <h2>{item.label}</h2>
          <ul>
            {item.data?.map((subItem, subIndex) => (
              <li key={subIndex} onClick={() => item.onClick(subItem)}>
                {item.dataKey ? subItem[item.dataKey] : subItem.label || subItem}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListHierarchy;