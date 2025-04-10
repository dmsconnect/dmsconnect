export default function getInitials(name: string) {
  const initialCharacters = name
    .split(" ")
    .map((v) => v.charAt(0))
    .join("");
  return initialCharacters.slice(0, 2);
}
