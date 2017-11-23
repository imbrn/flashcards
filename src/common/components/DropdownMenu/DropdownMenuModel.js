export function link({ text, icon, type, ...rest }) {
  return {
    itemType: 'link',
    text,
    icon,
    type,
    ...rest,
  };
}

export function separator({ ...rest }) {
  return {
    itemType: 'separator',
    ...rest,
  };
}
