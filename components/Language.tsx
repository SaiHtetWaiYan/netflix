import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Language() {
  return (
    <Select defaultValue="eng">
      <SelectTrigger className="w-[120px] bg-black bg-opacity-5 text-white">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className=" bg-black bg-opacity-5 text-white">
        <SelectItem value="eng">English</SelectItem>
        <SelectItem value="mm">Myanmar</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
      </SelectContent>
    </Select>
  );
}
