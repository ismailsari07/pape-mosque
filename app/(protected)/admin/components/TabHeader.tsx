type TabHeaderProps = {
  title: string;
  description: string;
};

export default function TabHeader({ title, description }: TabHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-neutral-400 mt-1">{description}</p>
    </div>
  );
}
