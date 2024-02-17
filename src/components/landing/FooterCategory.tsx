interface Props {
  title: string;
  links: { title: string; link: string }[];
}
export default function FooterCategory({ title, links }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <span className="mt-4 font-bold">{title}</span>
      <div className="flex flex-col gap-1">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target={"_blank"}
            className="text-sm hover:underline"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}
