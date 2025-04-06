import { FilterToggleWrapper } from "./FilterToggle.style";

interface FilterToggle {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedKey: string;
}

const FilterToggle = (props: FilterToggle) => {
  const { options, onChange, selectedKey } = props;

  return (
    <FilterToggleWrapper>
      {options?.map((option: { label: string; value: string }) => (
        <div
          key={option?.value}
          className={
            selectedKey === option?.value ? "selected filter" : "filter"
          }
          onClick={() => {
            onChange(option?.value);
          }}
        >
          {option?.label}
        </div>
      ))}
    </FilterToggleWrapper>
  );
};

export default FilterToggle;
