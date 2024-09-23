import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOptions = () => {
  const optionList = [
    {
      value: "firstName",
      label: "firstName",
    },
    {
      value: "lastName",
      label: "lastName",
    },
    {
      value: "city",
      label: "city",
    },
    {
      value: "email",
      label: "email",
    },
  ];
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Option..." />
        </SelectTrigger>
        <SelectContent>
          {optionList.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
