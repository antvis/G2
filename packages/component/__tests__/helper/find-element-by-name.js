
export default function findByName(group, name) {
  return group.findBy(function(node) {
    return node.name === name;
  });
}
