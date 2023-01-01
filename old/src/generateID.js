export default function generateID(string) {
  return string.toLowerCase().trim().replaceAll(' ', '-');
}
