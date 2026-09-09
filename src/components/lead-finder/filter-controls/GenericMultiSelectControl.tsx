import React from 'react';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface GenericMultiSelectControlProps {
  options: Array<{ value: string; label: string; category?: string }>;
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  allowCustom?: boolean;
}

export const GenericMultiSelectControl: React.FC<GenericMultiSelectControlProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select values...',
  allowCustom = true,
}) => {
  return (
    <div className="pt-1 text-xs">
      <SearchableMultiSelect
        options={options}
        selected={selected}
        onChange={onChange}
        placeholder={placeholder}
        allowCustom={allowCustom}
      />
    </div>
  );
};
